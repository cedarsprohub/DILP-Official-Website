"""Donation enquiry endpoint for the DILP site.

The site is static. This small service is the one piece that needs a server:
it takes the enquiry form's JSON, emails it to the partnerships address over
SMTP, and returns a plain ok/not-ok so the page can say what happened.

Run locally:
    pip install -r requirements.txt
    cp .env.example .env     # then fill it in
    uvicorn app:app --reload --port 8000

Nothing here reads a secret from anywhere but the environment.
"""

from __future__ import annotations

import logging
import os
import smtplib
import ssl
import time
from collections import defaultdict, deque
from email.message import EmailMessage
from email.utils import formataddr
from typing import Deque, Dict, Optional

from fastapi import FastAPI, HTTPException, Request
from fastapi.concurrency import run_in_threadpool
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field, field_validator

try:  # optional: handy locally, unnecessary once the host injects real env vars
    from dotenv import load_dotenv

    load_dotenv()
except ModuleNotFoundError:  # pragma: no cover
    pass


log = logging.getLogger("dilp.enquiry")

# --------------------------------------------------------------------------- config

SMTP_HOST = os.getenv("SMTP_HOST", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
# starttls (587, the usual choice) | ssl (465) | none (a local relay)
SMTP_SECURITY = os.getenv("SMTP_SECURITY", "starttls").lower()

# The envelope sender has to be an address the SMTP account may send as.
MAIL_FROM = os.getenv("MAIL_FROM", SMTP_USER)
MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME", "DILP website")
MAIL_TO = os.getenv("MAIL_TO", "partnerships@cedarsprohub.com")

ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()
]

# Per-IP cap. Deliberately small: a real person sends one of these.
RATE_LIMIT_MAX = int(os.getenv("RATE_LIMIT_MAX", "5"))
RATE_LIMIT_WINDOW_SECONDS = int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "3600"))


def _config_problems() -> list[str]:
    missing = []
    if not SMTP_HOST:
        missing.append("SMTP_HOST")
    if not MAIL_FROM:
        missing.append("MAIL_FROM (or SMTP_USER)")
    if not MAIL_TO:
        missing.append("MAIL_TO")
    if SMTP_SECURITY not in {"starttls", "ssl", "none"}:
        missing.append("SMTP_SECURITY must be starttls, ssl or none")
    return missing


# --------------------------------------------------------------------------- app

app = FastAPI(title="DILP enquiries", docs_url=None, redoc_url=None)

app.add_middleware(
    CORSMiddleware,
    # No wildcard: only the sites that are meant to post here.
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


def _one_line(value: str) -> str:
    """Collapse newlines so a value can never inject an extra mail header."""
    return " ".join(value.replace("\r", " ").replace("\n", " ").split())


class DonationEnquiry(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    organisation: Optional[str] = Field(default=None, max_length=160)
    contribution: Optional[str] = Field(default=None, max_length=80)
    amount: Optional[str] = Field(default=None, max_length=120)
    message: Optional[str] = Field(default=None, max_length=4000)
    # Hidden in the form and kept empty by people; bots fill it in.
    website: Optional[str] = Field(default=None, max_length=200)

    @field_validator("name", "organisation", "contribution", "amount")
    @classmethod
    def _single_line(cls, v: Optional[str]) -> Optional[str]:
        return _one_line(v) if v else v

    @field_validator("message")
    @classmethod
    def _trim(cls, v: Optional[str]) -> Optional[str]:
        return v.strip() if v else v


_hits: Dict[str, Deque[float]] = defaultdict(deque)


def _rate_limited(ip: str) -> bool:
    now = time.monotonic()
    seen = _hits[ip]
    while seen and now - seen[0] > RATE_LIMIT_WINDOW_SECONDS:
        seen.popleft()
    if len(seen) >= RATE_LIMIT_MAX:
        return True
    seen.append(now)
    return False


def _client_ip(request: Request) -> str:
    # Hosts put the real address in X-Forwarded-For; take the first hop.
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _build_message(enquiry: DonationEnquiry) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = f"Donation enquiry from {enquiry.name}"
    msg["From"] = formataddr((MAIL_FROM_NAME, MAIL_FROM))
    msg["To"] = MAIL_TO
    # Replying in the mail client goes straight back to the enquirer.
    msg["Reply-To"] = formataddr((enquiry.name, str(enquiry.email)))

    body = "\n".join(
        [
            "A donation enquiry came in from the DILP website.",
            "",
            f"Name:         {enquiry.name}",
            f"Email:        {enquiry.email}",
            f"Organisation: {enquiry.organisation or '-'}",
            f"Contribution: {enquiry.contribution or '-'}",
            f"Proposed:     {enquiry.amount or '-'}",
            "",
            "Message:",
            enquiry.message or "(none)",
        ]
    )
    msg.set_content(body)
    return msg


def _send(msg: EmailMessage) -> None:
    context = ssl.create_default_context()
    if SMTP_SECURITY == "ssl":
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=20) as server:
            if SMTP_USER:
                server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
        return

    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=20) as server:
        server.ehlo()
        if SMTP_SECURITY == "starttls":
            server.starttls(context=context)
            server.ehlo()
        if SMTP_USER:
            server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(msg)


@app.get("/healthz")
def healthz() -> dict:
    """Says whether the service could actually send, without leaking values."""
    problems = _config_problems()
    return {"ok": not problems, "missing": problems}


@app.post("/api/donation-enquiry")
async def donation_enquiry(enquiry: DonationEnquiry, request: Request) -> dict:
    # Quietly accept the bots so they do not learn anything from the response.
    if enquiry.website:
        log.info("honeypot tripped from %s", _client_ip(request))
        return {"ok": True}

    if _rate_limited(_client_ip(request)):
        raise HTTPException(
            status_code=429,
            detail="Too many enquiries from this address. Please try again later.",
        )

    problems = _config_problems()
    if problems:
        log.error("mail is not configured: %s", ", ".join(problems))
        raise HTTPException(status_code=500, detail="Mail is not configured on the server.")

    try:
        await run_in_threadpool(_send, _build_message(enquiry))
    except Exception:
        # The reason belongs in the server log, not in the browser.
        log.exception("could not send the enquiry")
        raise HTTPException(status_code=502, detail="The enquiry could not be sent.")

    return {"ok": True}

# Donation enquiry service

The DILP site is static. This is the one piece that needs a server: it
receives the enquiry form, emails it to **partnerships@cedarsprohub.com**, and
answers the page with ok or not-ok.

Before this existed the form opened the visitor's mail client and hoped they
pressed send. Now the message leaves the server, so nothing depends on the
visitor having mail set up.

## Files

| File | Why |
| --- | --- |
| `api/_service.py` | All the logic. The leading underscore keeps the host from routing it |
| `api/donation-enquiry.py` | Becomes `/api/donation-enquiry` |
| `api/healthz.py` | Becomes `/api/healthz` |
| `requirements.txt` | At the **project root**, which is where the build looks for it |

One file per route is what file-based hosts such as Vercel expect: the URL
comes from the filename, not from the paths declared inside the app. The
handlers are also registered on a few path variants, so it works whether the
host hands the app the full path or one stripped of the function's prefix.

## What it does

`POST /api/donation-enquiry` with JSON:

```json
{
  "name": "Ada Obi",
  "email": "ada@example.com",
  "organisation": "",
  "contribution": "Financial support",
  "amount": "",
  "message": "Happy to support a place.",
  "website": ""
}
```

Replies `{"ok": true}`, or an error with a `detail` the page turns into a
readable message. `GET /api/healthz` reports whether the mail settings are
complete, without printing any of them.

`website` is a honeypot. It is hidden from people and left empty; when a bot
fills it in the request is accepted and discarded so the bot learns nothing.

Other protections: five enquiries per IP per hour, a cap on every field's
length, newlines stripped from anything that becomes a mail header, and CORS
limited to the origins you list. `Reply-To` is set to the enquirer, so
replying in the mailbox goes straight back to them.

## Run it locally

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp api/.env.example api/.env     # then fill it in
uvicorn api._service:app --reload --port 8000
```

Check it came up:

```bash
curl http://localhost:8000/healthz
```

`{"ok": true, "missing": []}` means it can send. Anything in `missing` is an
environment variable still to set.

To try the real form against it, point `ENQUIRY_ENDPOINT` in
`tools/chrome.mjs` at `http://localhost:8000/api/donation-enquiry` and
rebuild. Add `http://localhost:4323` to `ALLOWED_ORIGINS` or the browser will
block the request.

## Settings

All of it comes from the environment. See `.env.example`.

| Variable | What it is |
| --- | --- |
| `MAIL_TO` | Where enquiries land. Defaults to partnerships@cedarsprohub.com |
| `MAIL_FROM` | The address the service sends **as**. Must be one your SMTP account may use |
| `MAIL_FROM_NAME` | Display name on the message |
| `SMTP_HOST` / `SMTP_PORT` | Your mail provider's server |
| `SMTP_SECURITY` | `starttls` (port 587), `ssl` (465), or `none` |
| `SMTP_USER` / `SMTP_PASSWORD` | The mailbox credentials |
| `SMTP_TIMEOUT` | Seconds before giving up. Default 8 |
| `ALLOWED_ORIGINS` | Comma-separated sites allowed to post here |
| `RATE_LIMIT_MAX` | Enquiries per IP per window (default 5) |
| `RATE_LIMIT_WINDOW_SECONDS` | The window (default 3600) |

### Getting SMTP credentials

- **Google Workspace** — `smtp.gmail.com`, port 587, `starttls`. Turn on
  2-step verification for the sending account, then create an **App Password**
  and use that as `SMTP_PASSWORD`. An ordinary account password is rejected.
- **Microsoft 365** — `smtp.office365.com`, port 587, `starttls`. SMTP AUTH
  has to be enabled for the mailbox in the admin centre.
- **Zoho** — `smtp.zoho.com`, port 465, `ssl`.

Send **from** a mailbox on your own domain, not from a Gmail address. Mail
claiming to come from a domain it was not sent by usually lands in spam.

## Deploying on Vercel

Vercel turns each `api/*.py` file into a function by filename, so there is no
start command and no `vercel.json` to write. Two things have to be right:

1. **The project root must be this folder** — the one holding `index.html`,
   `api/` and `requirements.txt`. If the Vercel project points at the
   repository root instead, set *Settings → General → Root Directory* to
   `dilp`. Without that the build never sees `api/`, and every POST is a 404.
2. **The environment variables must be set** in *Settings → Environment
   Variables* for the Production environment, and then **redeployed**. Vercel
   does not apply new variables to a deployment that already exists.

After deploying, open `https://<your-site>/api/healthz` in a browser:

- `{"ok":true,"missing":[]}` — it can send; any failure is SMTP itself
- `{"ok":false,"missing":[...]}` — those variables are still unset
- **404** — the function is not deployed; check the root directory above

`SMTP_TIMEOUT` defaults to 8 seconds to stay inside Vercel's 10-second
function limit on the Hobby plan. A slow mail server would otherwise have the
function killed before SMTP gives up, and the page would show a generic error.

## Deploying on a normal server

```
uvicorn api._service:app --host 0.0.0.0 --port $PORT
```

On Render, Railway or Fly: that start command, plus the environment variables
in the dashboard. **Never commit `.env`** — `.gitignore` already excludes it.

## If sending fails

The page shows the partnerships address so nobody is stranded, and the HTTP
status in brackets. That code says where to look:

| Code | Meaning |
| --- | --- |
| 404 | The function is not deployed at that path. Check the root directory |
| 500 | Deployed, but the mail settings are incomplete. Check `/api/healthz` |
| 502 | Settings are present but SMTP refused or timed out. Check the log |
| 429 | The per-IP limit. Expected if you are testing repeatedly |

The reason behind a 502 goes to the server log, never to the browser. On
Vercel that is *Deployments → the deployment → Functions → Logs*.

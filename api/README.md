# Donation enquiry service

The DILP site is static. This is the one piece that needs a server: it
receives the enquiry form, emails it to **partnerships@cedarsprohub.com**, and
answers the page with ok or not-ok.

Before this existed the form opened the visitor's mail client and hoped they
pressed send. Now the message leaves the server, so nothing depends on the
visitor having mail set up.

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
readable message. `GET /healthz` reports whether the mail settings are
complete, without printing any of them.

`website` is a honeypot. It is hidden from people and left empty; when a bot
fills it in the request is accepted and discarded so the bot learns nothing.

Other protections: five enquiries per IP per hour, a cap on every field's
length, newlines stripped from anything that becomes a mail header, and CORS
limited to the origins you list. `Reply-To` is set to the enquirer, so
replying in the mailbox goes straight back to them.

## Run it locally

```bash
cd api
python -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # then fill it in
uvicorn app:app --reload --port 8000
```

Check it came up:

```bash
curl http://localhost:8000/healthz
```

`{"ok": true, "missing": []}` means it can send. Anything in `missing` is an
environment variable still to set.

To try the real form against it, serve the site and point the form at this
port by setting `ENQUIRY_ENDPOINT` in `tools/chrome.mjs` to
`http://localhost:8000/api/donation-enquiry`, then rebuild. Add
`http://localhost:4323` to `ALLOWED_ORIGINS` or the browser will block it.

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
| `ALLOWED_ORIGINS` | Comma-separated sites allowed to post here |
| `RATE_LIMIT_MAX` | Enquiries per IP per window (default 5) |
| `RATE_LIMIT_WINDOW_SECONDS` | The window (default 3600) |

### Getting SMTP credentials

- **Google Workspace** — `smtp.gmail.com`, port 587, `starttls`. Turn on
  2-step verification for the sending account, then create an **App Password**
  and use that as `SMTP_PASSWORD`. Your normal password will not work.
- **Microsoft 365** — `smtp.office365.com`, port 587, `starttls`. SMTP AUTH
  has to be enabled for the mailbox in the admin centre.
- **Zoho** — `smtp.zoho.com`, port 465, `ssl`.

Send **from** a mailbox on your own domain, not from a Gmail address. Mail
claiming to be from a domain it was not sent by usually lands in spam.

## Deploying

Any host that runs Python works. The start command is:

```
uvicorn app:app --host 0.0.0.0 --port $PORT
```

On Render, Railway or Fly: point the service at this `api/` directory, use
that start command, and add the environment variables in the dashboard.
**Never commit `.env`** — `.gitignore` here already excludes it.

Then set the live URL in `tools/chrome.mjs`:

```js
export const ENQUIRY_ENDPOINT = 'https://your-api-host/api/donation-enquiry';
```

and run `node tools/build-site.mjs` to rebuild the pages.

If the API ends up behind the same domain as the site (a reverse proxy
forwarding `/api/` to this service), leave the endpoint as the default path
and the browser will not need CORS at all.

## If sending fails

The page tells the visitor the enquiry could not be sent and shows the
partnerships address so they can still get through. The reason goes to the
server log, never to the browser. Check the log and `/healthz` first.

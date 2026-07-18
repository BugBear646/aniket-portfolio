# Aniket Kumar Jha — Portfolio

Single-page, scroll-based portfolio. React + Vite + Tailwind + Framer Motion,
with a serverless contact form (Vercel Function + Resend).

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Before you deploy — fill in these placeholders

All content lives in **one file**: `src/data.js`. Edit there, not in components.

| What | Where | Field |
|---|---|---|
| Email address | `src/data.js` | `profile.email` |
| Resume file | put your PDF at `public/resume.pdf` (create the file) | `profile.resumeUrl` already points to `/resume.pdf` |
| LinkedIn URL | `src/data.js` | `profile.socials.linkedin` |
| GitHub URL | `src/data.js` | `profile.socials.github` |
| Twitter/X URL | `src/data.js` | `profile.socials.twitter` — leave `""` to hide the icon entirely |

Also double check the `projects`, `experience`, and `skills` objects in
`src/data.js` — I filled these from what I know about your background, but
you know it better. Edit freely; the components will pick up any changes
automatically.

## Contact form setup (so messages actually reach you)

The form posts to `/api/contact`, a Vercel serverless function that sends
mail via [Resend](https://resend.com) (free tier: 3,000 emails/month).

1. Create a free Resend account.
2. Get an API key from the Resend dashboard.
3. In your Vercel project → **Settings → Environment Variables**, add:
   - `RESEND_API_KEY` — your Resend API key
   - `CONTACT_TO_EMAIL` — the email address you want submissions sent to
4. That's it — no other backend, no database.

Until you verify your own sending domain in Resend, emails send from
`onboarding@resend.dev` (Resend's shared sandbox address) — this works fine,
it just shows that address as the sender. Verify your own domain in Resend
later if you want mail to come from `you@yourdomain.com`.

## Deploying

**Recommended: Vercel** (free tier covers this comfortably)

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com) → New Project → import the repo.
3. Vercel auto-detects Vite — no config needed. It will also auto-detect
   the `/api/contact.js` function.
4. Add the two environment variables from above before or after first deploy.
5. Deploy. You'll get a `.vercel.app` URL immediately.

**Custom domain**

1. Buy a domain (Namecheap, Porkbun, Google Domains — roughly $10–15/year
   for a `.com`).
2. In Vercel: Project → Settings → Domains → add your domain.
3. Update your DNS records as Vercel instructs (usually one A record or
   CNAME). Propagates within a few hours, SSL is automatic and free.

**Total ongoing cost: ~$12/year (just the domain).** Hosting, SSL, and the
contact-form email sending are all free at this scale.

## Project structure

```
src/
  data.js              ← all content (edit this)
  App.jsx              ← assembles sections
  components/
    Nav.jsx            ← sticky nav, active-section highlighting
    Hero.jsx
    About.jsx
    Projects.jsx       ← expandable project cards
    Experience.jsx     ← timeline
    Skills.jsx
    Contact.jsx        ← form + socials
    SignalTrace.jsx    ← the signature animated waveform element
api/
  contact.js           ← Vercel serverless function, handles form submits
```

## Design notes

The visual language is drawn from your actual domain — voice/telephony
infrastructure — rather than generic "dev portfolio" tropes:

- **Signal trace**: the animated waveform line (`SignalTrace.jsx`) that
  appears in the hero and as section dividers is a nod to call traces /
  oscilloscope readouts, reused as the page's signature element.
- **Color**: dark slate base, amber accent (evokes old telephony/instrument
  panel displays), teal for secondary/data accents.
- **Type**: JetBrains Mono at display sizes (not just for tiny labels) paired
  with Inter for body copy — mono is doing more work than usual here, on
  purpose, since it's the whole "developer PM" signal.

## Adding the chatbot later ("group pilot")

The structure intentionally leaves room for this. When ready:
1. Add a new component, e.g. `src/components/Chat.jsx`.
2. Add a new serverless function `api/chat.js` that calls the Anthropic API
   (same pattern as `api/contact.js` — env var for the API key, no secrets
   in frontend code).
3. Drop `<Chat />` into `App.jsx` wherever you want it (a floating widget in
   the corner is the common pattern, but a dedicated section works too).

No restructuring of the existing sections needed.

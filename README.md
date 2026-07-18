# Aniket Kumar Jha - Portfolio

A single-page, scroll-based site built the way I'd want a PM's portfolio to
work: fast, no bloat, and every visual choice tied back to something real
about the job, not stock gradients and a generic "hi, I'm a product
manager" template.

React + Vite + Tailwind + Framer Motion on the frontend, one small Vercel
serverless function for the contact form. No database, no CMS, no
over-engineering. Content lives in a single data file so it's editable
without touching components.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Before you deploy - a few placeholders to fill in

Everything content-related lives in **one file**: `src/data.js`. Don't go
hunting through components; if it's text on the page, it's in there.

| What | Where | Field |
|---|---|---|
| Email address | `src/data.js` | `profile.email` |
| Resume file | drop your PDF at `public/resume.pdf` | `profile.resumeUrl` already points to `/resume.pdf` |
| LinkedIn URL | `src/data.js` | `profile.socials.linkedin` |
| GitHub URL | `src/data.js` | `profile.socials.github` |
| Twitter/X URL | `src/data.js` | `profile.socials.twitter`, leave `""` to hide the icon entirely |

Also worth a pass: the `projects`, `experience`, and `skills` objects in
`src/data.js` were filled in from what's on record, but you're the source
of truth on your own career. Edit freely, nothing else needs to change
when you do.

## Contact form setup (so messages actually reach you)

The form posts to `/api/contact`, a Vercel serverless function that sends
mail via [Resend](https://resend.com) (free tier: 3,000 emails/month).

1. Create a free Resend account.
2. Get an API key from the Resend dashboard.
3. In your Vercel project, go to **Settings > Environment Variables**, add:
   - `RESEND_API_KEY` - your Resend API key
   - `CONTACT_TO_EMAIL` - the email address you want submissions sent to
4. That's it, no other backend, no database.

Until you verify your own sending domain in Resend, emails send from
`onboarding@resend.dev` (Resend's shared sandbox address). This works fine,
it just shows that address as the sender. Verify your own domain in Resend
later if you want mail to come from `you@yourdomain.com`.

## Deploying

**Recommended: Vercel** (free tier covers this comfortably)

1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), New Project, import the repo.
3. Vercel auto-detects Vite, no config needed. It will also auto-detect
   the `/api/contact.js` function.
4. Add the two environment variables from above before or after first deploy.
5. Deploy. You'll get a `.vercel.app` URL immediately.

**Custom domain**

1. Buy a domain (Namecheap, Porkbun, Google Domains, roughly $10-15/year
   for a `.com`).
2. In Vercel: Project > Settings > Domains > add your domain.
3. Update your DNS records as Vercel instructs (usually one A record or
   CNAME). Propagates within a few hours, SSL is automatic and free.

**Total ongoing cost: ~$12/year (just the domain).** Hosting, SSL, and the
contact-form email sending are all free at this scale.

## Project structure

```
src/
  data.js              <- all content (edit this)
  App.jsx              <- assembles sections
  components/
    Nav.jsx            <- sticky nav, active-section highlighting
    Hero.jsx
    About.jsx
    Projects.jsx       <- expandable project cards
    Experience.jsx     <- timeline
    Skills.jsx
    Contact.jsx        <- form + socials
    SignalTrace.jsx    <- the signature animated waveform element
    CursorGlow.jsx     <- soft light that trails the cursor site-wide
    ThemeToggle.jsx    <- dark/light switch in the nav
api/
  contact.js           <- Vercel serverless function, handles form submits
```

## Design notes

The visual language comes from the actual domain, voice/telephony
infrastructure, instead of the usual "dev portfolio" gradients-and-blobs
playbook:

- **Signal trace**: the animated waveform line (`SignalTrace.jsx`) in the
  hero and as section dividers nods to call traces / oscilloscope readouts.
  It's the page's one signature motif, reused rather than repeated with
  variations, so it actually reads as intentional.
- **Cursor glow**: a faint amber light trails the pointer across the whole
  page (`CursorGlow.jsx`). It's deliberately understated: low opacity,
  screen blend mode, a slight lag so it feels alive rather than snappy.
  Off entirely on touch devices and when a visitor has reduced-motion
  turned on, so it never gets in the way.
- **Color**: dark slate base, amber accent (instrument-panel, old-telephony
  feel), teal held back for secondary/data accents only.
- **Type**: JetBrains Mono at display sizes, not just tucked into labels,
  paired with Inter for body copy. Mono's doing more visual work than usual
  here on purpose, it's the whole "developer PM" signal, made structural
  instead of decorative.

## Adding the chatbot later ("group pilot")

The structure intentionally leaves room for this. When ready:
1. Add a new component, e.g. `src/components/Chat.jsx`.
2. Add a new serverless function `api/chat.js` that calls the Anthropic API
   (same pattern as `api/contact.js`, env var for the API key, no secrets
   in frontend code).
3. Drop `<Chat />` into `App.jsx` wherever you want it (a floating widget in
   the corner is the common pattern, but a dedicated section works too).

No restructuring of the existing sections needed.
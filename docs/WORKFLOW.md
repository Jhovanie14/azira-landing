# Clinic Landing Page Workflow

Boost My Customers · how to build a paid-ads landing page with Claude, step by step.
Built for Azira Aesthetics; reuse it for every clinic.

> **The source files in `docs/`**
> - `FRAMEWORK.md`: the framework rules (14 blocks, fields, Always / Never / We measure). The source of truth.
> - `framework.pdf`: the wireframe (visual layout, desktop and mobile).
> - `CONTENT-MODEL.md`: every content field one concern page needs (written in Step 2).
> - `azira-answers.md`: the client's answers (from the questions at the end of this file).

**The idea:** build a reusable clinic template once (Steps 1–4), then brand it and fill in the content for each clinic (Steps 3b, 5), then deploy it to the clinic's subdomain (Step 6). One chat per step. Plan first, then build, then run lint and typecheck.

---

## Step 1. Set up the project

```bash
npx create-next-app@latest <project-name>
cd <project-name>
npx shadcn@latest init
mkdir docs
```

- Save the wireframe PDF as `docs/framework.pdf` and the framework Markdown as `docs/FRAMEWORK.md`.
- Install the skills: `npx skills add nextlevelbuilder/ui-ux-pro-max-skill` and `npx skills add shadcn/ui`, plus `impeccable`.
- Run `/init` in Claude.

---

## Step 2. Framework rules and content model (once, reused for every clinic)

Don't include the clinic's website here: this step stays brand-neutral.

```
Read docs/FRAMEWORK.md (the source of truth for every block, field and
rule) and docs/framework.pdf (the visual layout for desktop and mobile).
Don't write code and don't rewrite FRAMEWORK.md. Write:

1. A "Landing page rules" section in CLAUDE.md: follow FRAMEWORK.md block
   by block; no site menu; no discounts or countdowns; no stock photos;
   every Book/Call button returns to the form at the top; under 2 s load;
   before/after only consented, never for prescription-only treatments,
   and hideable for Meta traffic; every enquiry tagged with its ad
   (gclid, fbclid, utm source/campaign/keyword, landing page).
2. docs/CONTENT-MODEL.md: every content field one concern page needs,
   with counts from the framework (4 credentials, 5 trust logos, 4 cause
   cards, max 2 treatments, 3 good-fit points, 3 clinician tags, 3 results,
   4 steps, 4–6 FAQs), headline variants per ad group, phone, address.
3. A list of every question I need to ask the clinic to fill CONTENT-MODEL.md.
```

---

## Step 3. Build the template (content as data, not hard-coded)

```
Use impeccable + ui-ux-pro-max (search "clinic landing page", "lead form",
--stack nextjs, --stack shadcn). Read docs/FRAMEWORK.md, docs/CONTENT-MODEL.md
and CLAUDE.md. Build the template:

- One reusable component per block in components/blocks/ (SlimHeader, Hero,
  EnquiryForm, CredentialRow, TrustStrip, CauseCards, TreatmentOptions,
  WhoItSuits, Clinician, Results, NextSteps, Faqs, ClosingAsk, MobileActionBar)
- Content lives in content/<clinic>/<concern>.ts, typed with a Zod schema,
  so a new clinic means new content files only
- Route /[concern] renders one concern page, statically generated
- Headline variant picked from ?h=<ad-group> (fallback to the default)
- Use shadcn for button, input, select, radio-group, accordion (FAQ), field.
  Never hand-build what shadcn provides
- All colours, fonts and radius come from theme tokens in app/globals.css
  and content/<clinic>/brand.ts, so each clinic can be re-branded without
  touching components
- Start with placeholder content and images clearly marked
- Mobile first; fixed Call / Book bar on mobile; under 2 s load

Motion: use CSS transitions for hover and focus, and motion/react with
LazyMotion + domAnimation only for: section fade-up on scroll (once,
12px, ~400ms), mobile action bar slide-in, scroll-to-form highlight, and
form success state. Never animate the hero headline, hero image or form
on load (LCP must stay fast). Respect prefers-reduced-motion. No Three.js,
no parallax, no video backgrounds. Keep total JS small.

Then harden, critique, polish, lint and typecheck.
```

### Why Motion and not Three.js
The framework requires the page to load in under 2 seconds, mostly on phones from Meta ads. Motion is small and gives calm, premium fades. Three.js adds 150 KB+ before any 3D content, slows the first screen and pulls attention away from the form.

---

## Step 3b. Brand it for the clinic (once per clinic)

```
Use impeccable extract. Here is the clinic's main website: <https://...>
Look at it and pull out the brand only: logo, colour palette, fonts (or
the closest Google Font), button style, corner radius, photo style and
tone of voice. Save them to content/<clinic>/brand.ts and the theme tokens.

Keep our framework rules from CLAUDE.md: do NOT copy their site menu,
layout, discounts or stock images. The landing page should feel like the
same brand when someone arrives from an ad, but follow our framework.
Check text contrast meets WCAG AA with their colours; adjust if not.
```

- If Claude can't load the site, save 2–3 screenshots in `docs/brand/` and say "use the screenshots in docs/brand/ instead".
- Ask the client for the logo as SVG or high-res PNG.
- If their site looks dated, say "use only the logo and colours; take the rest from the framework".

---

## Step 4. Make the form work and add tracking

Ask the client where leads go first (question 3 below).

```
Make the enquiry form work:
- One Zod schema shared by the form and a Server Action
- Six fields: name, mobile, email, concern, treated before?, when to start?
- Hidden fields captured from the URL and kept for the visit: gclid,
  fbclid, utm_source/medium/campaign/term/content, landing page
- On submit: send the lead to <email via Resend / Google Sheet / clinic CRM>,
  show a thank-you state on the page (no redirect off-site)
- Meta Pixel from NEXT_PUBLIC_META_PIXEL_ID (never hard-coded): PageView,
  and Lead on a successful submit; loads only after cookie consent (UK)
- Meta domain-verification meta tag from an env var
- Hide the Results block when utm_source is facebook/instagram if the
  page's content says so
- Tell me how to test with Meta Pixel Helper and Events Manager → Test events
```

---

## Step 5. Fill in the clinic's content

```
Create content/<clinic>/<concern>.ts for each concern the clinic is
advertising, using the answers in docs/<clinic>-answers.md. Mark anything
missing as TODO and list it for me so I can ask the client.
```

When the assets arrive:

```
Assets are in public/assets/<clinic>/. Replace every placeholder, optimise
images with next/image, and re-run polish.
```

---

## Step 6. Deploy and connect the subdomain

1. Push the project to GitHub, then **Vercel → Add New Project → Import**.
2. **Vercel → Project → Settings → Environment Variables:** add `NEXT_PUBLIC_META_PIXEL_ID` (and the lead destination keys).
3. **Vercel → Project → Settings → Domains:** add the subdomain, e.g. `offer.aziraaesthetics.com`.
4. Vercel shows a **CNAME** record. Send it to whoever manages the clinic's DNS:
   - **Type:** CNAME
   - **Name:** `offer`
   - **Value:** the target Vercel shows
5. Wait for **Valid Configuration** in Vercel. HTTPS is automatic. The clinic's main website is untouched.
6. **Meta Business Manager:** verify the domain, then confirm PageView and Lead fire in Events Manager → Test events.

### Launch checklist
- [ ] Every concern page loads in under 2 s on mobile (check with PageSpeed Insights)
- [ ] Book and Call buttons all go to the form at the top; the phone link dials
- [ ] A test enquiry arrives with its gclid / utm / page fields filled
- [ ] Pixel: PageView after consent only, Lead on submit
- [ ] No menu, no discounts or countdowns, no stock photos
- [ ] Before/after only consented, never for prescription-only treatments
- [ ] Privacy policy linked from the form and the cookie banner

### Next clinic
Copy the repo (or mark it as a GitHub template), run Step 3b with the new clinic's website, add `content/<new-clinic>/`, and deploy to their subdomain. Steps 1–4 are already done.

---

## Questions to ask the clinic

1. **Concerns:** which concerns or treatments are the ads for? (one page each)
2. **Ad groups or keywords** for each concern, so the headlines can match them
3. **Leads:** where should enquiries go (email, Google Sheet, booking system), and who calls them back?
4. **Phone number and clinic address**
5. **Credentials and trust:** qualifications, years in practice, awards, press, Google review rating
6. **Treatments** for each concern (2 at most): sessions, downtime, results, who it's for, "from" price
7. **Who it's not for:** when do they say no?
8. **Clinician:** name, qualifications, role, years, a portrait, and their philosophy in their own words
9. **Results:** consented, unretouched before/after photos with captions, if any
10. **Their consultation process:** the 4 steps from enquiry to decision
11. **FAQs:** the questions they hear on every call
12. **Own photography:** a hero treatment shot and clinic photos (no stock photos)
13. **Tracking access:** the Meta Pixel ID, Business Manager access, and a Google Ads conversion ID if they run Google ads too
14. **Domain:** who manages DNS, and which subdomain to use
15. **Privacy policy** link

## Compliance note for the client
UK aesthetics ads have strict rules. **Botox and other prescription-only injectables can't be advertised to the public by name**, and before/after photos and claims are restricted by the ASA and Meta's ad policies. For injectables, use wording like "anti-wrinkle consultation" and check the copy with the clinic before the ads go live.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev         # next dev
npm run build       # next build (also validates all content against the Zod schema)
npm run lint        # eslint (flat config, eslint.config.mjs)
npm run typecheck   # tsc --noEmit (run `npx next typegen` first if route types are stale)
npm run format      # prettier --write on all .ts/.tsx
npx shadcn@latest add <component>   # adds to components/ui
```

There is no test framework set up. Verify changes with `typecheck`, `lint`, and `build`.

## What this is

A template for clinic landing pages for paid ads. One deployment serves one clinic, and each concern (skin laxity, and so on) gets its own statically generated page. The first clinic is Azira Aesthetics. **A new clinic must need new content files only, never component changes.**

## Stack

Next.js 16.4 (App Router), React 19.3, TypeScript, Tailwind CSS v4, shadcn/ui, Zod 4, Motion. Per AGENTS.md, check `node_modules/next/dist/docs/` before using Next APIs from memory. Note that `middleware` is now `proxy.ts`.

- **shadcn style is `base-rhea`**: components are built on `@base-ui/react`, not Radix, so don't assume Radix patterns like `asChild`; links use `render={<a …/>}` with `nativeButton={false}`. Use shadcn for button, input, select, radio-group, accordion, field, alert and dialog. Never hand-build what shadcn provides: the radio options use shadcn's choice-card pattern (`FieldLabel` wrapping `Field`).
- **The shadcn components in `components/ui/` are restyled to the brand** (button `cta`/`inverse`/`outline-inverse` variants, square inputs, plus/minus accordion). Re-adding one with `shadcn add --overwrite` loses that.
- **`cn` comes from the `cn` npm package** (clsx plus tailwind-merge), re-exported by `lib/utils.ts`. Because it merges, className overrides on shadcn parts are safe.
- `@/*` maps to the repo root.

## Architecture

- **Content (`content/`)**: `schema.ts` holds the Zod schemas and all content types. Each clinic has a folder, for example `content/azira/`, containing:
  - `brand.ts`: colours, radius, button label style, font names, photo style, voice
  - `fonts.ts`: the `next/font` loaders, kept apart so the proxy never loads fonts
  - `clinic.ts`: phone, address, credentials, consultation fee, callback promise, awards, clinicians, privacy notice
  - one file per concern
  - `index.ts`: bundles them

  `content/index.ts` picks the active clinic from the `CLINIC` env var (default `azira`), parses it at import (bad content fails the build), and exports `site`, `getConcern`, `getVariant` and `concernSlugs`. `content/fonts.ts` is the matching registry for fonts.
- **Theme**: `app/globals.css` maps the shadcn and landing-page tokens (`copy`, `hairline`, `room`, `mark`, `mark-ink`, `plate`) onto `--brand-*` variables. `app/layout.tsx` injects those variables on `<html>` from the active `brand.ts` (via `lib/brand-style.ts`), together with the font variables. Components use tokens only: no hex values, no fonts, no radii.
- **Contrast is enforced**: `brandColoursSchema` checks the key colour pairs against WCAG AA for the brand and every palette, and the build fails if any don't pass.
- **Colour review (preview builds only)**: with `NEXT_PUBLIC_PALETTE_PREVIEW=1`, a "Colours" panel lets the client switch between the palettes in `content/<clinic>/palettes.ts` and copy a `?palette=<id>` link back to us. A head script applies the choice before first paint. Without the flag, `next.config.ts` aliases `@palette/panel` to an empty stub and the layout renders no script, so production ships none of it. Once the client chooses, copy that palette's colours into `brand.colours` and delete the palettes file, `components/palette/`, `lib/palette-review.ts` and the alias.
- **Routing**:
  - `app/[concern]/page.tsx` is the default page.
  - `app/[concern]/v/[headline]/[audience]/page.tsx` holds the prebuilt variants.
  - Both use `generateStaticParams` with `dynamicParams = false`.
  - `proxy.ts` rewrites `/<concern>?h=<ad group>` (and Meta traffic, when a page sets `hideResultsForMeta`) to the matching variant. The visitor's URL is unchanged, and the matched headline is static HTML, not a client-side swap.
  - The proxy also redirects `/` to the first concern.
  - `app/[concern]/layout.tsx` holds the header and the Motion provider.
- **Blocks**: one component per framework block lives in `components/blocks/`: SlimHeader, Hero, EnquiryForm, CredentialRow, TrustStrip, CauseCards, TreatmentOptions, WhoItSuits, Clinician, Results, NextSteps, Faqs, ClosingAsk and MobileActionBar. `components/concern-page.tsx` composes them in framework order. The hero takes the credentials and the form as slots, because on desktop the form is the third column of the first screen.
- **Images are `ImageAsset` slots**: `components/plate.tsx` renders a marked placeholder showing the expected `public/assets/<id>.jpg` path until the slot gets a `src`, then switches to `next/image`. `caption` becomes the gallery wall label under the plate. The logo works the same way through `components/logo.tsx`. `grep -r data-placeholder` finds any slot still waiting.
- **Enquiries** (setup and testing in `docs/TRACKING.md`):
  - One Zod schema, `lib/enquiry-schema.ts`, is shared by the form and the Server Action in `app/actions.ts`. The form loads it on demand (on first focus, awaited on submit) to keep it off the first load; don't import it statically in client code.
  - Browser-safe types and helpers are in `lib/enquiry-values.ts`.
  - Tracking (GCLID, fbclid, UTMs, landing page) is captured on arrival and kept for the visit in sessionStorage (`lib/tracking.ts`), then sent with the form along with `?h=` and the page.
  - Leads go to the destinations in `LEAD_DESTINATIONS` (`lib/leads/`): `email` (Resend, with a per-lead idempotency key) and `webhook` (one flat JSON record for a Google Sheet via Apps Script, a GoHighLevel inbound webhook, or Zapier/Make). Failures are logged by lead ID, never with personal details. In production with no destination configured, the visitor is told to call rather than the lead being dropped.
  - There's a honeypot field, and answers are kept as a sessionStorage draft so an in-app browser reload doesn't lose them.
- **Consent and Meta**:
  - `components/consent.tsx` is a first-party banner: equal Reject and Accept, a choice stored for about six months, and "Cookie settings" in the footer to change it.
  - `components/meta-pixel.tsx` loads the Pixel from `NEXT_PUBLIC_META_PIXEL_ID` only after Accept. It sends PageView on load, and Lead on a successful enquiry with the lead ID as `eventID`.
  - `META_DOMAIN_VERIFICATION` adds the domain-verification meta tag.
  - Environment variables are listed in `.env.example`.
- **Before/after rules are enforced in code**: a real photo result must carry `consentConfirmed: true` or the content won't parse. Results for `prescriptionOnly` treatments are dropped. The block hides when `showResults` is off, or for Meta traffic when `hideResultsForMeta` is on.
- **Motion** uses `motion/react` with `LazyMotion`, and its features are loaded asynchronously from `components/motion-features.ts`. Import `m` from `motion/react-m`; `strict` mode forbids `motion.*`. Motion is used only for:
  - `FadeUp` section reveals: once, 12px, about 400ms
  - the mobile action bar slide-in
  - the scroll-to-form highlight
  - the form success swap

  Never animate the hero headline, hero image or form on load (LCP). `MotionConfig reducedMotion="user"` respects reduced motion. No Three.js, no parallax, no video backgrounds.
- **Draft copy and placeholders**: bracketed values (`[price]`, `[Clinician name]`, `[Consultation fee…]`) are facts the clinic hasn't supplied. Never replace them with invented ones.

### Adding things

- **A concern**: add `content/<clinic>/<concern>.ts` (typed `satisfies ConcernPageInput`) and list it in `content/<clinic>/index.ts`. Routes and variants are generated automatically.
- **A clinic**: copy a clinic folder, edit its files, add one line to the registries in `content/index.ts` and `content/fonts.ts`, and deploy with `CLINIC=<id>`. Take only the brand from the clinic's own site: never their menu, layout, discounts or stock images.
- **Real assets**: put files in `public/assets/<clinic>/` and set `src: "/assets/<clinic>/<file>"` on the matching `ImageAsset`. `docs/<clinic>-answers.md` lists the expected files.

## Code style

Prettier (`.prettierrc`): no semicolons, double quotes, trailing commas `es5`, LF line endings. `prettier-plugin-tailwindcss` sorts classes, including inside `cn()` and `cva()`.

## Landing page rules

Each page is a paid-ads landing page for one concern, built to turn a click into a qualified enquiry. Read these before building or changing blocks:

- `docs/FRAMEWORK.md`: the 14 blocks in order, desktop and mobile, and why each one converts (from `docs/framework.pdf`).
- `docs/CONTENT-MODEL.md`: the content fields one concern page needs.

Hard rules. Don't break these, even if asked for something that seems to need it; flag the conflict instead.

- **No site menu.** The header is the logo and phone number only.
- **No discounts or countdown timers.**
- **No stock photos.** Use the clinic's own photography only.
- **Every Book button scrolls to the enquiry form at the top; every Call button dials the clinic (`tel:`).** No button links to another page or a separate contact page.
- **The page loads in under 2 seconds.** Keep pages static and JS small.
- **Before/after photos must be consented, unretouched and captioned, and are never shown for prescription-only treatments.** They appear on the page only, never in ads.
- **Before/after can be switched off per page, or just for Meta traffic.**
- **Every enquiry carries its tracking.** The form submits GCLID, UTM, fbclid, ad group and page.

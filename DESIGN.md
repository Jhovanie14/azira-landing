---
name: Azira Aesthetics concern pages
description: A gallery wall of the clinic's own gloved-hand stills, captioned, with the copy hung beside them like wall text. Multi-clinic template; Azira is the current brand instance.
colors:
  surface: "#ffffff"
  ink: "#050505"
  text: "#444444"
  panel: "#f4f4f3"
  hairline: "#c1c1c1"
  line: "#444444"
  room: "#141414"
  room-ink: "#ffffff"
  room-text: "#c1c1c1"
  accent: "#af8f43"
  accent-ink: "#7a6330"
  destructive: "#b3261e"
typography:
  display:
    fontFamily: "Quicksand, ui-sans-serif, sans-serif"
    fontSize: "clamp(2.25rem, 2.25rem + 2.5vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Quicksand, ui-sans-serif, sans-serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.12
  title:
    fontFamily: "Quicksand, ui-sans-serif, sans-serif"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1.25
  body-lead:
    fontFamily: "Jost, ui-sans-serif, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Jost, ui-sans-serif, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Jost, ui-sans-serif, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.2em"
  button:
    fontFamily: "Jost, ui-sans-serif, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.16em"
rounded:
  brand: "0rem"
spacing:
  gutter-phone: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "40px"
  grid-gap: "32px"
  section: "80px"
  section-desktop: "128px"
  panel-section-desktop: "112px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.brand}"
    padding: "0 24px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.text}"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.brand}"
    padding: "0 24px"
    height: "56px"
  button-outline-hover:
    backgroundColor: "{colors.panel}"
  button-inverse:
    backgroundColor: "{colors.room-ink}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.brand}"
    padding: "0 24px"
    height: "56px"
  button-inverse-hover:
    backgroundColor: "{colors.panel}"
  button-outline-inverse:
    textColor: "{colors.room-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.brand}"
    padding: "0 24px"
    height: "56px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "0 14px"
    height: "48px"
  form-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.text}"
    padding: "32px"
  choice-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.brand}"
    padding: "8px 12px"
    height: "44px"
---

# Design System: Azira Aesthetics concern pages

## Overview

**Creative North Star: "The Gallery Wall"**

The page is a white gallery wall. The clinic's own photographs (gloved hands, instruments, the treatment room) hang on it as plates. Each plate carries a tracked uppercase wall label, and the copy sits beside the pictures like wall text. A dark photo-backed band opens the page, deep "dark room" bands recur where the framework calls for them, and warm grey panels hold the quiet material: the form, the clinician, the steps. The tone is precise and clinical: hairline rules, square corners, one solid action per band, and a light-weight rounded display face so the precision never turns severe.

This is a multi-clinic template. Each clinic's `content/<clinic>/brand.ts` supplies every value: colours, radius, button label case and tracking, and (through `content/<clinic>/fonts.ts`) the two faces. `lib/brand-style.ts` injects these as `--brand-*` variables on `<html>`, and `app/globals.css` maps them onto semantic tokens. Components use only the semantic tokens, so a new clinic is re-branded without touching a component. The values in the frontmatter are Azira Aesthetics', the current instance. Pages are light only (`color-scheme: light`).

The world was built to avoid the beauty-clinic default of a blush split hero with a smiling model and a row of icon cards. Imagery is never stock (a hard rule in CLAUDE.md). Until the clinic supplies photos, every plate renders a marked placeholder naming the file it needs.

**Key Characteristics:**
- White ground, near-black display type, charcoal body text, 1px rules.
- Three tonal grounds carry all the depth: white surface, warm grey panel, dark room.
- Square corners (Azira's radius is 0) on buttons, inputs, plates and panels.
- Every photograph is a plate with a wall label bound tight beneath it.
- Champagne gold appears only as hairlines, the award mark and gold text.
- Motion is quiet: section fade-ups once, a sliding phone action bar, and two form moments.

## Colors

The palette is achromatic with one restrained warm metal. Each colour token is a role, and the hex is the clinic's value for that role.

### Primary
- **Gallery Black** (`ink`): headings, the solid primary button, focus rings, the selection highlight, the form's checked-choice stroke. Semantic tokens `foreground`, `primary`, `ring`.
- **Charcoal Wall Text** (`text`): body copy (`copy`, `muted-foreground`) and the heavier 1px rule that heads every ledger, list and accordion. Also the primary button's hover fill.

### Secondary
- **Champagne Gold** (`accent`, semantic `mark`): decorative only on light grounds. It is used for the cause axis line and its ticks, the clinician quote rule, the award icon on dark bands, and award text on the room. At 3.0:1 on white it is never used for text on light grounds.
- **Deep Champagne** (`accent-ink`, semantic `mark-ink`): the same hue darkened for text and icons on white: the Surface/Deep axis labels and the award icon on light grounds.

### Neutral
- **Gallery White** (`surface`): page ground, cards, popovers, input fills, the inverse button fill on dark bands.
- **Warm Stone Panel** (`panel`, semantic `muted`/`secondary`/`accent`): the enquiry form card, the "When we say no" panel, the clinician and next-steps bands, and hover fills for outline and inverse buttons.
- **Soft Hairline** (`hairline`, semantic `border`): row dividers inside ledgers, the trust strip's top and bottom rules, and the gap colour of the logo grid.
- **Input Line** (`line`, semantic `input`): input, select and outline-button borders. It must reach 3:1 on surface.
- **Dark Room** (`room`): the hero band, the treatments band and the closing ask. Text inside a room band uses `room-text` (semantic `room-muted`) for body and `room-ink` (semantic `room-foreground`) for headings and actions. Rules inside the room are `room-ink` at 15–40% opacity (40% for the top rule of the credentials row, 25% for the top rule of the treatment spec table, 15–20% for row dividers).
- **Plate grounds (derived, not brand inputs):** `plate` is `room` mixed with 6% white in oklab, used for dark placeholder plates. `plate-light` is `panel` mixed with 6% `text`, used for portrait placeholders. `plate-ink` follows `room-text`.
- **Destructive** (`destructive`): error text, error borders and the error summary outline.

### Brand contract for a new clinic
`content/schema.ts` (`brandSchema`) rejects any brand that fails these WCAG AA pairs, so a clinic cannot ship an illegible palette:

| Foreground | Background | Minimum | Use |
|---|---|---|---|
| text | surface | 4.5:1 | body text |
| ink | surface | 4.5:1 | headings |
| text | panel | 4.5:1 | text on panels |
| surface | ink | 4.5:1 | primary button label |
| accentInk | surface | 4.5:1 | accent text on the page |
| roomText | room | 4.5:1 | text on dark bands |
| roomInk | room | 4.5:1 | headings on dark bands |
| accent | room | 4.5:1 | accent text on dark bands |
| destructive | surface | 4.5:1 | error text |
| line | surface | 3:1 | input borders |

All colours are six-digit hex. Other brand inputs are `radius` (any CSS length; it drives the whole radius scale), `button.textTransform` (`uppercase` or `none`) and `button.letterSpacing`.

### Named Rules
**The Gold-as-Hairline Rule.** The accent is a 1px rule, an award mark or gold text, never a fill, a button or a background. On light grounds, gold text always uses `accent-ink`.

**The Three Grounds Rule.** Every band is one of three grounds: surface, panel or room. A new section picks one of these and never introduces a fourth tint.

## Typography

**Display Font:** Quicksand (loaded as `--font-heading-face`, mapped to `font-heading`)
**Body Font:** Jost (loaded as `--font-body-face`, mapped to `font-sans`), the open substitute for the Futura/Avenir on Azira's own site
**Label Font:** Jost, tracked uppercase

**Character:** The rounded, light Quicksand gives the headlines a soft, approachable voice. Geometric Jost keeps the body and the tracked captions exact. Together they read as calm expertise. Each clinic swaps the faces in `content/<clinic>/fonts.ts`. The role mapping stays fixed: `h1`–`h3` and figures use the heading face, everything else the body face.

### Hierarchy
- **Display** (400, 2.25rem on phones → 3rem → 3.75rem → 4.25rem at xl, line-height 1.1 → 1.05, tracking -0.01em, max 16ch): the hero headline only. The closing ask uses the same voice one step larger (2.5rem → 3.75rem → 4.5rem, line-height 1.08).
- **Headline** (400, 2rem → 2.5rem → 3rem, line-height 1.12): every section `h2`.
- **Title** (400, 1.75rem → 2rem, leading-tight): cause titles, treatment names, the "When we say no" panel, the form title (1.75rem; 1.625rem at lg). The step titles (1.25rem → 1.375rem) and accordion triggers (1.125rem) are the small end.
- **Figures** (heading face, tabular lining numerals): prices at 2.25rem, step numerals at 2.5rem, phone numbers in the body face with `figures`.
- **Body lead** (400, 1.0625rem, line-height 1.625, 44–48ch): section intros. The hero intro steps up to 1.25rem at lg.
- **Body** (400, 1rem, line-height 1.625, 32–48ch in blocks; FAQ answers 65ch).
- **Label / caption** (500, 0.75rem, 0.2em tracking, uppercase): wall labels under plates, credential items, spec-table terms, the "From" before a price, the axis labels.
- **Button** (500, 0.8125rem, brand case and tracking via `brand-label`; Azira: uppercase, 0.16em).

Headings use `text-wrap: balance` and paragraphs use `text-wrap: pretty`.

### Named Rules
**The Light Hand Rule.** Display and headline type stays at the heading face's regular weight (400) at every size. Hierarchy comes from size and space, never from bold.

**The Wall Label Rule.** The tracked caption labels something that is present: a plate, a data term, a price, an axis. It is never a free-floating kicker above a heading.

## Layout

- **Shell:** a centred column up to 1440px (90rem), with gutters of 16px on phones, 24px from 640px and 40px from 1024px.
- **Grid:** desktop sections use a 12-column grid with a 32px gap. The hero uses a 48px column gap. Copy and media split asymmetrically, usually 5/6 or 6/5 with an empty column between (headline columns span 5–7, content starts at column 7 or 8).
- **Section rhythm:** 80px vertical padding on phones and 128px at lg. Panel bands (clinician, next steps) use 112px at lg. The trust strip is compact at 32–40px. Heading-to-content gaps are 48–64px, and paragraph gaps after headings are 20–24px.
- **Breakpoints:** 640 (sm), 768 (md), 1024 (lg), 1280 (xl). The page is mobile first: most traffic is Meta on phones.
- **First viewport:** a full-bleed dark room band with the clinic photo behind it and a scrim (room at 80% on phones; at lg a left-to-right gradient from solid room at 30% to room at 35%). The headline, intro, Book and Call buttons and a four-up credentials row sit in the left 7 columns, and the photo's wall label sits at the column foot. The light form card fills the right 5 columns. On phones the band stacks the headline, both buttons at full width and two credentials, and the form runs full bleed beneath it. The credentials stay above a 1366x768 fold.
- **Sticky:** the cause section heading sticks at 48px from the top at lg. On phones only, a fixed Call/Book bar (64px tall plus the safe-area inset) slides in once the hero buttons have scrolled away and steps aside while the form is on screen. The main column reserves `4rem + safe-area` bottom padding for it.
- **Carousel:** results swipe on phones (82% then 60% card width, snap-start) and become a 3-column grid from md.

## Elevation & Depth

The wall is flat. Depth comes from the three tonal grounds and from photographs set inside dark rooms, never from shadows on surfaces. Inset 1px strokes, drawn as `box-shadow: inset 0 0 0 1px`, thicken a border to signal focus or selection. They read as line weight, not lift.

### Shadow Vocabulary
- **Focus stroke** (`box-shadow: inset 0 0 0 1px var(--foreground)`): focused inputs and selects, and checked choice cards, doubling the 1px border to 2px.
- **Arrival ring** (`box-shadow: inset 0 0 0 2px var(--foreground)` fading to transparent): the enquiry card when a Book button sends someone there.
- **Floating list** (`box-shadow: 0 12px 32px -12px color-mix(in oklab, var(--foreground) 25%, transparent)`): the select popover, the only true lift.

### Named Rules
**The Flat Wall Rule.** Bands, cards, plates and panels never cast shadows. Only something that floats above the page (a select list, a dialog) may lift.

## Shapes

The corners come from the brand. Every radius step derives from `--radius` (sm 0.6×, md 0.8×, lg 1×, xl 1.4×, 2xl 1.8×, 3xl 2.2×, 4xl 2.6×), so Azira's `0rem` makes everything square, and a clinic with a soft radius rounds everything in proportion. Radio dots stay circular because that is how the control reads. Plates are cropped rectangles in fixed ratios: 4:3 for treatment stills and results, 4:5 for the clinician portrait, 3:4 for each before/after half. Borders are always 1px. A ledger opens with a rule in `text` and divides its rows with `hairline`. On room bands both rules are `room-ink` at reduced opacity. Placeholder plates carry an inset outline 8px inside the edge.

### Named Rules
**The Ruled Ledger Rule.** Lists, specs, credentials, steps and FAQs are ledgers: a 1px rule in `text` across the top, then `hairline` row dividers. Cards with borders on all four sides are not used for lists.

## Components

### Buttons
Square, tracked and decisive: an outlined secondary beside one solid action.
- **Shape:** brand radius (square for Azira), 56px tall (`cta` size), 24px side padding, 10px icon gap, Lucide icons at 1.5 stroke.
- **Primary:** solid `ink` with a `surface` label. Hover fades to `text` over 200ms.
- **Outline:** `surface` fill, 1px `line` border, `ink` label. Hover fills with `panel`.
- **Inverse (on room bands):** `room-ink` fill with an `ink` label. Hover fills with `panel`. This is the band's single solid action.
- **Outline inverse (on room bands):** a transparent fill with a `room-ink` border at 70% and a `room-ink` label. On hover the border goes to full strength and the fill to `room-ink` at 10%.
- **Focus / Active:** a 2px outline in `ring` at 3px offset (`room-ink` inside room bands). Pressing nudges the button down 1px.
- **Behaviour:** Book always scrolls to `#enquire` and focuses the form. Call always dials (`tel:`) and carries a phone icon. No button leaves the page.

### Inputs / Fields
- **Style:** 48px tall, 1px `line` border, `surface` fill, 14px side padding, 16px text (no zoom on iOS). Select triggers match it.
- **Focus:** the border goes to `ink`, plus the inset 1px focus stroke. Hover darkens the border to `ink`.
- **Choice cards:** the qualifying questions are radio rows wrapped in bordered labels (min 44px, `text` at 50% border). Checked takes the `ink` border plus the inset stroke. They show one per row on phones and at lg, and three across at sm and xl.
- **Error:** `destructive` border with an inset destructive stroke. An error summary alert with a destructive border on `surface` takes focus.

### Enquiry form card
The form lives in the hero. It sits on the `panel` ground, padded 32px at lg and running full bleed on phones. It opens with a title, an intro and a ruled consultation-fee/callback ledger, then the fields and a full-width primary submit with a trailing arrow. Success replaces the form in place with "Thank you, {name}." and a Call link. Focus moves to the new heading.

### Plates and wall labels (signature)
A plate is a cropped photograph on a `plate` ground (dark) or a `plate-light` ground (portraits). The wall label caption sits 8px below it inside the `figure`. Missing assets render a marked placeholder that names the file. A photo behind content (the hero) gets a separate inline note.

### Navigation
A slim 64px header with the logo on the left and the phone on the right, closed by a 1px `text` rule. There is no menu. From md the phone reads "Call the clinic" in caption style, followed by the number in figures, underlined on hover.

### Accordion
Trigger rows are at least 64px tall and set in the heading face at 1.125rem. A plus icon becomes a minus when open, and hover fades the trigger to `text`. Answers run up to 65ch in `text`. The accordion follows the ruled ledger: a `text` rule on top and `hairline` rows.

### Motion
One easing for everything: exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)`, through Motion's LazyMotion (domAnimation, loaded after first paint) with `MotionConfig reducedMotion="user"`.
- **Section fade-up:** once on scroll, 12px rise, 400ms, triggered at 15% visibility. Never applied to the hero headline, hero image or form. Without JavaScript, sections stay visible.
- **Mobile action bar:** slides up from below in 300ms and slides away the same way.
- **Arrival ring:** the 2px ring around the form fades out over 1.2s after a 0.5s delay.
- **Success swap:** the form exits with an 8px rise in 200ms, then the thank-you enters with an 8px rise in 400ms.
- Smooth anchor scrolling only without reduced motion. State transitions on buttons and inputs take 200ms.

## Do's and Don'ts

### Do:
- **Do** route every colour, radius and button label style through the semantic tokens, so a clinic's `brand.ts` can restyle the page without a component change.
- **Do** keep each band to one solid action: `ink` primary on light grounds, inverse white on room bands, with an outlined Call beside it.
- **Do** bind a 0.75rem tracked uppercase wall label (0.2em) directly under every plate, 8px below it.
- **Do** build lists as ruled ledgers: a 1px `text` top rule, then `hairline` rows (`room-ink` at 15–40% on room bands).
- **Do** set headlines in the heading face at 400 weight with tight leading (1.05–1.12) and balanced wrapping.
- **Do** use `accent-ink` for any gold text or icon on a light ground; `accent` itself is for rules and room-band text only.
- **Do** keep the hero, its photo and the form still on load. Animate only sections below the fold, once.

### Don't:
- **Don't** use stock photography or a smiling-model split hero. Plates show the clinic's own hands, instruments and rooms.
- **Don't** use gold as a fill, a button colour or a background.
- **Don't** add shadows to bands, plates, cards or buttons. Depth comes from the surface, panel and room grounds.
- **Don't** add a site menu, or a button that leaves the page.
- **Don't** put a tracked caption above a heading as a kicker or eyebrow.
- **Don't** introduce a second easing curve or animate on load above the fold.

---
version: 1
slug: "app-concern-page-tsx"
primary_target: "app/[concern]/page.tsx"
related_targets: ["app/[concern]/v/[headline]/[audience]/page.tsx","components/concern-page.tsx"]
---

## Scope

Concern landing page template for paid ads, route `/[concern]` (statically generated; first concern `/skin-laxity`; `?h=` variants prebuilt and served by proxy.ts). Content and brand come from `content/<clinic>/`. Visitor mode: Persuade. Mobile first; most traffic is Meta on phones.

## Audience, job, action

A paid-ad visitor weighing up whether Azira is serious, safe and right for them. The action is the enquiry form in the first screen; Book scrolls to it, and Call dials the clinic. Proof: nurse-led, NMC-registered, award claims from the clinic's site (confirm), a named clinician, honest prices, and "when we say no". Structure and rules: docs/FRAMEWORK.md, docs/CONTENT-MODEL.md, and the Landing page rules in CLAUDE.md.

## Brand pin

The user pinned Azira's main-site font and palette (azira-aesthetics.co.uk): white, charcoal #444444, near-black #050505, warm grey #F4F4F3, champagne gold (#AF8F43 range, sparingly); Quicksand headings, Futura-style caps (Jost as the open substitute), square outlined buttons.

## Direction contract

THESIS: Precision you can see. The page is a gallery wall of the clinic's own gloved-hand treatment stills on white, each one captioned, and the copy hangs beside them like wall text. It refuses the blush split hero with a smiling model and the row of icon cards.

OWN-WORLD: A white gallery ground, opened by a dark photo-backed hero band; near-black #050505 for headings and the single solid action; charcoal #444 for body text and 1px hairlines; warm grey #F4F4F3 for the quiet panels; deep #141414 "dark room" bands where the framework calls for dark bands, with stills set inside them. Champagne gold appears only as hairlines and the award seal. Square corners everywhere. Quicksand 400 sets the headlines; Jost sets body text and the tracked uppercase captions under every plate. The secondary button is outlined charcoal and the primary is solid black.

STORY: The visitor sees real, gloved, clinical hands, not a model, and a headline that repeats their search. They learn that the cause comes before the treatment, see two honest options with "from" prices, who it isn't for, and the nurse by name, then enquire without leaving the page.

FIRST VIEWPORT: As in the framework PDF (the user rejected the earlier triptych as squeezed): a full-bleed dark room band with the clinic's own gloved-hand photo behind it and a scrim for legibility. On the left: a wide Quicksand headline (about 4.25rem at xl), the intro, a white Book consultation button beside an outlined Call, then a four-up credentials row with the award first, close under the actions so it stays above a 1366x768 fold. At the foot of the left column sits the photo's wall label. On the right: the light enquiry form card. On phones the same dark hero stacks (headline, both buttons, two credentials) and the form runs full width below it.

FORM: The Gloved Hand, #1 on the ordered list (picked over the assigned Award Certificate). seed:ece5974ea2612381. Signature interaction (revised to the user's explicit motion spec, which replaced the clip-path wipe): Motion LazyMotion only, used for section fade-ups once on scroll (12px, about 400ms), the mobile Call/Book bar sliding in once the hero's buttons scroll away, a ring that highlights the form when a Book button sends someone there, and the form's success swap. The hero headline, image and form never animate on load. Motion grammar: one exponential ease-out; reduced motion is respected through MotionConfig.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- How Meta traffic is detected (built as utm_source matching facebook/instagram/meta, or the presence of fbclid).
- Where enquiries are delivered (the server action validates, then has a marked hand-off point).
- All imagery and the logo are placeholders until the client sends assets to public/assets/.

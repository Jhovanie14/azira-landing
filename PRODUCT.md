# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who clicked a paid ad (mostly Meta, on a phone; also Google search) about a specific skin concern, for example skin laxity. They're weighing up whether this clinic is serious, safe and right for them, and the page's job is to get them to send a qualified enquiry. A second audience is the clinic's own team, who call those enquiries back and need to know who they're calling.

## Product Purpose

A landing page for paid ads for Azira Aesthetics, an aesthetics clinic. There is one page per concern. Success means a paid click becomes a qualified enquiry. The agency measures enquiries per click, the share of enquiries that fit, consultations attended, and treatment value against ad spend.

## Positioning

The page leads with diagnosis, not treatment: it explains why the concern happens, shows at most two honest treatment options with real "from" prices, says plainly who the treatment isn't for, and puts a named clinician front and centre. That pre-qualifies visitors and filters out bargain-hunters before they enquire.

## Operating Context

- The page structure follows the agency framework in `docs/FRAMEWORK.md` (source: `docs/framework.pdf`). Its fields are in `docs/CONTENT-MODEL.md`.
- The headline changes per ad group. Every enquiry carries hidden GCLID, UTM and page fields so it can be traced to a booking.
- The clinic calls enquiries back. The form collects name, mobile, email, concern, and two qualifying questions (treated before? when do you want to start?).
- The first page built is for **skin laxity**.

## Capabilities and Constraints

- Next.js App Router, one route per concern page.
- Hard rules are in `CLAUDE.md` under "Landing page rules": no site menu, no discounts or countdowns, no stock photos, Book buttons scroll to the form, Call buttons dial the clinic, under 2 s load, and the rules for before/after photos.
- Undecided: which URL parameter maps a visit to an ad group, how Meta traffic is detected, and where form submissions go.

## Brand Commitments

- The clinic's name is **Azira Aesthetics**. Landing pages match the font and colour palette of the clinic's main site, azira-aesthetics.co.uk (the user pinned this on 2026-10-17): white, charcoal #444444, near-black #050505, warm grey #F4F4F3, champagne gold (#AF8F43 range, used sparingly); Quicksand headings, with Futura and Avenir on the main site. Square, outlined charcoal buttons.
- The main site's imagery language is the clinic's own photography: black-gloved hands, instruments, neutral and skin tones.
- The logo and photography are not supplied yet; the client will send assets to `public/assets/`.

## Evidence on Hand

None yet. No logo, photography, clinician, credentials, press, prices, location or phone number has been supplied. The copy is a draft, written for skin laxity and flagged as such. Never invent names, qualifications, prices, press mentions, reviews or results; keep them as visible placeholders until the client supplies them.

## Product Principles

1. Every element either earns the enquiry or goes. Nothing gives a paid visitor a way to leave.
2. Honesty pre-qualifies: real prices, real limits, real people.
3. Expertise before treatment: explain the cause, then the options.
4. Phone first: most traffic arrives from Meta ads on a phone.

## Accessibility & Inclusion

The FAQs specifically address suitability for different skin tones, so imagery and copy must not assume one skin type. Aim for WCAG 2.2 AA.

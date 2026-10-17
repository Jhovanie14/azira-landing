# Content Model: one concern page

The content a single concern page needs, block by block. Block numbers refer to [FRAMEWORK.md](./FRAMEWORK.md).

In code, the schema is `content/schema.ts` (Zod). Each clinic's content lives in `content/<clinic>/` (`brand.ts`, `clinic.ts`, one file per concern) and is validated when the site builds.

Some content belongs to the **clinic** and is the same on every concern page (phone, address, logo, credentials, trust logos, usually the clinician). The rest belongs to the **concern page**. Keeping the two apart means a new concern page only needs its own copy.

## Clinic (shared across pages)

| Field           | Type                  | Block    | Notes                                                                 |
| --------------- | --------------------- | -------- | --------------------------------------------------------------------- |
| `name`          | text                  | 1        | Clinic name, used as the logo's alt text.                             |
| `logo`          | image                 | 1        |                                                                       |
| `phone`         | phone number          | 1, 13, 14 | Display format plus a dialable format.                               |
| `address`       | text                  | 13       | Full postal address.                                                  |
| `location`      | text                  | 2, 13    | Short form for eyebrows, e.g. a town or area.                         |
| `credentials`   | list of 4 items       | 4        | Each: `label`, optional `award` (adds the gold award mark). Proof points under the hero buttons. Phones show the first 2, so lead with the strongest (currently the award). |
| `consultationFee` | text                | 3, 11, 12 | What the first consultation costs. Shown before anyone enquires. |
| `callbackPromise` | text                | 3        | When the clinic calls back. Shown beside the form and in the thank-you message. |
| `trustLogos`    | list of items         | 5        | Each: `image`, `name` (alt text), optional `link`. Press, awards or review platforms, shown in grey. |
| `clinicians`    | list of clinicians    | 9        | See [Clinician](#clinician-block-9). A page picks one.                |

## Concern page

### Page settings

| Field          | Type    | Notes                                                                                          |
| -------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `slug`         | text    | One page per concern.                                                                          |
| `concern`      | text    | The concern this page covers, e.g. "skin laxity". Used in the eyebrow and as the form's default concern. |
| `showResults`  | boolean | Turns the results block (10) on or off for the whole page.                                     |
| `hideResultsForMeta` | boolean | Hides the results block for visitors from Meta ads.                                     |

### Hero (blocks 2–3)

| Field              | Type                     | Notes                                                                                 |
| ------------------ | ------------------------ | ------------------------------------------------------------------------------------- |
| `image.caption`    | text                     | The gallery wall label under the hero photo: what's pictured and where, e.g. "Assessment in clinic · Newport". It doesn't repeat the headline. |
| `headlines`        | list of headline variants | One per ad group, selected by `?h=<adGroup>` in the ad's URL. Each: `adGroup` (lowercase key), `headline`, and optionally `intro` and `concernOption` (the form concern to preselect). Every variant is prebuilt as static HTML. |
| `defaultHeadline`  | text                     | Shown when the visitor's ad group is unknown or has no variant.                       |
| `intro`            | short paragraph          | Supporting copy under the headline.                                                   |
| `heroImage`        | image                    | The clinic's own treatment photo. Never stock.                                        |

### Enquiry form (block 3)

| Field                 | Type                  | Notes                                                                      |
| --------------------- | --------------------- | -------------------------------------------------------------------------- |
| `formTitle`           | text                  | Default "Tell us about your concern".                                      |
| `concernOptions`      | list of texts         | Choices for the concern field. The page's own concern is preselected.      |
| `treatedBeforeOptions` | list of texts        | Choices for "Have you been treated before?".                               |
| `startWhenOptions`    | list of texts         | Choices for "When do you want to start?".                                  |
| `submitLabel`         | text                  | Default "Request consultation".                                            |

The visitor fills in name, mobile, email (optional, because the nurse calls back on the mobile), concern and the two qualifying questions. The form also captures **GCLID**, **UTM parameters** and **page** in hidden fields. Those come from the visit, not from content.

### Cause cards (block 6)

| Field      | Type                | Notes                                                       |
| ---------- | ------------------- | ----------------------------------------------------------- |
| `heading`  | text                | Explains the cause, not the treatment.                      |
| `intro`    | short paragraph     |                                                             |
| `causes`   | exactly 4 cards     | Each: `title`, `body` (short). Shown numbered 01–04.        |

Amer example: bone, fat pads, ligaments, skin.

### Treatments (block 7)

| Field        | Type                   | Notes                     |
| ------------ | ---------------------- | ------------------------- |
| `heading`    | text                   | e.g. "Where a plan can lead". |
| `treatments` | 1–2 treatments         | Never more than 2.        |

Each treatment:

| Field              | Type    | Notes                                                                    |
| ------------------ | ------- | ------------------------------------------------------------------------ |
| `name`             | text    |                                                                          |
| `kind`             | text    | Plain-English type, set under the brand name, e.g. "Radiofrequency microneedling". |
| `sessions`         | text    | e.g. "3 sessions, 4 weeks apart".                                        |
| `downtime`         | text    |                                                                          |
| `results`          | text    | What to expect and when. Honest, not a promise.                          |
| `bestFor`          | text    | Who this option suits.                                                   |
| `fromPrice`        | money (GBP) | Shown as "from £…".                                                  |
| `prescriptionOnly` | boolean | If true, no before/after photos may be shown for this treatment.         |

### Who it suits (block 8)

| Field        | Type          | Notes                                     |
| ------------ | ------------- | ----------------------------------------- |
| `goodFit`    | list of texts | The "You're a good fit if" list.          |
| `whenWeSayNo` | list of texts | Who the treatment isn't for.             |

### Clinician (block 9)

| Field            | Type            | Notes                                         |
| ---------------- | --------------- | --------------------------------------------- |
| `name`           | text            |                                               |
| `qualifications` | text            | Post-nominals or a short line, shown with the name. |
| `portrait`       | image           | A real photo of the clinician.                |
| `philosophy`     | paragraph       | In their own words.                           |
| `qualification`  | text            | Fact chip.                                    |
| `role`           | text            | Fact chip.                                    |
| `years`          | number          | Years of experience, fact chip.               |

### Results (block 10, optional)

Shown only when `showResults` is on. Up to 3 items.

| Field                 | Type      | Notes                                                                 |
| --------------------- | --------- | --------------------------------------------------------------------- |
| `before`              | image     | Unretouched.                                                          |
| `after`               | image     | Unretouched.                                                          |
| `treatment`           | reference | The treatment shown. Must not be `prescriptionOnly`.                  |
| `sessions`            | text      | Caption.                                                              |
| `timeBetweenPhotos`   | text      | Caption.                                                              |
| `consentConfirmed`    | boolean   | Must be true for the item to appear.                                  |

Every caption ends with "Results vary".

### What happens next (block 11)

| Field   | Type          | Notes                                                       |
| ------- | ------------- | ----------------------------------------------------------- |
| `steps` | exactly 4 steps | Each: `title`, `body`. Enquiry to decision. The last step ends with "no pressure to book on the day". |

### FAQs (block 12)

| Field  | Type          | Notes                                                                                                    |
| ------ | ------------- | -------------------------------------------------------------------------------------------------------- |
| `faqs` | list of items | Each: `question`, `answer`. Cover the objections the clinic hears on every call: downtime, pain, cost, "will I look different?", "is it right for my skin tone?". |

### Closing ask (block 13)

| Field             | Type            | Notes                                                    |
| ----------------- | --------------- | -------------------------------------------------------- |
| `closingHeadline` | text            |                                                          |
| `closingBody`     | short paragraph |                                                          |

The address, location and phone come from the clinic. Both buttons go back to the form.

## Fixed labels

These stay the same on every page unless a clinic asks otherwise: "Book consultation", "Call", "Request consultation", and the section eyebrows ("What has changed", "Where a plan can lead", "Who it suits", "When we say no", "Your clinician", "Results", "What happens when you visit", "Questions before you book").

## Open questions

- **How a visit maps to an ad group.** Set as `?h=<adGroup>` (`AD_GROUP_PARAM` in `lib/tracking.ts`). Ads must link to `/<concern>?h=<adGroup>`; an unknown value falls back to the default headline.
- **How Meta traffic is detected.** Built for now as a `utm_source` of facebook, fb, instagram, ig or meta, or the presence of `fbclid` (`isMetaTraffic` in `lib/tracking.ts`). This needs to match how the Meta campaigns are tagged.
- **Where enquiries go.** Not decided. `deliverEnquiry()` in `lib/enquiry.ts` is the hand-off point.

## Swapping in real assets

Every image field is an `ImageAsset` with `id`, `alt`, `note`, an optional `caption` (the wall label) and an optional `src`. Leave `src` unset to show a marked placeholder. Once a file is in `public/assets/<clinic>/`, set `src: "/assets/<clinic>/<file>"` on the field.

## Brand (once per clinic)

`content/<clinic>/brand.ts` holds the logo slot, colours (surface, ink, text, panel, hairline, line, room, room ink and text, accent, accent ink, destructive), corner radius, button label style, font names, photo style and tone of voice. Fonts load in `content/<clinic>/fonts.ts`. The schema checks the key colour pairs against WCAG AA, so a brand with unreadable colours fails the build. Take the brand from the clinic's site, never their menu, layout, discounts or stock images.

import { z } from "zod"

// Content schema for every clinic. A new clinic is new files in content/<clinic>/
// that parse against these schemas; components never change.

const text = z.string().min(1)
const hex = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Use a six-digit hex colour, like #444444")

/**
 * An image slot. Leave `src` unset to render a clearly marked placeholder;
 * set it to a file in public/assets/ once the client supplies the asset.
 */
export const imageAssetSchema = z.object({
  /** Stable slot id; the placeholder suggests public/assets/<id>.jpg */
  id: text,
  alt: text,
  /** What the photo should show, printed on the placeholder */
  note: text,
  /** Gallery wall label set under the plate */
  caption: text.optional(),
  src: text.optional(),
})

// --- Brand -------------------------------------------------------------------

function luminance(colour: string) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(colour.slice(i, i + 2), 16) / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const colourRoles = z.object({
  /** Page ground */
  surface: hex,
  /** Headings and the solid primary button */
  ink: hex,
  /** Body text and strong rules */
  text: hex,
  /** Quiet panels (form, clinician, steps) */
  panel: hex,
  /** Light dividers */
  hairline: hex,
  /** Input and outline-button borders: needs 3:1 on surface */
  line: hex,
  /** Dark bands (treatments, closing ask) */
  room: hex,
  roomInk: hex,
  roomText: hex,
  /** Decorative accent: rules, award mark, gold text on dark bands */
  accent: hex,
  /** Accent dark enough for text on the surface */
  accentInk: hex,
  destructive: hex,
})

type ColourRole = keyof z.infer<typeof colourRoles>

/** Pairs that must meet WCAG AA, as [foreground, background, minimum, use] */
const CONTRAST_PAIRS: [ColourRole, ColourRole, number, string][] = [
  ["text", "surface", 4.5, "body text"],
  ["ink", "surface", 4.5, "headings"],
  ["text", "panel", 4.5, "text on panels"],
  ["surface", "ink", 4.5, "primary button label"],
  ["accentInk", "surface", 4.5, "accent text on the page"],
  ["accentInk", "panel", 4.5, "accent text on panels"],
  ["roomText", "room", 4.5, "text on dark bands"],
  ["roomInk", "room", 4.5, "headings on dark bands"],
  ["accent", "room", 4.5, "accent text on dark bands"],
  ["destructive", "surface", 4.5, "error text"],
  ["line", "surface", 3, "input borders"],
]

/** The twelve colour roles every brand and palette sets, checked against WCAG AA */
export const brandColoursSchema = colourRoles.superRefine((colours, ctx) => {
  for (const [fg, bg, min, use] of CONTRAST_PAIRS) {
    const ratio = contrast(colours[fg], colours[bg])
    if (ratio < min) {
      ctx.addIssue({
        code: "custom",
        path: [fg],
        message: `${fg} on ${bg} (${use}) is ${ratio.toFixed(2)}:1; WCAG AA needs ${min}:1`,
      })
    }
  }
})

/**
 * An alternative colour scheme the client can preview (review builds only).
 * Same roles and contrast rules as the brand.
 */
export const paletteSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  label: text,
  /** One line on the character of the palette */
  blurb: text,
  colours: brandColoursSchema,
})

export const brandSchema = z.object({
  /** Where the brand was taken from */
  source: z.url(),
  logo: imageAssetSchema,
  colours: brandColoursSchema,
  /** Corner radius for every component, e.g. "0rem" for square */
  radius: text,
  button: z.object({
    /** Label case for buttons */
    textTransform: z.enum(["uppercase", "none"]),
    letterSpacing: text,
  }),
  /** Fonts are loaded in content/<clinic>/fonts.ts; recorded here for reference */
  fonts: z.object({ heading: text, body: text }),
  photoStyle: text,
  voice: z.array(text).min(1),
})

// --- Clinic --------------------------------------------------------------------

export const clinicianSchema = z.object({
  name: text,
  qualifications: text,
  portrait: imageAssetSchema,
  philosophy: text,
  qualification: text,
  role: text,
  years: text,
})

export const clinicSchema = z.object({
  name: text,
  phone: z.object({ display: text, dial: z.string().regex(/^\+\d{8,15}$/) }),
  address: text,
  location: text,
  /** Four proof points; phones show the first two, so lead with the strongest */
  credentials: z
    .array(z.object({ label: text, award: z.boolean().optional() }))
    .length(4),
  /** What the first consultation costs, stated before anyone enquires */
  consultationFee: text,
  /** When the clinic calls back, shown before and after submitting */
  callbackPromise: text,
  awards: z.array(text),
  trustLogos: z.array(imageAssetSchema),
  clinicians: z.array(clinicianSchema).min(1),
  privacyNotice: z.array(text).min(1),
})

// --- Concern page ------------------------------------------------------------------

export const treatmentSchema = z.object({
  id: text,
  name: text,
  /** Plain-English type, set under the brand name */
  kind: text,
  image: imageAssetSchema,
  summary: text,
  sessions: text,
  downtime: text,
  results: text,
  bestFor: text,
  /** Whole pounds, shown as "from £…"; null until the clinic confirms */
  fromPrice: z.number().int().positive().nullable(),
  /** Before/after photos are never shown for prescription-only treatments */
  prescriptionOnly: z.boolean(),
})

const resultBase = {
  treatmentId: text,
  sessions: text,
  timeBetweenPhotos: text,
}

/** A real photo must carry consentConfirmed: true or the content won't parse */
export const resultItemSchema = z.discriminatedUnion("kind", [
  z.object({ ...resultBase, kind: z.literal("placeholder"), note: text }),
  z.object({
    ...resultBase,
    kind: z.literal("photo"),
    before: imageAssetSchema,
    after: imageAssetSchema,
    consentConfirmed: z.literal(true),
  }),
])

/** Everything that changes to match one ad group, not just the headline */
export const headlineVariantSchema = z.object({
  /** Value of ?h= in the ad's URL; lowercase, hyphenated */
  adGroup: z.string().regex(/^[a-z0-9-]+$/),
  headline: text,
  intro: text.optional(),
  /** concernOptions entry to preselect in the enquiry form */
  concernOption: text.optional(),
})

const pair = z.object({ title: text, body: text })

export const concernPageSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    concern: text,
    showResults: z.boolean(),
    hideResultsForMeta: z.boolean(),
    meta: z.object({ title: text, description: text }),
    hero: z.object({
      defaultHeadline: text,
      intro: text,
      headlines: z.array(headlineVariantSchema),
      image: imageAssetSchema,
    }),
    form: z.object({
      title: text,
      intro: text,
      concernOptions: z.array(text).min(2),
      treatedBeforeOptions: z.array(text).length(3),
      startWhenOptions: z.array(text).length(3),
      submitLabel: text,
    }),
    causes: z.object({
      heading: text,
      intro: text,
      items: z.array(pair).length(4),
    }),
    treatments: z.object({
      heading: text,
      intro: text,
      items: z.array(treatmentSchema).min(1).max(2),
    }),
    suitability: z.object({
      goodFit: z.array(text).min(1),
      whenWeSayNo: z.array(text).min(1),
    }),
    clinicianId: z.number().int().nonnegative(),
    results: z.object({ heading: text, items: z.array(resultItemSchema) }),
    steps: z.object({ heading: text, items: z.array(pair).length(4) }),
    faqs: z.object({
      heading: text,
      items: z.array(z.object({ question: text, answer: text })).min(1),
    }),
    closing: z.object({ headline: text, body: text }),
  })
  .superRefine((page, ctx) => {
    const options = page.form.concernOptions
    if (!options.includes(page.concern)) {
      ctx.addIssue({
        code: "custom",
        path: ["concern"],
        message: "concern must be one of form.concernOptions",
      })
    }
    page.hero.headlines.forEach((variant, index) => {
      if (variant.concernOption && !options.includes(variant.concernOption)) {
        ctx.addIssue({
          code: "custom",
          path: ["hero", "headlines", index, "concernOption"],
          message: "concernOption must be one of form.concernOptions",
        })
      }
    })
    const treatmentIds = new Set(page.treatments.items.map((t) => t.id))
    page.results.items.forEach((item, index) => {
      if (!treatmentIds.has(item.treatmentId)) {
        ctx.addIssue({
          code: "custom",
          path: ["results", "items", index, "treatmentId"],
          message: `Unknown treatment "${item.treatmentId}"`,
        })
      }
    })
  })

export const clinicContentSchema = z.object({
  brand: brandSchema,
  clinic: clinicSchema,
  concerns: z.array(concernPageSchema).min(1),
  /** Colour schemes for the client to compare; the first is the brand's own */
  palettes: z.array(paletteSchema).optional(),
})

export type ImageAsset = z.infer<typeof imageAssetSchema>
export type Brand = z.infer<typeof brandSchema>
export type BrandColours = z.infer<typeof brandColoursSchema>
export type Palette = z.infer<typeof paletteSchema>
export type Clinic = z.infer<typeof clinicSchema>
export type Clinician = z.infer<typeof clinicianSchema>
export type Treatment = z.infer<typeof treatmentSchema>
export type ResultItem = z.infer<typeof resultItemSchema>
export type HeadlineVariant = z.infer<typeof headlineVariantSchema>
export type ConcernPage = z.infer<typeof concernPageSchema>
export type ClinicContent = z.infer<typeof clinicContentSchema>

/** Input types for authoring content files (before parsing) */
export type BrandInput = z.input<typeof brandSchema>
export type PaletteInput = z.input<typeof paletteSchema>
export type ClinicInput = z.input<typeof clinicSchema>
export type ConcernPageInput = z.input<typeof concernPageSchema>

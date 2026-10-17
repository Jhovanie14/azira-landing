import { azira } from "./azira"
import { clinicContentSchema, type ConcernPage } from "./schema"

// One deployment serves one clinic, chosen by the CLINIC environment variable.
// A new clinic is a new content/<clinic>/ folder plus one line here.
const clinics = { azira }

type ClinicId = keyof typeof clinics

function activeClinicId(): ClinicId {
  const id = process.env.CLINIC ?? "azira"
  if (!(id in clinics)) {
    throw new Error(
      `Unknown CLINIC "${id}". Expected one of: ${Object.keys(clinics).join(", ")}`
    )
  }
  return id as ClinicId
}

/** Parsed and validated at import, so a bad content file fails the build */
export const site = clinicContentSchema.parse(clinics[activeClinicId()])

export function getConcern(slug: string): ConcernPage | undefined {
  return site.concerns.find((page) => page.slug === slug)
}

export function concernSlugs() {
  return site.concerns.map((page) => page.slug)
}

/** The headline variant for an ad group, if the page has one */
export function getVariant(page: ConcernPage, adGroup: string | undefined) {
  return adGroup
    ? page.hero.headlines.find((variant) => variant.adGroup === adGroup)
    : undefined
}

export type { ConcernPage }

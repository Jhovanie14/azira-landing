import { CauseCards } from "@/components/blocks/cause-cards"
import { Clinician } from "@/components/blocks/clinician"
import { ClosingAsk } from "@/components/blocks/closing-ask"
import { CredentialRow } from "@/components/blocks/credential-row"
import { EnquiryForm } from "@/components/blocks/enquiry-form"
import { Faqs } from "@/components/blocks/faqs"
import { Hero } from "@/components/blocks/hero"
import { MobileActionBar } from "@/components/blocks/mobile-action-bar"
import { NextSteps } from "@/components/blocks/next-steps"
import { Results } from "@/components/blocks/results"
import { TreatmentOptions } from "@/components/blocks/treatment-options"
import { TrustStrip } from "@/components/blocks/trust-strip"
import { WhoItSuits } from "@/components/blocks/who-it-suits"
import { getVariant, site } from "@/content"
import type { ConcernPage as ConcernPageContent } from "@/content/schema"

type ConcernPageProps = {
  page: ConcernPageContent
  /** Ad group from ?h=, resolved by proxy.ts */
  adGroup?: string
  /** Meta traffic, resolved by proxy.ts; may hide the results block */
  audience: "all" | "meta"
}

/** One concern page, block by block in framework order (docs/FRAMEWORK.md) */
export function ConcernPage({ page, adGroup, audience }: ConcernPageProps) {
  const { clinic } = site
  const variant = getVariant(page, adGroup)

  const treatmentsById = new Map(page.treatments.items.map((t) => [t.id, t]))
  const results = page.results.items.flatMap((item) => {
    const treatment = treatmentsById.get(item.treatmentId)
    // Never show before/after for prescription-only treatments
    if (!treatment || treatment.prescriptionOnly) return []
    return [{ ...item, treatmentName: treatment.name }]
  })
  const showResults =
    page.showResults &&
    results.length > 0 &&
    !(page.hideResultsForMeta && audience === "meta")

  const clinician = clinic.clinicians[page.clinicianId]

  return (
    <>
      <main className="pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <Hero
          headline={variant?.headline ?? page.hero.defaultHeadline}
          intro={variant?.intro ?? page.hero.intro}
          image={page.hero.image}
          phone={clinic.phone}
          credentials={
            <CredentialRow credentials={clinic.credentials} tone="dark" />
          }
          form={
            <EnquiryForm
              slug={page.slug}
              concern={variant?.concernOption ?? page.concern}
              form={page.form}
              clinic={{
                phone: clinic.phone,
                privacyNotice: clinic.privacyNotice,
                consultationFee: clinic.consultationFee,
                callbackPromise: clinic.callbackPromise,
              }}
            />
          }
        />
        <TrustStrip awards={clinic.awards} logos={clinic.trustLogos} />
        <CauseCards causes={page.causes} />
        <TreatmentOptions treatments={page.treatments} />
        <WhoItSuits suitability={page.suitability} />
        {clinician && <Clinician clinician={clinician} />}
        {showResults && (
          <Results heading={page.results.heading} items={results} />
        )}
        <NextSteps steps={page.steps} />
        <Faqs faqs={page.faqs} />
        <ClosingAsk clinic={clinic} closing={page.closing} />
      </main>
      <MobileActionBar phone={clinic.phone} />
    </>
  )
}

import { BookButton } from "@/components/cta"
import { FadeUp } from "@/components/motion"
import { Plate, WallLabel } from "@/components/plate"
import type { Clinician as ClinicianContent } from "@/content/schema"

/** Block 9: the clinician by name and face. People book a person. */
export function Clinician({ clinician }: { clinician: ClinicianContent }) {
  const facts = [
    ["Qualification", clinician.qualification],
    ["Role", clinician.role],
    ["Experience", clinician.years],
  ] as const

  return (
    <section aria-labelledby="clinician-heading" className="bg-muted">
      <FadeUp className="shell grid gap-10 py-20 md:grid-cols-12 md:items-center md:gap-8 lg:py-28">
        <figure className="md:col-span-5">
          <Plate
            image={clinician.portrait}
            tone="light"
            sizes="(min-width: 768px) 40vw, 100vw"
            className="aspect-[4/5]"
          />
          <WallLabel className="text-copy">
            {clinician.portrait.caption ??
              `${clinician.name} · ${clinician.role}`}
          </WallLabel>
        </figure>

        <div className="md:col-span-6 md:col-start-7">
          <h2
            id="clinician-heading"
            className="text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-5xl"
          >
            {clinician.name}
          </h2>
          <p className="mt-3 text-copy">{clinician.qualifications}</p>
          <blockquote className="mt-8 border-l border-mark pl-6 font-heading text-xl leading-relaxed text-foreground sm:text-2xl">
            <p>{clinician.philosophy}</p>
          </blockquote>
          <dl className="mt-10 border-t border-copy sm:grid sm:grid-cols-3">
            {facts.map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[8.5rem_1fr] items-baseline gap-4 border-b border-hairline py-3.5 sm:block sm:border-r sm:border-b-0 sm:py-4 sm:pr-3 sm:not-first:pl-3 sm:last:border-r-0"
              >
                <dt className="caption text-copy">{label}</dt>
                <dd className="leading-snug text-foreground sm:mt-1.5">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
          <BookButton size="cta" className="mt-10 w-full sm:w-auto">
            Book consultation
          </BookButton>
        </div>
      </FadeUp>
    </section>
  )
}

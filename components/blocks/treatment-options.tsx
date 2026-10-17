import { BookButton } from "@/components/cta"
import { FadeUp } from "@/components/motion"
import { Plate, WallLabel } from "@/components/plate"
import type { ConcernPage, Treatment } from "@/content/schema"

/** Block 7: at most two options, with honest specs and a "from" price */
export function TreatmentOptions({
  treatments,
}: {
  treatments: ConcernPage["treatments"]
}) {
  return (
    <section
      aria-labelledby="treatments-heading"
      className="bg-room text-room-muted"
    >
      <FadeUp className="shell py-20 lg:py-32">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2
            id="treatments-heading"
            className="text-[2rem] leading-[1.12] text-room-foreground sm:text-[2.5rem] lg:col-span-6 lg:text-5xl"
          >
            {treatments.heading}
          </h2>
          <p className="max-w-[48ch] text-[1.0625rem] leading-relaxed lg:col-span-5 lg:col-start-8">
            {treatments.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-8 lg:mt-16 lg:gap-12">
          {treatments.items.slice(0, 2).map((treatment) => (
            <TreatmentPlate key={treatment.id} treatment={treatment} />
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-room-foreground/20 pt-8 sm:flex-row sm:items-center sm:justify-between lg:mt-20">
          <p className="max-w-[44ch] leading-relaxed">
            Not sure which suits you? That&apos;s what the consultation is for.
          </p>
          <BookButton size="cta" variant="inverse" className="sm:w-auto">
            Book consultation
          </BookButton>
        </div>
      </FadeUp>
    </section>
  )
}

function TreatmentPlate({ treatment }: { treatment: Treatment }) {
  const specs = [
    ["Sessions", treatment.sessions],
    ["Downtime", treatment.downtime],
    ["Results", treatment.results],
    ["Best for", treatment.bestFor],
  ] as const

  return (
    <article aria-labelledby={`treatment-${treatment.id}`}>
      <figure>
        <Plate
          image={treatment.image}
          sizes="(min-width: 768px) 45vw, 100vw"
          className="aspect-[4/3]"
        />
        {treatment.image.caption && (
          <WallLabel className="text-room-muted">
            {treatment.image.caption}
          </WallLabel>
        )}
      </figure>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h3
            id={`treatment-${treatment.id}`}
            className="text-[1.75rem] leading-tight text-room-foreground sm:text-[2rem]"
          >
            {treatment.name}
          </h3>
          <p className="mt-1.5 text-sm text-room-muted">{treatment.kind}</p>
        </div>
        <p className="flex items-baseline gap-2.5 text-room-foreground">
          <span className="caption text-room-muted">From</span>
          <span className="figures font-heading text-[2.25rem] leading-none">
            {treatment.fromPrice === null
              ? "£[price]"
              : `£${treatment.fromPrice.toLocaleString("en-GB")}`}
          </span>
        </p>
      </div>
      <p className="mt-4 max-w-[46ch] leading-relaxed">{treatment.summary}</p>

      <dl className="mt-6 border-t border-room-foreground/25">
        {specs.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[7rem_1fr] gap-4 border-b border-room-foreground/15 py-3.5 sm:grid-cols-[8.5rem_1fr]"
          >
            <dt className="caption pt-0.5 text-room-muted">{label}</dt>
            <dd className="leading-snug text-room-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}

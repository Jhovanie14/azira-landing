import { FadeUp } from "@/components/motion"
import type { ConcernPage } from "@/content/schema"

/**
 * Block 6: explain the cause, not the treatment. The four causes read as a
 * section through the face, from the surface you see down to the bone; the
 * axis labels carry the order, so the causes need no numbers.
 */
export function CauseCards({ causes }: { causes: ConcernPage["causes"] }) {
  return (
    <section aria-labelledby="causes-heading">
      <FadeUp className="shell grid gap-10 py-20 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-12">
            <h2
              id="causes-heading"
              className="text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-5xl"
            >
              {causes.heading}
            </h2>
            <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed">
              {causes.intro}
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="caption text-mark-ink" aria-hidden>
            Surface
          </p>
          <ol
            aria-label="From the surface to the deepest layer"
            className="relative mt-3 border-l border-mark pb-2"
          >
            {causes.items.map((cause) => (
              <li
                key={cause.title}
                className="relative pt-1 pl-8 not-last:pb-12 sm:pl-12"
              >
                <span
                  aria-hidden
                  className="absolute top-[1.15rem] left-0 h-px w-5 bg-mark sm:w-8"
                />
                <h3 className="text-[1.75rem] leading-tight sm:text-[2rem]">
                  {cause.title}
                </h3>
                <p className="mt-2 max-w-[48ch] leading-relaxed">
                  {cause.body}
                </p>
              </li>
            ))}
          </ol>
          <p className="caption mt-3 text-mark-ink" aria-hidden>
            Deep
          </p>
        </div>
      </FadeUp>
    </section>
  )
}

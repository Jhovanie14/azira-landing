import { FadeUp } from "@/components/motion"
import type { ConcernPage } from "@/content/schema"

/** Block 11: four steps from enquiry to decision, ending with no pressure */
export function NextSteps({ steps }: { steps: ConcernPage["steps"] }) {
  return (
    <section aria-labelledby="steps-heading" className="bg-muted">
      <FadeUp className="shell py-20 lg:py-28">
        <h2
          id="steps-heading"
          className="max-w-[18ch] text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-5xl"
        >
          {steps.heading}
        </h2>
        <ol className="mt-12 grid gap-0 sm:grid-cols-2 sm:gap-x-8 lg:mt-16 lg:grid-cols-4">
          {steps.items.map((step, index) => (
            <li
              key={step.title}
              className="border-t border-copy pt-5 pb-10 sm:pb-12 lg:pb-0"
            >
              <span className="figures font-heading text-[2.5rem] leading-none text-foreground">
                {index + 1}
              </span>
              <h3 className="mt-4 text-xl leading-snug sm:text-[1.375rem]">
                {step.title}
              </h3>
              <p className="mt-2 max-w-[32ch] leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </FadeUp>
    </section>
  )
}

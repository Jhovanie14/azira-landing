import { CheckIcon, MinusIcon } from "lucide-react"

import { FadeUp } from "@/components/motion"
import type { ConcernPage } from "@/content/schema"

/** Block 8: who it suits, and when we say no. Visitors rule themselves in or out. */
export function WhoItSuits({
  suitability,
}: {
  suitability: ConcernPage["suitability"]
}) {
  return (
    <section aria-label="Who this treatment suits">
      <FadeUp className="shell grid gap-12 py-20 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <div className="lg:col-span-6">
          <h2 className="text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-5xl">
            You&apos;re a good fit if
          </h2>
          <ul className="mt-8 border-t border-copy">
            {suitability.goodFit.map((item) => (
              <li
                key={item}
                className="flex gap-4 border-b border-hairline py-4 text-[1.0625rem] leading-snug text-foreground"
              >
                <CheckIcon
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 stroke-[1.25]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-muted p-6 sm:p-8 lg:col-span-5 lg:col-start-8 lg:self-start lg:p-10">
          <h2 className="text-[1.75rem] leading-tight sm:text-[2rem]">
            When we say no
          </h2>
          <p className="mt-3 leading-relaxed">
            We&apos;d rather turn you away than treat you when it isn&apos;t
            right.
          </p>
          <ul className="mt-6 space-y-4">
            {suitability.whenWeSayNo.map((item) => (
              <li
                key={item}
                className="flex gap-4 leading-snug text-foreground"
              >
                <MinusIcon
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 stroke-[1.25]"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </section>
  )
}

import Image from "next/image"
import { AwardIcon } from "lucide-react"

import { FadeUp } from "@/components/motion"
import type { Clinic } from "@/content/schema"

/** Block 5: borrowed credibility straight after the first screen, in grey */
export function TrustStrip({
  awards,
  logos,
}: {
  awards: Clinic["awards"]
  logos: Clinic["trustLogos"]
}) {
  return (
    <section
      aria-label="Awards and recognition"
      className="border-y border-hairline"
    >
      <FadeUp className="shell grid gap-6 py-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-10">
        <ul className="grid gap-2 lg:col-span-4">
          {awards.map((award) => (
            <li
              key={award}
              className="flex items-start gap-2.5 text-foreground"
            >
              <AwardIcon
                aria-hidden
                className="mt-0.5 size-[1.125rem] shrink-0 stroke-[1.25] text-mark-ink"
              />
              <span className="leading-snug">{award}</span>
            </li>
          ))}
        </ul>
        <ul className="grid grid-cols-2 gap-px border border-hairline bg-hairline sm:grid-cols-4 lg:col-span-8">
          {logos.map((logo) => (
            <li
              key={logo.id}
              className="relative flex h-20 items-center justify-center bg-background px-4 grayscale"
            >
              {logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="200px"
                  className="object-contain p-5 opacity-70"
                />
              ) : (
                <span
                  data-placeholder={logo.id}
                  className="text-center text-sm leading-tight text-copy"
                >
                  <span className="caption block text-[0.6875rem]">
                    Logo placeholder
                  </span>
                  {logo.alt}
                </span>
              )}
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  )
}

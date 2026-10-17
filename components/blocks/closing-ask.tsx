import { AwardIcon, MapPinIcon } from "lucide-react"

import { CookieSettingsButton } from "@/components/consent"
import { BookButton, CallButton } from "@/components/cta"
import { FadeUp } from "@/components/motion"
import type { Clinic, ConcernPage } from "@/content/schema"

/** Block 13: one last ask. Both actions stay on the page. */
export function ClosingAsk({
  clinic,
  closing,
}: {
  clinic: Clinic
  closing: ConcernPage["closing"]
}) {
  return (
    <section
      aria-labelledby="closing-heading"
      className="bg-room text-room-muted"
    >
      <FadeUp className="shell grid gap-10 pt-20 pb-12 lg:grid-cols-12 lg:gap-8 lg:pt-32">
        <div className="lg:col-span-7">
          <h2
            id="closing-heading"
            className="text-[2.5rem] leading-[1.08] text-room-foreground sm:text-6xl lg:text-7xl"
          >
            {closing.headline}
          </h2>
          <p className="mt-6 max-w-[44ch] text-[1.0625rem] leading-relaxed lg:text-lg">
            {closing.body}
          </p>
        </div>

        <div className="flex flex-col justify-end gap-3 lg:col-span-4 lg:col-start-9">
          <BookButton size="cta" variant="inverse" className="w-full">
            Book consultation
          </BookButton>
          <CallButton
            dial={clinic.phone.dial}
            size="cta"
            variant="outline-inverse"
            className="w-full"
          >
            Call {clinic.phone.display}
          </CallButton>
          <ul className="mt-4 space-y-3 leading-snug">
            <li className="flex gap-2.5">
              <MapPinIcon
                aria-hidden
                className="mt-0.5 size-[1.125rem] shrink-0 stroke-[1.25]"
              />
              <span>
                {clinic.name}
                <br />
                {clinic.address}
              </span>
            </li>
            {clinic.awards[0] && (
              <li className="flex gap-2.5 text-mark">
                <AwardIcon
                  aria-hidden
                  className="mt-0.5 size-[1.125rem] shrink-0 stroke-[1.25]"
                />
                <span>{clinic.awards[0]}</span>
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-room-foreground/15 pt-6 text-sm leading-relaxed sm:flex-row sm:items-start sm:justify-between sm:gap-8 lg:col-span-12">
          <p>
            © {new Date().getFullYear()} {clinic.name}. Treatments are carried
            out by registered nurses after a face-to-face consultation. Results
            vary from person to person.
          </p>
          <CookieSettingsButton className="-my-3 shrink-0 self-start py-3 text-room-foreground underline underline-offset-[0.2em]" />
        </div>
      </FadeUp>
    </section>
  )
}

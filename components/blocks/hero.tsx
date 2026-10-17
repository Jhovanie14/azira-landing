import { BookButton, CallButton } from "@/components/cta"
import { Plate, PlaceholderNote } from "@/components/plate"
import type { Clinic, ImageAsset } from "@/content/schema"

type HeroProps = {
  headline: string
  intro: string
  /** The clinic's own treatment shot, set behind the hero */
  image: ImageAsset
  phone: Clinic["phone"]
  /** Block 4, the credentials, set under the actions */
  credentials: React.ReactNode
  /** Block 3, the enquiry form: a light card on the right on desktop */
  form: React.ReactNode
}

/**
 * Block 2, as in the framework: a dark band with the clinic's photo behind,
 * the headline that matches the ad and both actions on the left, the form on
 * the right. Nothing here animates on load, so LCP stays fast.
 */
export function Hero({
  headline,
  intro,
  image,
  phone,
  credentials,
  form,
}: HeroProps) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-room text-room-muted"
    >
      <Plate
        image={image}
        preload
        placeholder="behind"
        sizes="100vw"
        className="absolute inset-0 -z-10"
        // Keep the hands in the open strip between the copy and the form
        imageClassName="object-[60%_50%]"
      />
      {/* Scrim: dark only behind the copy, so the photo shows through the rest */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-b from-room/90 via-room/80 via-55% to-room/45 lg:bg-linear-to-r lg:from-room/95 lg:via-room/75 lg:via-45% lg:to-room/15"
      />

      <div className="shell grid gap-y-10 pt-10 lg:grid-cols-12 lg:gap-x-12 lg:pt-16 lg:pb-16">
        <div className="flex flex-col lg:col-span-7">
          <h1
            id="hero-heading"
            className="max-w-[16ch] text-[2.25rem] leading-[1.1] tracking-[-0.01em] text-room-foreground sm:text-5xl lg:text-6xl xl:text-[4.25rem] xl:leading-[1.05]"
          >
            {headline}
          </h1>
          <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed lg:mt-6 lg:text-xl">
            {intro}
          </p>

          <div
            id="hero-actions"
            className="mt-8 grid gap-2.5 sm:flex sm:flex-wrap"
          >
            <BookButton
              size="cta"
              variant="inverse"
              className="w-full sm:w-auto"
            >
              Book consultation
            </BookButton>
            <CallButton
              dial={phone.dial}
              size="cta"
              variant="outline-inverse"
              className="w-full sm:w-auto"
            >
              Call {phone.display}
            </CallButton>
          </div>

          <div className="mt-10 lg:mt-12">{credentials}</div>

          {/* Wall label for the photo behind, at the foot of the band */}
          <div className="mt-10 flex flex-col gap-3 lg:mt-auto lg:pt-12">
            {image.caption && (
              <p className="caption text-room-muted">{image.caption}</p>
            )}
            <PlaceholderNote image={image} className="max-w-[52ch]" />
          </div>
        </div>

        {form}
      </div>
    </section>
  )
}

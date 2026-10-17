"use client"

import Image from "next/image"
import { ExpandIcon } from "lucide-react"

import { FadeUp } from "@/components/motion"
import { Plate, WallLabel } from "@/components/plate"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ImageAsset, ResultItem } from "@/content/schema"

type ResultsProps = {
  heading: string
  /** Already filtered: consented, and never a prescription-only treatment */
  items: (ResultItem & { treatmentName: string })[]
}

/** Block 10 (optional): real results, on the page only, never in the ads */
export function Results({ heading, items }: ResultsProps) {
  return (
    <section aria-labelledby="results-heading" className="py-20 lg:py-32">
      <FadeUp>
        <div className="shell flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="results-heading"
            className="text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:text-5xl"
          >
            {heading}
          </h2>
          <p className="text-sm text-copy md:hidden" aria-hidden>
            Swipe to see more
          </p>
        </div>

        <ul
          aria-label="Before and after photos"
          tabIndex={0}
          className="shell mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto pb-4 md:grid md:snap-none md:grid-cols-3 md:gap-8 md:overflow-visible md:pb-0 lg:mt-14"
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto"
            >
              <figure>
                {item.kind === "photo" ? (
                  <PhotoPair item={item} label={item.treatmentName} />
                ) : (
                  <Plate
                    tone="light"
                    sizes="(min-width: 768px) 30vw, 82vw"
                    className="aspect-[4/3]"
                    image={{
                      id: `result-${index + 1}`,
                      alt: `Placeholder for a before and after photo: ${item.treatmentName}`,
                      note: item.note,
                    }}
                  />
                )}
                <WallLabel className="text-copy">
                  {item.treatmentName} · {item.sessions} ·{" "}
                  {item.timeBetweenPhotos} apart · Results vary
                </WallLabel>
              </figure>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  )
}

function PhotoPair({
  item,
  label,
}: {
  item: Extract<ResultItem, { kind: "photo" }>
  label: string
}) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="group relative grid w-full grid-cols-2 gap-px bg-hairline text-left"
          />
        }
      >
        <Half
          image={item.before}
          tag="Before"
          sizes="(min-width: 768px) 15vw, 41vw"
        />
        <Half
          image={item.after}
          tag="After"
          sizes="(min-width: 768px) 15vw, 41vw"
        />
        <span className="absolute right-2 bottom-2 flex size-9 items-center justify-center bg-background/90 text-foreground">
          <ExpandIcon aria-hidden className="size-4 stroke-[1.5]" />
          <span className="sr-only">Enlarge {label} before and after</span>
        </span>
      </DialogTrigger>
      <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-4xl">
        <DialogTitle className="text-xl">{label}: before and after</DialogTitle>
        <DialogDescription className="text-copy">
          {item.sessions} · {item.timeBetweenPhotos} between photos · Results
          vary
        </DialogDescription>
        <div className="grid grid-cols-2 gap-2">
          <Half image={item.before} tag="Before" sizes="45vw" />
          <Half image={item.after} tag="After" sizes="45vw" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Half({
  image,
  tag,
  sizes,
}: {
  image: ImageAsset
  tag: string
  sizes: string
}) {
  return (
    <span className="relative block aspect-[3/4] overflow-hidden bg-muted">
      {image.src && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      )}
      <span className="caption absolute top-2 left-2 bg-background/90 px-1.5 py-0.5 text-[0.6875rem] text-foreground">
        {tag}
      </span>
    </span>
  )
}

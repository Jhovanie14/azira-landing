import Image from "next/image"
import { ImageIcon } from "lucide-react"

import type { ImageAsset } from "@/content/schema"
import { cn } from "@/lib/utils"

type PlateProps = {
  image: ImageAsset
  /** next/image sizes hint for the rendered width */
  sizes: string
  /** Aspect ratio and sizing classes */
  className?: string
  /** Placeholder ground: dark for treatment stills, light for portraits */
  tone?: "dark" | "light"
  /** Preload the LCP image in the first viewport */
  preload?: boolean
  /** Extra classes for the image, e.g. object-position */
  imageClassName?: string
  /**
   * How a missing image is marked: "fill" centres the brief in the plate;
   * "behind" leaves the plate plain, for photos used behind content (show a
   * PlaceholderNote nearby instead)
   */
  placeholder?: "fill" | "behind"
}

/**
 * A photographic plate. Renders the client's image once `image.src` is set;
 * until then it renders a clearly marked placeholder naming the asset needed.
 */
export function Plate({
  image,
  sizes,
  className,
  tone = "dark",
  preload = false,
  placeholder = "fill",
  imageClassName,
}: PlateProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        tone === "dark" ? "bg-plate" : "bg-plate-light",
        className
      )}
    >
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={cn("object-cover", imageClassName)}
        />
      ) : placeholder === "behind" ? (
        <div
          role="img"
          aria-label={image.alt}
          data-placeholder={image.id}
          className="absolute inset-0"
        />
      ) : (
        <PlaceholderFill image={image} tone={tone} />
      )}
    </div>
  )
}

function PlaceholderFill({
  image,
  tone,
}: {
  image: ImageAsset
  tone: "dark" | "light"
}) {
  return (
    <div
      role="img"
      aria-label={image.alt}
      data-placeholder={image.id}
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center outline -outline-offset-8",
        tone === "dark"
          ? "text-plate-ink outline-plate-ink/25"
          : "text-copy outline-copy/20"
      )}
    >
      <ImageIcon aria-hidden className="size-6 stroke-[1.25]" />
      <span className="caption">Placeholder</span>
      <span className="max-w-[28ch] text-sm leading-snug">{image.note}</span>
      <span className="caption figures tracking-[0.04em] normal-case opacity-80">
        {"public/assets/<clinic>/"}
        {image.id}.jpg
      </span>
    </div>
  )
}

/** Inline brief for a missing photo that sits behind content */
export function PlaceholderNote({
  image,
  className,
}: {
  image: ImageAsset
  className?: string
}) {
  if (image.src) return null
  return (
    <p
      aria-hidden
      className={cn("flex items-start gap-2.5 text-plate-ink", className)}
    >
      <ImageIcon className="mt-0.5 size-4 shrink-0 stroke-[1.25]" />
      <span className="text-xs leading-relaxed">
        <span className="caption">Placeholder photo behind</span>{" "}
        <span className="figures opacity-80">
          {"public/assets/<clinic>/"}
          {image.id}.jpg
        </span>
        <span className="block">{image.note}</span>
      </span>
    </p>
  )
}

/** Gallery wall label, bound tight under its plate */
export function WallLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <figcaption className={cn("caption mt-2", className)}>
      {children}
    </figcaption>
  )
}

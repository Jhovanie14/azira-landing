import Image from "next/image"

import type { ImageAsset } from "@/content/schema"

/** Clinic logo, or a marked placeholder until public/assets has the file */
export function Logo({ logo }: { logo: ImageAsset }) {
  if (logo.src) {
    return (
      <Image
        src={logo.src}
        alt={logo.alt}
        width={148}
        height={44}
        preload
        className="h-10 w-auto"
      />
    )
  }

  return (
    <span
      data-placeholder={logo.id}
      className="inline-flex h-11 flex-col justify-center border border-dashed border-copy/60 px-3"
    >
      <span className="font-heading text-lg leading-none text-foreground">
        {logo.alt}
      </span>
      <span className="caption mt-1 text-[0.625rem] leading-none text-copy">
        Logo placeholder
      </span>
    </span>
  )
}

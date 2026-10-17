import { PhoneIcon } from "lucide-react"

import { Logo } from "@/components/logo"
import type { Clinic, ImageAsset } from "@/content/schema"

/** Block 1: logo and phone only. No menu: nothing that leads off the page. */
export function SlimHeader({
  logo,
  phone,
}: {
  logo: ImageAsset
  phone: Clinic["phone"]
}) {
  return (
    <header className="border-b border-copy">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Logo logo={logo} />
        <a
          href={`tel:${phone.dial}`}
          className="group flex min-h-11 items-center gap-2.5 text-foreground no-underline"
        >
          <PhoneIcon aria-hidden className="size-4 stroke-[1.5]" />
          <span className="caption hidden text-copy md:inline">
            Call the clinic
          </span>
          <span className="figures text-[0.9375rem] tracking-[0.06em] group-hover:underline">
            {phone.display}
          </span>
        </a>
      </div>
    </header>
  )
}

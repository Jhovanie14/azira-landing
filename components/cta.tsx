"use client"

import type { VariantProps } from "class-variance-authority"
import { PhoneIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"

type CtaProps = VariantProps<typeof buttonVariants> & {
  className?: string
  children: React.ReactNode
}

export const ENQUIRY_ANCHOR = "enquire"
/** Fired when a Book button sends someone to the form, so it can highlight */
export const ENQUIRY_HIGHLIGHT_EVENT = "enquiry:highlight"

/** Scrolls to the enquiry form and puts focus in it; never leaves the page */
export function BookButton({ children, ...props }: CtaProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const section = document.getElementById(ENQUIRY_ANCHOR)
    if (!section) return
    event.preventDefault()
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })
    section
      .querySelector<HTMLElement>("[data-enquiry-focus]")
      ?.focus({ preventScroll: true })
    window.dispatchEvent(new Event(ENQUIRY_HIGHLIGHT_EVENT))
  }

  return (
    <Button
      {...props}
      nativeButton={false}
      render={<a href={`#${ENQUIRY_ANCHOR}`} onClick={handleClick} />}
    >
      {children}
    </Button>
  )
}

/** Dials the clinic */
export function CallButton({
  dial,
  children,
  ...props
}: CtaProps & { dial: string }) {
  return (
    <Button {...props} nativeButton={false} render={<a href={`tel:${dial}`} />}>
      <PhoneIcon aria-hidden className="stroke-[1.5]" />
      {children}
    </Button>
  )
}

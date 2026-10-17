"use client"

import { useEffect, useState } from "react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"

import { BookButton, CallButton, ENQUIRY_ANCHOR } from "@/components/cta"
import { EASE_OUT } from "@/components/motion"
import type { Clinic } from "@/content/schema"

/**
 * Block 14: Call and Book fixed to the bottom of the screen on phones.
 * Slides in once the hero's own buttons have scrolled away, and steps aside
 * while the enquiry form is on screen so it never covers a field.
 */
export function MobileActionBar({ phone }: { phone: Clinic["phone"] }) {
  const [heroGone, setHeroGone] = useState(false)
  const [formInView, setFormInView] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero-actions")
    const form = document.getElementById(ENQUIRY_ANCHOR)
    if (!hero || !form) return

    const heroObserver = new IntersectionObserver(([entry]) => {
      setHeroGone(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    })
    const formObserver = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { rootMargin: "0px 0px -15% 0px" }
    )
    heroObserver.observe(hero)
    formObserver.observe(form)
    return () => {
      heroObserver.disconnect()
      formObserver.disconnect()
    }
  }, [])

  return (
    <AnimatePresence>
      {heroGone && !formInView && (
        <m.div
          key="bar"
          className="fixed inset-x-0 bottom-[var(--consent-banner-h,0px)] z-40 grid grid-cols-2 border-t border-copy bg-background pb-[env(safe-area-inset-bottom)] md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: EASE_OUT }}
        >
          <CallButton
            dial={phone.dial}
            size="cta"
            variant="ghost"
            className="h-16 border-r border-copy"
          >
            Call
          </CallButton>
          <BookButton size="cta" className="h-16">
            Book
          </BookButton>
        </m.div>
      )}
    </AnimatePresence>
  )
}

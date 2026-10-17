"use client"

import { LazyMotion, MotionConfig } from "motion/react"
import * as m from "motion/react-m"

const loadFeatures = () =>
  import("./motion-features").then((module) => module.default)

/** One easing for every moment: calm exponential ease-out */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

/**
 * Loads only Motion's DOM animation features (LazyMotion + domAnimation),
 * fetched after the first paint, and honours prefers-reduced-motion: with it
 * set, Motion drops movement and keeps only short opacity changes.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}

/**
 * Section fade-up on scroll: once, 12px, about 400ms. Never use it on the hero
 * headline, hero image or form, so LCP stays fast.
 */
export function FadeUp({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <m.div
      data-fade
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  )
}

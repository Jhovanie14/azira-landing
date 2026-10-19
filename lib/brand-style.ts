import type { CSSProperties } from "react"

import type { Brand, BrandColours } from "@/content/schema"

/** The colour roles as --brand-* variables, read by the tokens in app/globals.css */
export function colourVars(c: BrandColours): Record<string, string> {
  return {
    "--brand-surface": c.surface,
    "--brand-ink": c.ink,
    "--brand-text": c.text,
    "--brand-panel": c.panel,
    "--brand-hairline": c.hairline,
    "--brand-line": c.line,
    "--brand-room": c.room,
    "--brand-room-ink": c.roomInk,
    "--brand-room-text": c.roomText,
    "--brand-accent": c.accent,
    "--brand-accent-ink": c.accentInk,
    "--brand-destructive": c.destructive,
  }
}

/** The whole brand as --brand-* variables for <html> */
export function brandStyle(brand: Brand): CSSProperties {
  return {
    ...colourVars(brand.colours),
    "--brand-radius": brand.radius,
    "--brand-button-case": brand.button.textTransform,
    "--brand-button-tracking": brand.button.letterSpacing,
  } as CSSProperties
}

import type { CSSProperties } from "react"

import type { Brand } from "@/content/schema"

/** The brand as --brand-* CSS variables, read by the tokens in app/globals.css */
export function brandStyle(brand: Brand): CSSProperties {
  const c = brand.colours
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
    "--brand-radius": brand.radius,
    "--brand-button-case": brand.button.textTransform,
    "--brand-button-tracking": brand.button.letterSpacing,
  } as CSSProperties
}

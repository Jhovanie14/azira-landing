/**
 * The colour review: lets a clinic compare palettes on the real page and send
 * back its choice as a link. Inert unless NEXT_PUBLIC_PALETTE_PREVIEW is "1"
 * (see next.config.ts). Once the clinic chooses, the winning colours become
 * brand.colours and the palettes file, panel and head script go.
 */

import type { Palette } from "@/content/schema"
import { colourVars } from "@/lib/brand-style"

export const PALETTE_PARAM = "palette"
export const PALETTE_STORAGE_KEY = "palette-review"
export const PALETTE_ATTR = "data-palette"

/** What the panel and the head script need for each palette */
export type PaletteOption = {
  id: string
  label: string
  blurb: string
  /** Ground, panel, dark band and accent, for the swatch row */
  swatch: [string, string, string, string]
  vars: Record<string, string>
}

export function paletteOptions(palettes: Palette[]): PaletteOption[] {
  return palettes.map((p) => ({
    id: p.id,
    label: p.label,
    blurb: p.blurb,
    swatch: [
      p.colours.surface,
      p.colours.panel,
      p.colours.room,
      p.colours.accent,
    ],
    vars: colourVars(p.colours),
  }))
}

/** The shareable link for a palette: the current page with ?palette=<id> */
export function withPalette(href: string, id: string) {
  const url = new URL(href)
  url.searchParams.set(PALETTE_PARAM, id)
  return url.toString()
}

/**
 * Inline script for <head>: applies the chosen palette before first paint,
 * so the page never flashes the default colours. The URL wins over storage;
 * unknown values are ignored.
 */
export function paletteScriptSource(options: PaletteOption[]) {
  const registry = Object.fromEntries(options.map((o) => [o.id, o.vars]))
  return `(function(){try{var r=${JSON.stringify(registry)};var q=new URLSearchParams(location.search).get(${JSON.stringify(PALETTE_PARAM)});var s=null;try{s=localStorage.getItem(${JSON.stringify(PALETTE_STORAGE_KEY)})}catch(e){}var id=r[q]?q:r[s]?s:null;if(!id)return;var d=document.documentElement,v=r[id];for(var k in v)d.style.setProperty(k,v[k]);d.setAttribute(${JSON.stringify(PALETTE_ATTR)},id);try{localStorage.setItem(${JSON.stringify(PALETTE_STORAGE_KEY)},id)}catch(e){}}catch(e){}})()`
}

import type { Metadata, Viewport } from "next"

import "./globals.css"
import { PalettePanel } from "@palette/panel"
import { site } from "@/content"
import { activeFonts } from "@/content/fonts"
import { brandStyle } from "@/lib/brand-style"
import { paletteOptions, paletteScriptSource } from "@/lib/palette-review"
import { cn } from "@/lib/utils"

// Meta Business Manager domain verification, from an env var per deployment
const metaDomainVerification = process.env.META_DOMAIN_VERIFICATION?.trim()

// Colour review for the client (preview builds only, see next.config.ts)
const palettePreview =
  process.env.NEXT_PUBLIC_PALETTE_PREVIEW === "1" && !!site.palettes?.length
const palettes = palettePreview ? paletteOptions(site.palettes ?? []) : []

export const metadata: Metadata = {
  other: metaDomainVerification
    ? { "facebook-domain-verification": metaDomainVerification }
    : undefined,
}

export const viewport: Viewport = {
  themeColor: site.brand.colours.surface,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en-GB"
      className={cn(activeFonts.heading.variable, activeFonts.body.variable)}
      style={brandStyle(site.brand)}
      // The palette head script sets colours before React hydrates
      suppressHydrationWarning={palettePreview}
    >
      {palettePreview && (
        <head>
          <script
            dangerouslySetInnerHTML={{ __html: paletteScriptSource(palettes) }}
          />
        </head>
      )}
      <body>
        {children}
        {palettePreview && <PalettePanel options={palettes} />}
        {/* Without JavaScript, fade-up sections must still be visible */}
        <noscript>
          <style>{`[data-fade]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  )
}

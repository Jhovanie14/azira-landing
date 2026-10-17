import type { Metadata, Viewport } from "next"

import "./globals.css"
import { site } from "@/content"
import { activeFonts } from "@/content/fonts"
import { brandStyle } from "@/lib/brand-style"
import { cn } from "@/lib/utils"

// Meta Business Manager domain verification, from an env var per deployment
const metaDomainVerification = process.env.META_DOMAIN_VERIFICATION?.trim()

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
    >
      <body>
        {children}
        {/* Without JavaScript, fade-up sections must still be visible */}
        <noscript>
          <style>{`[data-fade]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  )
}

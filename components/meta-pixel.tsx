"use client"

import Script from "next/script"

import { useConsent } from "@/components/consent"

// Meta Pixel, loaded only after cookie consent. The ID comes from
// NEXT_PUBLIC_META_PIXEL_ID and is never hard-coded; a malformed ID loads
// nothing.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim()
const VALID_PIXEL_ID = PIXEL_ID && /^\d{8,20}$/.test(PIXEL_ID) ? PIXEL_ID : null

export function MetaPixel() {
  const consent = useConsent()
  if (!VALID_PIXEL_ID || consent !== "granted") return null

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${VALID_PIXEL_ID}');fbq('track','PageView');`}
    </Script>
  )
}

/**
 * Fires the Lead event after a successful enquiry. The lead ID doubles as
 * Meta's eventID, so a later server-side (Conversions API) event for the same
 * lead is de-duplicated. Does nothing without consent.
 */
export function trackLead(leadId: string, concern: string) {
  if (!VALID_PIXEL_ID || !window.fbq || !leadId) return
  window.fbq("track", "Lead", { content_name: concern }, { eventID: leadId })
}

// Ad tracking carried by every enquiry. Captured from the landing URL and kept
// for the visit (sessionStorage), so it survives reloads and in-page changes.

export const TRACKING_KEYS = [
  "gclid",
  "fbclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const

export type TrackingKey = (typeof TRACKING_KEYS)[number]
/** Tracking values plus the page the visit landed on */
export type Tracking = Partial<Record<TrackingKey | "landing_page", string>>

/** Query parameter that selects the headline variant: ?h=<ad group> */
export const AD_GROUP_PARAM = "h"

const VISIT_KEY = "visit-tracking"

function clean(value: string | null | undefined) {
  // Cap length so a crafted URL can't bloat the form or the CRM record
  return value?.trim().slice(0, 200) || undefined
}

export function readTracking(params: URLSearchParams): Tracking {
  const tracking: Tracking = {}
  for (const key of TRACKING_KEYS) {
    const value = clean(params.get(key))
    if (value) tracking[key] = value
  }
  return tracking
}

export function readAdGroup(params: URLSearchParams) {
  return clean(params.get(AD_GROUP_PARAM))?.toLowerCase()
}

/**
 * Browser only. Merges this page's URL tracking into the visit record and
 * returns it. The landing page is the first page of the visit.
 */
export function rememberVisitTracking(): Tracking {
  const fromUrl = readTracking(new URLSearchParams(window.location.search))
  let stored: Tracking = {}
  try {
    stored = JSON.parse(window.sessionStorage.getItem(VISIT_KEY) ?? "{}")
  } catch {
    // Corrupt or blocked storage: fall back to the URL alone
  }
  const visit: Tracking = {
    landing_page:
      stored.landing_page ??
      clean(window.location.pathname + window.location.search),
    ...stored,
    // A new ad click in the same visit wins over older values
    ...fromUrl,
  }
  try {
    window.sessionStorage.setItem(VISIT_KEY, JSON.stringify(visit))
  } catch {
    // Storage blocked: the URL values still go with this submit
  }
  return visit
}

const META_SOURCES = ["facebook", "fb", "instagram", "ig", "meta"]

/** Meta traffic: tagged with a Meta utm_source, or carrying Meta's click id */
export function isMetaTraffic(params: URLSearchParams) {
  const source = params.get("utm_source")?.toLowerCase()
  return params.has("fbclid") || (!!source && META_SOURCES.includes(source))
}

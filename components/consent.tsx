"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"

import { Button } from "@/components/ui/button"

// Cookie consent for marketing tags (UK PECR): nothing that tracks loads until
// the visitor accepts, rejecting is as easy as accepting, and the choice can
// be changed at any time from "Cookie settings".

export type Consent = "granted" | "denied" | "unset"

const STORAGE_KEY = "cookie-consent"
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182 // ask again after about six months
const listeners = new Set<() => void>()

function readConsent(): Consent {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return "unset"
    const { value, at } = JSON.parse(raw) as { value?: string; at?: string }
    if (!at || Date.now() - Date.parse(at) > MAX_AGE_MS) return "unset"
    return value === "granted" || value === "denied" ? value : "unset"
  } catch {
    return "unset"
  }
}

type Fbq = (...args: unknown[]) => void
declare global {
  interface Window {
    fbq?: Fbq
  }
}

export function setConsent(value: Consent) {
  try {
    if (value === "unset") window.localStorage.removeItem(STORAGE_KEY)
    else
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ value, at: new Date().toISOString() })
      )
  } catch {
    // Storage blocked: the choice holds for this page view only
  }
  // A pixel that already loaded can't be unloaded, but it can stop tracking
  if (window.fbq && value !== "unset") {
    window.fbq("consent", value === "granted" ? "grant" : "revoke")
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", listener)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", listener)
  }
}

/** "pending" until hydrated, so nothing consent-gated renders on the server */
export function useConsent(): Consent | "pending" {
  return useSyncExternalStore(subscribe, readConsent, () => "pending")
}

/** Bottom banner shown until the visitor chooses */
export function CookieBanner() {
  const consent = useConsent()
  const ref = useRef<HTMLDivElement>(null)
  const visible = consent === "unset"

  // Lift the mobile Call/Book bar above the banner while both are showing
  useEffect(() => {
    const root = document.documentElement
    const node = ref.current
    if (!visible || !node) {
      root.style.removeProperty("--consent-banner-h")
      return
    }
    const observer = new ResizeObserver(([entry]) => {
      root.style.setProperty(
        "--consent-banner-h",
        `${entry.borderBoxSize[0].blockSize}px`
      )
    })
    observer.observe(node)
    return () => {
      observer.disconnect()
      root.style.removeProperty("--consent-banner-h")
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Cookie choice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-copy bg-background pb-[env(safe-area-inset-bottom)]"
    >
      <div className="shell flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="max-w-[60ch] text-sm leading-relaxed text-copy">
          We&apos;d like to use cookies to see which adverts bring people here.
          They stay off unless you accept.
        </p>
        <div className="grid shrink-0 grid-cols-2 gap-2">
          <Button
            variant="outline"
            className="h-11 px-5"
            onClick={() => setConsent("denied")}
          >
            Reject
          </Button>
          <Button
            variant="outline"
            className="h-11 px-5"
            onClick={() => setConsent("granted")}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}

/** Reopens the banner so the visitor can change their choice */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => setConsent("unset")}
      className={className}
    >
      Cookie settings
    </button>
  )
}

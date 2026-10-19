"use client"

import { useEffect, useId, useState, useSyncExternalStore } from "react"
import { CheckIcon, PaletteIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  PALETTE_ATTR,
  PALETTE_STORAGE_KEY,
  withPalette,
  type PaletteOption,
} from "@/lib/palette-review"
import { cn } from "@/lib/utils"

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: [PALETTE_ATTR],
  })
  return () => observer.disconnect()
}

const readCurrent = () =>
  document.documentElement.getAttribute(PALETTE_ATTR) ?? ""

/** Writes the palette to <html>, to storage and to the address bar */
function apply(option: PaletteOption) {
  const root = document.documentElement
  for (const [name, value] of Object.entries(option.vars)) {
    root.style.setProperty(name, value)
  }
  root.setAttribute(PALETTE_ATTR, option.id)
  try {
    localStorage.setItem(PALETTE_STORAGE_KEY, option.id)
  } catch {
    // Storage blocked: the address bar still carries the choice
  }
  window.history.replaceState(
    window.history.state,
    "",
    withPalette(window.location.href, option.id)
  )
}

/** Review-only colour switcher. Rendered in preview builds only. */
export function PalettePanel({ options }: { options: PaletteOption[] }) {
  const stored = useSyncExternalStore(subscribe, readCurrent, () => "")
  const current = options.find((o) => o.id === stored) ?? options[0]
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<{
    id: string
    url: string
    manual: boolean
  } | null>(null)
  const panelId = useId()
  const copyState = copied?.id === current.id ? copied : null

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  async function copyLink() {
    const url = withPalette(window.location.href, current.id)
    try {
      await navigator.clipboard.writeText(url)
      setCopied({ id: current.id, url, manual: false })
    } catch {
      setCopied({ id: current.id, url, manual: true })
    }
  }

  return (
    <div className="fixed right-4 bottom-[calc(var(--consent-banner-h,0px)+5rem)] z-[60] flex flex-col items-end gap-3 md:bottom-[calc(var(--consent-banner-h,0px)+1.5rem)]">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Choose a colour palette"
          className="max-h-[calc(100dvh-var(--consent-banner-h,0px)-11rem)] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto overscroll-contain border border-copy bg-background p-4 text-copy shadow-[0_18px_40px_-18px_color-mix(in_oklab,var(--foreground)_35%,transparent)]"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="caption text-foreground">Colour palette</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-m-2 flex size-11 items-center justify-center text-foreground"
            >
              <XIcon aria-hidden className="size-4 stroke-[1.5]" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <p className="mt-1 text-sm leading-snug">
            Preview only. Pick one, then copy the link and send it back.
          </p>

          <ul className="mt-4 grid gap-2">
            {options.map((option) => {
              const on = option.id === current.id
              return (
                <li key={option.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => apply(option)}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-3 border bg-background px-3 py-2.5 text-left transition-colors hover:border-foreground",
                      on
                        ? "border-foreground shadow-[inset_0_0_0_1px_var(--foreground)]"
                        : "border-hairline"
                    )}
                  >
                    <span className="flex shrink-0" aria-hidden>
                      {option.swatch.map((colour, index) => (
                        <span
                          key={index}
                          className="size-5 border border-copy/20 not-first:-ml-1"
                          style={{ background: colour }}
                        />
                      ))}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-foreground">
                        {option.label}
                      </span>
                      <span className="block text-sm leading-snug">
                        {option.blurb}
                      </span>
                    </span>
                    {on && (
                      <CheckIcon
                        aria-hidden
                        className="size-4 shrink-0 stroke-[1.5] text-foreground"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
            <Button className="h-11" onClick={copyLink}>
              {copyState && !copyState.manual ? "Link copied" : "Copy link"}
            </Button>
            <Button
              variant="outline"
              className="h-11"
              onClick={() => apply(options[0])}
            >
              Reset
            </Button>
          </div>
          {copyState?.manual && (
            <input
              readOnly
              aria-label="Link to this palette"
              value={copyState.url}
              onFocus={(event) => event.currentTarget.select()}
              autoFocus
              className="mt-3 h-11 w-full border border-input bg-muted px-3 text-sm text-foreground"
            />
          )}
        </div>
      )}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 items-center gap-2 border border-copy bg-background px-4 text-sm font-medium text-foreground shadow-[0_12px_28px_-14px_color-mix(in_oklab,var(--foreground)_40%,transparent)]"
      >
        <PaletteIcon aria-hidden className="size-4 stroke-[1.5]" />
        Colours: {current.label}
      </button>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

// Renders under the slim header (app/[concern]/layout.tsx), so the clinic's
// phone number stays one tap away.
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="shell flex min-h-[70svh] flex-col justify-center py-20">
      <h1 className="max-w-[20ch] text-4xl leading-tight sm:text-5xl">
        This page didn&apos;t load properly
      </h1>
      <p className="mt-4 max-w-[46ch] text-lg leading-relaxed">
        Please try again. If it still won&apos;t load, call the clinic on the
        number above and a nurse will talk you through your options.
      </p>
      <Button size="cta" onClick={() => retry()} className="mt-8 w-fit">
        <RotateCcwIcon aria-hidden className="stroke-[1.5]" />
        Try again
      </Button>
    </main>
  )
}

import { AwardIcon } from "lucide-react"

import type { Clinic } from "@/content/schema"
import { cn } from "@/lib/utils"

/** Block 4: four proof points under the hero actions; phones show two */
export function CredentialRow({
  credentials,
  tone = "light",
  className,
}: {
  credentials: Clinic["credentials"]
  /** "dark" for use on a room band */
  tone?: "light" | "dark"
  className?: string
}) {
  const dark = tone === "dark"
  return (
    <ul
      aria-label="Credentials"
      className={cn(
        "grid grid-cols-2 border-t lg:grid-cols-4",
        dark ? "border-room-foreground/40" : "border-copy",
        className
      )}
    >
      {credentials.map((credential, index) => (
        <li
          key={credential.label}
          className={cn(
            "caption flex items-start gap-2 py-3.5 pr-3 not-first:pl-3 lg:first:pl-0 [&:nth-child(odd)]:pl-0 lg:[&:nth-child(odd)]:pl-3",
            "border-b even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0",
            dark
              ? "border-room-foreground/15 text-room-foreground"
              : "border-hairline text-foreground",
            index > 1 && "hidden lg:flex"
          )}
        >
          {credential.award && (
            <AwardIcon
              aria-hidden
              className={cn(
                "size-4 shrink-0 stroke-[1.25]",
                dark ? "text-mark" : "text-mark-ink"
              )}
            />
          )}
          {credential.label}
        </li>
      ))}
    </ul>
  )
}

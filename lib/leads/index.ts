import { sendLeadEmail } from "./email"
import type { Lead } from "./lead"
import { postLeadWebhook } from "./webhook"

export { readHiddenFields, type Lead } from "./lead"

const DESTINATIONS = {
  email: sendLeadEmail,
  webhook: postLeadWebhook,
} satisfies Record<string, (lead: Lead) => Promise<void>>

type Destination = keyof typeof DESTINATIONS

/**
 * Sends a lead to every destination in LEAD_DESTINATIONS (comma-separated:
 * "email", "webhook", or both). The lead counts as delivered if at least one
 * destination accepts it; failures are logged by lead ID, never with
 * personal details.
 */
export async function deliverLead(lead: Lead): Promise<{ ok: boolean }> {
  const destinations = (process.env.LEAD_DESTINATIONS ?? "")
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean)

  if (destinations.length === 0) {
    if (process.env.NODE_ENV === "production") {
      // Never drop a lead quietly: the visitor is told to call instead
      console.error(
        `[leads] LEAD_DESTINATIONS is not set; lead ${lead.leadId} was not delivered`
      )
      return { ok: false }
    }
    console.info(
      `[leads] No LEAD_DESTINATIONS set; lead ${lead.leadId} accepted in development but not sent`
    )
    return { ok: true }
  }

  const results = await Promise.allSettled(
    destinations.map((name) => {
      const send = DESTINATIONS[name as Destination]
      if (!send) throw new Error(`Unknown lead destination "${name}"`)
      return send(lead)
    })
  )

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      const reason =
        result.reason instanceof Error ? result.reason.message : result.reason
      console.error(
        `[leads] ${destinations[index]} failed for lead ${lead.leadId}: ${reason}`
      )
    }
  })

  return { ok: results.some((result) => result.status === "fulfilled") }
}

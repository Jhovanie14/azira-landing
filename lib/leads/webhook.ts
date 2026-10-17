import { flattenLead, type Lead } from "./lead"

/**
 * Posts the lead as flat JSON to LEAD_WEBHOOK_URL. One adapter covers a
 * Google Sheet (Apps Script web app), a GoHighLevel inbound webhook, or
 * Zapier/Make. LEAD_WEBHOOK_SECRET, if set, goes in the x-lead-secret header
 * so the receiver can reject anything else.
 */
export async function postLeadWebhook(lead: Lead) {
  const url = process.env.LEAD_WEBHOOK_URL
  if (!url) throw new Error("The webhook destination needs LEAD_WEBHOOK_URL")

  const secret = process.env.LEAD_WEBHOOK_SECRET
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(secret ? { "x-lead-secret": secret } : {}),
    },
    body: JSON.stringify(flattenLead(lead)),
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`)
  }
}

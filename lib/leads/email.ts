import { Resend } from "resend"

import { flattenLead, type Lead } from "./lead"

const LABELS: Record<string, string> = {
  name: "Name",
  mobile: "Mobile",
  email: "Email",
  concern: "Concern",
  treated_before: "Treated before?",
  start_when: "When to start",
  concern_page: "Page",
  ad_group: "Ad group",
  landing_page: "Landing page",
  gclid: "GCLID",
  fbclid: "fbclid",
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  utm_term: "utm_term",
  utm_content: "utm_content",
  received_at: "Received",
  lead_id: "Lead ID",
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function rows(lead: Lead) {
  const flat = flattenLead(lead)
  return Object.entries(LABELS)
    .map(([key, label]) => [label, flat[key as keyof typeof flat]] as const)
    .filter(([, value]) => value)
}

/**
 * Emails the lead to the clinic through Resend.
 * Needs RESEND_API_KEY, LEAD_EMAIL_TO (comma-separated) and LEAD_EMAIL_FROM
 * on a domain verified in Resend.
 */
export async function sendLeadEmail(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_EMAIL_TO
  const from = process.env.LEAD_EMAIL_FROM
  if (!apiKey || !to || !from) {
    throw new Error(
      "The email destination needs RESEND_API_KEY, LEAD_EMAIL_TO and LEAD_EMAIL_FROM"
    )
  }

  const lines = rows(lead)
  const resend = new Resend(apiKey)
  // The SDK returns errors rather than throwing; the idempotency key stops a
  // retry from emailing the same lead twice.
  const { error } = await resend.emails.send(
    {
      from,
      to: to.split(",").map((address) => address.trim()),
      replyTo: lead.email || undefined,
      subject: `New enquiry: ${lead.concern} – ${lead.name}`,
      text: [
        `New enquiry from the ${lead.concernPage} page. Call back on ${lead.mobile}.`,
        "",
        ...lines.map(([label, value]) => `${label}: ${value}`),
      ].join("\n"),
      html: `<p>New enquiry from the ${escapeHtml(lead.concernPage)} page. Call back on <strong>${escapeHtml(lead.mobile)}</strong>.</p><table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">${lines
        .map(
          ([label, value]) =>
            `<tr><td style="color:#555;border-bottom:1px solid #ddd">${escapeHtml(label)}</td><td style="border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`
        )
        .join("")}</table>`,
    },
    { idempotencyKey: `lead/${lead.leadId}` }
  )
  if (error) throw new Error(`Resend: ${error.message}`)
}

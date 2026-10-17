import type { ValidEnquiry } from "@/lib/enquiry-schema"
import { TRACKING_KEYS, type Tracking } from "@/lib/tracking"

/** A validated enquiry with everything needed to trace it to its advert */
export type Lead = ValidEnquiry & {
  leadId: string
  receivedAt: string
  clinic: string
  /** The concern page it came from, e.g. "Skin laxity" */
  concernPage: string
  page: string
  adGroup?: string
  tracking: Tracking
}

export function readHiddenFields(formData: FormData) {
  const get = (key: string, max = 200) =>
    String(formData.get(key) ?? "")
      .trim()
      .slice(0, max)
  const tracking: Tracking = {}
  for (const key of [...TRACKING_KEYS, "landing_page"] as const) {
    const value = get(key)
    if (value) tracking[key] = value
  }
  return {
    tracking,
    page: get("page"),
    adGroup: get("adGroup", 80) || undefined,
  }
}

/** One flat record, the same for every destination (sheet columns, CRM fields) */
export function flattenLead(lead: Lead) {
  return {
    lead_id: lead.leadId,
    received_at: lead.receivedAt,
    clinic: lead.clinic,
    concern_page: lead.concernPage,
    name: lead.name,
    mobile: lead.mobile,
    email: lead.email,
    concern: lead.concern,
    treated_before: lead.treatedBefore,
    start_when: lead.startWhen,
    ad_group: lead.adGroup ?? "",
    page: lead.page,
    landing_page: lead.tracking.landing_page ?? "",
    gclid: lead.tracking.gclid ?? "",
    fbclid: lead.tracking.fbclid ?? "",
    utm_source: lead.tracking.utm_source ?? "",
    utm_medium: lead.tracking.utm_medium ?? "",
    utm_campaign: lead.tracking.utm_campaign ?? "",
    utm_term: lead.tracking.utm_term ?? "",
    utm_content: lead.tracking.utm_content ?? "",
  }
}

export type FlatLead = ReturnType<typeof flattenLead>

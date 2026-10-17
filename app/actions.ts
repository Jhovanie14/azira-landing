"use server"

import { getConcern, site } from "@/content"
import { enquirySchema, errorSummary, fieldErrors } from "@/lib/enquiry-schema"
import { readValues, type EnquiryState } from "@/lib/enquiry-values"
import { deliverLead, readHiddenFields } from "@/lib/leads"

export async function submitEnquiry(
  _previous: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const values = readValues(formData)

  // Honeypot: people never see this field, so anything in it is a bot.
  // Report success so the bot learns nothing.
  if (String(formData.get("company") ?? "")) {
    return { status: "success", firstName: "", mobile: "", leadId: "" }
  }

  const page = getConcern(String(formData.get("slug") ?? ""))
  if (!page) {
    return {
      status: "error",
      message: "Something went wrong with this form. Please call the clinic.",
      fieldErrors: {},
      values,
    }
  }

  // The same schema the form already checked in the browser
  const parsed = enquirySchema(page.form).safeParse(values)
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error)
    return {
      status: "error",
      message: errorSummary(Object.keys(errors).length),
      fieldErrors: errors,
      values,
    }
  }

  const leadId = crypto.randomUUID()
  const { ok } = await deliverLead({
    ...parsed.data,
    ...readHiddenFields(formData),
    leadId,
    receivedAt: new Date().toISOString(),
    clinic: site.clinic.name,
    concernPage: page.concern,
  })

  if (!ok) {
    return {
      status: "error",
      message:
        "We couldn't send your enquiry just now. Please try again, or call the clinic.",
      fieldErrors: {},
      values,
    }
  }

  return {
    status: "success",
    firstName: parsed.data.name.split(/\s+/)[0],
    mobile: parsed.data.mobile,
    leadId,
  }
}

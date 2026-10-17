// Enquiry types and form helpers that are safe in the browser.
// Validation (Zod) lives in lib/enquiry.ts and runs on the server only.

export type EnquiryField =
  "name" | "mobile" | "email" | "concern" | "treatedBefore" | "startWhen"

export type EnquiryValues = Record<EnquiryField, string>

export type EnquiryState =
  | { status: "idle" }
  | {
      status: "error"
      message: string
      fieldErrors: Partial<Record<EnquiryField, string>>
      values: EnquiryValues
    }
  | { status: "success"; firstName: string; mobile: string; leadId: string }

export function readValues(formData: FormData): EnquiryValues {
  const get = (key: string) => String(formData.get(key) ?? "").trim()
  return {
    name: get("name").slice(0, 80),
    mobile: get("mobile").slice(0, 24),
    email: get("email").slice(0, 120),
    concern: get("concern"),
    treatedBefore: get("treatedBefore"),
    startWhen: get("startWhen"),
  }
}

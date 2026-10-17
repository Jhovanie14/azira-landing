import { z } from "zod"

import type { EnquiryField } from "@/lib/enquiry-values"

// The one enquiry schema, shared by the form (instant feedback in the browser)
// and the Server Action (the check that counts).

export type EnquiryOptions = {
  concernOptions: string[]
  treatedBeforeOptions: string[]
  startWhenOptions: string[]
}

/** UK mobile: 07xxx xxxxxx or +44 7xxx xxxxxx, spaces and dashes allowed */
export function normaliseMobile(raw: string) {
  const compact = raw.replace(/[\s\-().]/g, "")
  if (/^07\d{9}$/.test(compact)) return compact
  if (/^\+447\d{9}$/.test(compact)) return `0${compact.slice(3)}`
  if (/^00447\d{9}$/.test(compact)) return `0${compact.slice(4)}`
  return null
}

/** The schema for one page; the choices come from its content */
export function enquirySchema(options: EnquiryOptions) {
  const oneOf = (list: string[], message: string) =>
    z.string().refine((value) => list.includes(value), message)

  return z.object({
    name: z.string().trim().min(2, "Enter your name.").max(80),
    mobile: z
      .string()
      .trim()
      .min(1, "Enter your mobile number so a nurse can call you back.")
      .transform((value, ctx) => {
        const mobile = normaliseMobile(value)
        if (!mobile) {
          ctx.addIssue({
            code: "custom",
            message: "Enter a UK mobile number, like 07700 900123.",
          })
          return z.NEVER
        }
        return mobile
      }),
    // Email is optional: the nurse calls back on the mobile
    email: z.union([
      z.literal(""),
      z.email("Enter an email address like name@example.com.").max(120),
    ]),
    concern: oneOf(
      options.concernOptions,
      "Choose the concern that fits best."
    ),
    treatedBefore: oneOf(
      options.treatedBeforeOptions,
      "Tell us whether you've been treated before."
    ),
    startWhen: oneOf(
      options.startWhenOptions,
      "Tell us when you'd like to start."
    ),
  })
}

export type ValidEnquiry = z.infer<ReturnType<typeof enquirySchema>>

/** First message per field, in a shape the form can show */
export function fieldErrors(error: z.ZodError) {
  const errors: Partial<Record<EnquiryField, string>> = {}
  for (const issue of error.issues) {
    const field = issue.path[0] as EnquiryField
    errors[field] ??= issue.message
  }
  return errors
}

export function errorSummary(count: number) {
  return count === 1
    ? "One answer needs checking."
    : `${count} answers need checking.`
}

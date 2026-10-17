"use client"

import {
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { ArrowRightIcon, LoaderCircleIcon } from "lucide-react"

import { submitEnquiry } from "@/app/actions"
import { ENQUIRY_ANCHOR, ENQUIRY_HIGHLIGHT_EVENT } from "@/components/cta"
import { EASE_OUT } from "@/components/motion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Clinic, ConcernPage } from "@/content/schema"
import {
  readValues,
  type EnquiryField,
  type EnquiryState,
  type EnquiryValues,
} from "@/lib/enquiry-values"
import { readAdGroup, rememberVisitTracking } from "@/lib/tracking"
import { trackLead } from "@/components/meta-pixel"
import { cn } from "@/lib/utils"

type EnquiryFormProps = {
  slug: string
  /** concernOptions entry preselected for this visit */
  concern: string
  form: ConcernPage["form"]
  clinic: Pick<
    Clinic,
    "phone" | "privacyNotice" | "consultationFee" | "callbackPromise"
  >
}

const FIELD_ORDER: EnquiryField[] = [
  "name",
  "mobile",
  "email",
  "concern",
  "treatedBefore",
  "startWhen",
]

const FIELD_IDS: Record<EnquiryField, string> = {
  name: "enquiry-name",
  mobile: "enquiry-mobile",
  email: "enquiry-email",
  concern: "enquiry-concern",
  treatedBefore: "enquiry-treated-before",
  startWhen: "enquiry-start-when",
}

// A hit area of at least 44px around inline links, without moving the text
const INLINE_TARGET = "-my-3 inline-block py-3"

const initialState: EnquiryState = { status: "idle" }

/**
 * The shared Zod schema is loaded on demand: fetched when the visitor first
 * reaches the form, awaited on submit. It stays off the first page load.
 */
const loadSchema = () => import("@/lib/enquiry-schema")

/** Calls the server action; a dropped connection becomes a form error, not a crash */
async function sendEnquiry(
  previous: EnquiryState,
  data: FormData
): Promise<EnquiryState> {
  try {
    return await submitEnquiry(previous, data)
  } catch {
    return {
      status: "error",
      message: navigator.onLine
        ? "We couldn't send your enquiry just now. Please try again, or call the clinic."
        : "You seem to be offline. Check your connection and try again, or call the clinic.",
      fieldErrors: {},
      values: readValues(data),
    }
  }
}

/**
 * The page is static, so the ad's tracking comes from the browser: the
 * visit's stored values (gclid, fbclid, UTMs, landing page) plus this URL.
 */
function withTracking(data: FormData) {
  for (const [key, value] of Object.entries(rememberVisitTracking())) {
    if (value) data.set(key, value)
  }
  const adGroup = readAdGroup(new URLSearchParams(window.location.search))
  if (adGroup) data.set("adGroup", adGroup)
  data.set("page", window.location.pathname)
  return data
}

/** 07700900123 → 07700 900123 */
function formatMobile(mobile: string) {
  return mobile.length === 11
    ? `${mobile.slice(0, 5)} ${mobile.slice(5)}`
    : mobile
}

/**
 * Answers are kept for this tab only, so an in-app browser that reloads the
 * page (Instagram, Facebook) doesn't lose them. Cleared once sent.
 */
function useDraft(slug: string) {
  const key = `enquiry-draft:${slug}`
  const [draft, setDraft] = useState<EnquiryValues | null>(null)

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(key)
      // One-time restore after hydration; storage is unreadable during SSR
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setDraft(JSON.parse(raw) as EnquiryValues)
    } catch {
      // Storage unavailable or corrupt: start empty
    }
  }, [key])

  const save = useCallback(
    (form: HTMLFormElement) => {
      try {
        window.sessionStorage.setItem(
          key,
          JSON.stringify(readValues(new FormData(form)))
        )
      } catch {
        // Storage full or blocked: drafts are a convenience only
      }
    },
    [key]
  )

  const clear = useCallback(() => {
    try {
      window.sessionStorage.removeItem(key)
    } catch {
      // Nothing to clear
    }
  }, [key])

  return { draft, save, clear }
}

/** Counts Book clicks so the form can flash a highlight each time */
function useHighlight() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const onHighlight = () => setCount((n) => n + 1)
    window.addEventListener(ENQUIRY_HIGHLIGHT_EVENT, onHighlight)
    return () =>
      window.removeEventListener(ENQUIRY_HIGHLIGHT_EVENT, onHighlight)
  }, [])
  return count
}

/** Block 3: six fields, two of them qualifying, plus hidden ad tracking */
export function EnquiryForm({ slug, concern, form, clinic }: EnquiryFormProps) {
  const [serverState, formAction, pending] = useActionState(
    sendEnquiry,
    initialState
  )
  // Errors found in the browser by the shared schema, before any request
  const [clientError, setClientError] = useState<EnquiryState | null>(null)
  const state = clientError ?? serverState
  // Fields corrected since the last attempt; their errors stop showing
  const [edited, setEdited] = useState<ReadonlySet<string>>(new Set())
  const { draft, save, clear } = useDraft(slug)
  const highlight = useHighlight()
  const summaryRef = useRef<HTMLDivElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)

  // Keep the ad's tracking for the whole visit, from the moment it lands
  useEffect(() => {
    rememberVisitTracking()
  }, [])

  useEffect(() => {
    if (state.status === "error") summaryRef.current?.focus()
    if (state.status === "success") {
      clear()
      trackLead(state.leadId, concern)
      successRef.current?.focus()
    }
  }, [state, clear, concern])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const { enquirySchema, errorSummary, fieldErrors } = await loadSchema()
    setEdited(new Set())

    // Same schema as the Server Action: catch mistakes without a round trip
    const values = readValues(data)
    const parsed = enquirySchema(form).safeParse(values)
    if (!parsed.success) {
      const errors = fieldErrors(parsed.error)
      setClientError({
        status: "error",
        message: errorSummary(Object.keys(errors).length),
        fieldErrors: errors,
        values,
      })
      return
    }
    setClientError(null)
    withTracking(data)
    // Submit without React's automatic form reset, so a failed attempt
    // keeps every answer in place.
    startTransition(() => formAction(data))
  }

  function markEdited(name: string) {
    setEdited((previous) =>
      previous.has(name) ? previous : new Set(previous).add(name)
    )
  }

  const errors: Partial<Record<EnquiryField, string>> =
    state.status === "error"
      ? Object.fromEntries(
          Object.entries(state.fieldErrors).filter(([key]) => !edited.has(key))
        )
      : {}
  const values = state.status === "error" ? state.values : (draft ?? undefined)
  const errorFor = (field: EnquiryField) =>
    errors[field] ? [{ message: errors[field] }] : undefined

  return (
    <section
      id={ENQUIRY_ANCHOR}
      aria-labelledby="enquiry-heading"
      className="relative -mx-4 bg-muted px-4 py-10 text-copy sm:-mx-6 sm:px-6 lg:col-span-5 lg:mx-0 lg:self-start lg:px-8 lg:py-8"
    >
      {/* Scroll-to-form highlight: a ring that fades once the form arrives */}
      {highlight > 0 && (
        <m.span
          key={highlight}
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ boxShadow: "inset 0 0 0 2px var(--foreground)" }}
          animate={{ boxShadow: "inset 0 0 0 2px transparent" }}
          transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT }}
        />
      )}

      <AnimatePresence mode="wait" initial={false}>
        {state.status === "success" ? (
          <m.div
            key="success"
            className="py-6"
            aria-live="polite"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <h2
              ref={successRef}
              tabIndex={-1}
              data-enquiry-focus
              className="text-3xl leading-tight outline-none"
            >
              {state.firstName
                ? `Thank you, ${state.firstName}.`
                : "Thank you."}
            </h2>
            <p className="mt-4 max-w-[40ch] leading-relaxed">
              Your enquiry is with the clinic.{" "}
              {state.mobile
                ? `A nurse will call you on ${formatMobile(state.mobile)}. `
                : "A nurse will call you back. "}
              {clinic.callbackPromise}
            </p>
            <p className="mt-6 border-t border-hairline pt-6 leading-relaxed">
              Rather talk now?{" "}
              <a
                href={`tel:${clinic.phone.dial}`}
                className={cn(
                  INLINE_TARGET,
                  "font-medium text-foreground underline"
                )}
              >
                Call {clinic.phone.display}
              </a>
            </p>
          </m.div>
        ) : (
          <m.div
            key="form"
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
          >
            <h2
              id="enquiry-heading"
              className="text-[1.75rem] leading-tight lg:text-[1.625rem]"
            >
              {form.title}
            </h2>
            {/* One block answers what callers ask first: when, and what it costs */}
            <p className="mt-2 leading-relaxed">
              {form.intro} {clinic.callbackPromise}
            </p>
            <p className="mt-1 text-sm leading-snug">
              <span className="font-medium text-foreground">Consultation:</span>{" "}
              {clinic.consultationFee}
            </p>

            {state.status === "error" && (
              <Alert
                ref={summaryRef}
                tabIndex={-1}
                variant="destructive"
                className="mt-6 border-destructive bg-background outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destructive"
              >
                <AlertTitle>{state.message}</AlertTitle>
                {Object.keys(errors).length > 0 && (
                  <AlertDescription>
                    <ul className="mt-1 space-y-1">
                      {FIELD_ORDER.filter((field) => errors[field]).map(
                        (field) => (
                          <li key={field}>
                            <a
                              href={`#${FIELD_IDS[field]}`}
                              className="text-foreground"
                            >
                              {errors[field]}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </AlertDescription>
                )}
              </Alert>
            )}

            <form
              // Remount once a saved draft arrives so it fills the fields
              key={draft ? "draft" : "fresh"}
              onSubmit={handleSubmit}
              onFocus={() => void loadSchema()}
              onChange={(event) => {
                const target = event.target as EventTarget & { name?: string }
                if (target.name) markEdited(target.name)
                save(event.currentTarget)
              }}
              noValidate
              aria-busy={pending}
              className="mt-5 grid gap-4"
            >
              <input type="hidden" name="slug" value={slug} />
              {/* Honeypot: hidden from people and assistive tech */}
              <div
                aria-hidden
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              >
                <label>
                  Company
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Field data-invalid={!!errors.name}>
                  <FieldLabel htmlFor={FIELD_IDS.name}>Name</FieldLabel>
                  <Input
                    id={FIELD_IDS.name}
                    name="name"
                    maxLength={80}
                    autoComplete="name"
                    required
                    data-enquiry-focus
                    defaultValue={values?.name}
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? "enquiry-name-error" : undefined
                    }
                  />
                  <FieldError
                    id="enquiry-name-error"
                    errors={errorFor("name")}
                  />
                </Field>
                <Field data-invalid={!!errors.mobile}>
                  <FieldLabel htmlFor={FIELD_IDS.mobile}>Mobile</FieldLabel>
                  <Input
                    id={FIELD_IDS.mobile}
                    name="mobile"
                    maxLength={24}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    defaultValue={values?.mobile}
                    aria-invalid={!!errors.mobile}
                    aria-describedby={
                      errors.mobile ? "enquiry-mobile-error" : undefined
                    }
                  />
                  <FieldError
                    id="enquiry-mobile-error"
                    errors={errorFor("mobile")}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor={FIELD_IDS.email}>
                    Email{" "}
                    <span className="font-normal text-copy">(optional)</span>
                  </FieldLabel>
                  <Input
                    id={FIELD_IDS.email}
                    name="email"
                    maxLength={120}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    defaultValue={values?.email}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "enquiry-email-error" : undefined
                    }
                  />
                  <FieldError
                    id="enquiry-email-error"
                    errors={errorFor("email")}
                  />
                </Field>

                <Field data-invalid={!!errors.concern}>
                  <FieldLabel htmlFor={FIELD_IDS.concern}>
                    Your concern
                  </FieldLabel>
                  <Select
                    name="concern"
                    onValueChange={() => markEdited("concern")}
                    defaultValue={values?.concern || concern}
                    items={form.concernOptions.map((option) => ({
                      value: option,
                      label: option,
                    }))}
                  >
                    <SelectTrigger
                      id={FIELD_IDS.concern}
                      className="w-full"
                      aria-invalid={!!errors.concern}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {form.concernOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError errors={errorFor("concern")} />
                </Field>
              </div>

              <ChoiceGroup
                name="treatedBefore"
                legend="Have you been treated before?"
                id={FIELD_IDS.treatedBefore}
                options={form.treatedBeforeOptions}
                defaultValue={values?.treatedBefore}
                error={errors.treatedBefore}
                onEdit={markEdited}
              />

              <ChoiceGroup
                name="startWhen"
                legend="When would you like to start?"
                id={FIELD_IDS.startWhen}
                options={form.startWhenOptions}
                defaultValue={values?.startWhen}
                error={errors.startWhen}
                onEdit={markEdited}
              />

              <Button
                type="submit"
                size="cta"
                disabled={pending}
                className="mt-1 w-full"
              >
                {pending ? (
                  <>
                    <LoaderCircleIcon aria-hidden className="animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    {form.submitLabel}
                    <ArrowRightIcon aria-hidden className="stroke-[1.5]" />
                  </>
                )}
              </Button>

              <p className="text-sm leading-relaxed">
                We use your details only to reply to this enquiry.{" "}
                <PrivacyNotice paragraphs={clinic.privacyNotice} />
              </p>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/** A qualifying question as shadcn choice cards (FieldLabel wrapping Field) */
function ChoiceGroup({
  name,
  legend,
  id,
  options,
  defaultValue,
  error,
  onEdit,
}: {
  name: string
  legend: string
  id: string
  options: string[]
  defaultValue?: string
  error?: string
  onEdit: (name: string) => void
}) {
  const legendId = `${id}-legend`
  const errorId = `${id}-error`
  return (
    <FieldSet id={id} data-invalid={!!error} className="gap-3">
      <FieldLegend id={legendId} variant="label" className="mb-0">
        {legend}
      </FieldLegend>
      <RadioGroup
        name={name}
        onValueChange={() => onEdit(name)}
        defaultValue={defaultValue || undefined}
        aria-labelledby={legendId}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
        // Full-width rows on phones, an equal set of three where it fits
        className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
      >
        {options.map((option, index) => {
          const optionId = `${id}-${index}`
          return (
            <FieldLabel
              key={option}
              htmlFor={optionId}
              className={cn(
                "cursor-pointer bg-background font-normal text-foreground transition-colors has-data-checked:bg-background has-data-checked:shadow-[inset_0_0_0_1px_var(--foreground)] has-[>[data-slot=field]]:border-copy/50 has-[>[data-slot=field]]:hover:border-foreground has-data-checked:has-[>[data-slot=field]]:border-foreground *:data-[slot=field]:min-h-11 *:data-[slot=field]:px-3 *:data-[slot=field]:py-2",
                error && "has-[>[data-slot=field]]:border-destructive"
              )}
            >
              <Field orientation="horizontal" className="items-center gap-2.5">
                <RadioGroupItem id={optionId} value={option} />
                <span className="text-[0.9375rem] leading-snug xl:text-sm">
                  {option}
                </span>
              </Field>
            </FieldLabel>
          )
        })}
      </RadioGroup>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </FieldSet>
  )
}

function PrivacyNotice({ paragraphs }: { paragraphs: string[] }) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className={cn(
              INLINE_TARGET,
              "font-medium text-foreground underline underline-offset-[0.2em]"
            )}
          />
        }
      >
        How we use your details
      </DialogTrigger>
      <DialogContent className="max-h-[85svh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl leading-tight">
            How we use your details
          </DialogTitle>
          <DialogDescription className="text-base text-copy">
            Privacy notice for enquiries.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-base leading-relaxed text-copy">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

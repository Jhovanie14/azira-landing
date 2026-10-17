import { FadeUp } from "@/components/motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { ConcernPage } from "@/content/schema"

/** Block 12: the questions the clinic hears on every call, answered first */
export function Faqs({ faqs }: { faqs: ConcernPage["faqs"] }) {
  return (
    <section aria-labelledby="faqs-heading">
      <FadeUp className="shell grid gap-10 py-20 lg:grid-cols-12 lg:gap-8 lg:py-32">
        <h2
          id="faqs-heading"
          className="text-[2rem] leading-[1.12] sm:text-[2.5rem] lg:col-span-4 lg:text-5xl"
        >
          {faqs.heading}
        </h2>
        <Accordion className="lg:col-span-7 lg:col-start-6">
          {faqs.items.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeUp>
    </section>
  )
}

import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ConcernPage } from "@/components/concern-page"
import { concernSlugs, getConcern } from "@/content"

// Every concern page is prebuilt; unknown slugs 404
export const dynamicParams = false

export function generateStaticParams() {
  return concernSlugs().map((concern) => ({ concern }))
}

type Props = { params: Promise<{ concern: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getConcern((await params).concern)
  if (!page) return {}
  return {
    title: page.meta.title,
    description: page.meta.description,
    // Paid-traffic page: keep it out of search so it doesn't compete with
    // the clinic's main site.
    robots: { index: false, follow: false },
  }
}

/** The default page; ?h= variants are rewritten by proxy.ts to v/[headline]/[audience] */
export default async function DefaultConcernPage({ params }: Props) {
  const page = getConcern((await params).concern)
  if (!page) notFound()
  return <ConcernPage page={page} audience="all" />
}

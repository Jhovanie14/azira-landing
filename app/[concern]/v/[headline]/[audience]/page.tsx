import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ConcernPage } from "@/components/concern-page"
import { getConcern, getVariant, site } from "@/content"

// Prebuilt variants of each concern page. Visitors never see this URL:
// proxy.ts rewrites /<concern>?h=<ad group> here, so the matched headline is
// static HTML rather than a client-side swap.
export const dynamicParams = false

export function generateStaticParams() {
  return site.concerns.flatMap((page) => {
    const headlines = ["default", ...page.hero.headlines.map((h) => h.adGroup)]
    const audiences = page.hideResultsForMeta ? ["all", "meta"] : ["all"]
    return headlines.flatMap((headline) =>
      audiences
        // The default headline for everyone is the plain /<concern> page
        .filter((audience) => headline !== "default" || audience !== "all")
        .map((audience) => ({ concern: page.slug, headline, audience }))
    )
  })
}

type Props = {
  params: Promise<{ concern: string; headline: string; audience: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getConcern((await params).concern)
  if (!page) return {}
  return {
    title: page.meta.title,
    description: page.meta.description,
    robots: { index: false, follow: false },
    alternates: { canonical: `/${page.slug}` },
  }
}

export default async function ConcernVariantPage({ params }: Props) {
  const { concern, headline, audience } = await params
  const page = getConcern(concern)
  if (!page || (audience !== "all" && audience !== "meta")) notFound()
  const adGroup = headline === "default" ? undefined : headline
  if (adGroup && !getVariant(page, adGroup)) notFound()
  return <ConcernPage page={page} adGroup={adGroup} audience={audience} />
}

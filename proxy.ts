import { NextResponse, type NextRequest } from "next/server"

import { getConcern, getVariant, site } from "@/content"
import { isMetaTraffic, readAdGroup } from "@/lib/tracking"

/**
 * Keeps concern pages fully static while matching the ad:
 * /<concern>?h=<ad group> is rewritten to a prebuilt variant, so the visitor
 * gets the matched headline in the first HTML with the URL unchanged.
 * Meta traffic gets a variant without results when the page asks for it.
 */
export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Ads link straight to a concern; the root forwards to the first one
  if (pathname === "/") {
    const url = request.nextUrl.clone()
    url.pathname = `/${site.concerns[0].slug}`
    return NextResponse.redirect(url)
  }

  const page = getConcern(pathname.slice(1))
  if (!page) return NextResponse.next()

  const adGroup = readAdGroup(searchParams)
  const headline = getVariant(page, adGroup) ? adGroup! : "default"
  const audience =
    page.hideResultsForMeta && isMetaTraffic(searchParams) ? "meta" : "all"
  if (headline === "default" && audience === "all") return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = `/${page.slug}/v/${headline}/${audience}`
  return NextResponse.rewrite(url)
}

export const config = {
  // Page routes only: skip Next internals, assets and files with extensions
  matcher: ["/((?!_next/|assets/|favicon.ico|.*\\..*).*)"],
}

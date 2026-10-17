import { Jost, Quicksand } from "next/font/google"

// Kept apart from brand.ts so the proxy and server actions, which read
// content, never pull in font loading.
export const heading = Quicksand({
  subsets: ["latin"],
  variable: "--font-heading-face",
  display: "swap",
})

export const body = Jost({
  subsets: ["latin"],
  variable: "--font-body-face",
  display: "swap",
})

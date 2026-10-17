import * as azira from "./azira/fonts"

// Font loaders per clinic, matching the registry in content/index.ts.
// next/font needs static calls, so each clinic declares its own in fonts.ts.
const fonts = { azira }

export const activeFonts =
  fonts[(process.env.CLINIC ?? "azira") as keyof typeof fonts]

import type { BrandInput } from "../schema"

// Azira Aesthetics brand, taken from azira-aesthetics.co.uk (Wix theme) on
// 2026-10-17. Only the brand comes across: their site menu, layout, popup
// discount and stock imagery do not (see the landing page rules in CLAUDE.md).
export const brand = {
  source: "https://www.azira-aesthetics.co.uk/",
  logo: {
    id: "logo",
    alt: "Azira Aesthetics",
    note: "Azira Aesthetics logo: ask the clinic for SVG or a high-res PNG",
  },
  colours: {
    surface: "#ffffff",
    ink: "#050505",
    text: "#444444",
    panel: "#f4f4f3",
    hairline: "#c1c1c1",
    line: "#444444",
    room: "#141414",
    roomInk: "#ffffff",
    roomText: "#c1c1c1",
    // Their champagne gold (#AF8F43) is 3.0:1 on white, which fails AA for
    // text, so it stays decorative on light grounds; accentInk is the same
    // hue darkened to 5.8:1 for gold text on white.
    accent: "#af8f43",
    accentInk: "#7a6330",
    destructive: "#b3261e",
  },
  // Square corners, like the outlined buttons on their site
  radius: "0rem",
  button: { textTransform: "uppercase", letterSpacing: "0.16em" },
  fonts: {
    heading: "Quicksand (their heading face)",
    body: "Jost, the closest Google Font to the Futura and Avenir on their site",
  },
  photoStyle:
    "The clinic's own photography: black-gloved hands at work, instruments, neutral and skin tones on clean or dark grounds. Never stock.",
  voice: [
    "Calm, expert and reassuring; nurse-led rather than salesy",
    "Plain English with clinical accuracy; no hype or guarantees",
    "Natural results: looking like yourself, not looking done",
  ],
} satisfies BrandInput

import type { PaletteInput } from "../schema"
import { brand } from "./brand"

// Colour schemes for Azira to compare in the review panel (preview builds
// only, see components/palette). Each one keeps the same discipline: a white
// ground, one quiet neutral for panels, one deep colour for headings and the
// dark bands, and a single muted accent used only for hairlines and the award
// mark. Flat colour only. Every palette passes the same WCAG AA pairs as the
// brand. Once Azira chooses, its colours become brand.colours and this file
// can go.
export const palettes = [
  {
    id: "azira",
    label: "Azira",
    blurb: "Your website: white, charcoal and champagne gold",
    colours: brand.colours,
  },
  {
    id: "gallery",
    label: "Gallery",
    blurb: "Pure black and white; the photos do the talking",
    colours: {
      surface: "#ffffff",
      ink: "#0a0a0a",
      text: "#3d3d3d",
      panel: "#f5f5f5",
      hairline: "#d6d6d6",
      line: "#3d3d3d",
      room: "#0a0a0a",
      roomInk: "#ffffff",
      roomText: "#b8b8b8",
      accent: "#8f8f8f",
      accentInk: "#5c5c5c",
      destructive: "#b3261e",
    },
  },
  {
    id: "navy",
    label: "Porcelain & Navy",
    blurb: "Clinical navy on porcelain, quietly medical",
    colours: {
      surface: "#ffffff",
      ink: "#0e1a2b",
      text: "#3b4757",
      panel: "#f3f5f8",
      hairline: "#cfd6df",
      line: "#3b4757",
      room: "#0e1a2b",
      roomInk: "#ffffff",
      roomText: "#b6c0cc",
      accent: "#a8b4c2",
      accentInk: "#4f5d6e",
      destructive: "#b3261e",
    },
  },
  {
    id: "stone",
    label: "Stone & Espresso",
    blurb: "Warm stone with deep espresso, like a private spa",
    colours: {
      surface: "#ffffff",
      ink: "#1b1714",
      text: "#4a433d",
      panel: "#f3f0ec",
      hairline: "#d8d1c9",
      line: "#4a433d",
      room: "#26201c",
      roomInk: "#ffffff",
      roomText: "#c8beb4",
      accent: "#b39a7c",
      accentInk: "#76603f",
      destructive: "#b3261e",
    },
  },
  {
    id: "sage",
    label: "Sage & Forest",
    blurb: "Soft sage with deep forest green, calm and natural",
    colours: {
      surface: "#ffffff",
      ink: "#18201b",
      text: "#434d46",
      panel: "#f1f3f0",
      hairline: "#cfd5d0",
      line: "#434d46",
      room: "#1d2822",
      roomInk: "#ffffff",
      roomText: "#bcc6bf",
      accent: "#9aae9e",
      accentInk: "#4c6352",
      destructive: "#b3261e",
    },
  },
  {
    id: "oxblood",
    label: "Oxblood & Camel",
    blurb: "Deep wine with camel, rich and confident",
    colours: {
      surface: "#ffffff",
      ink: "#1f1416",
      text: "#4b3f42",
      panel: "#f5f1f1",
      hairline: "#d9cfd0",
      line: "#4b3f42",
      room: "#3b1820",
      roomInk: "#ffffff",
      roomText: "#dcc6ca",
      accent: "#c9a47b",
      accentInk: "#835f3a",
      destructive: "#b3261e",
    },
  },
] satisfies PaletteInput[]

import type { NextConfig } from "next"

// The colour review panel exists only in preview builds. Production resolves
// it to an empty stub, so not a byte of it ships to visitors.
const palettePreview = process.env.NEXT_PUBLIC_PALETTE_PREVIEW === "1"

// The root redirect and ?h= headline variants are handled in proxy.ts
const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@palette/panel": palettePreview
        ? "./components/palette/palette-panel.tsx"
        : "./components/palette/no-panel.tsx",
    },
  },
}

export default nextConfig

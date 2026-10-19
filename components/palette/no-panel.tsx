import type { PaletteOption } from "@/lib/palette-review"

/**
 * What `@palette/panel` resolves to outside preview builds (next.config.ts).
 * Renders nothing, so production ships no palette code.
 */
export const PalettePanel: (props: { options: PaletteOption[] }) => null = () =>
  null

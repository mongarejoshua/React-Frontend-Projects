import { hslToHex, normalizeHex, parseColor, rgbToHsl } from './colorUtils.js'

export const HARMONY_TYPES = [
  'Complementary',
  'Analogous',
  'Triadic',
  'Split complementary',
  'Tetradic',
  'Monochromatic',
]

export function createHarmony(baseColor, type) {
  const normalized = normalizeHex(baseColor)
  const rgb = normalized && parseColor(normalized)
  if (!rgb) return []
  const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const offsets = {
    Complementary: [0, 180],
    Analogous: [-40, -20, 0, 20, 40],
    Triadic: [0, 120, 240],
    'Split complementary': [0, 150, 210],
    Tetradic: [0, 90, 180, 270],
    Monochromatic: [0, 0, 0, 0, 0],
  }[type] ?? [0, 180]

  return offsets.map((offset, index) => {
    const hue = h + offset
    const lightness = type === 'Monochromatic'
      ? [Math.max(14, l - 28), Math.max(22, l - 12), l, Math.min(82, l + 13), Math.min(92, l + 27)][index]
      : Math.max(20, Math.min(82, l + (index % 2 === 0 ? 0 : (index % 3 === 0 ? -8 : 8))))
    const saturation = type === 'Monochromatic'
      ? Math.max(25, Math.min(90, s + (index - 2) * 5))
      : s
    return hslToHex(hue, saturation, lightness)
  })
}

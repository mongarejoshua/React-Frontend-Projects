import { parseColor } from './colorUtils.js'

function linearize(channel) {
  const value = channel / 255
  return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
}

export function luminance(hex) {
  const rgb = parseColor(hex)
  if (!rgb) return null
  return 0.2126 * linearize(rgb.r) + 0.7152 * linearize(rgb.g) + 0.0722 * linearize(rgb.b)
}

export function contrastRatio(foreground, background) {
  const first = luminance(foreground)
  const second = luminance(background)
  if (first === null || second === null) return null
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
}

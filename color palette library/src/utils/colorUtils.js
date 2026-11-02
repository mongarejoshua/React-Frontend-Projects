export function normalizeHex(value) {
  if (typeof value !== 'string') return null
  const cleaned = value.trim().replace(/^#/, '')
  if (/^[\da-f]{3}$/i.test(cleaned)) {
    return `#${cleaned.split('').map((character) => character + character).join('')}`.toUpperCase()
  }
  if (/^[\da-f]{6}$/i.test(cleaned)) return `#${cleaned}`.toUpperCase()
  return null
}

export function parseColor(value) {
  const hex = normalizeHex(value)
  if (!hex) return null
  const number = Number.parseInt(hex.slice(1), 16)
  return { r: (number >> 16) & 255, g: (number >> 8) & 255, b: number & 255 }
}

export function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`.toUpperCase()
}

export function rgbToHsl(r, g, b) {
  const red = r / 255
  const green = g / 255
  const blue = b / 255
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const delta = max - min
  let hue = 0
  let saturation = 0
  const lightness = (max + min) / 2

  if (delta !== 0) {
    saturation = delta / (1 - Math.abs(2 * lightness - 1))
    switch (max) {
      case red: hue = ((green - blue) / delta) % 6; break
      case green: hue = (blue - red) / delta + 2; break
      default: hue = (red - green) / delta + 4
    }
    hue *= 60
    if (hue < 0) hue += 360
  }

  return {
    h: Math.round(hue),
    s: Math.round(saturation * 100),
    l: Math.round(lightness * 100),
  }
}

export function hslToHex(h, s, l) {
  const hue = ((h % 360) + 360) % 360
  const saturation = Math.max(0, Math.min(100, s)) / 100
  const lightness = Math.max(0, Math.min(100, l)) / 100
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = lightness - chroma / 2
  let channels

  if (hue < 60) channels = [chroma, x, 0]
  else if (hue < 120) channels = [x, chroma, 0]
  else if (hue < 180) channels = [0, chroma, x]
  else if (hue < 240) channels = [0, x, chroma]
  else if (hue < 300) channels = [x, 0, chroma]
  else channels = [chroma, 0, x]

  return rgbToHex(...channels.map((channel) => (channel + m) * 255))
}

export function parseColorInput(value) {
  const hex = normalizeHex(value)
  if (hex) return hex
  const rgb = value.trim().match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i)
  if (rgb) {
    const channels = rgb.slice(1).map(Number)
    if (channels.every((channel) => channel <= 255)) return rgbToHex(...channels)
  }
  const hsl = value.trim().match(/^hsla?\(\s*(-?\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)%\s*,\s*(\d+(?:\.\d+)?)%\s*\)$/i)
  if (hsl) {
    const [, hue, saturation, lightness] = hsl.map(Number)
    if (saturation <= 100 && lightness <= 100) return hslToHex(hue, saturation, lightness)
  }
  return null
}

export function getColorFormats(value) {
  const hex = normalizeHex(value)
  const rgb = hex && parseColor(hex)
  if (!rgb) return null
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  return {
    hex,
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  }
}

export function createRandomPalette(count = 5) {
  const baseHue = Math.floor(Math.random() * 360)
  const saturation = 42 + Math.floor(Math.random() * 38)
  const lightness = 38 + Math.floor(Math.random() * 27)
  const offsets = [0, 27, -24, 155, 205]
  return Array.from({ length: count }, (_, index) => {
    const hue = (baseHue + offsets[index % offsets.length] + 360) % 360
    const hueVariation = index > 4 ? Math.floor(Math.random() * 50) - 25 : 0
    return hslToHex(hue + hueVariation, saturation + Math.floor(Math.random() * 13) - 6, lightness + Math.floor(Math.random() * 19) - 9)
  })
}

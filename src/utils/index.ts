import {ColorFormat} from '../App'

export const rgbToHex = (r: number, g: number, b: number) =>
  '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)

export const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max == min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    if (h) {
      h /= 6
    }
  }

  h = h && Math.floor(h * 360)
  s = Math.floor(s * 100)
  l = Math.floor(l * 100)

  return h ? `hsl(${h}, ${s}, ${l})` : ''
}

export const rgbToHsb = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b)
  const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n
  const hue = Math.round(60 * (h < 0 ? h + 6 : h))
  const saturation = Math.round(v && (n / v) * 100)
  const brightness = Math.round(v * 100)
  return `hsb(${hue}, ${saturation}, ${brightness})`
}

export const rgbToCmyk = (r: number, g: number, b: number): string => {
  let c: number | string = 0
  let m: number | string = 0
  let y: number | string = 0
  let k: number | string = 0

  // remove spaces from input RGB values, convert to int
  r = parseInt(('' + r).replace(/\s/g, ''), 10)
  g = parseInt(('' + g).replace(/\s/g, ''), 10)
  b = parseInt(('' + b).replace(/\s/g, ''), 10)

  if (r == 0 && g == 0 && b == 0) {
    k = 1
    return `cmyk(0, 0, 0, 1)`
  }

  c = 1 - r / 255
  m = 1 - g / 255
  y = 1 - b / 255

  const minCMY = Math.min(c, Math.min(m, y))
  c = Math.round(((c - minCMY) / (1 - minCMY)) * 100)
  m = Math.round(((m - minCMY) / (1 - minCMY)) * 100)
  y = Math.round(((y - minCMY) / (1 - minCMY)) * 100)
  k = Math.round(minCMY)

  return `cmyk(${c}, ${m}, ${y}, ${k})`
}

const getHexNumberOnly = (hex: string) => hex.slice(1)

const getRgbHsbHslNumberOnly = (color: string) => color.slice(4, -1)

const getCmykNumberOnly = (cmyk: string) => cmyk.slice(5, -1)

const getRgbCmykPercentage = (color: string) => color.split(',').join('%,').split(')').join('%)')

const getHsbHslPercentage = (color: string) =>
  color
    .split(',')
    .map((c, index) => (index == 0 && c) || (index === 1 && c + '%') || c.split(')').join('%)'))
    .join(',')

export const getFinalRgb = (format: ColorFormat, rgb: string) =>
  (format === 'mode-with-numbers' && rgb) ||
  (format === 'only-numbers' && getRgbHsbHslNumberOnly(rgb)) ||
  (format === 'mode-with-degrees-or-percentage' && getRgbCmykPercentage(rgb)) ||
  getRgbHsbHslNumberOnly(getRgbCmykPercentage(rgb))

export const getFinalHex = (format: ColorFormat, hex: string) =>
  ((format === 'only-numbers' || format === 'only-numbers-with-degrees-or-percentage') && getHexNumberOnly(hex)) || hex

export const getFinalHsb = (format: ColorFormat, hsb: string) =>
  (format === 'mode-with-numbers' && hsb) ||
  (format === 'only-numbers' && getRgbHsbHslNumberOnly(hsb)) ||
  (format === 'mode-with-degrees-or-percentage' && getHsbHslPercentage(hsb)) ||
  getRgbHsbHslNumberOnly(getHsbHslPercentage(hsb))

export const getFinalHsl = (format: ColorFormat, hsl: string) =>
  (format === 'mode-with-numbers' && hsl) ||
  (format === 'only-numbers' && getRgbHsbHslNumberOnly(hsl)) ||
  (format === 'mode-with-degrees-or-percentage' && getHsbHslPercentage(hsl)) ||
  getRgbHsbHslNumberOnly(getHsbHslPercentage(hsl))

export const getFinalCmyk = (format: ColorFormat, cmyk: string) =>
  (format === 'mode-with-numbers' && cmyk) ||
  (format === 'only-numbers' && getCmykNumberOnly(cmyk)) ||
  (format === 'mode-with-degrees-or-percentage' && getRgbCmykPercentage(cmyk)) ||
  getCmykNumberOnly(getRgbCmykPercentage(cmyk))

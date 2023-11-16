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

import type Color from 'colorjs.io'

import {ColorFormat, ColorSpace} from '../App'

const rgbToHsb = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b)
  const h = n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n
  const hue = Math.round(60 * (h < 0 ? h + 6 : h))
  const saturation = Math.round(v && (n / v) * 100)
  const brightness = Math.round(v * 100)
  return [hue, saturation, brightness]
}

export const formatHsb = (format: ColorFormat, color: Color) => {
  const [r, g, b] = color.coords
  const hsb = rgbToHsb(r, g, b)
  const hsbPercentage = hsb.map((i, index) => (index === 0 && i) || `${i}%`)
  switch (format) {
    case 'legacy-syntax-numbers-commas':
      return `hsb(${hsb.join(', ')})`
    case 'legacy-syntax-only-numbers-commas':
      return hsb.join(', ')
    case 'legacy-syntax-percentage-commas':
      return `hsb(${hsbPercentage})`.split(',').join(', ')
    case 'legacy-syntax-only-percentage-commas':
      return hsbPercentage.join(', ')
    case 'modern-syntax-numbers':
      return `hsb(${hsb.join(' ')})`
    case 'modern-syntax-only-numbers':
      return hsb.join(' ')
    case 'modern-syntax-percentage':
      return `hsb(${hsbPercentage.join(' ')})`
    case 'modern-syntax-only-percentage':
      return hsbPercentage.join(' ')
  }
}

export const formatHex = (color: Color) => color.toString({format: 'hex'})

export const formatColor = (format: ColorFormat, color: Color, space: ColorSpace) => {
  const name = (space === 'srgb' && 'rgb') || space
  const allNumber0To255 = ['<number>[0, 255]', '<number>[0, 255]', '<number>[0, 255]']
  const percentage0To100String = '<percentage>[0, 100]'
  const allPercentage0To100 = [percentage0To100String, percentage0To100String, percentage0To100String]
  const number0To360String = '<number>[0, 360]'
  // const angle0To360String = '<angle>[0, 360]';
  // const angleAndPercentage = [angle0To360String, percentage0To100String, percentage0To100String];
  const numberAndPercentage = [number0To360String, percentage0To100String, percentage0To100String]
  switch (format) {
    // rgb(255, 0, 0)
    case 'legacy-syntax-numbers-commas':
      return (
        ((space === 'srgb' || space === 'hsl') &&
          color.to(space).toString({
            precision: 4,
            format: {
              name,
              commas: true,
              coords:
                (space === 'hsl' && [number0To360String, percentage0To100String, percentage0To100String]) ||
                allNumber0To255,
            },
          })) ||
        ''
      )
    // rgb(100%, 0%, 0%)
    case 'legacy-syntax-percentage-commas':
      return (
        ((space === 'srgb' || space === 'hsl') &&
          color.to(space).toString({
            precision: 4,
            format: {
              name,
              commas: true,
              coords: (space === 'hsl' && numberAndPercentage) || allPercentage0To100,
            },
          })) ||
        ''
      )
    // 255, 0, 0
    case 'legacy-syntax-only-numbers-commas':
      return (
        ((space === 'srgb' || space === 'hsl') &&
          color
            .to(space)
            .toString({
              precision: 4,
              format: {
                name,
                commas: true,
                coords:
                  (space === 'hsl' && [number0To360String, percentage0To100String, percentage0To100String]) ||
                  allNumber0To255,
              },
            })
            .slice(4, -1)
            .split(',')
            .join(',')) ||
        ''
      )
    // 100%, 0%, 0%
    case 'legacy-syntax-only-percentage-commas':
      return (
        ((space === 'srgb' || space === 'hsl') &&
          color
            .to(space)
            .toString({
              precision: 4,
              format: {
                name,
                commas: true,
                coords: (space === 'hsl' && numberAndPercentage) || allPercentage0To100,
              },
            })
            .slice(4, -1)
            .split(',')
            .join(',')) ||
        ''
      )
    // rgb(255 0 0)
    case 'modern-syntax-numbers':
      return color.to(space).toString({
        precision: 4,
        format: {
          name,
          coords:
            ((space === 'hwb' || space === 'hsl') && [number0To360String, '<number>[0, 100]', '<number>[0, 100]']) ||
            (space === 'lab' && ['<number>[0, 100]', '<number>[-125, 125]', '<number>[-125, 125]']) ||
            (space === 'lch' && ['<number>[0, 100]', '<number>[0, 150]', '<number>[0, 360]']) ||
            (space === 'oklab' && ['<number>[0, 1]', '<number>[-0.4, 0.4]', '<number>[-0.4, 0.4]']) ||
            (space === 'oklch' && ['<number>[0, 1]', '<number>[0, 0.4]', '<number>[0, 360]']) ||
            allNumber0To255,
        },
      })
    //  rgb(100% 0% 0%)
    case 'modern-syntax-percentage':
      return color.to(space).toString({
        precision: 4,
        format: {
          name,
          coords:
            ((space === 'hsl' || space === 'hwb') && numberAndPercentage) ||
            (space === 'lab' && [percentage0To100String, '<percentage>[-100, 100]', '<percentage>[-100, 100]']) ||
            (space === 'lch' && [percentage0To100String, percentage0To100String, '<number>[0, 360]']) ||
            (space === 'oklab' && [percentage0To100String, '<percentage>[-100, 100]', '<percentage>[-100, 100]']) ||
            (space === 'oklch' && [percentage0To100String, percentage0To100String, '<number>[0, 360]']) ||
            allPercentage0To100,
        },
      })
    // 255 0 0
    case 'modern-syntax-only-numbers': {
      const converted = color.to(space).toString({
        precision: 4,
        format: {
          name: space,
          coords:
            ((space === 'hwb' || space === 'hsl') && [number0To360String, '<number>[0, 100]', '<number>[0, 100]']) ||
            (space === 'lab' && ['<number>[0, 100]', '<number>[-125, 125]', '<number>[-125, 125]']) ||
            (space === 'lch' && ['<number>[0, 100]', '<number>[0, 150]', '<number>[0, 360]']) ||
            (space === 'oklab' && ['<number>[0, 1]', '<number>[-0.4, 0.4]', '<number>[-0.4, 0.4]']) ||
            (space === 'oklch' && ['<number>[0, 1]', '<number>[0, 0.4]', '<number>[0, 360]']) ||
            allNumber0To255,
        },
      })
      return (
        (space === 'srgb' && converted.slice(5, -1)) ||
        ((space === 'oklab' || space === 'oklch') && converted.slice(6, -1)) ||
        converted.slice(4, -1)
      )
    }
    // 100% 0% 0%
    case 'modern-syntax-only-percentage': {
      const converted = color.to(space).toString({
        precision: 4,
        format: {
          name: space,
          coords:
            ((space === 'hsl' || space === 'hwb') && numberAndPercentage) ||
            (space === 'lab' && [percentage0To100String, '<percentage>[-100, 100]', '<percentage>[-100, 100]']) ||
            (space === 'lch' && [percentage0To100String, percentage0To100String, '<number>[0, 360]']) ||
            (space === 'oklab' && [percentage0To100String, '<percentage>[-100, 100]', '<percentage>[-100, 100]']) ||
            (space === 'oklch' && [percentage0To100String, percentage0To100String, '<number>[0, 360]']) ||
            allPercentage0To100,
        },
      })
      return (
        (space === 'srgb' && converted.slice(5, -1)) ||
        ((space === 'oklab' || space === 'oklch') && converted.slice(6, -1)) ||
        converted.slice(4, -1)
      )
    }
  }
}

const rgbToCmyk = (r: number, g: number, b: number) => {
  let c: number | string = 0
  let m: number | string = 0
  let y: number | string = 0
  let k: number | string = 0

  r *= 255
  g *= 255
  b *= 255

  if (r == 0 && g == 0 && b == 0) {
    k = 1
    return [0, 0, 0, 1]
  }

  c = 1 - r / 255
  m = 1 - g / 255
  y = 1 - b / 255

  const minCMY = Math.min(c, Math.min(m, y))
  c = Math.round(((c - minCMY) / (1 - minCMY)) * 100)
  m = Math.round(((m - minCMY) / (1 - minCMY)) * 100)
  y = Math.round(((y - minCMY) / (1 - minCMY)) * 100)
  k = Math.round(minCMY * 100)

  return [c, m, y, k]
}

export const formatCmyk = (format: ColorFormat, color: Color) => {
  const [r, g, b] = color.coords
  const cmyk = rgbToCmyk(r, g, b)
  const cmykPercentage = cmyk.map(i => `${i}%`).join(', ')
  switch (format) {
    case 'legacy-syntax-numbers-commas':
      return `cmyk(${cmyk.join(', ')})`
    case 'legacy-syntax-only-numbers-commas':
      return cmyk.join(', ')
    case 'legacy-syntax-percentage-commas':
      return `cmyk(${cmykPercentage})`
    case 'legacy-syntax-only-percentage-commas':
      return cmykPercentage
    case 'modern-syntax-numbers':
      return `cmyk(${cmyk.join(' ')})`
    case 'modern-syntax-only-numbers':
      return cmyk.join(' ')
    case 'modern-syntax-percentage':
      return `cmyk(${cmykPercentage})`
    case 'modern-syntax-only-percentage':
      return cmykPercentage
  }
}

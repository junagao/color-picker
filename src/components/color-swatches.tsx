import {CopyIcon} from '@radix-ui/react-icons'
import * as HoverCard from '@radix-ui/react-hover-card'
import {ColorFormat, Color, Colors} from '../App'
import {
  getCmykNumberOnly,
  getHexNumberOnly,
  getHsbHslPercentage,
  getRgbCmykPercentage,
  getRgbHsbHslNumberOnly,
} from '../utils'

type ColorSwatchesProps = {
  colors: Colors
  format: ColorFormat
  handleCopyColor: (color: string) => void
  handleRemoveColor: (rgb: string) => void
}

export const ColorSwatches = ({colors, format, handleCopyColor, handleRemoveColor}: ColorSwatchesProps) => (
  <div className="flex items-center">
    <div className="flex flex-wrap gap-2">
      {colors.map(({cmyk, hex, hsb, hsl, rgb, isSelected}) => (
        <ColorSwatch
          key={hex}
          cmyk={cmyk}
          format={format}
          handleCopyColor={handleCopyColor}
          handleRemoveColor={handleRemoveColor}
          hex={hex}
          hsb={hsb}
          hsl={hsl}
          isSelected={isSelected}
          rgb={rgb}
        />
      ))}
    </div>
  </div>
)

type ColorSwatchProps = {
  format: ColorFormat
  handleCopyColor: (color: string) => void
  handleRemoveColor: (rgb: string) => void
} & Color

const ColorSwatch = ({
  cmyk,
  format,
  handleCopyColor,
  handleRemoveColor,
  hex,
  hsb,
  hsl,
  isSelected,
  rgb,
}: ColorSwatchProps) => {
  const finalRgb =
    (format === 'mode-with-numbers' && rgb) ||
    (format === 'only-numbers' && getRgbHsbHslNumberOnly(rgb)) ||
    (format === 'mode-with-degrees-or-percentage' && getRgbCmykPercentage(rgb)) ||
    getRgbHsbHslNumberOnly(getRgbCmykPercentage(rgb))
  const finalHex =
    ((format === 'only-numbers' || format === 'only-numbers-with-degrees-or-percentage') && getHexNumberOnly(hex)) ||
    hex
  const finalHsb =
    (format === 'mode-with-numbers' && hsb) ||
    (format === 'only-numbers' && getRgbHsbHslNumberOnly(hsb)) ||
    (format === 'mode-with-degrees-or-percentage' && getHsbHslPercentage(hsb)) ||
    getRgbHsbHslNumberOnly(getHsbHslPercentage(hsb))
  const finalHsl =
    (format === 'mode-with-numbers' && hsl) ||
    (format === 'only-numbers' && getRgbHsbHslNumberOnly(hsl)) ||
    (format === 'mode-with-degrees-or-percentage' && getHsbHslPercentage(hsl)) ||
    getRgbHsbHslNumberOnly(getHsbHslPercentage(hsl))
  const finalCmyk =
    (format === 'mode-with-numbers' && cmyk) ||
    (format === 'only-numbers' && getCmykNumberOnly(cmyk)) ||
    (format === 'mode-with-degrees-or-percentage' && getRgbCmykPercentage(cmyk)) ||
    getCmykNumberOnly(getRgbCmykPercentage(cmyk))

  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div
          className="rounded-full cursor-pointer w-8 h-8"
          style={{
            background: hex,
            filter: isSelected
              ? 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
              : undefined,
          }}
          onClick={() => handleCopyColor(finalRgb)}
        />
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className={`
          w-fit
          rounded-md
          bg-white
          p-5
          shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
          data-[state=open]:transition-all
          data-[side=bottom]:animate-slideUpAndFade
          data-[side=right]:animate-slideLeftAndFade
          data-[side=left]:animate-slideRightAndFade
          data-[side=top]:animate-slideDownAndFade
        `}
          sideOffset={5}
        >
          <div className="grid grid-cols-[40px_minmax(100px,_1fr)_15px] gap-2 grid-flow-row">
            <ColorDetails color={finalRgb} handleCopyColor={handleCopyColor} type="rgb" />
            <ColorDetails color={finalHex} handleCopyColor={handleCopyColor} type="hex" />
            <ColorDetails color={finalHsb} handleCopyColor={handleCopyColor} type="hsb" />
            <ColorDetails color={finalHsl} handleCopyColor={handleCopyColor} type="hsl" />
            <ColorDetails color={finalCmyk} handleCopyColor={handleCopyColor} type="cmyk" />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveColor(rgb)}
            className="text-slate4 text-xs border border-slate10 rounded mt-4 px-2 hover:bg-slate12"
          >
            Remove color
          </button>
          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  )
}

type ColorDetailsProps = {
  color: string
  handleCopyColor: (color: string) => void
  type: 'hex' | 'rgb' | 'cmyk' | 'hsb' | 'hsl'
}

const ColorDetails = ({color, handleCopyColor, type}: ColorDetailsProps) => (
  <>
    <div className="text-sm text-slate1 font-bold">{type}:</div>
    <div className="text-sm text-slate1">{color}</div>
    <button className="text-slate9 hover:text-slate1" type="button" onClick={() => handleCopyColor(color)}>
      <CopyIcon />
    </button>
  </>
)

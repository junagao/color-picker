import {CopyIcon} from '@radix-ui/react-icons'
import * as HoverCard from '@radix-ui/react-hover-card'
import {ColorFormat, Color, Colors, ColorMode} from '../App'
import {getFinalCmyk, getFinalHex, getFinalHsb, getFinalHsl, getFinalRgb} from '../utils'

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
}: ColorSwatchProps) => (
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
        onClick={() => handleCopyColor(getFinalRgb(format, rgb))}
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
          <ColorDetails color={getFinalRgb(format, rgb)} handleCopyColor={handleCopyColor} mode="rgb" />
          <ColorDetails color={getFinalHex(format, hex)} handleCopyColor={handleCopyColor} mode="hex" />
          <ColorDetails color={getFinalHsb(format, hsb)} handleCopyColor={handleCopyColor} mode="hsb" />
          <ColorDetails color={getFinalHsl(format, hsl)} handleCopyColor={handleCopyColor} mode="hsl" />
          <ColorDetails color={getFinalCmyk(format, cmyk)} handleCopyColor={handleCopyColor} mode="cmyk" />
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

type ColorDetailsProps = {
  color: string
  handleCopyColor: (color: string) => void
  mode: ColorMode
}

const ColorDetails = ({color, handleCopyColor, mode}: ColorDetailsProps) => (
  <>
    <div className="text-sm text-slate1 font-bold">{mode}:</div>
    <div className="text-sm text-slate1">{color}</div>
    <button className="text-slate9 hover:text-slate1" type="button" onClick={() => handleCopyColor(color)}>
      <CopyIcon />
    </button>
  </>
)

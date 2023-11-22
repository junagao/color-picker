import type Color from 'colorjs.io'
import {CopyIcon} from '@radix-ui/react-icons'
import * as HoverCard from '@radix-ui/react-hover-card'

import {ColorFormat, ColorSpace, Colors} from '../App'
import {formatColor, formatCmyk, formatHex, formatHsb} from '../utils'

type ColorSwatchesProps = {
  colors: Colors
  format: ColorFormat
  handleCopyColor: (color: string) => void
  handleRemoveColor: (color: Color) => void
}

export const ColorSwatches = ({colors, format, handleCopyColor, handleRemoveColor}: ColorSwatchesProps) => (
  <div className="flex items-center">
    <div className="flex flex-wrap gap-2">
      {colors.map(({color, isSelected}) => (
        <ColorSwatch
          key={color.coords.toString()}
          format={format}
          handleCopyColor={handleCopyColor}
          handleRemoveColor={handleRemoveColor}
          isSelected={isSelected}
          color={color}
        />
      ))}
    </div>
  </div>
)

type ColorSwatchProps = {
  color: Color
  format: ColorFormat
  handleCopyColor: (color: string) => void
  handleRemoveColor: (color: Color) => void
  isSelected: boolean
}

const ColorSwatch = ({color, format, handleCopyColor, handleRemoveColor, isSelected}: ColorSwatchProps) => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <div
        className="rounded-full cursor-pointer w-8 h-8"
        style={{
          background: color.toString({format: 'hex'}),
          filter: isSelected
            ? 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
            : undefined,
        }}
        onClick={() => handleCopyColor(formatHex(color))}
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
          <ColorDetails color={formatHex(color)} handleCopyColor={handleCopyColor} space="hex" />
          <ColorDetails color={formatColor(format, color, 'srgb')} handleCopyColor={handleCopyColor} space="rgb" />
          <ColorDetails color={formatColor(format, color, 'hsl')} handleCopyColor={handleCopyColor} space="hsl" />
          <ColorDetails color={formatColor(format, color, 'hwb')} handleCopyColor={handleCopyColor} space="hwb" />
          <ColorDetails color={formatColor(format, color, 'lab')} handleCopyColor={handleCopyColor} space="lab" />
          <ColorDetails color={formatColor(format, color, 'lch')} handleCopyColor={handleCopyColor} space="lch" />
          <ColorDetails color={formatColor(format, color, 'oklab')} handleCopyColor={handleCopyColor} space="oklab" />
          <ColorDetails color={formatColor(format, color, 'oklch')} handleCopyColor={handleCopyColor} space="oklch" />
          <ColorDetails color={formatHsb(format, color)} handleCopyColor={handleCopyColor} space="hsb" />
          <ColorDetails color={formatCmyk(format, color)} handleCopyColor={handleCopyColor} space="cmyk" />
        </div>
        <button
          type="button"
          onClick={() => handleRemoveColor(color)}
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
  space: ColorSpace
}

const ColorDetails = ({color, handleCopyColor, space}: ColorDetailsProps) =>
  color && (
    <>
      <div className="text-sm text-slate1 font-bold">{space}:</div>
      <div className="text-sm text-slate1">{color}</div>
      <button className="text-slate9 hover:text-slate1" type="button" onClick={() => handleCopyColor(color)}>
        <CopyIcon />
      </button>
    </>
  )

import {CopyIcon} from '@radix-ui/react-icons'
import * as HoverCard from '@radix-ui/react-hover-card'
import {SelectedColor, SelectedColors} from '../App'

type ColorSwatchesProps = {
  handleCopyColor: (color: string) => void
  handleRemoveColor: (rgb: string) => void
  selectedColors: SelectedColors
}

export const ColorSwatches = ({handleCopyColor, handleRemoveColor, selectedColors}: ColorSwatchesProps) => (
  <div className="flex items-center">
    <div className="flex flex-wrap gap-2">
      {selectedColors.map(({cmyk, hex, hsb, hsl, rgb, isSelected}) => (
        <ColorSwatch
          key={hex}
          cmyk={cmyk}
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
  handleCopyColor: (color: string) => void
  handleRemoveColor: (rgb: string) => void
} & SelectedColor

const ColorSwatch = ({cmyk, handleCopyColor, handleRemoveColor, hex, hsb, hsl, isSelected, rgb}: ColorSwatchProps) => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <div
        className="rounded-full cursor-pointer w-8 h-8"
        style={{
          background: rgb,
          filter: isSelected
            ? 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
            : undefined,
        }}
        onClick={() => handleCopyColor(rgb)}
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
          <ColorDetails color={rgb} handleCopyColor={handleCopyColor} />
          <ColorDetails color={hex} handleCopyColor={handleCopyColor} />
          <ColorDetails color={hsb} handleCopyColor={handleCopyColor} />
          <ColorDetails color={hsl} handleCopyColor={handleCopyColor} />
          <ColorDetails color={cmyk} handleCopyColor={handleCopyColor} />
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
}

const ColorDetails = ({color, handleCopyColor}: ColorDetailsProps) => (
  <>
    <div className="text-sm text-slate1 font-bold">
      {(color.startsWith('#') && 'hex') ||
        (color.startsWith('rgb') && 'rgb') ||
        (color.startsWith('hsb') && 'hsb') ||
        (color.startsWith('hsl') && 'hsl') ||
        (color.startsWith('cmyk') && 'cmyk')}
      :
    </div>
    <div className="text-sm text-slate1">{color}</div>
    <button className="text-slate9 hover:text-slate1" type="button" onClick={() => handleCopyColor(color)}>
      <CopyIcon />
    </button>
  </>
)

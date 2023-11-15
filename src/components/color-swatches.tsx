import {SelectedColorsProps} from '../App'

type ColorSwatchesProps = {
  handleCopyColor: (color: string) => void
  selectedColors: SelectedColorsProps
}

export const ColorSwatches = ({handleCopyColor, selectedColors}: ColorSwatchesProps) => (
  <div className="flex items-center">
    <div className="flex flex-wrap gap-2">
      {selectedColors.map(({rgb, isSelected}) => (
        <div
          key={rgb}
          className="rounded-full cursor-pointer w-8 h-8"
          style={{
            background: rgb,
            filter: isSelected
              ? 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))'
              : undefined,
          }}
          onClick={() => handleCopyColor(rgb)}
        />
      ))}
    </div>
  </div>
)

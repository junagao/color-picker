import {Dispatch, ReactNode, SetStateAction} from 'react'
import {Cross2Icon, MixerHorizontalIcon} from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Tooltip from '@radix-ui/react-tooltip'

import {ColorFormat, ColorSpace} from '../App'
import {IconButton} from './icon-button'
import {TooltipButton} from './tooltip-button'

type SettingsProps = {
  format: ColorFormat
  paletteSpace: ColorSpace
  setFormat: Dispatch<SetStateAction<ColorFormat>>
  setPaletteSpace: Dispatch<SetStateAction<ColorSpace>>
}

export const Settings = ({format, paletteSpace, setFormat, setPaletteSpace}: SettingsProps) => (
  <Popover.Root>
    <Tooltip.Root>
      <TooltipButton
        trigger={
          <IconButton aria-label="Settings">
            <MixerHorizontalIcon />
          </IconButton>
        }
        content="Settings"
        hasPopover
      />
      <Popover.Portal>
        <Popover.Content
          className={`
            rounded
            p-5
            w-fit
            bg-white
            shadow-popover-sm
            will-change-transform-opacity
            data-[side=top]:animate-slideDownAndFade
            data-[side=right]:animate-slideLeftAndFade
            data-[side=bottom]:animate-slideUpAndFade
            data-[side=left]:animate-slideRightAndFade
            dark:bg-slate1
            dark:shadow-popover-dark-sm
          `}
          sideOffset={5}
        >
          <p className="mb-4 text-base text-slate2 dark:text-slate12 font-medium leading-5">Settings</p>
          <form>
            <RadioGroup.Root
              className="flex flex-col gap-2.5"
              value={format}
              onValueChange={e =>
                (e === 'legacy-syntax-numbers-commas' ||
                  e === 'legacy-syntax-percentage-commas' ||
                  e === 'legacy-syntax-only-numbers-commas' ||
                  e === 'legacy-syntax-only-percentage-commas' ||
                  e === 'modern-syntax-numbers' ||
                  e === 'modern-syntax-percentage' ||
                  e === 'modern-syntax-only-numbers' ||
                  e === 'modern-syntax-only-percentage') &&
                setFormat(e)
              }
              aria-label="Format"
            >
              <fieldset>
                <legend className="text-sm font-medium text-slate9 mb-1 dark:text-slate11">Format:</legend>
                <RadioItem id="legacy-syntax-numbers-commas" example="rgb(255, 0, 0)">
                  Legacy syntax: numbers + commas
                </RadioItem>
                <RadioItem id="legacy-syntax-only-numbers-commas" example="255, 0, 0">
                  Legacy syntax: only numbers + commas
                </RadioItem>
                <RadioItem id="legacy-syntax-percentage-commas" example="rgb(100%, 0%, 0%)">
                  Legacy syntax: percentage + commas
                </RadioItem>
                <RadioItem id="legacy-syntax-only-percentage-commas" example="100%, 0%, 0%">
                  Legacy syntax: only percentage + commas
                </RadioItem>
                <RadioItem id="modern-syntax-numbers" example="rgb(255 0 0)">
                  Modern syntax: numbers
                </RadioItem>
                <RadioItem id="modern-syntax-only-numbers" example="255 0 0">
                  Modern syntax: only numbers
                </RadioItem>
                <RadioItem id="modern-syntax-percentage" example="rgb(100% 0% 0%)">
                  Modern syntax: percentage
                </RadioItem>
                <RadioItem id="modern-syntax-only-percentage" example="100% 0% 0%">
                  Modern syntax: only percentage
                </RadioItem>
              </fieldset>
            </RadioGroup.Root>
            <RadioGroup.Root
              className="flex flex-col gap-2.5 mt-4"
              value={paletteSpace}
              onValueChange={e =>
                (e === 'hex' ||
                  e === 'rgb' ||
                  e === 'hsl' ||
                  e === 'hwb' ||
                  e === 'lab' ||
                  e === 'oklab' ||
                  e === 'lch' ||
                  e === 'oklch' ||
                  e === 'hsb' ||
                  e === 'cmyk') &&
                setPaletteSpace(e)
              }
              aria-label="Palette color space"
            >
              <fieldset>
                <legend className="text-sm font-medium text-slate9 mb-1 dark:text-slate11">Palette color space:</legend>
                <RadioItem id="hex">hex</RadioItem>
                <RadioItem id="rgb">rgb</RadioItem>
                <RadioItem id="hsl">hsl</RadioItem>
                <RadioItem id="hwb">hwb</RadioItem>
                <RadioItem id="lab">lab</RadioItem>
                <RadioItem id="oklab">oklab</RadioItem>
                <RadioItem id="lch">lch</RadioItem>
                <RadioItem id="oklch">oklch</RadioItem>
                <RadioItem id="hsb">hsb</RadioItem>
                <RadioItem id="cmyk">cmyk</RadioItem>
              </fieldset>
            </RadioGroup.Root>
          </form>
          <Popover.Close
            className={`
              rounded-full
              h-7
              w-7
              inline-flex
              items-center
              justify-center
              text-slate4
              absolute
              top-1
              right-1
              hover:bg-slate12
              focus:shadow-slate-11-sm
              focus-visible:outline-slate4
              dark:text-slate12
              dark:hover:bg-slate4
              dark:focus-visible:outline-slate11
            `}
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="fill-white dark:fill-slate1" />
        </Popover.Content>
      </Popover.Portal>
    </Tooltip.Root>
  </Popover.Root>
)

type RadioItemProps = {
  children: ReactNode
  example?: string
  id: string
}

const RadioItem = ({children, example, id}: RadioItemProps) => (
  <div className="flex items-center">
    <RadioGroup.Item
      className={`
        bg-slate12
        w-[14px]
        h-[14px]
        rounded-full
        shadow-[0_2px_10px]
        shadow-slate12
        hover:bg-slate4
        focus:shadow-[0_0_0_2px]
        focus:shadow-black
        outline-none
        cursor-default
        dark:focus:shadow-white
        dark:bg-slate6
        dark:shadow-slate6
        dark:hover:bg-slate12
      `}
      value={id}
      id={id}
    >
      <RadioGroup.Indicator
        className={`
          flex
          items-center
          justify-center
          w-full
          h-full
          relative
          after:content-['']
          after:block
          after:w-[9px]
          after:h-[9px]
          after:rounded-[50%]
          after:bg-slate4
          dark:after:bg-slate12
        `}
      />
    </RadioGroup.Item>
    <label className="text-sm text-slate4 leading-none pl-2 dark:text-slate11" htmlFor={id}>
      {children}
      {example && ':'}
      <span className="text-sm font-bold ml-1">{example}</span>
    </label>
  </div>
)

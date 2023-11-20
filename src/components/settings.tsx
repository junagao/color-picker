import {Dispatch, ReactNode, SetStateAction} from 'react'
import {Cross2Icon, MixerHorizontalIcon} from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'
import * as RadioGroup from '@radix-ui/react-radio-group'
import * as Tooltip from '@radix-ui/react-tooltip'
import {IconButton} from './icon-button'
import {ColorFormat, ColorMode} from '../App'

type SettingsProps = {
  format: ColorFormat
  paletteMode: ColorMode
  setFormat: Dispatch<SetStateAction<ColorFormat>>
  setPaletteMode: Dispatch<SetStateAction<ColorMode>>
}

export const Settings = ({format, paletteMode, setFormat, setPaletteMode}: SettingsProps) => (
  <Popover.Root>
    <Tooltip.Root>
      <Popover.Trigger asChild>
        <Tooltip.Trigger asChild>
          <IconButton aria-label="Settings">
            <MixerHorizontalIcon />
          </IconButton>
        </Tooltip.Trigger>
      </Popover.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          className={`
            rounded
            p-2
            bg-slate4
            text-sm
            text-slate12
            leading-none
            shadow-popover-sm
            select-none
            will-change-transform-opacity
            data-[side=top]:animate-slideDownAndFade
            data-[side=right]:animate-slideLeftAndFade
            data-[side=bottom]:animate-slideUpAndFade
            data-[side=left]:animate-slideRightAndFade
            dark:bg-white
            dark:text-slate4
          `}
          sideOffset={5}
        >
          Settings
          <Tooltip.Arrow className="fill-slate4 dark:fill-white" />
        </Tooltip.Content>
      </Tooltip.Portal>
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
                (e === 'mode-with-numbers' ||
                  e === 'only-numbers' ||
                  e === 'mode-with-degrees-or-percentage' ||
                  e === 'only-numbers-with-degrees-or-percentage') &&
                setFormat(e)
              }
              aria-label="Format"
            >
              <fieldset>
                <legend className="text-sm font-medium text-slate9 mb-1 dark:text-slate11">Format:</legend>
                <RadioItem id="mode-with-numbers" example="rgb(100, 50, 60)">
                  Color mode with numbers
                </RadioItem>
                <RadioItem id="only-numbers" example="100, 50, 60">
                  Only numbers
                </RadioItem>
                <RadioItem id="mode-with-degrees-or-percentage" example="rgb(100%, 50%, 60%)">
                  Color mode with %
                </RadioItem>
                <RadioItem id="only-numbers-with-degrees-or-percentage" example="100%, 50%, 60%">
                  Only numbers with %
                </RadioItem>
              </fieldset>
            </RadioGroup.Root>
            <RadioGroup.Root
              className="flex flex-col gap-2.5 mt-4"
              value={paletteMode}
              onValueChange={e =>
                (e === 'cmyk' || e === 'hex' || e === 'hsb' || e === 'hsl' || e === 'rgb') && setPaletteMode(e)
              }
              aria-label="Color palette mode"
            >
              <fieldset>
                <legend className="text-sm font-medium text-slate9 mb-1 dark:text-slate11">Color palette mode:</legend>
                <RadioItem id="rgb">rgb</RadioItem>
                <RadioItem id="hex">hex</RadioItem>
                <RadioItem id="hsb">hsb</RadioItem>
                <RadioItem id="hsl">hsl</RadioItem>
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

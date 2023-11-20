import {ReactNode} from 'react'
import * as Popover from '@radix-ui/react-popover'
import * as Tooltip from '@radix-ui/react-tooltip'

type TooltipButtonProps = {
  content: string
  hasPopover?: boolean
  trigger: ReactNode
}

export const TooltipButton = ({content, hasPopover, trigger}: TooltipButtonProps) => (
  <>
    {hasPopover ? (
      <Popover.Trigger asChild>
        <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
      </Popover.Trigger>
    ) : (
      <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
    )}
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
        {content}
        <Tooltip.Arrow className="fill-slate4 dark:fill-white" />
      </Tooltip.Content>
    </Tooltip.Portal>
  </>
)

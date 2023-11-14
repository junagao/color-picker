import {Dispatch, SetStateAction} from 'react'
import {CheckCircledIcon, InfoCircledIcon} from '@radix-ui/react-icons'
import * as Toast from '@radix-ui/react-toast'

type NotificationProps = {
  isError: boolean
  message: string
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const Notification = ({isError, message, open, setOpen}: NotificationProps) => (
  <>
    <Toast.Root
      className={`
        bg-neutral-50
        rounded-md
        p-4
        flex
        items-center
        justify-center
        data-[state=open]:animate-slideIn
        data-[state=closed]:animate-hide
        data-[state=end]:animate-swipeOut
      `}
      open={open}
      onOpenChange={setOpen}
      duration={2000}
    >
      <Toast.Description className="flex items-center gap-2 m-0 text-slate-700 text-sm leading-5">
        {isError ? <InfoCircledIcon color="red" /> : <CheckCircledIcon color="green" />}
        {message}
      </Toast.Description>
    </Toast.Root>
    <Toast.Viewport
      className={`
        fixed
        bottom-0
        right-0
        flex
        flex-col
        gap-4
        w-fit
        m-0
        p-6
        max-w-[100vw]
        z-50
        outline-none
      `}
    />
  </>
)

import {ReactNode, forwardRef} from 'react'

type IconButtonProps = {
  children: ReactNode
  onClick?: () => void
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({children, onClick, ...props}, forwardedRef) => (
    <button
      {...props}
      className={`
        rounded-full
        h-8
        w-8
        inline-flex
        justify-center
        items-center
        text-slate4
        bg-white
        border
        border-slate12
        hover:bg-slate12
        focus-visible:outline-slate4
        dark:bg-slate1
        dark:text-slate12
        dark:border-slate5
        dark:hover:bg-slate5
        dark:focus:shadow-slate-11-md
        dark:focus-visible:outline-slate11
      `}
      type="button"
      ref={forwardedRef}
      onClick={onClick}
    >
      {children}
    </button>
  ),
)

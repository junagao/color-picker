import {Dispatch, SetStateAction, useState} from 'react'
import {Cross2Icon, ImageIcon} from '@radix-ui/react-icons'
import * as Popover from '@radix-ui/react-popover'
import * as Tooltip from '@radix-ui/react-tooltip'

import {IconButton} from './icon-button'
import {ImageDropzone} from './image-dropzone'
import {TooltipButton} from './tooltip-button'

type ImageSelectProps = {
  setImage: Dispatch<SetStateAction<string>>
}

export const ImageSelect = ({setImage}: ImageSelectProps) => {
  const [imageUrl, setImageUrl] = useState<string>('')
  const [isImageSelectOpen, setIsImageSelectOpen] = useState(false)

  const handleOpenImageUrl = (e: {target: {value: SetStateAction<string>}}) => {
    setImageUrl(e.target.value)
  }

  const handleAddImageUrl = (e: {preventDefault: () => void}) => {
    e.preventDefault()
    setImage(imageUrl)
    setIsImageSelectOpen(false)
  }

  return (
    <div className="flex justify-end">
      <Popover.Root open={isImageSelectOpen} onOpenChange={setIsImageSelectOpen}>
        <Tooltip.Root>
          <TooltipButton
            trigger={
              <IconButton aria-label="Select image">
                <ImageIcon />
              </IconButton>
            }
            content="Select image"
            hasPopover
          />
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
              Select image
              <Tooltip.Arrow className="fill-slate4 dark:fill-white" />
            </Tooltip.Content>
          </Tooltip.Portal>
          <Popover.Portal>
            <Popover.Content
              className={`
                rounded
                p-5
                w-80
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
              <div className="flex flex-col gap-2">
                <p className="mb-2 text-base text-slate2 dark:text-slate12 font-medium leading-5">Select Image</p>
                <div className="flex gap-2">
                  <fieldset className="flex items-center gap-4">
                    <label className="text-sm text-slate4 dark:text-slate11" htmlFor="imageUrl">
                      Image Url
                    </label>
                    <input
                      className={`
                        w-full
                        inline-flex
                        justify-center
                        align-center
                        flex-1
                        rounded
                        py-0
                        px-2.5
                        text-sm
                        leading-none
                        text-slate4
                        h-6
                        shadow-slate-4
                        focus-visible:outline-slate11
                        dark:text-slate12
                        dark:shadow-slate-11
                        dark:focus-visible:outline-whiteA3
                        `}
                      id="imageUrl"
                      onChange={handleOpenImageUrl}
                    />
                  </fieldset>
                  <button
                    className={`
                      bg-slate1
                      rounded
                      text-sm
                      inline-flex
                      justify-center
                      items-center
                      px-2
                      py-1
                      text-white
                      hover:bg-slate4
                      dark:bg-whiteA3
                      dark:hover:bg-whiteA2
                    `}
                    type="button"
                    onClick={handleAddImageUrl}
                  >
                    Add
                  </button>
                </div>
                <p className="text-slate4 text-sm dark:text-slate11">or</p>
                <ImageDropzone setImage={setImage} setIsImageSelectOpen={setIsImageSelectOpen}>
                  Drop image here or click to select
                </ImageDropzone>
              </div>
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
    </div>
  )
}

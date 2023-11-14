import {Dispatch, SetStateAction, useState} from 'react'
import * as Popover from '@radix-ui/react-popover'
import {Cross2Icon, ImageIcon} from '@radix-ui/react-icons'
import {ImageDropzone} from './image-dropzone'

type ImageSelectProps = {
  setImage: Dispatch<SetStateAction<string>>
}

export const ImageSelect = ({setImage}: ImageSelectProps) => {
  const [imageUrl, setImageUrl] = useState<string>('')

  const handleOpenImageUrl = (e: {target: {value: SetStateAction<string>}}) => {
    setImageUrl(e.target.value)
  }

  const handleAddImageUrl = (e: {preventDefault: () => void}) => {
    e.preventDefault()
    setImage(imageUrl)
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          className={`
            rounded-full
            h-8
            w-8
            inline-flex
            justify-center
            items-center
            text-violet-11
            bg-white
            shadow-violet-7-sm
            hover:bg-violet-3
            focus:shadow-violet-8-sm
            focus-visible:outline-violet-11
          `}
          aria-label="Select image"
        >
          <ImageIcon />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className={`
            rounded
            p-5
            w-80
            bg-white
            shadow-popover-sm
            will-change-transform-opacity
            focus:shadow-popover-md
            data-[side=top]:animate-slide-down-and-fade
            data-[side=right]:animate-slide-left-and-fade
            data-[side=bottom]:animate-slide-up-and-fade
            data-[side=left]:animate-slide-right-and-fade
          `}
          sideOffset={5}
        >
          <div className="flex flex-col gap-2">
            <p className="mb-2 text-base text-neutral-700 font-medium leading-5">Select Image</p>
            <div className="flex gap-2">
              <fieldset className="flex items-center gap-4">
                <label className="text-sm text-violet-11" htmlFor="imageUrl">
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
                    text-violet-11
                    h-6
                    shadow-violet-7-sm
                    hover:shadow-violet-8-sm
                    focus-visible:outline-violet-11
                  `}
                  id="imageUrl"
                  onChange={handleOpenImageUrl}
                />
              </fieldset>
              <button
                className="bg-violet-11 rounded text-sm inline-flex justify-center items-center px-2 py-1 text-white"
                onClick={handleAddImageUrl}
              >
                Add
              </button>
            </div>
            <p className="text-neutral-600 text-sm">or</p>
            <ImageDropzone setImage={setImage}>Drop another image here</ImageDropzone>
          </div>
          <Popover.Close
            className={`
              rounded-full
              h-7
              w-7
              inline-flex
              items-center
              justify-center
              text-violet-11
              absolute
              top-1
              right-1 
              hover:bg-violet-4
              focus:shadow-violet-7-sm
            `}
            aria-label="Close"
          >
            <Cross2Icon />
          </Popover.Close>
          <Popover.Arrow className="fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}

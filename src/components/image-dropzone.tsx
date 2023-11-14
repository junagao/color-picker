import {Dispatch, SetStateAction, useRef, ReactNode} from 'react'

type DropzoneProps = {
  setImage: Dispatch<SetStateAction<string>>
  children: ReactNode
}

export const ImageDropzone = ({setImage, children}: DropzoneProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: {preventDefault: () => void}) => {
    e.preventDefault()
  }

  const handleDrop = (e: {
    preventDefault: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataTransfer: {files: any}
  }) => {
    e.preventDefault()
    const files = e.dataTransfer.files

    const fileReader = new FileReader()
    fileReader.readAsDataURL(files[0])
    fileReader.onloadend = readEvent => {
      const targetResultUrl = readEvent.target?.result?.toString()
      if (targetResultUrl) setImage(targetResultUrl)
    }
  }

  const handleOpenFileDialog = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  return (
    <div
      className={`
        flex
        items-center
        justify-center
        h-24
        border-2
        border-dashed
        border-gray-300
        text-neutral-600
        text-sm
      `}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleOpenFileDialog}
    >
      {children}
    </div>
  )
}

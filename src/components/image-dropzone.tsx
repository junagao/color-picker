import {Dispatch, SetStateAction, useRef, ReactNode, RefObject} from 'react'

type DropzoneProps = {
  children: ReactNode
  setIsImageSelectOpen?: Dispatch<SetStateAction<boolean>>
  setImage: Dispatch<SetStateAction<string>>
}

export const ImageDropzone = ({children, setImage, setIsImageSelectOpen}: DropzoneProps) => {
  const inputFileRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: {preventDefault: () => void}) => {
    e.preventDefault()
  }

  const handleDrop = (e: {preventDefault: () => void; dataTransfer: DataTransfer}) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    const fileReader: FileReader = new FileReader()
    fileReader.readAsDataURL(files[0])
    fileReader.onloadend = readEvent => {
      const targetResultUrl: string | undefined = readEvent.target?.result?.toString()
      if (targetResultUrl) setImage(targetResultUrl)
    }
    if (setIsImageSelectOpen) {
      setIsImageSelectOpen(false)
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
        border-slate11
        text-slate4
        text-sm
        dark:text-slate11
        dark:border-slate6
      `}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleOpenFileDialog}
    >
      {children}
    </div>
  )
}

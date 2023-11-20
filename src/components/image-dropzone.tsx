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

  const drawImage = (file: Blob) => {
    const fileReader: FileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onloadend = readEvent => {
      const targetResultUrl: string | undefined = readEvent.target?.result?.toString()
      if (targetResultUrl) setImage(targetResultUrl)
    }
    if (setIsImageSelectOpen) {
      setIsImageSelectOpen(false)
    }
  }

  const handleDropImage = (e: {preventDefault: () => void; dataTransfer: DataTransfer}) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    drawImage(file)
  }

  const handleOpenFileDialog = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click()
    }
  }

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) drawImage(file)
  }

  return (
    <>
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
        onDrop={handleDropImage}
        onClick={handleOpenFileDialog}
      >
        {children}
      </div>
      <input type="file" style={{display: 'none'}} onChange={handleSelectImage} ref={inputFileRef} />
    </>
  )
}

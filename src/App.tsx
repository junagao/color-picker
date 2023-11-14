import {MutableRefObject, useEffect, useRef, useState} from 'react'
import * as Toast from '@radix-ui/react-toast'
import {ImageSelect} from './components/image-select'
import {ImageDropzone} from './components/image-dropzone'
import {ImagePreview} from './components/image-preview'
import {Notification} from './components/notification'

type SelectedColorsProps = {
  isSelected: boolean
  rgb: string
}[]

function App() {
  const [image, setImage] = useState<string>('')
  const [rgb, setRgb] = useState<string>('')
  const [selectedColors, setSelectedColors] = useState<SelectedColorsProps>([])
  const [notificationMsg, setNotificationMsg] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const notificationTimerRef: MutableRefObject<number> = useRef(0)

  useEffect(() => {
    if (image) {
      const canvas: HTMLCanvasElement | null = canvasRef.current
      const ctx: CanvasRenderingContext2D | null | undefined = canvas?.getContext('2d')
      const img: HTMLImageElement = new Image()
      img.src = image
      img.crossOrigin = 'anonymous'
      if (canvas && ctx) {
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          canvas.height = canvas.width * (img.height / img.width)
          canvas.width = img.width * 0.5
          canvas.height = img.height * 0.5
          ctx.drawImage(img as CanvasImageSource, 0, 0, canvas.width, canvas.height)
        }
      }
    }
  }, [image])

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current

    const handleGetColor = (e: MouseEvent) => {
      const bounding: DOMRect | undefined = canvas?.getBoundingClientRect()
      let data: Uint8ClampedArray | undefined = undefined
      if (bounding) {
        const x = e.clientX - bounding.left
        const y = e.clientY - bounding.top
        const pixel = canvas?.getContext('2d', {willReadFrequently: true})?.getImageData(x, y, 1, 1)
        data = pixel && pixel.data
      }
      if (data) {
        const r = data[0].toString()
        const g = data[1].toString()
        const b = data[2].toString()
        const rgb = `rgb(${r}, ${g}, ${b})`
        setRgb(rgb)
      }
    }

    const handleShowNotification = () => {
      setOpen(false)
      window.clearTimeout(notificationTimerRef.current)
      notificationTimerRef.current = window.setTimeout(() => {
        setOpen(true)
      }, 10)
    }

    const handleCopyColor = async (color: string) => {
      setNotificationMsg(`${color} copied to clipboard!`)
      handleShowNotification()
      await navigator.clipboard.writeText(color)
    }

    const handleSelectColor = () => {
      handleCopyColor(rgb)
      const isColorAlreadySelected: boolean = selectedColors.some(c => c.rgb === rgb)
      if (isColorAlreadySelected) {
        setNotificationMsg(`Color already selected! ${rgb} copied to clipboard`)
        setIsError(true)
        handleShowNotification()
      } else {
        setIsError(false)
        const oldSelectedColors: SelectedColorsProps = selectedColors.map(color => ({...color, isSelected: false}))
        setSelectedColors([...oldSelectedColors, {rgb: rgb, isSelected: true}])
        setRgb(rgb)
      }
    }

    const handleClearColor = () => {
      setRgb('')
    }

    canvas?.addEventListener('mousemove', handleGetColor)
    canvas?.addEventListener('click', handleSelectColor)
    canvas?.addEventListener('mouseleave', handleClearColor)

    return () => {
      canvas?.removeEventListener('mousemove', handleGetColor)
      canvas?.removeEventListener('click', handleSelectColor)
      canvas?.removeEventListener('mouseleave', handleClearColor)
    }
  }, [image, rgb, selectedColors])

  useEffect(() => {
    return () => clearTimeout(notificationTimerRef.current)
  }, [])

  return (
    <Toast.Provider>
      <div className="min-w-screen-md">
        <ImageSelect setImage={setImage} />
        {image ? (
          <ImagePreview ref={canvasRef} />
        ) : (
          <div className="mt-4">
            <ImageDropzone setImage={setImage}>Drop image here</ImageDropzone>
          </div>
        )}
        <Notification isError={isError} message={notificationMsg} open={open} setOpen={setOpen} />
      </div>
    </Toast.Provider>
  )
}

export default App

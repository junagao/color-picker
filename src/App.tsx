import {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react'
import * as Toast from '@radix-ui/react-toast'
import {ImageSelect} from './components/image-select'
import {ImageDropzone} from './components/image-dropzone'
import {ImagePreview} from './components/image-preview'
import {Notification} from './components/notification'
import {ColorSwatches} from './components/color-swatches'

export type SelectedColorsProps = {
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
  const circleRef = useRef<HTMLDivElement>(null)
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

  const handleShowNotification = useCallback(() => {
    setOpen(false)
    window.clearTimeout(notificationTimerRef.current)
    notificationTimerRef.current = window.setTimeout(() => {
      setOpen(true)
    }, 10)
  }, [])

  const handleCopyColor = useCallback(
    async (color: string) => {
      setNotificationMsg(`${color} copied to clipboard!`)
      handleShowNotification()
      await navigator.clipboard.writeText(color)
    },
    [handleShowNotification],
  )

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current
    const circle: HTMLDivElement | null = circleRef.current

    const handleGetColor = (e: MouseEvent) => {
      const bounding: DOMRect | undefined = canvas?.getBoundingClientRect()
      let data: Uint8ClampedArray | undefined = undefined
      if (bounding && circle) {
        const x = e.clientX - bounding.left
        const y = e.clientY - bounding.top
        const pixel = canvas?.getContext('2d', {willReadFrequently: true})?.getImageData(x, y, 1, 1)
        data = pixel && pixel.data
      }
      if (data && circle) {
        const r = data[0].toString()
        const g = data[1].toString()
        const b = data[2].toString()
        const rgb = `rgb(${r}, ${g}, ${b})`
        setRgb(rgb)
        circle.style.display = 'block'
        circle.style.left = e.pageX + 'px'
        circle.style.top = e.pageY + 'px'
        circle.style.background = rgb
      }
    }

    const handleSelectColor = () => {
      handleCopyColor(rgb)
      const isColorAlreadySelected: boolean = selectedColors.some(c => c.rgb === rgb)
      if (isColorAlreadySelected) {
        setNotificationMsg(`Color already selected! ${rgb} copied to clipboard`)
        setIsError(true)
        handleShowNotification()
      }
      if (!isColorAlreadySelected) {
        setIsError(false)
        const oldSelectedColors: SelectedColorsProps = selectedColors.map(color => ({...color, isSelected: false}))
        setSelectedColors([...oldSelectedColors, {rgb, isSelected: true}])
        setRgb(rgb)
      }
    }

    const handleClearColor = () => {
      setRgb('')
      if (circle) {
        circle.style.display = 'none'
      }
    }

    canvas?.addEventListener('mousemove', handleGetColor)
    canvas?.addEventListener('click', handleSelectColor)
    canvas?.addEventListener('mouseleave', handleClearColor)

    return () => {
      canvas?.removeEventListener('mousemove', handleGetColor)
      canvas?.removeEventListener('click', handleSelectColor)
      canvas?.removeEventListener('mouseleave', handleClearColor)
    }
  }, [handleCopyColor, handleShowNotification, image, rgb, selectedColors])

  useEffect(() => {
    return () => clearTimeout(notificationTimerRef.current)
  }, [])

  return (
    <Toast.Provider>
      <div className="min-w-screen-md mb-40">
        <div className="flex justify-between w-[75vw] gap-4">
          <ColorSwatches handleCopyColor={handleCopyColor} selectedColors={selectedColors} />
          <ImageSelect setImage={setImage} />
        </div>
        {image ? (
          <div>
            <div ref={circleRef} className="w-40 h-40 rounded-full absolute hidden z-50"></div>
            <ImagePreview ref={canvasRef} />
          </div>
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

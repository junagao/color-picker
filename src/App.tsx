import {MutableRefObject, useCallback, useEffect, useRef, useState} from 'react'
import Color from 'colorjs.io'
import {CopyIcon, TrashIcon} from '@radix-ui/react-icons'
import * as Tooltip from '@radix-ui/react-tooltip'

import {
  ColorSwatches,
  IconButton,
  ImageDropzone,
  ImagePreview,
  ImageSelect,
  Notification,
  Settings,
  TooltipButton,
} from './components'
import {formatCmyk, formatColor, formatHex, formatHsb} from './utils'

export type ColorFormat =
  | 'legacy-syntax-numbers-commas'
  | 'legacy-syntax-percentage-commas'
  | 'legacy-syntax-only-numbers-commas'
  | 'legacy-syntax-only-percentage-commas'
  | 'modern-syntax-numbers'
  | 'modern-syntax-percentage'
  | 'modern-syntax-only-numbers'
  | 'modern-syntax-only-percentage'

export type ColorSpace = 'hex' | 'rgb' | 'srgb' | 'cmyk' | 'hsb' | 'hsl' | 'hwb' | 'lab' | 'lch' | 'oklab' | 'oklch'

export type Colors = {
  isSelected: boolean
  color: Color
}[]

function App() {
  const [image, setImage] = useState<string>('')
  const [format, setFormat] = useState<ColorFormat>('legacy-syntax-numbers-commas')
  const [paletteSpace, setPaletteSpace] = useState<ColorSpace>('rgb')
  const [color, setColor] = useState<Color>(new Color('srgb', [0, 0, 0]))
  const [colors, setColors] = useState<Colors>([])
  const [notificationMsg, setNotificationMsg] = useState<string>('')
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false)
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
    setIsNotificationOpen(false)
    window.clearTimeout(notificationTimerRef.current)
    notificationTimerRef.current = window.setTimeout(() => {
      setIsNotificationOpen(true)
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
      if (bounding) {
        const x = e.clientX - bounding.left
        const y = e.clientY - bounding.top
        const context = canvas?.getContext('2d', {willReadFrequently: true, colorSpace: 'srgb'})
        const pixel = context?.getImageData(x, y, 1, 1)
        data = pixel && pixel.data
      }
      if (data && circle) {
        const [r, g, b] = data
        const rgb = `rgb(${r}, ${g}, ${b})`
        const color = new Color('srgb', [r / 255, g / 255, b / 255])
        setColor(color)

        circle.style.display = 'block'
        circle.style.left = e.pageX + 'px'
        circle.style.top = e.pageY + 'px'
        circle.style.background = rgb
      }
    }

    const handleSelectColor = () => {
      const isColorAlreadySelected: boolean = colors.some(c => c.color === color)
      if (isColorAlreadySelected) {
        setNotificationMsg(`Color already selected!`)
        setIsError(true)
        handleShowNotification()
      } else {
        setIsError(false)
        setColors(prev => [...prev.map(color => ({...color, isSelected: false})), {color, isSelected: true}])
      }
    }

    const handleClearColor = () => {
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
  }, [handleCopyColor, handleShowNotification, image, color, colors])

  useEffect(() => {
    return () => clearTimeout(notificationTimerRef.current)
  }, [])

  const handleClearPalette = () => {
    setColors([])
  }

  const handleCopyPalette = async () => {
    if (
      format.includes('legacy') &&
      (paletteSpace === 'lab' ||
        paletteSpace === 'lch' ||
        paletteSpace === 'oklab' ||
        paletteSpace === 'oklch' ||
        paletteSpace === 'hwb')
    ) {
      setNotificationMsg(`Color space does not exist in the selected format.`)
      handleShowNotification()
      setIsError(true)
    } else {
      const colorArray = colors.map(c => {
        switch (paletteSpace) {
          case 'hex':
            return formatHex(c.color)
          case 'rgb':
            return formatColor(format, c.color, 'srgb')
          case 'hsl':
            return formatColor(format, c.color, 'hsl')
          case 'hwb':
            return formatColor(format, c.color, 'hwb')
          case 'lab':
            return formatColor(format, c.color, 'lab')
          case 'oklab':
            return formatColor(format, c.color, 'oklab')
          case 'lch':
            return formatColor(format, c.color, 'lch')
          case 'oklch':
            return formatColor(format, c.color, 'oklch')
          case 'hsb':
            return formatHsb(format, c.color)
          case 'cmyk':
            return formatCmyk(format, c.color)
        }
      })
      setNotificationMsg(`Color palette copied to clipboard!`)
      handleShowNotification()
      await navigator.clipboard.writeText(JSON.stringify(colorArray))
    }
  }

  const handleRemoveColor = useCallback((color: Color) => {
    setColors(prevColors => prevColors.filter(c => c.color !== color))
  }, [])

  return (
    <div className="min-w-[75vw] mb-40 dark:bg-bg-gray-950">
      <div className="flex justify-between w-[75vw] gap-4">
        <ColorSwatches
          colors={colors}
          format={format}
          handleCopyColor={handleCopyColor}
          handleRemoveColor={handleRemoveColor}
        />
        <Tooltip.Provider>
          <div className="flex gap-2">
            {colors.length ? (
              <>
                <Tooltip.Root>
                  <TooltipButton
                    trigger={
                      <IconButton aria-label="Copy palette" onClick={handleCopyPalette}>
                        <CopyIcon />
                      </IconButton>
                    }
                    content="Copy palette"
                  />
                </Tooltip.Root>
                <Tooltip.Root>
                  <TooltipButton
                    trigger={
                      <IconButton aria-label="Clear palette" onClick={handleClearPalette}>
                        <TrashIcon />
                      </IconButton>
                    }
                    content="Clear palette"
                  />
                </Tooltip.Root>
              </>
            ) : null}
            <ImageSelect setImage={setImage} />
            <Settings
              format={format}
              paletteSpace={paletteSpace}
              setFormat={setFormat}
              setPaletteSpace={setPaletteSpace}
            />
          </div>
        </Tooltip.Provider>
      </div>
      {image ? (
        <div>
          <div ref={circleRef} className="w-40 h-40 rounded-full absolute hidden z-50"></div>
          <ImagePreview ref={canvasRef} />
        </div>
      ) : (
        <div className="mt-4">
          <ImageDropzone setImage={setImage}>Drop image here or click to select</ImageDropzone>
        </div>
      )}
      <Notification
        isError={isError}
        message={notificationMsg}
        open={isNotificationOpen}
        setOpen={setIsNotificationOpen}
      />
    </div>
  )
}

export default App

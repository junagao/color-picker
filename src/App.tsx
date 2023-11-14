import {useEffect, useRef, useState} from 'react'
import {ImageSelect} from './components/image-select'
import {ImageDropzone} from './components/image-dropzone'
import {ImagePreview} from './components/image-preview'

function App() {
  const [image, setImage] = useState<string>('')

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const img = new Image()
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
  }, [image])

  return (
    <div className="min-w-screen-md">
      <ImageSelect setImage={setImage} />
      {image ? (
        <ImagePreview ref={canvasRef} />
      ) : (
        <div className="mt-4">
          <ImageDropzone setImage={setImage}>Drop image here</ImageDropzone>
        </div>
      )}
    </div>
  )
}

export default App

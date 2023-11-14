import {forwardRef, Ref} from 'react'

export const ImagePreview = forwardRef((_props: unknown, ref: Ref<HTMLCanvasElement>) => (
  <div className="flex items-center justify-center mt-4 z-10">
    <canvas ref={ref} className="cursor-crosshair" />
  </div>
))

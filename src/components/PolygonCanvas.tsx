import { MouseEventHandler, useRef, useState } from 'react'

export function PolygonCanvas({ url }: { url: string }) {
  const canvasBeta = useRef<HTMLCanvasElement | null>(null)
  // const [rect, setRect] = useState<DOMRect>()

  const canvas = canvasBeta.current
  const rectCanvas = canvas?.getBoundingClientRect()
  const img = new Image()
  img.src = url
  const ctx = canvas?.getContext('2d')
  img.onload = function () {
    if (canvas && ctx) {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
    }
  }
  const clickHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!ctx || !rectCanvas) return
    const { left, top } = rectCanvas
    const { clientX, clientY } = ev
    const coordX = clientX - left
    const coordY = clientY - top
    ctx.beginPath()
    ctx.moveTo(200, 50)
    ctx.lineTo(coordX, coordY)
    ctx.stroke()
  }
  return (
    <div>
      <div className="relative w-max" onClick={clickHandler}>
        <canvas ref={canvasBeta}></canvas>
      </div>
    </div>
  )
}

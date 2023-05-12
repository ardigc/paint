import { MouseEventHandler, useRef, useState } from 'react'

export function PolygonCanvas({ url }: { url: string }) {
  const canvasBeta = useRef<HTMLCanvasElement | null>(null)
  const [coordOr, setCoordOr] = useState({ x: -1, y: -1 })
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
    setCoordOr({ x: coordX, y: coordY })
  }
  const mouseMoveHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!ctx || !rectCanvas) return
    if (coordOr.x !== -1 && coordOr.y !== -1) {
      ctx.clearRect(10, 10, 120, 100)
      ctx.beginPath()
      ctx.moveTo(coordOr.x, coordOr.y)
      const { clientX, clientY } = ev
      const mouseX = clientX - rectCanvas.left
      const mouseY = clientY - rectCanvas.top

      ctx.lineTo(mouseX, mouseY)
      ctx.stroke()
    }
  }
  return (
    <div>
      <div
        className="relative w-max"
        onClick={clickHandler}
        onMouseMove={mouseMoveHandler}
      >
        <canvas ref={canvasBeta}></canvas>
      </div>
    </div>
  )
}

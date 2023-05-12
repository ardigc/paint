import { MouseEventHandler, useRef, useState } from 'react'
interface Lines {
  xOr: number
  yOr: number
  xFin: number
  yFin: number
}
type CoordOr = Pick<Lines, 'xOr' | 'yOr'> | null
type CoordFin = Pick<Lines, 'xFin' | 'yFin'> | null
export function PolygonCanvas({ url }: { url: string }) {
  const canvasBeta = useRef<HTMLCanvasElement | null>(null)
  const [coordOr, setCoordOr] = useState<CoordOr>(null)
  const [coordFin, setCoordFin] = useState<CoordFin>(null)
  // const [rect, setRect] = useState<DOMRect>()
  const [lines, setLines] = useState<Lines[]>([])
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
    if (!ctx || !rectCanvas || !coordOr) return

    setLines((prev) => [
      ...prev,
      { xOr: coordOr?.xOr, yOr: coordOr.yOr, xFin: mouseX, yFin: mouseY },
    ])
    const { left, top } = rectCanvas
    const { clientX, clientY } = ev
    const coordX = clientX - left
    const coordY = clientY - top
    setCoordOr({ xOr: coordX, yOr: coordY })
  }
  const mouseMoveHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!ctx || !rectCanvas) return
    if (coordOr?.xOr && coordOr?.yOr) {
      ctx.clearRect(10, 10, 120, 100)
      ctx.beginPath()
      ctx.moveTo(coordOr?.xOr, coordOr?.yOr)
      const { clientX, clientY } = ev
      const mouseX = clientX - rectCanvas.left
      const mouseY = clientY - rectCanvas.top
      ctx.drawImage(img, 0, 0)
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

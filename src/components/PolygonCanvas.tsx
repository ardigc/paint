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
    if (!ctx || !rectCanvas) return
    const { left, top } = rectCanvas
    const { clientX, clientY } = ev
    const coordX = clientX - left
    const coordY = clientY - top
    if (!coordOr) {
      setCoordOr({ xOr: coordX, yOr: coordY })
    } else {
      setCoordFin({ xFin: coordX, yFin: coordY })
      setLines((prev) => [
        ...prev,
        { xOr: coordOr.xOr, yOr: coordOr.yOr, xFin: coordX, yFin: coordY },
      ])
      // setCoordOr(null)
    }
    console.log(lines)
  }
  if (lines.length >= 1 && ctx) {
    ctx.beginPath()
    ctx.moveTo(lines[0].xOr, lines[0].yOr)
    lines.map((lines, index) => {
      // console.log(lines)
      // ctx.lineTo(150, 100);
      ctx.lineTo(lines.xFin, lines.yFin)
    })
    ctx.stroke()
  }

  return (
    <div>
      <div
        className="relative w-max"
        onClick={clickHandler}
        // onMouseMove={mouseMoveHandler}
      >
        <canvas ref={canvasBeta}></canvas>
      </div>
    </div>
  )
}

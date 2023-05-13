import { MouseEventHandler, useEffect, useRef, useState } from 'react'
interface Lines {
  xOr: number
  yOr: number
  xFin: number
  yFin: number
}
interface LinesArr {
  polygon: number
  lines: Array<Lines>
}
type CoordOr = Pick<Lines, 'xOr' | 'yOr'> | null
// type CoordFin = Pick<Lines, 'xFin' | 'yFin'> | null
export function PolygonCanvas({ url }: { url: string }) {
  const canvasBeta = useRef<HTMLCanvasElement | null>(null)
  const [coordOr, setCoordOr] = useState<CoordOr>(null)
  const [lines, setLines] = useState<Lines[]>([])
  const [linesArr, setLinesArr] = useState<LinesArr[]>([])
  const canvas = canvasBeta.current
  const rectCanvas = canvas?.getBoundingClientRect()
  const ctx = canvas?.getContext('2d')

  useEffect(() => {
    const canvas = canvasBeta.current
    const ctx = canvas?.getContext('2d')
    const img = new Image()
    img.src = url
    img.onload = function () {
      console.log(canvas)
      if (canvas && ctx) {
        console.log('dentro  de use')
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
      }
    }
  }, [canvas])
  const isPointInPolygon = (
    x: number,
    y: number,
    polygon: Lines[]
  ): boolean => {
    let inside = false
    console.log(polygon)
    const { length } = polygon
    for (let i = 0, j = length - 1; i <= length; j = i++) {
      if (i === 0) {
        const xi = polygon[i].xOr
        const yi = polygon[i].yOr
        const xj = polygon[i].xFin
        const yj = polygon[i].yFin
        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
        return inside
      } else if (i === length) {
        const xi = polygon[i].xFin
        const yi = polygon[i].yFin
        const xj = polygon[j].xOr
        const yj = polygon[j].yOr
        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
        return inside
      } else {
        const xi = polygon[i].xFin
        const yi = polygon[i].yFin
        const xj = polygon[j].xFin
        const yj = polygon[j].yFin
        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
        return inside
      }
    }
    return inside
  }

  const clickHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!ctx || !rectCanvas) return
    const { left, top } = rectCanvas
    const { clientX, clientY } = ev
    const coordX = clientX - left
    const coordY = clientY - top
    if (linesArr.length >= 1) {
      const lastPolygon = linesArr[linesArr.length - 1]
      if (isPointInPolygon(coordX, coordY, lastPolygon.lines)) {
        console.log('Clicked inside polygon')
      }
    }
    if (!coordOr) {
      setCoordOr({ xOr: coordX, yOr: coordY })
    } else {
      setLines((prev) => [
        ...prev,
        { xOr: coordOr.xOr, yOr: coordOr.yOr, xFin: coordX, yFin: coordY },
      ])
    }
  }
  const removeLines = () => {
    setLines([])
    setCoordOr(null)
    setLinesArr([])
    const img = new Image()
    img.src = url
    img.onload = function () {
      if (canvas && ctx) {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
      }
    }
  }

  const closePoligon: MouseEventHandler<HTMLDivElement> = (ev) => {
    ev.stopPropagation()
    setCoordOr(null)
    setLinesArr((prev) => [...prev, { lines, polygon: linesArr.length }])
    setLines([])
  }
  if (lines.length >= 1 && ctx) {
    ctx.beginPath()
    ctx.moveTo(lines[0].xOr, lines[0].yOr)
    lines.map((lines) => {
      ctx.lineTo(lines.xFin, lines.yFin)
    })
    ctx.stroke()
  }
  if (linesArr.length >= 1 && ctx) {
    linesArr.map((lineArr) => {
      ctx.beginPath()
      ctx.moveTo(lineArr.lines[0].xOr, lineArr.lines[0].yOr)
      lineArr.lines.map((lines) => {
        ctx.lineTo(lines.xFin, lines.yFin)
      })
      ctx?.closePath()
      ctx.stroke()
      ctx.fillStyle = 'green'
      ctx.fill()
    })
  }

  return (
    <div>
      <div className="relative w-max" onClick={clickHandler}>
        <canvas ref={canvasBeta}></canvas>
        {coordOr && (
          <div
            className="absolute h-2 w-2 cursor-pointer border bg-orange-600 rounded-full"
            onClick={closePoligon}
            style={{
              top: coordOr.yOr - 5,
              left: coordOr.xOr - 5,
            }}
          ></div>
        )}
        {lines.length >= 1 &&
          lines.map((lines) => (
            <div
              className="absolute h-2 w-2 border bg-orange-600 rounded-full"
              style={{
                top: lines.yFin - 5,
                left: lines.xFin - 5,
              }}
            ></div>
          ))}
      </div>
      <button onClick={removeLines}>Limpiar lineas</button>
    </div>
  )
}

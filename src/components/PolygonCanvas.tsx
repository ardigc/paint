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
        // console.log('dentro  de use')
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
      } else if (i === length) {
        console.log(polygon, i)
        const xi = polygon[i - 1].xFin
        const yi = polygon[i - 1].yFin
        const xj = polygon[0].xOr
        const yj = polygon[0].yOr
        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
      } else {
        const xi = polygon[i].xFin
        const yi = polygon[i].yFin
        const xj = polygon[j].xFin
        const yj = polygon[j].yFin
        const intersect =
          yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
        if (intersect) inside = !inside
      }
    }
    // if (inside) {
    //   setInto(true)
    // }
    return inside
  }

  const clickHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!ctx || !rectCanvas) return
    const { left, top } = rectCanvas
    const { clientX, clientY } = ev
    const coordX = clientX - left
    const coordY = clientY - top
    let poligonInside
    if (linesArr.length >= 1) {
      //actualizar into para que sea true
      linesArr.map((line) => {
        // isPointInPolygon(coordX, coordY, line.lines)
        if (isPointInPolygon(coordX, coordY, line.lines)) {
          poligonInside = true
          console.log('Clicked inside polygon')
        }
      })
      if (poligonInside) {
        console.log('no se dibuja')
      } else {
        if (!coordOr) {
          setCoordOr({ xOr: coordX, yOr: coordY })
        } else {
          setLines((prev) => [
            ...prev,
            { xOr: coordOr.xOr, yOr: coordOr.yOr, xFin: coordX, yFin: coordY },
          ])
        }
      }
    } else {
      if (!coordOr) {
        setCoordOr({ xOr: coordX, yOr: coordY })
      } else {
        setLines((prev) => [
          ...prev,
          { xOr: coordOr.xOr, yOr: coordOr.yOr, xFin: coordX, yFin: coordY },
        ])
      }
    }
    // setInto(false)
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

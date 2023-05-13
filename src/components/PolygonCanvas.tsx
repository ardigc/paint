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
  const [selected, setSelected] = useState(-1)
  const canvas = canvasBeta.current
  const rectCanvas = canvas?.getBoundingClientRect()
  const ctx = canvas?.getContext('2d')

  useEffect(() => {
    const canvas = canvasBeta.current
    const ctx = canvas?.getContext('2d')
    const img = new Image()
    img.src = url
    img.onload = function () {
      if (canvas && ctx) {
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
    return inside
  }
  const mouseDownHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!ctx || !rectCanvas) return
    const { left, top } = rectCanvas
    const { clientX, clientY } = ev
    const coordX = clientX - left
    const coordY = clientY - top
    let lastMouseX = ev.clientX
    let lastMouseY = ev.clientY
    if (isPointInPolygon(coordX, coordY, linesArr[selected].lines)) {
      function handleMouseMove(ev: MouseEvent) {
        setLinesArr((prev) => {
          const deltaX = ev.clientX - lastMouseX
          // const deltaX = ev.movementX
          const deltaY = ev.clientY - lastMouseY
          // const deltaY = ev.movementY
          const newlines = [...prev]
          const line = newlines[selected]
          line.lines.map((line, index) => {
            const newxOr = line.xOr + deltaX
            console.log(deltaX)
            const newxFin = line.xFin + deltaX
            const newyOr = line.yOr + deltaY
            const newyFin = line.yFin + deltaY
            // console.log(line)
            newlines[selected].lines[index] = {
              ...line,
              xOr: newxOr,
              yOr: newyOr,
              xFin: newxFin,
              yFin: newyFin,
            }
          })
          console.log(newlines[selected])
          lastMouseX = ev.clientX
          lastMouseY = ev.clientY
          return newlines
        })
      }

      function handleMouseUp() {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      console.log('pinchas en el cuadrado seleccionado!')
    }
  }
  const clickHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!ctx || !rectCanvas) return
    const { left, top } = rectCanvas
    const { clientX, clientY } = ev
    const coordX = clientX - left
    const coordY = clientY - top
    let poligonInside

    if (!coordOr) {
      if (linesArr.length >= 1) {
        //actualizar into para que sea true
        linesArr.map((line, index) => {
          // isPointInPolygon(coordX, coordY, line.lines)
          if (isPointInPolygon(coordX, coordY, line.lines)) {
            poligonInside = true
            setSelected(index)
          }
        })
        if (poligonInside) {
        } else {
          setCoordOr({ xOr: coordX, yOr: coordY })
          setSelected(-1)
        }
      } else {
        setCoordOr({ xOr: coordX, yOr: coordY })
      }
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
    setSelected(-1)
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
      <div
        className="relative w-max"
        onClick={clickHandler}
        onMouseDown={mouseDownHandler}
      >
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
        {selected >= 0 &&
          linesArr[selected].lines.map((lines) => (
            <div
              className="absolute h-2 w-2 border bg-orange-600 rounded-full"
              style={{
                top: lines.yFin - 5,
                left: lines.xFin - 5,
              }}
            ></div>
          ))}
        {selected >= 0 && (
          <div
            className="absolute h-2 w-2 border bg-orange-600 rounded-full"
            style={{
              top: linesArr[selected].lines[0].yOr - 5,
              left: linesArr[selected].lines[0].xOr - 5,
            }}
          ></div>
        )}
      </div>
      <button onClick={removeLines}>Limpiar lineas</button>
    </div>
  )
}

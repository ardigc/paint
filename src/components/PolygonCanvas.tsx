import { MouseEventHandler, useEffect, useRef, useState } from 'react'
interface Lines {
  xOr: number
  yOr: number
  xFin: number
  yFin: number
}
type CoordOr = Pick<Lines, 'xOr' | 'yOr'> | null
// type CoordFin = Pick<Lines, 'xFin' | 'yFin'> | null
export function PolygonCanvas({ url }: { url: string }) {
  const canvasBeta = useRef<HTMLCanvasElement | null>(null)
  const [coordOr, setCoordOr] = useState<CoordOr>(null)
  const [lines, setLines] = useState<Lines[]>([])
  const [final, setFinal] = useState(false)
  const canvas = canvasBeta.current
  const rectCanvas = canvas?.getBoundingClientRect()
  const ctx = canvas?.getContext('2d')
  useEffect(() => {
    const img = new Image()
    img.src = url
    img.onload = function () {
      if (canvas && ctx) {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
      }
    }
  }, [url])

  const clickHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!ctx || !rectCanvas) return
    const { left, top } = rectCanvas
    const { clientX, clientY } = ev
    const coordX = clientX - left
    const coordY = clientY - top
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
    setFinal(false)
    const img = new Image()
    img.src = url
    img.onload = function () {
      if (canvas && ctx) {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        // aqui lo suyo seria hacer un array de poligonos
      }
    }
  }
  const closePoligon: MouseEventHandler<HTMLDivElement> = (ev) => {
    ev.stopPropagation()
    setCoordOr(null)
    setFinal(true)
  }
  if (lines.length >= 1 && ctx) {
    ctx.beginPath()
    ctx.moveTo(lines[0].xOr, lines[0].yOr)
    lines.map((lines) => {
      ctx.lineTo(lines.xFin, lines.yFin)
    })
    // aqui hacer un map del array de poligonos iniciandolos y termianndolo
    if (final) {
      ctx?.closePath()
    }
    ctx.stroke()
    if (final) {
      ctx.fillStyle = 'green'
      ctx.fill()
    }
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

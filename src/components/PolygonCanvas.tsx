import { MouseEventHandler, useRef, useState } from 'react'

export function PolygonCanvas({ url }: { url: string }) {
  const canvasBeta = useRef<HTMLCanvasElement | null>(null)
  const [rect, setRect] = useState<DOMRect>()

  const canvas = canvasBeta.current
  const img = new Image()
  img.src = url
  const ctx = canvas?.getContext('2d')
  img.onload = function () {
    if (canvas && ctx) {
      const rect = img.getBoundingClientRect()
      setRect(rect)
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
    }
  }
  const clickHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!ctx) return

    const { clientX, clientY } = ev
    console.log(clientX, clientY)
    ctx.beginPath()
    ctx.moveTo(0, 0) // Begin first sub-path
    ctx.lineTo(200, 50)
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

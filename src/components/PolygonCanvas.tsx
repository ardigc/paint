import { useRef, useState } from 'react'

export function PolygonCanvas({ url }: { url: string }) {
  const canvasBeta = useRef<HTMLCanvasElement | null>(null)
  const canvas = canvasBeta.current
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
  return (
    <div>
      <canvas ref={canvasBeta}></canvas>
    </div>
  )
}

import { MouseEventHandler, useState } from 'react'

export default function Canvas({ url }: { url: string }) {
  const [isDown, setIsDown] = useState(false)
  const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down')
    const coord = { x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY }
    setCoord(coord)
    setIsDown(true)
    document.addEventListener('mouseup', mouseUpHandler, { once: true })
  }
  const mouseUpHandler = (ev: MouseEvent) => {
    console.log('Mouse up')
    setIsDown(false)
  }
  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown) {
      const width1 = ev.nativeEvent.offsetX
      const heigth1 = ev.nativeEvent.offsetY
      const size = { width: width1, heigth: heigth1 }
    }
  }

  return (
    <div className="relative">
      <img
        draggable={false}
        src={url}
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
      />
      <div
        className="bg-green-500 bg-opacity-50 absolute"
        style={{
          top: coord.y,
          left: coord.x,
        }}
      ></div>
    </div>
  )
}

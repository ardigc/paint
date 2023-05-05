import { MouseEventHandler, useState } from 'react'

export default function Canvas({ url }: { url: string }) {
  const [isDown, setIsDown] = useState(false)
  const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down')

    setCoord({ x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY })
    setIsDown(true)
    document.addEventListener('mouseup', mouseUpHandler, { once: true })
  }
  const mouseUpHandler = (ev: MouseEvent) => {
    console.log('Mouse up')
    setCoord({ x: 0, y: 0 })
    setSize({ height: 0, width: 0 })
    setIsDown(false)
  }
  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown) {
      setSize({ width: ev.nativeEvent.offsetX, height: ev.nativeEvent.offsetY })
    }
  }
  // console.log("height:", size.height - coord.y,)
  // console.log("width:", size.width - coord.x)
  // console.log(size)
  return (
    <div
      className="relative"
      onMouseMove={mouseMoveHandler}
      onMouseDown={mouseDownHandler}
    >
      <img draggable={false} src={url} />
      <div
        className="bg-green-500 bg-opacity-50 absolute"
        style={{
          top: coord.y,
          left: coord.x,
          height: size.height - coord.y,
          width: size.width - coord.x,
        }}
      ></div>
    </div>
  )
}

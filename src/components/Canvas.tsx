import { MouseEventHandler, useState } from 'react'

export default function Canvas({ url }: { url: string }) {
  const [isDown, setIsDown] = useState(false)
  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down')
    setIsDown(true)
    document.addEventListener('mouseup', mouseUpHandler, { once: true })
  }
  const mouseUpHandler = (ev: MouseEvent) => {
    console.log('Mouse up')
    setIsDown(false)
  }
  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown) {
      console.log(ev.nativeEvent.offsetX)
      console.log(ev.nativeEvent.offsetY)
    }
  }

  return (
    <div>
      <img
        draggable={false}
        src={url}
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
      />
      <div className="bg-green-500 bg-opacity-50" style={{}}></div>
    </div>
  )
}

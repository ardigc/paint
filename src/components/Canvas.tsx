import { MouseEventHandler, useState } from 'react'

export default function Canvas({ url }: { url: string }) {
  const [isDown, setIsDown] = useState(false)
  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down')
    setIsDown(true)
  }
  const mouseUpHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse up')
    setIsDown(false)
  }
  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown) {
      console.log(ev.clientX)
      console.log(ev.clientY)
    }
  }
  return (
    <div>
      <img
        draggable={false}
        src={url}
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
      />
      <div className="bg-green-500 bg-opacity-50" style={{}}></div>
    </div>
  )
}

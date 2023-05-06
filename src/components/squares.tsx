import { useState, MouseEventHandler } from 'react'
export default function Sqre({
  top,
  left,
  width,
  height,
}: {
  top: number
  left: number
  width: number
  height: number
}) {
  // const [rect, setRect] = useState<DOMRect>()
  const [isDown, setIsDown] = useState(false)
  // const [size, setSize] = useState<{ width: number; height: number }>({
  //   width: width,
  //   height: height,
  // })
  const [move, setMove] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [coord, setCoord] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  // console.log(coord)
  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    // if (rect) {
    // const target = ev.target as HTMLElement
    // setRect(target.getBoundingClientRect())
    console.log('Mouse down')
    // setCoord({ x: ev.clientX - rect.x, y: ev.clientY - rect.y })
    setCoord({ x: ev.clientX, y: ev.clientY })
    setIsDown(true)
    document.addEventListener('mouseup', mouseUpHandler, { once: true })
    // }
  }
  // console.log(rect?.x)
  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown) {
      setMove({ x: ev.clientX, y: ev.clientY })
      // setSize({
      //   width: ev.clientX - rect.x - coord.x,
      //   height: ev.clientY - rect.y - coord.y,
      // })
    }
  }
  const mouseUpHandler = () => {
    console.log('Mouse up')

    setIsDown(false)
  }
  const [grab, setGrab] = useState(false)
  let index: number
  let cursor: string
  // console.log("move:"+move.x+"  "+move.y)
  // console.log("cood:"+coord.x+"  "+coord.y)
  const moveX = move.x - coord.x
  console.log(moveX)
  if (grab) {
    // top = size.height < 0 ? coord.y + size.height : coord.y
    // left = size.width < 0 ? coord.x + size.width : coord.x
    // width = Math.abs(size.width)
    // height = Math.abs(size.height)
    index = 20
    cursor = 'move'
  } else {
    index = 0
    cursor = 'default'
  }
  return (
    <div onClick={() => setGrab(true)} onBlur={() => setGrab(false)}>
      <div
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        className="bg-green-500 bg-opacity-50 absolute shadow-black shadow-xl"
        id="div"
        tabIndex={0}
        style={{
          top: top,
          left: left,
          height: height,
          width: width,
          zIndex: index,
          cursor: cursor,
        }}
      ></div>
      {grab && (
        <div
          onClick={() => setGrab(true)}
          onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab"
          style={{ top: top + height / 2, left: left - 5 }}
        ></div>
      )}
      {grab && (
        <div
          onClick={() => setGrab(true)}
          onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab"
          style={{ top: top + height / 2, left: left + width - 5 }}
        ></div>
      )}
      {grab && (
        <div
          onClick={() => setGrab(true)}
          onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab"
          style={{ top: top + height - 5, left: left + width / 2 }}
        ></div>
      )}
      {grab && (
        <div
          onClick={() => setGrab(true)}
          onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab"
          style={{ top: top - 5, left: left + width / 2 }}
        ></div>
      )}
    </div>
  )
}

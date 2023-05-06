import { useState, MouseEventHandler, ReactElement } from 'react'
export default function Sqre({
  top,
  left,
  width,
  height,
  index,
  fn,
  setCounter,
}: {
  top: number
  left: number
  width: number
  height: number
  index: number
  fn: any
  setCounter: any
}) {
  const [isDown, setIsDown] = useState(false)

  const [move, setMove] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [coord, setCoord] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down')
    setCoord({ x: ev.clientX, y: ev.clientY })
    setMove({ x: ev.clientX, y: ev.clientY })
    setIsDown(true)

    // fn(index, left, top)
    document.addEventListener('mouseup', mouseUpHandler, { once: true })
  }

  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown) {
      setMove({ x: ev.clientX, y: ev.clientY })
    }
  }
  const mouseUpHandler = () => {
    console.log('Mouse up')

    setIsDown(false)
  }
  const [grab, setGrab] = useState(false)
  let zindex: number
  let cursor: string
  let moveX = 0
  let moveY = 0

  if (grab) {
    moveX = move.x - coord.x
    moveY = move.y - coord.y
    top = top + moveY
    left = left + moveX
    zindex = 20
    cursor = 'move'
  } else {
    zindex = 0
    cursor = 'default'
  }
  // console.log(grab)
  // console.log("Movey "+move.y)
  // console.log("corrdx "+coord.x)
  // console.log("Coordy "+coord.y)
  const mouseUpHandler2 = () => {
    fn(index, left, top)
    setCounter(Math.random)
  }

  return (
    <div onClick={() => setGrab(true)} onBlur={() => setGrab(false)}>
      <div
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onMouseUp={mouseUpHandler2}
        className="bg-green-500 bg-opacity-50 absolute shadow-black shadow-xl"
        id="div"
        tabIndex={0}
        style={{
          top: top,
          left: left,
          height: height,
          width: width,
          zIndex: zindex,
          cursor: cursor,
          // translate: (moveX, moveY)
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

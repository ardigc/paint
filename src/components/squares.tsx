import { useState, MouseEventHandler, useRef, ReactElement } from 'react'
import { debounce } from '../helpers/debounce'
export default function Sqre({
  top,
  left,
  width,
  height,
  index,
  fn,
}: // setCounter,
{
  top: number
  left: number
  width: number
  height: number
  index: number
  fn: any
  // setCounter: any
}) {
  const [isDown, setIsDown] = useState(false)
  const myRef = useRef<HTMLDivElement | null>(null)

  const [move, setMove] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [coord, setCoord] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [grab, setGrab] = useState(false)

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
  const debouncedMouseMoveHandler = debounce(mouseMoveHandler, 10)
  const mouseDownHandler2: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down')
    setCoord({ x: ev.clientX, y: ev.clientY })
    setMove({ x: ev.clientX, y: ev.clientY })
    setIsDown(true)

    // fn(index, left, top)
    document.addEventListener('mousemove', mouseMoveHandler2)
    document.addEventListener('mouseup', mouseUpHandler, { once: true })
  }

  const mouseMoveHandler2 = (ev: MouseEvent) => {
    if (isDown) {
      // setMove({ x: ev.clientX, y: ev.clientY })
      console.log(ev.clientX + '  ' + ev.clientY)
    }
  }
  const mouseUpHandler = () => {
    console.log('Mouse up')
    setCoord({ x: 0, y: 0 })
    setMove({ x: 0, y: 0 })
    setIsDown(false)
  }
  let zindex: number
  let cursor: string
  let moveX = 0
  let moveY = 0

  if (grab) {
    moveX = move.x - coord.x
    moveY = move.y - coord.y
    // console.log(top + ' (' + move.x + ' - ' + coord.x + ')')
    top = top + moveY
    left = left + moveX
    zindex = 20
    cursor = 'move'
  } else {
    zindex = 0
    cursor = 'default'
  }
  // console.log("Movey "+move.y)
  // console.log("corrdx "+coord.x)
  // console.log("Coordy "+coord.y)
  const mouseUpHandler2 = () => {
    fn(index, left, top)
    setIsDown(false)
    // setCounter(Math.random)
  }

  return (
    <div
      onFocus={() => setGrab(true)}
      ref={myRef}
      onBlur={(event) => {
        if (myRef.current !== null) {
          if (
            event.relatedTarget &&
            myRef.current.contains(event.relatedTarget)
          ) {
            return
          }
          setGrab(false)
        }
      }}
      tabIndex={1}
    >
      <div
        onMouseDown={mouseDownHandler}
        onMouseMove={debouncedMouseMoveHandler}
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
          onMouseDown={mouseDownHandler2}
          // onMouseMove={mouseMoveHandler2}
          // onClick={() => setGrab(true)}
          // onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab active:cursor-grabbing"
          style={{ top: top + height / 2, left: left - 5 }}
          tabIndex={1}
        ></div>
      )}
      {grab && (
        <div
          // onClick={() => setGrab(true)}
          // onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab active:cursor-grabbing"
          style={{ top: top + height / 2, left: left + width - 5 }}
          tabIndex={1}
        ></div>
      )}
      {grab && (
        <div
          // onClick={() => setGrab(true)}
          // onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab active:cursor-grabbing"
          style={{ top: top + height - 5, left: left + width / 2 }}
          tabIndex={1}
        ></div>
      )}
      {grab && (
        <div
          // onClick={() => setGrab(true)}
          // onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab active:cursor-grabbing"
          style={{ top: top - 5, left: left + width / 2 }}
          tabIndex={1}
        ></div>
      )}
    </div>
  )
}

import { useState, MouseEventHandler, useRef, ReactElement } from 'react'
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
  const [isDown2, setIsDown2] = useState(0)

  const [vari, setVari] = useState(0)
  const myRef = useRef<HTMLDivElement | null>(null)

  const [move, setMove] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  const [coord, setCoord] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })
  const [size, setSize] = useState<{
    top: number
    left: number
    height: number
    width: number
  }>({ top: 0, left: 0, height: 0, width: 0 })

  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down')
    setCoord({ x: ev.clientX, y: ev.clientY })
    setMove({ x: ev.clientX, y: ev.clientY })
    setIsDown(true)
    document.addEventListener('mouseup', mouseUpHandler, { once: true })
  }

  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown) {
      if (top >= 0) {
        setMove({ x: ev.clientX, y: ev.clientY })
      } else {
        setMove({ x: ev.clientX, y: move.y })
      }
    }
  }
  const mouseUpHandler = () => {
    console.log('Mouse up')
    setCoord({ x: 0, y: 0 })
    setMove({ x: 0, y: 0 })
    setIsDown(false)
  }
  const mouseDownhandlerBottom: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down2')
    setIsDown2(1)
    setVari(ev.clientY)
  }
  const mouseDownhandlerUp: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down2')
    setIsDown2(2)
    setVari(ev.clientY)
  }
  const mouseDownhandlerWidth: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down2')
    setIsDown2(3)
    setVari(ev.clientX)
  }
  const mouseDownhandlerLeft: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down2')
    setIsDown2(4)
    setVari(ev.clientX)
  }

  const mouseMoveHandlerBottom: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (isDown2 === 1) {
      setSize({ top: 0, left: 0, width: 0, height: vari - ev.clientY })
    } else if (isDown2 === 2) {
      setSize({
        top: vari - ev.clientY,
        left: 0,
        width: 0,
        height: ev.clientY - vari,
      })
    } else if (isDown2 === 3) {
      setSize({ top: 0, left: 0, width: ev.clientX - vari, height: 0 })
    } else if (isDown2 === 4) {
      setSize({
        top: 0,
        left: ev.clientX - vari,
        width: vari - ev.clientX,
        height: 0,
      })
    }
  }
  const mouseUpHandler3 = () => {
    console.log('Mouse up3')

    fn(index, left, top, height, width)
    setIsDown(false)
    setSize({ top: 0, left: 0, width: 0, height: 0 })
    setIsDown2(0)
  }
  const [grab, setGrab] = useState(false)
  let zindex: number
  let cursor: string
  let moveX = 0
  let moveY = 0

  if (grab) {
    // console.log("top", top)
    // Aqui top es negatrivo cuando suelto
    if (top < 1) {
      top = 1
    }
    if (top >= 0) {
      moveY = move.y - coord.y
      top = top + moveY
      console.log(top)
    } else {
      top = 1
    }
    moveX = move.x - coord.x

    // console.log("top swuare:",top)

    left = left + moveX
    // console.log('heigt1', height)

    if (isDown2 === 4) {
      left = left - size.width
      width = width + size.width
    } else if (isDown2 === 3) {
      width = width + size.width
    } else if (isDown2 === 1) {
      height = height - size.height
    } else if (isDown2 === 2) {
      top = top - size.top
      height = height - size.height
    }
    // console.log('size', size.height)
    // console.log('height2', height - size.height)
    zindex = 15
    cursor = 'move'
  } else {
    zindex = 0
    cursor = 'default'
  }
  const mouseUpHandler2 = () => {
    fn(index, left, top, height, width)
    setIsDown(false)
  }
  return (
    <div
      onClick={() => setGrab(true)}
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
      {isDown2 !== 0 && (
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-30"
          onMouseMove={mouseMoveHandlerBottom}
          onMouseUp={mouseUpHandler3}
        ></div>
      )}
      {grab && (
        <div
          onMouseDown={mouseDownhandlerLeft}
          className="h-3 w-3 bg-slate-300 absolute z-20 cursor-grab active:cursor-grabbing"
          style={{ top: top + height / 2, left: left - 5 }}
          tabIndex={1}
        ></div>
      )}
      {grab && (
        <div
          onMouseDown={mouseDownhandlerWidth}
          className="h-3 w-3 bg-slate-300 absolute z-20 cursor-grab active:cursor-grabbing"
          style={{ top: top + height / 2, left: left + width - 5 }}
          tabIndex={1}
        ></div>
      )}
      {grab && (
        <div
          onMouseDown={mouseDownhandlerBottom}
          className="h-3 w-3 bg-slate-300 absolute z-20 cursor-grab active:cursor-grabbing"
          style={{ top: top + height - 5, left: left + width / 2 }}
          tabIndex={1}
        ></div>
      )}
      {grab && (
        <div
          onMouseDown={mouseDownhandlerUp}
          className="h-3 w-3 bg-slate-300 absolute z-20 cursor-grab active:cursor-grabbing"
          style={{ top: top - 5, left: left + width / 2 }}
          tabIndex={1}
        ></div>
      )}
    </div>
  )
}

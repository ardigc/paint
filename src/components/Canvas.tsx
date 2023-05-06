import { MouseEventHandler, useState, ReactEventHandler } from 'react'
import Sqre from './squares'

export default function Canvas({ url }: { url: string }) {
  const [isDown, setIsDown] = useState(false)
  const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })
  // const ref = useRef<HTMLImageElement>(null)
  // const imageRef = useRef(null);

  const [rect, setRect] = useState<DOMRect>()
  const [sqrArr, setSqrArr] = useState<
    { top: number; left: number; width: number; height: number }[]
  >([{ top: 0, left: 0, width: 0, height: 0 }])

  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (rect) {
      console.log('Mouse down')
      const sqr = { top: top, left: left, width: width, height: height }
      const sqrArrCopy = sqrArr
      sqrArrCopy?.push(sqr)
      console.log(sqrArrCopy)
      setSqrArr(sqrArrCopy)
      setSize({ width: 0, height: 0 })
      setCoord({ x: 0, y: 0 })
      setCoord({ x: ev.clientX - rect.x, y: ev.clientY - rect.y })
      setIsDown(true)
      document.addEventListener('mouseup', mouseUpHandler, { once: true })
    }
  }
  // console.log(rect?.x)
  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown && rect) {
      setSize({
        width: ev.clientX - rect.x - coord.x,
        height: ev.clientY - rect.y - coord.y,
      })
    }
  }
  let top: number
  // const top = size.height < 0 ? coord.y + size.height : coord.y;
  if (size.height < 0) {
    top = coord.y + size.height
  } else {
    top = coord.y
  }
  let left: number
  // const left = size.width < 0 ? coord.x + size.width : coord.x;
  if (size.width < 0) {
    left = coord.x + size.width
  } else {
    left = coord.x
  }
  const width = Math.abs(size.width)
  // const element = EventTarget as HTMLElement
  const height = Math.abs(size.height)
  const onLoadHandler: ReactEventHandler = (ev) => {
    const target = ev.target as HTMLElement
    setRect(target.getBoundingClientRect())
  }
  const mouseUpHandler = () => {
    console.log('Mouse up')

    setIsDown(false)
  }
  const clickHandle = () => {
    setSqrArr([{ top: 0, left: 0, width: 0, height: 0 }])
    setSize({ width: 0, height: 0 })
    setCoord({ x: 0, y: 0 })
  }
  console.log(top, left, height, width)
  return (
    <div>
      <div
        className="relative"
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
      >
        <img draggable={false} onLoad={onLoadHandler} src={url} />
        {/* probar con is down para que arrastre o no sobre el cuadro el div de abajo*/}

        <div className="absolute z-10 top-0 opacity-0 h-full w-full"></div>
        {sqrArr.map((it) => (
          <Sqre {...it} />
        ))}
        <Sqre top={top} left={left} height={height} width={width} />
      </div>
      <button
        className="border-t-neutral-900 bg-slate-500 rounded-md"
        onClick={clickHandle}
      >
        Limpiar cuadros
      </button>
    </div>
  )
}

import { MouseEventHandler, useState, ReactEventHandler } from 'react'
import Sqre from './squares'
import Export from './Export'

export default function Canvas({ url }: { url: string }) {
  const [isDown, setIsDown] = useState(false)
  const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })
  const [counter, setCounter] = useState(0)
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [sqrName, setSqrName] = useState('unnamed')

  const [rect, setRect] = useState<DOMRect>()
  const [sqrArr, setSqrArr] = useState<
    {
      top: number
      left: number
      width: number
      height: number
      index: number
      sqrName: string
    }[]
  >([{ top: 0, left: 0, width: 0, height: 0, index: 0, sqrName: '' }])
  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (rect) {
      console.log('Mouse down')
      setSize({ width: 0, height: 0 })
      setCoord({ x: 0, y: 0 })
      setCoord({ x: ev.clientX - rect.x, y: ev.clientY - rect.y })
      setSqrName('unnamed')
      setIsDown(true)
      console.log(sqrArr)
      const sqr = {
        top: top,
        left: left,
        width: width,
        height: height,
        index: sqrArr.length,
        sqrName: sqrName,
      }
      const sqrArrCopy = sqrArr
      sqrArrCopy?.push(sqr)
      setSqrArr(sqrArrCopy)
      document.addEventListener('mouseup', mouseUpHandler, { once: true })
    }
  }
  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown && rect) {
      setSize({
        width: ev.clientX - rect.x - coord.x,
        height: ev.clientY - rect.y - coord.y,
      })
      if (size.height < 0) {
        setTop(coord.y + size.height)
      } else {
        setTop(coord.y)
      }
      // const left = size.width < 0 ? coord.x + size.width : coord.x;
      if (size.width < 0) {
        setLeft(coord.x + size.width)
      } else {
        setLeft(coord.x)
      }
      setWidth(Math.abs(size.width))
      setHeight(Math.abs(size.height))
    }
  }
  function modMove(
    index: number,
    movY: number,
    movX: number,
    height: number,
    width: number,
    sqrName: string
  ) {
    console.log('modmove', sqrName)
    if (index !== -1) {
      const sqrArrCopy = sqrArr
      sqrArrCopy[index].top = movX
      sqrArrCopy[index].left = movY
      sqrArrCopy[index].height = height
      sqrArrCopy[index].width = width
      sqrArrCopy[index].sqrName = sqrName
      setSqrArr(sqrArrCopy)
    } else {
      setTop(movX)
      setLeft(movY)
      setHeight(height)
      setWidth(width)
      setSqrName(sqrName)
    }
    setCounter(counter + 1)
  }

  // const top = size.height < 0 ? coord.y + size.height : coord.y;

  // const element = EventTarget as HTMLElement
  const onLoadHandler: ReactEventHandler = (ev) => {
    const target = ev.target as HTMLElement
    setRect(target.getBoundingClientRect())
  }
  const mouseUpHandler = () => {
    console.log('Mouse up')
    setIsDown(false)
  }
  const clickHandle = () => {
    setSqrArr([{ top: 0, left: 0, width: 0, height: 0, index: 0, sqrName: '' }])
    setSize({ width: 0, height: 0 })
    setCoord({ x: 0, y: 0 })
    setLeft(0)
    setWidth(0)
    setHeight(0)
    setTop(0)
    setSqrName('unnamed')
  }
  return (
    <div>
      <div className="relative" onMouseMove={mouseMoveHandler}>
        <img
          draggable={false}
          onMouseDown={mouseDownHandler}
          onLoad={onLoadHandler}
          src={url}
          className="select-none"
        />
        {/* probar con is down para que arrastre o no sobre el cuadro el div de abajo*/}

        {sqrArr.map((it) => (
          <Sqre
            {...it}
            fn={modMove}
            rect={rect}
            //  setCounter={setCounter}
          />
        ))}
        <Sqre
          top={top}
          left={left}
          height={height}
          width={width}
          rect={rect}
          fn={modMove}
          sqrName={sqrName}
          // setCounter={setCounter}
          index={-1}
        />
      </div>
      <button
        className="border-t-neutral-900 bg-slate-500 rounded-md"
        onClick={clickHandle}
      >
        Limpiar cuadros
      </button>
      <Export
        sqrArr={sqrArr}
        sqrName={sqrName}
        top={top}
        left={left}
        height={height}
        width={width}
      />
    </div>
  )
}

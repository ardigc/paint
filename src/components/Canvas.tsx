import { MouseEventHandler, useState, ReactEventHandler } from 'react'
import { Square } from '../types'
import { SquareDrawing } from './SquareDrawing'

type Placeholder = Omit<Square, 'name'> | null
type Pivot = Pick<Square, 'x' | 'y'> | null

export default function Canvas({ url }: { url: string }) {
  const [rect, setRect] = useState<DOMRect>()
  const [squares, setSquares] = useState<Square[]>([])
  const [pivot, setPivot] = useState<Pivot>(null)
  const [placeholder, setPlaceholder] = useState<Placeholder>(null)

  const loadHandler: ReactEventHandler<HTMLImageElement> = (ev) => {
    const parentDiv = ev.currentTarget.parentElement
    const rect = parentDiv?.getBoundingClientRect()
    setRect(rect)
  }

  const mouseDownHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!rect) return
    const { left, top } = rect
    const { clientX, clientY } = ev
    const squareX = clientX - left
    const squareY = clientY - top
    setPivot({ x: squareX, y: squareY })
  }

  const mouseMoveHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!rect || !pivot) return
    const { clientX, clientY } = ev
    const mouseX = clientX - rect.left
    const mouseY = clientY - rect.top

    const width = Math.abs(mouseX - pivot.x)
    const height = Math.abs(mouseY - pivot.y)

    const left = mouseX < pivot.x ? mouseX : pivot.x
    const top = mouseY < pivot.y ? mouseY : pivot.y
    setPlaceholder({ x: left, y: top, width, height })
  }

  const mouseUpHandler = () => {
    if (!rect || !placeholder) return
    setSquares((prev) => [...prev, { ...placeholder, name: '' }])
    setPlaceholder(null)
    setPivot(null)
  }

  const handleCleanSquares = () => {
    setSquares([])
  }

  return (
    <div>
      <div
        className="relative w-max"
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        onMouseLeave={mouseUpHandler}
      >
        <img
          draggable={false}
          onLoad={loadHandler}
          src={url}
          className="select-none"
        />
        {placeholder && <SquareDrawing {...placeholder} name="" id={0} />}
        {squares.map((square, index) => (
          <SquareDrawing
            key={`Square-${index}`}
            {...square}
            name=""
            id={index}
          />
        ))}
      </div>
      <button
        className="border-t-neutral-900 bg-slate-500 rounded-md"
        onClick={handleCleanSquares}
      >
        Limpiar cuadros
      </button>
      <button className="border-t-neutral-900 bg-slate-500 rounded-md">
        Export as csv
      </button>
    </div>
  )
}

import { MouseEventHandler, useState, ReactEventHandler } from 'react'
import { Square } from '../types'
import { Direction, SquareDrawing } from './SquareDrawing'

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
    setPivot(null)
    if (!rect || !placeholder) return
    setSquares((prev) => [...prev, { ...placeholder, name: '' }])
    setPlaceholder(null)
  }

  const handleSquareResize = (
    id: number,
    direction: Direction,
    deltaX: number,
    deltaY: number
  ) => {
    setSquares((prev) => {
      const newSquares = [...prev]
      const square = newSquares[id]
      if (!square) return newSquares

      let newWidth = square.width
      let newHeight = square.height
      let newLeft = square.x
      let newTop = square.y

      if (direction === 'top') {
        newHeight = Math.max(square.height - deltaY, 0)
        newTop = square.y + (square.height - newHeight)
      } else if (direction === 'bottom') {
        newHeight = Math.max(square.height + deltaY, 0)
      }

      if (direction === 'left') {
        newWidth = Math.max(square.width - deltaX, 0)
        newLeft = square.x + (square.width - newWidth)
      } else if (direction === 'right') {
        newWidth = Math.max(square.width + deltaX, 0)
      }

      newSquares[id] = {
        ...square,
        width: newWidth,
        height: newHeight,
        x: newLeft,
        y: newTop,
      }
      return newSquares
    })
  }

  const handleSquareMove = (id: number, deltaX: number, deltaY: number) => {
    setSquares((prev) => {
      const newSquares = [...prev]
      const square = newSquares[id]
      if (!square) return newSquares

      const newLeft = Math.max(square.x + deltaX, 0)
      const newTop = Math.max(square.y + deltaY, 0)

      newSquares[id] = { ...square, x: newLeft, y: newTop }
      return newSquares
    })
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
        {placeholder && (
          <SquareDrawing {...placeholder} name="" id={0} isPlaceholder />
        )}
        {squares.map((square, index) => (
          <SquareDrawing
            key={`Square-${index}`}
            {...square}
            name=""
            id={index}
            onResize={handleSquareResize}
            onMove={handleSquareMove}
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

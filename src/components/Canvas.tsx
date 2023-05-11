import { MouseEventHandler, useState, ReactEventHandler } from 'react'
import { Square } from '../types'
import { Direction, SquareDrawing } from './SquareDrawing'
import { downloadJsonAsCsv } from '../helpers/JSONtoCSV'

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
    if (!rect) return
    setSquares((prev) => {
      const newSquares = [...prev]
      const square = newSquares[id]
      if (!square) return newSquares

      let newWidth = square.width
      let newHeight = square.height
      let newLeft = square.x
      let newTop = square.y

      if (direction === 'top') {
        const maxHeight = square.y + square.height
        newHeight = Math.max(0, Math.min(maxHeight, square.height - deltaY))
        newTop = square.y + (square.height - newHeight)
      } else if (direction === 'bottom') {
        const maxHeight = rect.height - square.y
        newHeight = Math.max(0, Math.min(maxHeight, square.height + deltaY))
      }

      if (direction === 'left') {
        const maxWidth = square.x + square.width
        newWidth = Math.max(0, Math.min(maxWidth, square.width - deltaX))
        newLeft = square.x + (square.width - newWidth)
      } else if (direction === 'right') {
        const maxWidth = rect.width - square.x
        newWidth = Math.max(0, Math.min(maxWidth, square.width + deltaX))
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
    if (!rect) return
    setSquares((prev) => {
      const newSquares = [...prev]
      const square = newSquares[id]
      if (!square) return newSquares

      const newLeft = Math.max(
        0,
        Math.min(rect.width - square.width, square.x + deltaX)
      )
      const newTop = Math.max(
        0,
        Math.min(rect.height - square.height, square.y + deltaY)
      )

      newSquares[id] = { ...square, x: newLeft, y: newTop }
      return newSquares
    })
  }

  const handleCleanSquares = () => {
    setSquares([])
  }

  const handleDownload = () => {
    downloadJsonAsCsv(squares, 'data.csv')
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
      <button
        className="border-t-neutral-900 bg-slate-500 rounded-md"
        onClick={handleDownload}
      >
        Export as csv
      </button>
    </div>
  )
}

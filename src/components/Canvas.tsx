import { MouseEventHandler, useState, ReactEventHandler } from 'react'
import { Square } from '../types'
import { SquareDrawing } from './SquareDrawing'

export default function Canvas({ url }: { url: string }) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [rect, setRect] = useState<DOMRect>()
  const [squares, setSquares] = useState<Square[]>([])
  const [placeholderSquare, setPlaceholderSquare] = useState<
    // Omit es un typo de ayuda de typescript que permite omitir una propiedad de un tipo
    Omit<Square, 'name'>
  >({ x: 0, y: 0, width: 0, height: 0 })

  const loadHandler: ReactEventHandler<HTMLImageElement> = (ev) => {
    const parentDiv = ev.currentTarget.parentElement
    const rect = parentDiv?.getBoundingClientRect()
    setRect(rect)
  }

  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (!rect) return
    setIsDrawing(true)
    const { x, y } = rect
    const { clientX, clientY } = ev
    const top = clientY - y
    const left = clientX - x
    setPlaceholderSquare({ x: top, y: left, width: 0, height: 0 })
  }

  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (!rect) return
    if (!isDrawing) return
    const { x, y } = rect
    const { clientX, clientY } = ev
    const top = clientY - y
    const left = clientX - x
    const width = left - placeholderSquare.x
    const height = top - placeholderSquare.y
    setPlaceholderSquare((prev) => ({ ...prev, width, height }))
  }

  const mouseUpHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (!rect) return
    setIsDrawing(false)
    const { x, y } = rect
    const { clientX, clientY } = ev
    const top = clientY - y
    const left = clientX - x
    const width = left - placeholderSquare.x
    const height = top - placeholderSquare.y
    setSquares((prev) => [
      ...prev,
      { ...placeholderSquare, width, height, name: '' },
    ])
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
      >
        <img
          draggable={false}
          onLoad={loadHandler}
          src={url}
          className="select-none"
        />
        <div />
        {isDrawing && <SquareDrawing {...placeholderSquare} name="" />}
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

import { Square } from '../types'

export function SquareDrawing({
  height,
  name,
  width,
  x,
  y,
}: Square & { id: number }) {
  return (
    <div
      className="bg-green-500 bg-opacity-50 border-green-800 absolute select-none"
      style={{ left: x, top: y, width, height }}
    >
      {name}
    </div>
  )
}

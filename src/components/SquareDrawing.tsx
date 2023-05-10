import { Square } from '../types'

export function SquareDrawing({ height, name, width, x, y }: Square) {
  return (
    <div
      className="bg-green-500 bg-opacity-50 border-green-800 absolute"
      style={{ left: x, top: y, width, height }}
    >
      {name}
    </div>
  )
}

import { Square } from '../types'
import { MouseEvent as ReactMouseEvent, useState } from 'react'

export type Direction = 'top' | 'right' | 'bottom' | 'left'

interface Props extends Square {
  id: number
  isPlaceholder?: boolean
  onResize?: (
    id: number,
    direction: Direction,
    deltaX: number,
    deltaY: number
  ) => void
}

export function SquareDrawing({
  height,
  name,
  width,
  x,
  y,
  id,
  onResize,
  isPlaceholder,
}: Props) {
  const [isResizing, setIsResizing] = useState(false)

  const handleMouseDown = (e: ReactMouseEvent, direction: Direction) => {
    if (isPlaceholder) return
    e.stopPropagation()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    function handleMouseMove(e: MouseEvent) {
      const deltaX = e.movementX
      const deltaY = e.movementY

      onResize!(id, direction, deltaX, deltaY)
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }

  const RenderHandle = ({ direction }: { direction: Direction }) => {
    const getStyleCenteredAtDirection = () => {
      switch (direction) {
        case 'top':
          return {
            left: '50%',
            top: 0,
            transform: 'translate(-50%, -50%)',
          }
        case 'right':
          return {
            right: 0,
            top: '50%',
            transform: 'translate(50%, -50%)',
          }
        case 'bottom':
          return {
            left: '50%',
            bottom: 0,
            transform: 'translate(-50%, 50%)',
          }
        case 'left':
          return {
            left: 0,
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }
      }
    }

    return (
      <div
        className={'absolute bg-blue-500 cursor-grab active:cursor-grabbing'}
        style={{
          width: 8,
          height: 8,
          margin: -4,
          zIndex: 10,
          ...getStyleCenteredAtDirection(),
        }}
        onMouseDown={(e) => handleMouseDown(e, direction)}
      />
    )
  }

  return (
    <div
      className="bg-green-500 bg-opacity-50 border border-green-800 absolute select-none"
      style={{ left: x, top: y, width, height }}
      onClick={(e) => {
        if (isPlaceholder) return
        setIsResizing(true)
      }}
      onBlur={() => setIsResizing(false)}
      tabIndex={0}
    >
      {name}
      {isResizing && (
        <>
          <RenderHandle direction="top" />
          <RenderHandle direction="right" />
          <RenderHandle direction="bottom" />
          <RenderHandle direction="left" />
        </>
      )}
    </div>
  )
}

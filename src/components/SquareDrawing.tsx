import { Square } from '../types'
import {
  MouseEvent as ReactMouseEvent,
  useState,
  MouseEventHandler,
  useRef,
  ChangeEventHandler,
} from 'react'

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
  onMove?: (id: number, deltaX: number, deltaY: number) => void
  onChangeName?: (id: number, name: string) => void
}

export function SquareDrawing({
  height,
  name,
  width,
  x,
  y,
  id,
  onResize,
  onMove,
  onChangeName,
  isPlaceholder,
}: Props) {
  const [isSelected, setIsSelected] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    let lastMouseX = e.clientX
    let lastMouseY = e.clientY

    const handleDrag = (e: MouseEvent) => {
      const deltaX = e.clientX - lastMouseX
      const deltaY = e.clientY - lastMouseY

      onMove?.(id, deltaX, deltaY)
      lastMouseX = e.clientX
      lastMouseY = e.clientY
    }

    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', handleDragEnd)
    }

    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', handleDragEnd)
  }

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (isPlaceholder) return

    if (!timeoutRef.current && !isSelected) {
      ev.stopPropagation()
      const timeout = setTimeout(() => {
        ev.target.dispatchEvent(new MouseEvent('mousedown', ev.nativeEvent))
      }, 100)
      timeoutRef.current = timeout
    }

    if (isSelected) {
      ev.stopPropagation()
      handleDragStart(ev)
    }
  }

  const handleMouseUp = () => {
    if (isPlaceholder) return
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const handleMouseMove = () => {
    if (isPlaceholder) return
  }

  const resizeHandleMouseDown = (e: ReactMouseEvent, direction: Direction) => {
    if (isPlaceholder) return
    e.stopPropagation()
    let lastMouseX = e.clientX
    let lastMouseY = e.clientY

    function handleMouseMove(e: MouseEvent) {
      const deltaX = e.clientX - lastMouseX
      const deltaY = e.clientY - lastMouseY

      onResize!(id, direction, deltaX, deltaY)
      lastMouseX = e.clientX
      lastMouseY = e.clientY
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChangeName?.(id, e.target.value)
  }

  const ResizeHandle = ({ direction }: { direction: Direction }) => {
    return (
      <div
        className={'absolute bg-blue-500 cursor-grab active:cursor-grabbing'}
        style={{
          width: 8,
          height: 8,
          margin: -4,
          zIndex: 10,
          ...getStyleCenteredAtDirection(direction),
        }}
        onMouseDown={(e) => resizeHandleMouseDown(e, direction)}
      />
    )
  }

  return (
    <div
      className="bg-green-500 bg-opacity-50 border border-green-800 absolute select-none"
      style={{ left: x, top: y, width, height }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onClick={() => setIsSelected(true)}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
    >
      {!isPlaceholder && <input value={name} onChange={changeHandler} />}
      {isSelected && (
        <>
          <ResizeHandle direction="top" />
          <ResizeHandle direction="right" />
          <ResizeHandle direction="bottom" />
          <ResizeHandle direction="left" />
        </>
      )}
    </div>
  )
}

function getStyleCenteredAtDirection(direction: Direction) {
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

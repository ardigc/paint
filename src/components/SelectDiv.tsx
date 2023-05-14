import { MouseEventHandler } from 'react'

interface Lines {
  origen: boolean
  x: number
  y: number
  index: number
  reDimPolygon: (
    newyFin: number,
    newxFin: number,
    index: number,
    origen: boolean
  ) => void
}
export default function SelectDiv({
  x,
  y,
  index,
  origen,
  reDimPolygon,
}: Lines) {
  const mouseDownHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    ev.stopPropagation()
    let lastMouseX = ev.clientX
    let lastMouseY = ev.clientY
    let newyFin = y
    let newxFin = x
    function handleMouseMove(ev: MouseEvent) {
      ev.stopPropagation()
      let deltaX = ev.clientX - lastMouseX
      let deltaY = ev.clientY - lastMouseY
      newxFin = newxFin + deltaX
      newyFin = newyFin + deltaY
      reDimPolygon(newyFin, newxFin, index, origen)
      lastMouseX = ev.clientX
      lastMouseY = ev.clientY
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  return (
    <div
      onMouseDown={mouseDownHandler}
      className="absolute h-3 w-3 border bg-orange-600 rounded-full"
      style={{
        top: y - 5,
        left: x - 5,
      }}
    ></div>
  )
}

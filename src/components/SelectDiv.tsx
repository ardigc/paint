import { MouseEventHandler } from 'react'

interface Lines {
  xOr: number
  yOr: number
  xFin: number
  yFin: number
  index: number
  reDimPolygon: (deltaX: number, deltaY: number, index: number) => void
}
export default function SelectDiv({
  xOr,
  yOr,
  xFin,
  yFin,
  index,
  reDimPolygon,
}: Lines) {
  const mouseDownHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    ev.stopPropagation()
    let lastMouseX = ev.clientX
    let lastMouseY = ev.clientY
    let newyFin = yFin
    let newxFin = xFin
    function handleMouseMove(ev: MouseEvent) {
      ev.stopPropagation()
      let deltaX = ev.clientX - lastMouseX
      let deltaY = ev.clientY - lastMouseY
      console.log(newxFin, '=', xFin, '+', deltaX)
      newxFin = newxFin + deltaX
      newyFin = newyFin + deltaY
      reDimPolygon(newyFin, newxFin, index)
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
        top: yFin - 5,
        left: xFin - 5,
      }}
    ></div>
  )
}

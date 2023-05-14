import { MouseEventHandler } from 'react'

interface Lines {
  xOr: number
  yOr: number
  xFin: number
  yFin: number
  index: number
}
export default function SelectDiv({ xOr, yOr, xFin, yFin, index }: Lines) {
  const mouseDownHandler: MouseEventHandler<HTMLDivElement> = (ev) => {
    ev.stopPropagation()
    console.log(xFin, xOr)
    // function handleMouseMove() {

    // }

    // function handleMouseUp() {
    //   document.removeEventListener('mousemove', handleMouseMove)
    //   document.removeEventListener('mouseup', handleMouseUp)
    // }
    // document.addEventListener('mousemove', handleMouseMove)
    // document.addEventListener('mouseup', handleMouseUp)
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

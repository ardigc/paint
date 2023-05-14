interface Lines {
  xOr: number
  yOr: number
  xFin: number
  yFin: number
  index: number
}
export default function SelectDiv({ xOr, yOr, xFin, yFin, index }: Lines) {
  return (
    <div
      className="absolute h-2 w-2 border bg-orange-600 rounded-full"
      style={{
        top: yFin - 5,
        left: xFin - 5,
      }}
    ></div>
  )
}

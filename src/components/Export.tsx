export default function Export({
  top,
  left,
  width,
  height,
  sqrName,
  sqrArr,
}: {
  top: number
  left: number
  width: number
  height: number
  sqrName: string
  sqrArr: Array<{
    top: number
    left: number
    width: number
    height: number
    index: number
    sqrName: string
  }>
}) {
  return (
    <div>
      <button className="bg-purple-100 rounded-lg">Export squares</button>
    </div>
  )
}

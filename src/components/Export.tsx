export default function Export({
  top,
  left,
  width,
  height,
  sqrName,
}: {
  top: number
  left: number
  width: number
  height: number
  sqrName: string
}) {
  return (
    <div>
      <button className="bg-purple-100 rounded-lg">Export squares</button>
    </div>
  )
}

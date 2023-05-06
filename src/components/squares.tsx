export default function Sqre({
  top,
  left,
  width,
  height,
}: {
  top: number
  left: number
  width: number
  height: number
}) {
  return (
    <div
      className="bg-green-500 bg-opacity-50 absolute"
      style={{
        top: top,
        left: left,
        height: height,
        width: width,
      }}
    ></div>
  )
}

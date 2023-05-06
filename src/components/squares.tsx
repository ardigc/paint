import { useState } from 'react'
export default function Sqre({
  top,
  left,
  width,
  height,
  down,
}: {
  top: number
  left: number
  width: number
  height: number
  down: boolean
}) {
  const [grab, setGrab] = useState(false)
  let index
  if (down) {
    index = 0
  } else {
    index = 20
  }
  return (
    <div
      onFocus={() => setGrab(true)}
      onBlur={() => setGrab(false)}
      className="bg-green-500 bg-opacity-50 absolute z-20"
      tabIndex={0}
      style={{
        top: top,
        left: left,
        height: height,
        width: width,
        zIndex: index,
      }}
    >
      {grab && <div>Mis cuadrados para agarrar </div>}
    </div>
  )
}

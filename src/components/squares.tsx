import { useState } from 'react'
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
  const [grab, setGrab] = useState(false)
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
      }}
    >
      {grab && <div>Mis cuadrados para agarrar </div>}
    </div>
  )
}

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
    <div onFocus={() => setGrab(true)} onBlur={() => setGrab(false)}>
      <div
        className="bg-green-500 bg-opacity-50 absolute"
        tabIndex={0}
        style={{
          top: top,
          left: left,
          height: height,
          width: width,
        }}
      ></div>
      {grab && (
        <div
          onFocus={() => setGrab(true)}
          onBlur={() => setGrab(false)}
          className="h-2 w-2 bg-slate-300 absolute"
          style={{ top: top + height / 2, left: left }}
        ></div>
      )}
    </div>
  )
}

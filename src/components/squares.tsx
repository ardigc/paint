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
  let index: number
  let cursor: string
  if (grab) {
    index = 20
    cursor = 'grab'
  } else {
    index = 0
    cursor = 'default'
  }
  console.log(grab)
  return (
    <div onClick={() => setGrab(true)} onBlur={() => setGrab(false)}>
      <div
        className="bg-green-500 bg-opacity-50 absolute shadow-black shadow-xl"
        id="div"
        tabIndex={0}
        style={{
          top: top,
          left: left,
          height: height,
          width: width,
          zIndex: index,
          cursor: cursor,
        }}
      ></div>
      {grab && (
        <div
          onClick={() => setGrab(true)}
          onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab"
          style={{ top: top + height / 2, left: left - 5 }}
        ></div>
      )}
      {grab && (
        <div
          onClick={() => setGrab(true)}
          onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab"
          style={{ top: top + height / 2, left: left + width - 5 }}
        ></div>
      )}
      {grab && (
        <div
          onClick={() => setGrab(true)}
          onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab"
          style={{ top: top + height - 5, left: left + width / 2 }}
        ></div>
      )}
      {grab && (
        <div
          onClick={() => setGrab(true)}
          onBlur={() => setGrab(false)}
          className="h-3 w-3 bg-slate-300 absolute z-30 cursor-grab"
          style={{ top: top - 5, left: left + width / 2 }}
        ></div>
      )}
    </div>
  )
}

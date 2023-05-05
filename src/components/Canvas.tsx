// import { MouseEventHandler, useState } from 'react'

// export default function Canvas({ url }: { url: string }) {
//   const [isDown, setIsDown] = useState(false)
//   const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
//   const [size, setSize] = useState<{ width: number; height: number }>({
//     width: 0,
//     height: 0,
//   })

//   const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
//     console.log('Mouse down')

//     setCoord({ x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY })
//     setIsDown(true)
//     document.addEventListener('mouseup', mouseUpHandler, { once: true })
//   }
//   const mouseUpHandler = (ev: MouseEvent) => {
//     console.log('Mouse up')

//     setIsDown(false)
//   }
//   const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
//     if (isDown) {
//       setSize({ width: ev.nativeEvent.offsetX, height: ev.nativeEvent.offsetY })
//     }
//   }
//   console.log("height:", size.height - coord.y,)
//   console.log("width:", size.width - coord.x)
//   // console.log(size)
//   return (
//     <div
//       className="relative"
//     >
//       <img draggable={false} src={url} />
//       <div
//         className="bg-green-500 bg-opacity-50 absolute"
//         style={{
//           top: coord.y,
//           left: coord.x,
//           height: size.height - coord.y,
//           width: size.width - coord.x,
//         }}
//       ></div>
//       <div className='absolute z-10 top-0 opacity-0'       onMouseMove={mouseMoveHandler}
//       onMouseDown={mouseDownHandler}>
//       <img draggable={false} src={url} />
//       </div>
//     </div>
//   )
// }
import React, { MouseEventHandler, useState } from 'react'
import Sqre from './squares'

export default function Canvas({ url }: { url: string }) {
  const [isDown, setIsDown] = useState(false)
  const [coord, setCoord] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })
  const [id, setId] = useState(0)
  const [squares, setSquares] = useState<HTMLElement[]>([])

  const mouseDownHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    console.log('Mouse down')

    setCoord({ x: ev.nativeEvent.offsetX, y: ev.nativeEvent.offsetY })
    setIsDown(true)
    document.addEventListener('mouseup', mouseUpHandler, { once: true })
  }
  const mouseUpHandler = (ev: MouseEvent) => {
    console.log('Mouse up')
    const elem = document.getElementById(id.toString())
    if (elem !== null) {
      const newSq = [...squares, elem]
      setSquares(newSq)
    }
    setId(id + 1)
    console.log(id)
    setIsDown(false)
  }
  const mouseMoveHandler: MouseEventHandler<HTMLImageElement> = (ev) => {
    if (isDown) {
      setSize({
        width: ev.nativeEvent.offsetX - coord.x,
        height: ev.nativeEvent.offsetY - coord.y,
      })
    }
  }
  let top
  // const top = size.height < 0 ? coord.y + size.height : coord.y;
  if (size.height < 0) {
    top = coord.y + size.height
  } else {
    top = coord.y
  }
  let left
  // const left = size.width < 0 ? coord.x + size.width : coord.x;
  if (size.width < 0) {
    left = coord.x + size.width
  } else {
    left = coord.x
  }
  const width = Math.abs(size.width)
  const height = Math.abs(size.height)
  console.log(squares)

  return (
    <div className="relative">
      <img draggable={false} src={url} />
      {squares.length > 1 && squares.map((sqre) => <Sqre {...sqre} />)}

      <div
        className="bg-green-500 bg-opacity-50 absolute"
        id={id.toString()}
        style={{
          top: top,
          left: left,
          height: height,
          width: width,
        }}
      ></div>
      <div
        className="absolute z-10 top-0 opacity-0"
        onMouseMove={mouseMoveHandler}
        onMouseDown={mouseDownHandler}
      >
        <img draggable={false} src={url} />
      </div>
    </div>
  )
}

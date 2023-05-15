import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
interface balls {
  ballInit: number
  ballFinal: number
}
export default function Slider({
  duration,
  onChange,
}: {
  duration: number
  onChange: () => void
}) {
  const line = useRef<HTMLDivElement>(null)
  const [balls, setBalls] = useState<balls>({ ballInit: 0, ballFinal: 0 })
  const mouseDownHandler1: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!line.current) return
    const width = line.current.offsetWidth
    const left = line.current.getClientRects()[0].left
    function handleMouseMove(ev: MouseEvent) {
      if (ev.offsetX !== undefined) {
        const newBallInit = Math.max(
          0,
          Math.min(balls.ballFinal, ((ev.clientX - left) * 100) / width)
        )
        console.log(newBallInit)
        setBalls({ ballInit: newBallInit, ballFinal: balls.ballFinal })
      }
    }
    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  const mouseDownHandler2: MouseEventHandler<HTMLDivElement> = (ev) => {
    if (!line.current) return
    const width = line.current.offsetWidth
    const left = line.current.getClientRects()[0].left
    function handleMouseMove(ev: MouseEvent) {
      if (ev.offsetX !== undefined) {
        const newBallFinal = Math.max(
          balls.ballInit,
          Math.min(100, ((ev.clientX - left) * 100) / width)
        )
        console.log(newBallFinal)
        setBalls({ ballInit: balls.ballInit, ballFinal: newBallFinal })
      }
    }
    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  //   console.log(duration)
  return (
    <div>
      <div className="bg-violet-600 w-72 h-16 rounded-full relative">
        <div
          ref={line}
          className="rounded-full absolute w-11/12 translate-x-3 h-1 top-2/4 bg-violet-200"
        >
          <div
            onMouseDown={mouseDownHandler1}
            style={{
              left: balls.ballInit + '%',
            }}
            className="rounded-full cursor-grab absolute w-5 -translate-x-2 -translate-y-2 h-5 top-2/4 bg-violet-950 border border-violet-100"
          ></div>

          <div
            onMouseDown={mouseDownHandler2}
            style={{
              left: balls.ballFinal + '%',
            }}
            className="rounded-full cursor-grab absolute w-5 -translate-x-2 -translate-y-2 h-5 top-2/4 bg-violet-950 border border-violet-100"
          ></div>
        </div>
      </div>
    </div>
  )
}

import { MouseEventHandler, useRef, useState } from 'react'
import { SecToMin } from '../helpers/SecToMin'
interface balls {
  ballInit: number
  ballFinal: number
}
export default function Slider({
  duration,
  onChange,
}: {
  duration: number
  onChange: (durationInit: number, durationFinal: number) => void
}) {
  const line = useRef<HTMLDivElement>(null)
  const [balls, setBalls] = useState<balls>({ ballInit: 0, ballFinal: 0 })
  const [durationSeg, setDurationSeg] = useState({
    durationInit: 0,
    durationFinal: duration,
  })
  const [showResult, setShowResult] = useState(-1)
  const mouseDownHandler1: MouseEventHandler<HTMLDivElement> = () => {
    if (!line.current) return
    setShowResult(0)
    const width = line.current.offsetWidth
    const left = line.current.getClientRects()[0].left
    function handleMouseMove(ev: MouseEvent) {
      if (ev.offsetX !== undefined) {
        const newBallInit = Math.max(
          0,
          Math.min(balls.ballFinal, ((ev.clientX - left) * 100) / width)
        )

        setDurationSeg({
          durationInit: duration * (newBallInit / 100),
          durationFinal: durationSeg.durationFinal,
        })
        setBalls({ ballInit: newBallInit, ballFinal: balls.ballFinal })
      }
    }
    function handleMouseUp() {
      setShowResult(-1)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  const mouseDownHandler2: MouseEventHandler<HTMLDivElement> = () => {
    if (!line.current) return
    setShowResult(1)
    const width = line.current.offsetWidth
    const left = line.current.getClientRects()[0].left
    function handleMouseMove(ev: MouseEvent) {
      if (ev.offsetX !== undefined) {
        const newBallFinal = Math.max(
          balls.ballInit,
          Math.min(100, ((ev.clientX - left) * 100) / width)
        )
        setDurationSeg({
          durationInit: durationSeg.durationFinal,
          durationFinal: duration * (newBallFinal / 100),
        })

        setBalls({ ballInit: balls.ballInit, ballFinal: newBallFinal })
      }
    }
    function handleMouseUp() {
      setShowResult(-1)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  const onClickHandle = () => {
    onChange(durationSeg.durationInit, durationSeg.durationFinal)
  }
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
          >
            {showResult === 0 && (
              <div className="flex select-none justify-center rounded-2xl items-center -translate-x-6 translate-y-5 h-9 w-16 bg-violet-300">
                {SecToMin(durationSeg.durationInit)}
              </div>
            )}
          </div>

          <div
            onMouseDown={mouseDownHandler2}
            style={{
              left: balls.ballFinal + '%',
            }}
            className="rounded-full cursor-grab absolute w-5 -translate-x-2 -translate-y-2 h-5 top-2/4 bg-violet-950 border border-violet-100 "
          >
            {showResult === 1 && (
              <div className="flex select-none justify-center rounded-2xl items-center -translate-x-6 translate-y-5 h-9 w-16 bg-violet-300">
                {SecToMin(durationSeg.durationFinal)}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* aqui iria un formulario par el nombrw */}
      <button onClick={onClickHandle}>Save</button>
    </div>
  )
}

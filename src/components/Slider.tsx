import {
  MouseEventHandler,
  useRef,
  useState,
  ChangeEventHandler,
  useEffect,
} from 'react'
import { SecToMin } from '../helpers/SecToMin'
import { PlayIcon } from './UploadIcon'
interface balls {
  ballInit: number
  ballFinal: number
}
export default function Slider({
  duration,
  onChange,
  playSeg,
  init,
  final,
  index,
  text2,
}: {
  init: number
  text2: string
  index: number
  final: number
  duration: number
  onChange: (
    durationInit: number,
    durationFinal: number,
    text: string,
    index: number
  ) => void
  playSeg: (startTime: number, endTime: number) => void
}) {
  const line = useRef<HTMLDivElement>(null)
  const [balls, setBalls] = useState<balls>({ ballInit: 0, ballFinal: 0 })
  const [text, setText] = useState('')
  // const [durationSeg, setDurationSeg] = useState({
  //   durationInit: 0,
  //   durationFinal: duration,
  // })
  const [showResult, setShowResult] = useState(-1)
  const durationSeg = {
    durationInit: duration * (balls.ballInit / 100),
    durationFinal: duration * (balls.ballFinal / 100),
  }
  useEffect(() => {
    if (index >= 0) {
      const ballI = (init * 100) / duration
      const ballF = (final * 100) / duration
      setBalls({ ballInit: ballI, ballFinal: ballF })
      setText(text2)
    }
  }, [index])
  const mouseDownHandler1: MouseEventHandler<HTMLDivElement> = () => {
    if (!line.current) return
    setShowResult(0)
    const width = line.current.offsetWidth
    const left = line.current.getClientRects()[0].left
    console.log(balls.ballInit)
    function handleMouseMove(ev: MouseEvent) {
      if (ev.offsetX !== undefined) {
        const newBallInit = Math.max(
          0,
          Math.min(balls.ballFinal, ((ev.clientX - left) * 100) / width)
        )

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
    onChange(durationSeg.durationInit, durationSeg.durationFinal, text, index)
  }
  const onPlayHandle = () => {
    playSeg(durationSeg.durationInit, durationSeg.durationFinal)
  }
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (ev) => {
    setText(ev.target.value)
  }
  return (
    <div>
      <div className="flex">
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
        <div className="flex items-center justify-center">
          <button
            // className="border-t-neutral-900 bg-slate-500 rounded-md"
            onClick={onPlayHandle}
          >
            <PlayIcon />
          </button>
        </div>
      </div>
      <label>
        Comentario:
        <input className="border" value={text} onChange={changeHandler} />
      </label>

      <button
        className="border-t-neutral-900 bg-slate-500 rounded-md"
        onClick={onClickHandle}
      >
        Save
      </button>
    </div>
  )
}

import { SecToMin } from '../helpers/SecToMin'
import { PlayIcon } from './UploadIcon'

export default function AudioSegment({
  text,
  init,
  final,
  playSeg,
}: {
  text: string
  init: number
  final: number
  playSeg: (startTime: number, endTime: number) => void
}) {
  const onPlayHandle = () => {
    playSeg(init, final)
  }
  return (
    <div>
      <div className="flex items-center ">
        <div className="flex items-center rounded-full h-10 w-fit p-4 bg-violet-300">
          {SecToMin(init)} - {SecToMin(final)}
        </div>
        {text}
        <button onClick={onPlayHandle}>
          {' '}
          <PlayIcon />
        </button>
      </div>
    </div>
  )
}

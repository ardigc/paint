import { useState } from 'react'
import { SecToMin } from '../helpers/SecToMin'
import { EditIcon, PlayIcon } from './UploadIcon'

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
  const [editing, setEditing] = useState(false)
  const onPlayHandle = () => {
    playSeg(init, final)
  }
  const onEditHandle = () => {
    setEditing(true)
  }
  return (
    <div>
      {!editing && (
        <div className="flex items-center ">
          <div className="flex items-center rounded-full h-10 w-fit p-4 bg-violet-300">
            {SecToMin(init)} - {SecToMin(final)}
          </div>
          {text}
          <button onClick={onPlayHandle}>
            <PlayIcon />
          </button>
          <button onClick={onEditHandle}>
            <EditIcon />
          </button>
        </div>
      )}
      {editing && <div> hola</div>}
    </div>
  )
}

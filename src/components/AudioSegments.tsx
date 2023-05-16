import { useEffect, useState } from 'react'
import { SecToMin } from '../helpers/SecToMin'
import { EditIcon, PlayIcon } from './UploadIcon'

export default function AudioSegment({
  text,
  init,
  final,
  playSeg,
  editAudio,
  index,
  noEdit,
}: {
  noEdit: number
  text: string
  index: number
  init: number
  final: number
  playSeg: (startTime: number, endTime: number) => void
  editAudio: (init: number, final: number, index: number, text: string) => void
}) {
  const [editing, setEditing] = useState(false)
  useEffect(() => {
    if (noEdit === -1) {
      setEditing(false)
    }
  }, [noEdit])
  const onPlayHandle = () => {
    playSeg(init, final)
  }
  const onEditHandle = () => {
    setEditing(true)
    editAudio(init, final, index, text)
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
      {editing && <div> editing...</div>}
    </div>
  )
}

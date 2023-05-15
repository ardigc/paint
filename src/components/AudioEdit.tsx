import { MouseEventHandler, useRef } from 'react'

export default function AudioEdit({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const duracion = audioRef.current?.duration / 60
  const playSegment = (startTime: number, endTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime
      audioRef.current.play()

      setTimeout(() => {
        audioRef.current?.pause()
      }, (endTime - startTime) * 1000)
    }
  }
  const onClickHandle: MouseEventHandler<HTMLButtonElement> = () => {
    playSegment(10, 15)
  }
  return (
    <div>
      <audio ref={audioRef} src={url} controls>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <button onClick={onClickHandle}>
        reproducir segmento 10 sec a 15 sec
      </button>
    </div>
  )
}

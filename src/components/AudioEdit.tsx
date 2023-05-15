import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react'

export default function AudioEdit({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [time, setTime] = useState('')

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value

    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
    // if (regex.test(value)) {
    //   const [minut, sec] = value.split(':');
    //   const totalSec = parseInt(minut, 10) * 60 + parseInt(sec, 10);

    //     if (totalSec >= 0 && totalSec <= 145) {
    setTime(value)
    // }
    // }
  }
  const playSegment = (startTime: number, endTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime
      audioRef.current.play()

      setTimeout(() => {
        audioRef.current?.pause()
      }, (endTime - startTime) * 1000)
      const duration = audioRef.current?.duration
      console.log(Math.trunc(duration / 60), duration % 60)
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
      <div>
        <input
          type="text"
          placeholder="MM:SS"
          value={time}
          onChange={handleTimeChange}
        />
        <p>Ingresa un valor en el rango de 00:00 a 02:25.</p>
      </div>
      <button onClick={onClickHandle}>
        reproducir segmento 10 sec a 15 sec
      </button>
    </div>
  )
}

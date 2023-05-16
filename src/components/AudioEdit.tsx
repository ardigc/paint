import { MouseEventHandler, useEffect, useRef, useState } from 'react'
import Slider from './Slider'
import AudioSegment from './AudioSegments'
interface AudioSegment {
  text: string
  init: number
  final: number
}

export default function AudioEdit({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [duration, setDuration] = useState(0)
  const [audioSegments, setAudioSegments] = useState<AudioSegment[]>([])
  const playSegment = (startTime: number, endTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime
      audioRef.current.play()

      setTimeout(() => {
        audioRef.current?.pause()
      }, (endTime - startTime) * 1000)
      const duration = audioRef.current?.duration
      console.log(duration)
      // console.log(Math.trunc(duration / 60), duration % 60)
    }
  }
  const anotation = () => {
    const duration2 = audioRef.current?.duration
    if (duration2 !== undefined) {
      setDuration(duration2)
    }
  }
  // const onClickHandle: MouseEventHandler<HTMLButtonElement> = () => {
  //   playSegment(10, 15)
  // }
  const onChangeInput = (
    durationInit: number,
    durationFinal: number,
    text: string
  ) => {
    setAudioSegments((prev) => [
      ...prev,
      { init: durationInit, final: durationFinal, text: text },
    ])
    console.log(audioSegments)
  }
  return (
    <div>
      <audio ref={audioRef} src={url} controls>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <button onClick={anotation}>Comenzar a anotar</button>

      <Slider
        duration={duration}
        onChange={onChangeInput}
        playSeg={playSegment}
      />
      {audioSegments.length > 0 &&
        audioSegments.map((values) => <AudioSegment {...values} />)}
      {/* <button onClick={onClickHandle}>
        reproducir segmento 10 sec a 15 sec
      </button> */}
    </div>
  )
}

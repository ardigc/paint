import { useRef, useState } from 'react'
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
  const [audioEdit, setAudioEdit] = useState({
    init: 0,
    final: 0,
    index: -2,
    text: '',
  })
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
    setAudioEdit({ init: 0, final: 0, index: -1, text: '' })
    const duration2 = audioRef.current?.duration
    if (duration2 !== undefined) {
      setDuration(duration2)
    }
  }
  const OnEditAudio = (
    init: number,
    final: number,
    index: number,
    text: string
  ) => {
    setAudioEdit({ init: init, final: final, index: index, text: text })
    // console.log("hola")
  }
  const onChangeInput = (
    durationInit: number,
    durationFinal: number,
    text: string,
    index: number
  ) => {
    if (index >= 0) {
      setAudioSegments((prev) => {
        const newAudioSegments = [...prev]
        const audioSeg = newAudioSegments[index]
        newAudioSegments[index] = {
          ...audioSeg,
          text: text,
          init: durationInit,
          final: durationFinal,
        }
        setAudioEdit({ index: -1, init: 0, final: 0, text: '' })
        return newAudioSegments
      })
      console.log(audioSegments)
    } else {
      setAudioSegments((prev) => [
        ...prev,
        { init: durationInit, final: durationFinal, text: text },
      ])
      console.log(audioSegments)
    }
  }
  return (
    <div>
      <audio ref={audioRef} src={url} controls>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className="relative">
        <Slider
          duration={duration}
          onChange={onChangeInput}
          playSeg={playSegment}
          init={audioEdit.init}
          final={audioEdit.final}
          index={audioEdit.index}
          text2={audioEdit.text}
        />
        {audioSegments.length > 0 &&
          audioSegments.map((values, index) => (
            <AudioSegment
              {...values}
              index={index}
              playSeg={playSegment}
              editAudio={OnEditAudio}
              noEdit={audioEdit.index}
            />
          ))}
        {audioEdit.index === -2 && (
          <div className="absolute top-0 flex items-center justify-center ">
            <div className=" bg-slate-300 opacity-60 w-72 h-16 rounded-full"></div>
            <button
              className="absolute border-t-neutral-900 bg-slate-500 rounded-md"
              onClick={anotation}
            >
              Comenzar a anotar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

import { ChangeEventHandler, useRef, useState } from 'react'
import UploadIcon from './components/UploadIcon'
import Canvas from './components/Canvas'
import { PolygonCanvas } from './components/PolygonCanvas'

function App() {
  const [url, setUrl] = useState<string | null>(null)
  const [type, setType] = useState<'squares' | 'polygon' | 'audio'>('polygon')
  const ref = useRef<HTMLInputElement | null>(null)
  const clickHandler = () => {
    ref.current?.click()
  }
  const changeHandler: ChangeEventHandler<HTMLInputElement> = (ev) => {
    if (!ev.target.files) return
    const img = ev.target.files[0]
    const url = URL.createObjectURL(img)
    setUrl(url)
  }

  const selectHandler: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    setType(ev.target.value as 'squares' | 'polygon' | 'audio')
  }

  return (
    <div className="container mx-auto p-4">
      {type !== 'audio' && <h2>Upload your imagen</h2>}
      {type !== 'audio' && (
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={changeHandler}
        />
      )}
      <div
        className="flex w-28 h-28 border-dashed border border-blue-500 rounded-md bg-stone-300 justify-center	items-center"
        onClick={clickHandler}
      >
        <UploadIcon />
      </div>
      <select
        className="border border-blue-500 rounded-md"
        value={type}
        onChange={selectHandler}
      >
        <option value="squares">Squares</option>
        <option value="polygon">Polygon</option>
        <option value="audio">Audio</option>
      </select>
      {url && type === 'squares' && <Canvas url={url} />}
      {url && type === 'polygon' && <PolygonCanvas url={url} />}
    </div>
  )
}

export default App

import { ChangeEventHandler, useRef, useState } from 'react'
import UploadIcon from './components/UploadIcon'
import Canvas from './components/Canvas'

function App() {
  const [url, setUrl] = useState<string | null>(null)
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
  return (
    <div className="container mx-auto p-4">
      <h2>Upload your imagen</h2>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={changeHandler}
      />
      <div
        className="flex w-28 h-28 border-dashed border border-blue-500 rounded-md bg-stone-300 justify-center	items-center"
        onClick={clickHandler}
      >
        <UploadIcon />
      </div>
      {url && <Canvas url={url} />}
    </div>
  )
}

export default App

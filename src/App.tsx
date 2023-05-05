import { useRef } from 'react'
import UploadIcon from './components/UploadIcon'

function App() {
  const ref = useRef<HTMLInputElement | null>(null)
  const clickHandler = () => {
    ref.current?.click()
  }
  return (
    <div className="container mx-auto p-4">
      <h2>Upload your imagen</h2>
      {/* Input para que el usuario suba una imagen */}
      <input ref={ref} type="file" accept="image/*" className="hidden" />
      <div
        className="flex w-28 h-28 border-dashed border border-blue-500 rounded-md bg-stone-300 justify-center	items-center"
        onClick={clickHandler}
      >
        <UploadIcon />
      </div>
      {/* Si el usuario ha subido una imagen, mostrarla */}
    </div>
  )
}

export default App

import { useRef } from 'react'

function App() {
  const ref = useRef<HTMLInputElement | null>(null)
  const clickHandler = () => {
    ref.current?.click()
  }
  return (
    <div className="container mx-auto p-4">
      <h2>Upload your imagen</h2>
      {/* Input para que el usuario suba una imagen */}
      <input ref={ref} type="file" className="hidden" />
      <div
        className="flex w-28 h-28 border-dashed border border-blue-500 rounded-md bg-stone-300 justify-center	items-center"
        onClick={clickHandler}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-file-upload"
          width="44"
          height="44"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#2c3e50"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
          <line x1="12" y1="11" x2="12" y2="17" />
          <polyline points="9 14 12 11 15 14" />
        </svg>
      </div>
      {/* Si el usuario ha subido una imagen, mostrarla */}
    </div>
  )
}

export default App

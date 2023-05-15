export default function Slider({
  duration,
  onChange,
}: {
  duration: number
  onChange: () => void
}) {
  console.log(duration)
  return (
    <div>
      <div className="bg-violet-600 w-72 h-16 rounded-full relative">
        <div className="rounded-full absolute w-11/12 translate-x-3 h-1 top-2/4 bg-violet-200">
          <div className="rounded-full cursor-grab absolute w-5 -translate-y-2 left-0 h-5 top-2/4 bg-violet-950 border border-violet-100"></div>

          <div className="rounded-full cursor-grab absolute w-5 -translate-y-2 left-0  h-5 top-2/4 bg-violet-950 border border-violet-100"></div>
        </div>
      </div>
    </div>
  )
}

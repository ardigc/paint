export default function AudioSegment({
  text,
  init,
  final,
}: {
  text: string
  init: number
  final: number
}) {
  return (
    <div>
      {init} {final} {text}
    </div>
  )
}

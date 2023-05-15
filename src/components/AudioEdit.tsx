export default function AudioEdit({ url }: { url: string }) {
  return (
    <div>
      <audio src={url}></audio>
    </div>
  )
}

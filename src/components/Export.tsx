export default function Export({
  top,
  left,
  width,
  height,
  sqrName,
  sqrArr,
}: {
  top: number
  left: number
  width: number
  height: number
  sqrName: string
  sqrArr: Array<{
    top: number
    left: number
    width: number
    height: number
    index: number
    sqrName: string
  }>
}) {
  const clickHandler = () => {
    const lastSqr = {
      top: top,
      left: left,
      width: width,
      height: height,
      index: sqrArr.length,
      sqrName: sqrName,
    }
    const sqrArrCopy = sqrArr
    sqrArrCopy?.push(lastSqr)
    console.log(sqrArrCopy)
  }

  return (
    <div>
      <button onClick={clickHandler} className="bg-purple-100 rounded-lg">
        Export squares
      </button>
    </div>
  )
}

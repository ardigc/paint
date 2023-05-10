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
    let csv: any
    for (let count = 0; count < sqrArrCopy.length; count++) {
      let keysAmount = Object.keys(sqrArrCopy[count]).length
      let keysCounter = 0
      if (count === 0) {
        for (let key in sqrArrCopy[count]) {
          csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
          keysCounter++
        }
      } else {
        for (let key in sqrArrCopy[count]) {
          csv +=
            sqrArrCopy[count][key] +
            (keysCounter + 1 < keysAmount ? ',' : '\r\n')
          keysCounter++
        }
      }
      keysCounter = 0
    }
  }

  return (
    <div>
      <button onClick={clickHandler} className="bg-purple-100 rounded-lg">
        Export squares
      </button>
    </div>
  )
}

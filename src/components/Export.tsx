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
    [key: string]: number | string
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
    const arrayFinal = sqrArrCopy.map((sqr) => {
      const { index, ...arrayFinal } = sqr
      return arrayFinal
    })
    let csv: any
    for (let count = 1; count < arrayFinal.length; count++) {
      let keysAmount = Object.keys(arrayFinal[count]).length
      let keysCounter = 0
      if (count === 1) {
        for (let key in arrayFinal[count]) {
          csv += key + (keysCounter + 1 < keysAmount ? ',' : '\r\n')
          keysCounter++
        }
      } else {
        for (let key in arrayFinal[count]) {
          csv +=
            arrayFinal[count][key] +
            (keysCounter + 1 < keysAmount ? ',' : '\r\n')
          keysCounter++
        }
      }
      keysCounter = 0
    }
    console.log(csv)
  }

  return (
    <div>
      <button onClick={clickHandler} className="bg-purple-100 rounded-lg">
        Export squares
      </button>
    </div>
  )
}

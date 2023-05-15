function jsonToCsv(data: any[]): string {
  if (data.length === 0) {
    throw new Error('No data provided')
  }
  const replacer = (key: string, value: any) => (value === null ? '' : value) // specify how you want to handle null values here
  const header = Object.keys(data[0])
  if (Array.isArray(data[0].lines)) {
    const csv = [
      //probar si esto pone el último valor alante
      // [...header.slice(-1), ...header.slice(0, -1)].join(';'),
      header.join(';'),
      ...data.map((row) => {
        const rowValues = header.map((fieldName) => {
          if (Array.isArray(row[fieldName])) {
            return row[fieldName]
              .map((subArrayItem: any) =>
                JSON.stringify(subArrayItem, replacer)
              )
              .join(',')
          } else {
            return JSON.stringify(row[fieldName], replacer)
          }
        })

        return rowValues.join(';')
      }),
    ]

    return csv.join('\r\n')
  } else {
    const csv = [
      header.join(';'), // header row first
      ...data.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(';')
      ),
    ]
    return csv.join('\r\n')
  }
}

function downloadCsv(data: string, filename: string): void {
  const blob = new Blob([data], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('hidden', '')
  a.setAttribute('href', url)
  a.setAttribute('download', filename)
  a.click()
  URL.revokeObjectURL(url)
}

export function downloadJsonAsCsv(data: any[], filename: string): void {
  const csv = jsonToCsv(data)
  downloadCsv(csv, filename)
  // console.log(csv)
}

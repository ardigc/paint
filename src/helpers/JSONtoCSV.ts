function jsonToCsv(data: any[]): string {
  if (data.length === 0) {
    throw new Error('No data provided')
  }
  const replacer = (key: string, value: any) => (value === null ? '' : value) // specify how you want to handle null values here
  const header = Object.keys(data[0])
  if (Array.isArray(data[0].lines)) {
    const header2 = Object.keys(data[0].lines[0])
    const csv = [
      header.join(';'), // header row first
      header2.join(';'), // header row first
      ...data.map((row) => {
        JSON.stringify(row[0].lines[0])
        console.log(header)
        console.log(row.lines)

        // header.map((fieldName) => JSON.stringify(row[fieldName].lines.map((line)=> JSON.stringify(line),replacer).join(';'), replacer)).join(';')
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
  // downloadCsv(csv, filename)
  console.log(csv)
}

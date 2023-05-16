export function SecToMin(time: number) {
  const horas = Math.floor(time / 3600)
  const minutos = Math.floor((time % 3600) / 60)
  const segundosRestantes = Math.floor(time % 60)

  if (horas > 0) {
    return `${horas}:${minutos < 10 ? '0' : ''}${minutos}:${
      segundosRestantes < 10 ? '0' : ''
    }${segundosRestantes}`
  } else {
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`
  }
}

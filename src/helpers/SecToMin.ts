export function SecToMin(time: number) {
  const minutos = Math.floor(time / 60)
  const segundosRestantes = Math.floor(time % 60)

  return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`
}

// Función que recibe una función y un tiempo de espera y devuelve una función que se ejecuta
// cuando se deja de llamar a la función original durante el tiempo de espera.
// Ejemplo:
// const debounced = debounce(() => console.log('Hola'), 1000);
// debounced(); // No hace nada
// debounced(); // No hace nada
// debounced(); // No hace nada
// ... 1 segundo después de la última llamada a la función original
// Se muestra por consola 'Hola'
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): (...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      func(...args)
      timeoutId = null
    }, wait)
  }
}

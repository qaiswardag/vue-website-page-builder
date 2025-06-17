export function useDebounce(delay = 300) {
  let timer = null
  return (fn, delay = 300) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}

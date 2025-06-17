let timer: ReturnType<typeof setTimeout> | null = null

export function useDebounce() {
  return (fn: () => void, delay = 300) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(fn, delay)
  }
}

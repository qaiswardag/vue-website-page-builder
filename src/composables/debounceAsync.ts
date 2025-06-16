export function debounceAsync(delay = 300) {
  let timer
  let resolveList = []

  return () => {
    clearTimeout(timer)
    return new Promise((resolve) => {
      resolveList.push(resolve)
      timer = setTimeout(() => {
        resolveList.forEach((r) => r())
        resolveList = []
      }, delay)
    })
  }
}

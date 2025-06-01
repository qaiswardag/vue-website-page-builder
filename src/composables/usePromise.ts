export const usePromise = function (time: number): Promise<() => void> {
  // new promise
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve(() => {
        return
      })
    }, time)
  })
}

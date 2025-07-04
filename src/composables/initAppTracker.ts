let resolveInitApp: () => void
export const initAppPromise = new Promise<void>((resolve) => {
  resolveInitApp = resolve
})

export function markInitAppComplete() {
  resolveInitApp()
}

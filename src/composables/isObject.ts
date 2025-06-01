export const isObject = function (data: unknown): data is Record<string, unknown> {
  if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
    return true
  }
  return false
}

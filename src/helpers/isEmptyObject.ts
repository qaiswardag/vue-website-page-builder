export const isEmptyObject = function (obj: Object) {
  return (
    !obj || (typeof obj === 'object' && obj.constructor === Object && Object.keys(obj).length === 0)
  )
}

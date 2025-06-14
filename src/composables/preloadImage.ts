export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = resolve
    img.onerror = reject
    img.src = url
  })
}

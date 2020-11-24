export const getItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch {
    return localStorage.getItem(key)
  }
}
export const setItem = (key, value) => {
  if (value instanceof Object) {
    return localStorage.setItem(key, JSON.stringify(value))
  }
  return localStorage.setItem(key, value)
}
export const removeTtem = (key) => {
  localStorage.removeItem(key)
}

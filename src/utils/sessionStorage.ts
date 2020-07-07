/* istanbul ignore file */

export function getItem(key: string) {
  return sessionStorage.getItem(key)
}

export function setItem(key: string, value: string) {
  return sessionStorage.setItem(key, value)
}

export default {
  getItem,
  setItem,
}

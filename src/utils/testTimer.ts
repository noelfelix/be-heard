/* istanbul ignore file */

export function testTimer(callback: Function, time: number) {
  setTimeout(() => {
    callback && callback()
  }, time)
}

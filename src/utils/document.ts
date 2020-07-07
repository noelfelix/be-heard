/* istanbul ignore file */

export function appendChildToBody(elm: HTMLElement) {
  return document.body.appendChild(elm)
}

export function createElement(elm: string) {
  return document.createElement(elm)
}

export function getActiveElement() {
  return document.activeElement
}

export function isInstanceOfNode(target: EventTarget | null) {
  return target !== null && target instanceof Node
}

export function querySelectorAll(query: string) {
  return document.querySelectorAll(query)
}

export function querySelector(query: string) {
  return document.querySelector(query)
}

export function urlSearchParams(search: string) {
  return new URLSearchParams(search)
}

export function getElementById(id: string) {
  return document.getElementById(id)
}

export function setTitle(title: string) {
  document.title = title
}

export default {
  appendChildToBody,
  createElement,
  getActiveElement,
  isInstanceOfNode,
  querySelectorAll,
  querySelector,
  urlSearchParams,
  getElementById,
  setTitle,
}

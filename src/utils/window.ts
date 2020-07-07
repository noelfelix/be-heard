/* istanbul ignore file */

import { isJest } from "const/globals";

export function getWindowWidth() {
  return window.innerWidth;
}

export function getWindowHeight() {
  return window.innerHeight;
}

export function setLocationHref(url: string) {
  if (!isJest()) {
    window.location.href = url;
  }
}

export function addEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) {
  window.addEventListener(type, listener, options);
}

export function removeEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  options?: boolean | EventListenerOptions
) {
  window.removeEventListener(type, listener, options);
}

export function getHostName() {
  return window.location.hostname;
}

export function getWindowPathname() {
  return window.location.pathname;
}

export function getWindowSearch() {
  return window.location.search;
}

export function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key);
}

export function setLocalStorageItem(key: string, value: string) {
  return window.localStorage.setItem(key, value);
}

export function isClient() {
  return typeof window === "object";
}

export function showAlert(message: string) {
  if (!isJest()) {
    alert(message);
  }
}

export default {
  getWindowWidth,
  getWindowHeight,
  setLocationHref,
  addEventListener,
  removeEventListener,
  getHostName,
  getWindowPathname,
  getWindowSearch,
  getLocalStorageItem,
  setLocalStorageItem,
  isClient,
  redirectToClassic,
  showAlert,
};

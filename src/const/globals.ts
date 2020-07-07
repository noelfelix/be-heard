/* istanbul ignore file */

import { useTranslation as useTranslationi18next } from "react-i18next";
import { Environment } from "../env";
import { getFeatureFlag } from "../views/features/featureFlags";
import { FEATURE_FLAGS } from "../views/features/availableFeatures";

export const rootContext = "/app";
export const legacyActonContext = "/acton";

declare const __PROD__: boolean;
declare const __TEST__: boolean;
declare const __DEV__: boolean;
declare const __DEBUG__: boolean;
declare const __LOCAL_DEV__: boolean;
declare const __PATH__: string;
declare const jest: any;

export function isProd(): boolean {
  return __PROD__;
}

export function isTest(): boolean {
  return __TEST__;
}

export function isDev(): boolean {
  return __DEV__;
}

export function isDebug(): boolean {
  return __DEBUG__;
}

export function isLocal(): boolean {
  return __LOCAL_DEV__;
}

export function getPath(): string {
  return __PATH__;
}

export function getEnvironment(): Environment {
  return (window as any).__ENV__;
}

export function setEnvironment(env: Environment) {
  (window as any).__ENV__ = env;
}

export function isJest() {
  let isJest = false;
  try {
    isJest = jest !== undefined;
  } catch (e) {}
  return isJest;
}

export function useTranslation() {
  return isJest() ? { t: (s: any) => s } : useTranslationi18next();
}

export function isMocks() {
  return getFeatureFlag(FEATURE_FLAGS.MOCK) === true;
}

export default {
  isProd,
  isTest,
  isDev,
  isDebug,
  isLocal,
  getPath,
  getEnvironment,
  setEnvironment,
  useTranslation,
  isMocks,
};

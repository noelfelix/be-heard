/* istanbul ignore file */

import { getEnvironment, isDebug } from 'const/globals'
import 'isomorphic-fetch'

import './config.env'

export function logError(error: any) {
  if (isDebug()) {
    console.error(error) // eslint-disable-line no-console
  }
}

export interface Environment {
  endpoints: {
    [key: string]: string
  }
}

const paramRegex = /^(.*)(\{.*\})(.*)$/

const paramMap: { [key: string]: () => string } = { systemWideUrlVariable: () => 'value' }

const getParamDefaultValue = (paramName: string) => (paramMap[paramName] ? paramMap[paramName]() : '')

function resolveApiRoute(
  name: string,
  urlParams: { [key: string]: string } = {},
  queryParams: { [key: string]: string | boolean | number } = {},
  usePassedInURL?: boolean
) {
  // get route
  const env = getEnvironment()
  let route: string = usePassedInURL ? name : env.endpoints[name]

  if (!name || !route) {
    throw new Error(`utils/env/resolveApiRoute Error Unable to resolve route, name: ${name}, route: ${route}`) // eslint-disable-line max-len
  }

  // add url params
  let pieces
  while ((pieces = route.match(paramRegex))) {
    const [, prePiece, paramPiece, postPiece] = pieces

    const paramName = paramPiece.slice(1, -1)
    const paramValue = urlParams.hasOwnProperty(paramName) ? urlParams[paramName] : getParamDefaultValue(paramName)

    if (paramValue === undefined) {
      throw new Error(`Error Unable to resolve parameter: "${paramName}" - ${name} => ${route}`)
    }

    route = prePiece + paramValue + postPiece
  }

  try {
    // add query params
    let queryString = route.includes('?') ? '&' : '?'
    Object.keys(queryParams).forEach((key) => {
      queryString = `${queryString}${key}=${encodeURIComponent(queryParams[key])}&`
    })

    if (queryString.length > 1) {
      route = `${route}${queryString.slice(0, -1)}`
    }
  } catch (e) {}

  return route
}

export default {
  resolveApiRoute,
}

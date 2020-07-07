/* istanbul ignore file */

import humps from 'humps'
import env from 'env'
import { getFeatureFlag, getFeatureFlagValue } from '../../views/features/featureFlags'
import { FEATURE_FLAGS } from '../../views/features/availableFeatures'
import { getPath, isMocks } from '../../const/globals'

const validateStatus = (response: Response) => {
  if (response.status < 200 || response.status >= 300) {
    throw Object.assign(new Error(response.statusText), {
      data: response,
      status: response.status,
    })
  }
}

const composeResponse = (prevResponse: Response, assignToProp: string, prevProps = {}) => (response: Response) => {
  let appended
  if (response instanceof Array) {
    appended = response.map((child) => ({
      ...child,
      ...prevProps,
    }))
  } else {
    appended = {
      ...response,
      ...prevProps,
    }
  }
  return {
    ...prevResponse,
    [assignToProp]: appended,
  }
}

interface Options {
  method?: string
  headers?: object
  urlParams?: { [key: string]: string }
  jsonOutput?: boolean
  camelizeKeys?: boolean
  shouldValidateStatus?: boolean
  queryParams?: { [key: string]: string | boolean | number }
  body?: any
  usePassedInURL?: boolean
}

const DEFAULT_OPTIONS: Options = {
  // Fetch options
  method: 'GET',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'cache-control': 'no-store no-cache',
    Pragma: 'no-cache',
  },
  urlParams: {},

  // Handling response options
  jsonOutput: true, // Transform response to JSON
  camelizeKeys: true, // For json output, camelize response keys with humps library
  shouldValidateStatus: true, // Ensure a 200 status response
}

function fetchPromise(
  routeUrl: string,
  fetchOptions: object,
  resolve: (value?: any) => void,
  reject: (value?: any) => void,
  shouldValidateStatus?: boolean,
  jsonOutput?: boolean,
  camelizeKeys?: boolean,
  mockUser?: string
) {
  fetch(routeUrl, fetchOptions)
    .then((response) => {
      if (shouldValidateStatus) {
        validateStatus(response)
      }
      return response
    })
    .then((response) => {
      const ret = response
      if (jsonOutput) {
        const json = ret.json()

        if (camelizeKeys) {
          return json.then((jsonIter) => humps.camelizeKeys(jsonIter))
        }
        return json
      }
      return ret
    })
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      if (mockUser && getFeatureFlag(FEATURE_FLAGS.MOCK) === true && routeUrl.includes(`${mockUser}/`)) {
        return fetchPromise(routeUrl.replace(`${mockUser}/`, ''), fetchOptions, resolve, reject, shouldValidateStatus, jsonOutput, camelizeKeys)
      } else {
        reject(error)
      }
    })
}

/* doFetch - A standard way of interacting with our APIs, this function
 * takes cares of many common behaviors such as validating response
 * status, fixing authentication errors, camelizing response JSONs, creating
 * short term authenticatdion cookies, and resolving API routes.
 *
 * Parameters
 * ----------
 * path:    A named route from the ENV config.
 * options: See annotated default options above
 */
function doFetch(routeName: string, options: Options = {}) {
  const { jsonOutput, camelizeKeys, shouldValidateStatus, urlParams, queryParams, ...fetchOptions } = {
    ...DEFAULT_OPTIONS,
    ...options,
  }

  fetchOptions.headers = {
    ...DEFAULT_OPTIONS.headers,
    ...options.headers,
  }

  if (options.body instanceof URLSearchParams) {
    ;(fetchOptions.headers as any)['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
  }

  let routeUrl = env.resolveApiRoute(routeName, urlParams, queryParams, options.usePassedInURL)

  const mockUser = getFeatureFlagValue(FEATURE_FLAGS.MOCK_USER)
  if (isMocks() === true) {
    routeUrl = `${getPath()}/static/mocks/${mockUser ? `${mockUser}/` : ''}${routeName}.json`
    options.method = 'GET'
  }

  return new Promise((resolve, reject) => {
    fetchPromise(routeUrl, fetchOptions, resolve, reject, shouldValidateStatus, jsonOutput, camelizeKeys, mockUser ?? undefined)
  })
}

export default {
  doFetch,
  composeResponse,
}

export { validateStatus }

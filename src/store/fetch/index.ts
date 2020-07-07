/* istanbul ignore file */

import { INITIAL, LOADING, SUCCESS, ERROR } from './status'
import { Action } from 'interface/Action'

export const makeFetchActionTypes = (namespace: string) => ({
  REQUEST: `${namespace}/REQUEST`,
  RECEIVE: `${namespace}/RECEIVE`,
  FAIL: `${namespace}/FAIL`,
  RESET: `${namespace}/RESET`,
})

export interface FetchActionCreators<R, P> {
  request(payload?: R): Action<R>
  receive(payload?: P): Action<P>
  fail(payload?: P): Action<P>
  reset(): Action<any>
}

export function makeFetchActionCreators<R = undefined, P = undefined>(namespace: string): FetchActionCreators<R, P> {
  const { REQUEST, RECEIVE, FAIL, RESET } = makeFetchActionTypes(namespace)
  return {
    request: (payload?): Action<R> => ({
      type: REQUEST,
      payload,
    }),
    receive: (payload?): Action<P> => ({
      type: RECEIVE,
      payload,
    }),
    fail: (error?): Action<P> => ({
      type: FAIL,
      payload: error,
    }),
    reset: () => ({ type: RESET }),
  }
}

export const initialState = () => ({
  results: null,
  error: null,
  status: INITIAL,
})

export function makeFetchReducer<T>(namespace: string) {
  const { REQUEST, RECEIVE, FAIL, RESET } = makeFetchActionTypes(namespace)

  const fetchReducer = (state = initialState(), action: Action<T>) => {
    switch (action.type) {
      case REQUEST: {
        return {
          ...state,
          results: null,
          error: null,
          status: LOADING,
        }
      }

      case RECEIVE: {
        const { payload } = action
        return {
          ...state,
          results: payload,
          error: null,
          status: SUCCESS,
        }
      }

      case FAIL: {
        const { payload } = action
        return {
          ...state,
          results: null,
          error: payload,
          status: ERROR,
        }
      }

      case RESET:
        return initialState()

      default:
        return state
    }
  }

  return fetchReducer
}

export default {
  makeFetchActionTypes,
  makeFetchActionCreators,
  makeFetchReducer,
}

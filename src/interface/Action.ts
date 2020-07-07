import { Action as ReduxAction } from 'redux'

export interface Action<T = undefined> extends ReduxAction {
  type: string
  payload?: T
  error?: boolean
  meta?: any
}

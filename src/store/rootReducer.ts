/* istanbul ignore file */

import account from 'utils/account/reducer'
import navigation from 'components/Navigation/state/reducer'
import iframeView from 'views/IFrameView/state/reducer'
import pipelineReducers from '../store/pipelineReducer'
import { Action } from '../interface/Action'

const appReducer = pipelineReducers({
  account,
  navigation,
  iframeView,
})

const rootReducer = (state: any, action: Action): any => {
  const newState = state
  return appReducer(newState, action)
}

export default rootReducer

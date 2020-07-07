/* istanbul ignore file */

import { getAccount } from 'utils/account/selectors'
import { AccountState } from 'utils/account/reducer'
import { NavigationState } from '../../Navigation/state/reducer'
import { getNavigation } from '../../Navigation/state/selectors'

export interface AppStateProps {
  account: AccountState
  navigation: NavigationState
}

function mapStateToProps(state: any): AppStateProps {
  return { account: getAccount(state), navigation: getNavigation(state) }
}

export default mapStateToProps

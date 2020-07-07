/* istanbul ignore file */

import { legacyActonContext } from '../const/globals'

const endpoints = {
  accountSettings: `${legacyActonContext}/ng-ui/jsp/accountSettings.jsp`,
  isAuthorized: `${legacyActonContext}/ng-ui/jsp/isAuthorized.jsp`,
  logout: `${legacyActonContext}/account/logoutAjax2.jsp`,
  toggleLabsFeature: `${legacyActonContext}/account/setActonLabsAjax.jsp`,
}

export default { endpoints }

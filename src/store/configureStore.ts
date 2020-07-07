/* istanbul ignore file */

import { isProd } from '../const/globals'

if (isProd()) {
  module.exports = require('./configureStore.prod')
} else {
  module.exports = require('./configureStore.dev')
}

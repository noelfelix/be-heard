/* istanbul ignore file */

import { isProd } from '../const/globals'

if (isProd()) {
  module.exports = require('./prod.env')
} else {
  module.exports = require('./dev.env')
}

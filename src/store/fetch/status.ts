import PropTypes from 'prop-types'

export const INITIAL = 'initial'
export const LOADING = 'loading'
export const SUCCESS = 'success'
export const ERROR = 'error'

export const statusType = PropTypes.oneOf([INITIAL, LOADING, SUCCESS, ERROR])

export default {
  INITIAL,
  LOADING,
  SUCCESS,
  ERROR,
}

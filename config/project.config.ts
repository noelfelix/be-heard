const NODE_ENV = process.env.NODE_ENV || 'development'

const __DEV__  = NODE_ENV === 'development',
  __TEST__ = NODE_ENV === 'test',
  __PROD__ = NODE_ENV === 'production'

const config: { [key: string]: any } = {
  __DEV__,
  __TEST__,
  __PROD__,
  __DEBUG__: __DEV__ || __TEST__,
}

export default config;
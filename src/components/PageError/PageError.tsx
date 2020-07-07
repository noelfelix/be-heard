import React, { FC } from 'react'
import { rootContext } from '../../const/globals'

import './pageError.scss'

const rootClass = 'page-error'

export const PageError: FC = () => {
  return (
    <div className={rootClass}>
      <img src={`${rootContext}/images/16warning.gif`} />
      <span>OOPS - An unexpected error as occurred.</span>
    </div>
  )
}

export default PageError

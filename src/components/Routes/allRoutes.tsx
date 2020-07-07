import { ComponentClass, FC } from 'react'
import Features from '../../views/features'
import { rootContext } from '../../const/globals'

export interface RouteConfig {
  path: string
  component: FC | ComponentClass | null
  noProd?: boolean
}

const allRoutes: RouteConfig[] = [
  {
    path: `${rootContext}/classic`,
    component: null,
  },
  {
    path: `${rootContext}/features`,
    component: Features,
    noProd: true,
  },
]

export default allRoutes

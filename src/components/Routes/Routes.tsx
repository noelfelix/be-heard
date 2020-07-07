import React, { FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import gobals, { rootContext } from 'const/globals'
import allRoutes, { RouteConfig } from './allRoutes'

export const getRoutes = (routes: RouteConfig[]) =>
  routes.map((route) => {
    if (route.noProd && gobals.isProd()) return null

    if (route.component) {
      return <Route key={route.path} path={route.path} component={route.component} />
    }
    return <Route key={route.path} path={route.path} />
  })

const Routes: FC = () => {
  return (
    <Switch>
      {...getRoutes(allRoutes)}
      <Route path="/" exact={true}>
        <Redirect to={`${rootContext}/classic/`} />
      </Route>
      <Route path="" exact={true}>
        <Redirect to={`${rootContext}/classic/`} />
      </Route>
      <Route path="*">
        <Redirect to={`${rootContext}/classic/404`} />
      </Route>
    </Switch>
  )
}

export default Routes

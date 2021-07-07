import { Route } from 'react-router-dom'
import React from 'react'
function getRoutes(route) {
  return route.map((prop, key) => {
    return (
      <Route
        exact
        path={prop.path}
        component={props => <prop.component {...props} />}
        key={key}
      />
    )
  })
}
export { getRoutes }

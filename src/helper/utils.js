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
function convertArrayFromSolidity(arr){
  let temp = [];
  for(let key in arr){
    let clone = Object.assign({}, arr[key]);
        temp.push(clone);
  }
  return temp;
}
export { getRoutes , convertArrayFromSolidity}


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
function convertToDecimal(value){
  let payload = parseFloat(value).toString().split('.');
  let decimal = 0;
  let coin = parseInt(payload[0]);
  if(payload.length === 2) {
    coin = parseInt(payload[0]) * Math.pow(10,payload[1].length);
    decimal = parseInt(payload[1].length);
  }
  return {coin, decimal};
}
function convertSPT(value){
  return value/Math.pow(10,18).toFixed(18);
}
export { getRoutes , convertArrayFromSolidity, convertToDecimal, convertSPT}


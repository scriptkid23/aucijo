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
function convertArrayFromSolidity(arr) {
  let temp = [];
  for (let key in arr) {
    let clone = Object.assign({}, arr[key]);
    temp.push(clone);
  }
  return temp;
}
function convertToDecimal(value) {
  let payload = parseFloat(value).toString().split('.');
  let decimal = 0;
  let coin = parseInt(payload[0]);
  if (payload.length === 2) {
    coin = parseInt(payload[0]) * Math.pow(10, payload[1].length);
    decimal = parseInt(payload[1].length);
  }
  return { coin, decimal };
}
function convertSPT(value) {
  return value / Math.pow(10, 18).toFixed(18);
}
function parseContent(value) {

  const star = "⭐";
  const data = JSON.parse(value);
  var result = "";
  result = result + data.name;
  result = result + " ";
  for (let i = 0; i < data.star; i++) result = result + star;
  return result;
}
function shuffle(array) {
  //The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
export { getRoutes, convertArrayFromSolidity, convertToDecimal, convertSPT, parseContent, shuffle }


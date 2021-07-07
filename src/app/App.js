import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthenticationLayout from "../layouts/authentication.layout";
import HomeLayout from "../layouts/home.layout";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path={["/login", "/register"]}
            component={AuthenticationLayout}
          />
          <Route
            exact
            path={["/", "/home", "/home/:sub"]}
            component={HomeLayout}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

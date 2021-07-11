import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthenticationLayout from "../layouts/authentication.layout";
import HomeLayout from "../layouts/home.layout";
import ThemeContextWrapper from "../components/theme-wrapper/theme.wrapper";
import BackgroundColorWrapper from "../components/background-color-wrapper/background.color.wrapper";
import AuthenticatedGuard from "../guards/AuthenticatedGuard";
export default class App extends Component {
  render() {
    return (
      <ThemeContextWrapper>
        <BackgroundColorWrapper>
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path={["/login", "/register"]}
                component={AuthenticationLayout}
              />
              <AuthenticatedGuard
                exact
                path={[
                  // "/",
                  "/home",
                  "/home/:sub",
                  "/home/auction/:id",
                  "/home/dashboard/:sub",
                ]}
                component={HomeLayout}
              />
              <Redirect to='/home/dashboard'/>
            </Switch>
          </BrowserRouter>
        </BackgroundColorWrapper>
      </ThemeContextWrapper>
    );
  }
}

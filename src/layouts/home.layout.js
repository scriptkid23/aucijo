import React, { Component } from "react";
import { BackgroundColorContext } from "../context/background.color.context";
import { getRoutes } from "../helper/utils";
import { HomeRoute } from "../router/router";
import Sidebar from "../components/sidebar.component";
import AdminNavbar from "../components/admin-navbar.component";
export default class HomeLayout extends Component {
  constructor() {
    super();
    this.state = {
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1,
    };
    this.mainPanelRef = React.createRef();
  }
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      sidebarOpened: !this.state.sidebarOpened,
    });
  };
  render() {
    return (
      <BackgroundColorContext.Consumer>
        {({ color, changeColor }) => (
          <React.Fragment>
            <div className="wrapper">
              <Sidebar toggleSidebar={this.toggleSidebar} />
              <div className="main-panel" ref={this.mainPanelRef} data={color}>
                <AdminNavbar
                  brandText={"Dashboard"}
                  toggleSidebar={this.toggleSidebar}
                  sidebarOpened={this.state.sidebarOpened}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </BackgroundColorContext.Consumer>
    );
  }
}

import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";

import { Nav } from "reactstrap";
import {
  BackgroundColorContext,
  backgroundColors,
} from "../context/background.color.context";
import { HomeRoute } from "../router/router";

function Sidebar(props) {
  const { routes, rtlActive, logo } = props;
  const location = useLocation();
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) !== -1 ? "active" : "";
  };
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </a>
      );
      logoText = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-mini"
          onClick={props.toggleSidebar}
        >
          <div className="logo-img">
            <img src={logo.imgSrc} alt="react-logo" />
          </div>
        </Link>
      );
      logoText = (
        <Link
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.toggleSidebar}
        >
          {logo.text}
        </Link>
      );
    }
  }
  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper">
            {logoImg !== null || logoText !== null ? (
              <div className="logo">
                {logoImg}
                {logoText}
              </div>
            ) : null}
            <Nav>
              <li className={activeRoute("/home/dashboard")}>
                <NavLink
                  to={"/home/dashboard"}
                  className="nav-link"
                  activeClassName="active"
                  onClick={props.toggleSidebar}
                >
                  <i className={"tim-icons icon-chart-pie-36"} />
                  <p>Dashboard</p>
                </NavLink>
              </li>
              <li className={activeRoute("/home/auction")}>
                <NavLink
                  to={"/home/auction"}
                  className="nav-link"
                  activeClassName="active"
                  onClick={props.toggleSidebar}
                >
                  <i className={"tim-icons icon-cart"} />
                  <p>auction</p>
                </NavLink>
              </li>
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}
Sidebar.defaultProps = {
  rtlActive: false,
  routes: [{}],
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string,
  }),
};
export default Sidebar;

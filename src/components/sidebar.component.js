import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import {
  BackgroundColorContext,
  backgroundColors,
} from "../context/background.color.context";


function Sidebar(props) {

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper">
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

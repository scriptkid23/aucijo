import React from "react";
import { Button, Card, CardBody } from "reactstrap";
import MetamaskButton from "../components/metamask-button.component";


export default function RegisterContainer() {
  return (
    <div className="index-page">
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-transparent"
      >
        <div className="container">
          <div className="navbar-translate">
            <a
              className="navbar-brand"
              href="https://demos.creative-tim.com/blk-design-system/index.html"
              rel="tooltip"
              title="Designed and Coded by Creative Tim"
              data-placement="bottom"
            >
              <span className='font-weight-bold'>Spirity</span> Inc.<br/>
            </a>
          </div>
        </div>
      </nav>
      <div className="wrapper">
        <div className="page-header header-filter">
          <div className="squares square1"></div>
          <div className="squares square2"></div>
          <div className="squares square3"></div>
          <div className="squares square4"></div>
          <div className="squares square5"></div>
          <div className="squares square6"></div>
          <div className="squares square7"></div>
          <div className="container h-100">
          <div className="content-center register-form">
                 
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

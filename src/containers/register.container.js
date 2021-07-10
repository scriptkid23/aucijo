import React from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  CardText,
  CardTitle,
  CardSubtitle,
  InputGroup,
  Input,
  InputGroupAddon,
  FormGroup,
  Form,
} from "reactstrap";
import MetamaskButton from "../components/metamask-button.component";

export default function RegisterContainer() {
  return (
    <div className="index-page">
      <nav className="navbar navbar-expand-lg fixed-top navbar-transparent">
        <div className="container">
          <div className="navbar-translate">
            <a
              className="navbar-brand"
              href="https://demos.creative-tim.com/blk-design-system/index.html"
              rel="tooltip"
              title="Designed and Coded by Creative Tim"
              data-placement="bottom"
            >
              <span className="font-weight-bold">Spirity</span> Inc.
              <br />
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
              <Card>
                <CardBody>
                  <CardText>
                    Because you are a newbie, so you should register information
                    owner before using service
                  </CardText>
                  <div className="container">
                    <Form>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Firstname</label>
                            <Input placeholder="Type your first name" />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Lastname</label>
                            <Input placeholder="Type your last name"/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>Email</label>
                            <Input placeholder="your@gmail.com"/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>Address</label>
                            <Input placeholder="your@gmail.com"/>
                          </FormGroup>
                        </Col>
                      </Row>

                    </Form>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

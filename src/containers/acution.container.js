import React from "react";
import { useHistory } from "react-router-dom";
import { Col, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
export default function AcutionContainer() {
  const history = useHistory();
  return (
    <div className="content">
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <h5 className="title">
                Currently there are <span className="text-info">100</span>{" "}
                auction activities
              </h5>
            </CardHeader>
            <CardBody className="all-icons">
              <Row>
                <Col
                  className="font-icon-list col-xs-6 col-xs-6"
                  lg="2"
                  md="3"
                  sm="4"
                >
                  <div className="font-icon-detail">
                    <i className="tim-icons icon-tag" />
                    <p>ID: 123<br/>Triumph Street Twin</p>
                    
                    <Button onClick={() => history.push(`/home/acution/${'123'}`)}>Join</Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

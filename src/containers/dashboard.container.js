import React from "react";
import classNames from "classnames";
import {
  Button,
  NavLink,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Label,
  FormGroup,
  Input,
  Table,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import { Link } from "react-router-dom";
export default function DashboardContainer() {
  return (
    <div className="content">
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <h5 className="card-category">Assets</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-app text-info" /> 30 items
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Link to="/home/dashboard/items">Show more</Link>
            </CardBody>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <h5 className="card-category">Token</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-coins text-info" /> 763,215 nu
              </CardTitle>
            </CardHeader>
            <CardBody>
              <span className="text-info pointer">Coin recharge</span>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Card className="card-tasks">
            <CardHeader>
              <h6 className="title d-inline">History Transactions</h6>
            </CardHeader>
            <CardBody>
              <div className="table-full-width table-responsive">
                <Table>
                  <tbody>
                    <tr>
                      <td>
                        <p className="title">Update the Documentation</p>
                        <p className="text-muted">
                          Dwuamish Head, Seattle, WA 8:47 AM
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

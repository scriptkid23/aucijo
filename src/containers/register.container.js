import React from "react";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Input,
  FormGroup,
  Form,
  Alert,
} from "reactstrap";
import { GAS } from "../helper/constant";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import WrapperAlertComponent from "../components/wrapper-alert.component";
import {isEmail, isEmpty} from '../helper/utils'
function RegisterContainer({ methods, owner, setAlert }) {
  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    phone_number: "",
  });
  const handleSetData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const history = useHistory();
  
  const validatorData = () => {
    if(isEmpty(data.first_name) || isEmpty(data.last_name) || isEmpty(data.email) ||isEmpty(data.address) || isEmpty(data.phone_number)){
      throw {message: 'Data not empty'}
    }
    if(!isEmail(data.email)){
      throw {message: 'The email address format is not valid'}
    }
  }
  const onSubmit = async () => {
    try {
      validatorData();
      await methods
        .registerMember(
          data.first_name,
          data.last_name,
          data.email,
          data.address,
          data.phone_number
        )
        .send({
          from: owner,
          gas: GAS,
        });
      history.push("/home/dashboard");
    } catch (error) {
      setAlert("danger", error.message);
    }
  };
  return (
    <div className="index-page">
      <nav className="navbar navbar-expand-lg fixed-top navbar-transparent">
        <div className="container">
          <div className="navbar-translate">
            <a
              className="navbar-brand"
              href="https://google.com"
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
                  <Alert className="mb-3">
                    Because you are a newbie, so you should register information
                    owner before using service.
                  </Alert>
                  <div className="container">
                    <Form>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>First name</label>
                            <Input
                              placeholder="Type your first name"
                              name="first_name"
                              onChange={(e) => handleSetData(e)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Last name</label>
                            <Input
                              placeholder="Type your last name"
                              name="last_name"
                              onChange={(e) => handleSetData(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>Email</label>
                            <Input
                              placeholder="your@gmail.com"
                              name="email"
                              onChange={(e) => handleSetData(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>Address</label>
                            <Input
                              placeholder="3973 Drainer Avenue, Tallahassee, Florida"
                              name="address"
                              onChange={(e) => handleSetData(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <label>Phone number</label>
                            <Input
                              placeholder="0975164536"
                              type="tel"
                              name="phone_number"
                              onChange={(e) => handleSetData(e)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button color="primary" onClick={() => onSubmit()}>Submit</Button>
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
export default compose(
  WrapperDrizzleComponent,
  WrapperAlertComponent
)(RegisterContainer);

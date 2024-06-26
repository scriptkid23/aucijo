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
import { useForm } from "react-hook-form";
import { GAS } from "../helper/constant";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import WrapperAlertComponent from "../components/wrapper-alert.component";

function RegisterContainer({ methods, owner, setAlert }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const onSubmit = async (data) => {
    try {
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
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>First name</label>
                            <Input
                              placeholder="Type your first name"
                              {...register("first_name", { required: true })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Last name</label>
                            <Input
                              placeholder="Type your last name"
                              {...register("last_name", { required: true })}
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
                              {...register("email", {
                                required: true,
                                pattern: /\S+@\S+\.\S+/,
                              })}
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
                              {...register("address", { required: true })}
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
                              {...register("phone_number", {
                                required: true,
                                pattern: /^\d+$/,
                              })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button
                        color="primary"
                        disabled={
                          Object.keys(errors).length !== 0 ? true : false
                        }
                      >
                        Submit
                      </Button>
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

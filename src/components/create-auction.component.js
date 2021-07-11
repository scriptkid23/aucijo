import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import Datetime from "react-datetime";
import { useForm } from "react-hook-form";
import { GAS } from "../helper/constant";

export default function CreateAuctionComponent({ data, methods, owner }) {
  const [modal, setModal] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const toggle = () => setModal(!modal);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (value) => {
    if (startTime && endTime) {
      try {
          console.log(owner);
        await methods
          .createAuction(
            value.name,
            parseInt(data.id),
            value.description,
            parseInt(value.price),
            startTime.unix(),
            endTime.unix()
          )
          .send({
            from: owner,
            gas: GAS,
          });
          toggle();
      } catch (error) {
        alert(error.message);
      }
    }
  };
  return (
    <React.Fragment>
      <Button onClick={toggle}>Auction</Button>
      <Modal
        modalClassName="modal-create-auction"
        isOpen={modal}
        toggle={toggle}
      >
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <FormGroup>
                  <label className="text-secondary">Name</label>
                  <Input
                    placeholder="Type name of auction."
                    {...register("name", { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label className="text-secondary">Item ID</label>
                  <Input
                    disabled
                    className="text-white"
                    defaultValue={data.id}
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label className="text-secondary">Price</label>
                  <Input
                    className="text-white"
                    placeholder="Type start price (SPT)"
                    {...register("price", { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label className="text-secondary">Start time</label>
                  <Datetime onChange={setStartTime} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label className="text-secondary">End time</label>
                  <Datetime onChange={setEndTime} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label className="text-secondary">Description</label>
                  <Input
                    className="text-white"
                    placeholder="Description"
                    {...register("description", { required: true })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button color="primary">Create</Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

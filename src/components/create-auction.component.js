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
import { convertToDecimal } from "../helper/utils";

export default function CreateAuctionComponent({ data, methods, owner, methodsMarket, aucijoAddress}) {
  const [modal, setModal] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [item, setItem] = useState(null);
  const toggle = () => {
    setModal(!modal);
    getItemInformation();
  };
  const getItemInformation = async () => {
    const _data = await methods.findItemById(data.id).call({from:owner});
    setItem(_data);
  }
  const { register, handleSubmit } = useForm();
  const onSubmit = async (value) => {
    if (startTime && endTime) {
      const {coin, decimal} = convertToDecimal(value.price);
      try {
        await methods.createAuction(
            value.name,
            parseInt(data.id),
            value.description,
            coin,
            decimal,
            startTime.unix(),
            endTime.unix()
          )
          .send({
            from: owner,
            gas: GAS,
          });
        await methodsMarket.safeTransferFrom(
          owner, 
          aucijoAddress, 
          item.tokenId).send({
          from: owner,
          gas: GAS,
        })
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

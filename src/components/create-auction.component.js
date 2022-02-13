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
import { GAS } from "../helper/constant";
import Spinner from "./spinner";
import { ethers } from "ethers";
import moment from "moment";
export default function CreateAuctionComponent({
  data,
  methods,
  owner,
  methodsMarket,
  aucijoAddress,
  setAlert,
}) {
  const [modal, setModal] = useState(false);
  const minutesToAdd = 3;
  const [startTime, setStartTime] = useState(
    new Date(new Date().getTime() + minutesToAdd * 60000)
  );
  const [endTime, setEndTime] = useState(null);
  const [item, setItem] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    price: '',
    description: '', 
  })
  const toggle = () => {
    setModal(!modal);
    getItemInformation();
  };
  const getItemInformation = async () => {
    const _data = await methods.findItemById(data.id).call({ from: owner });
    setItem(_data);
    setContent(JSON.parse(_data.content));
  };
  const setValue = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,

    })
  }
  const onSubmit = async () => {
    setLoading(true);
    if (startTime && endTime) {
      try {
        await methods
          .createAuction(
            content?.name,
            parseInt(data.id),
            payload.description,
            ethers.utils.parseEther(payload && payload.price.toString()),
            moment(startTime).unix(),
            endTime.unix()
          )
          .send({
            from: owner,
            gas: GAS,
          });
        await methodsMarket
          .safeTransferFrom(owner, aucijoAddress, item.tokenId)
          .send({
            from: owner,
            gas: GAS,
          });
        toggle();
        setLoading(false);
      } catch (error) {
        setAlert("danger", error.message);
        setLoading(false);
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
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <label className="text-secondary">Name</label>
                  <Input
                    placeholder="Type name of auction."
                    disabled
                    defaultValue={content?.name}
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
                    name="price"
                    onChange= {(e) => setValue(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <label className="text-secondary">Start time</label>
                  <Datetime onChange={setStartTime} value={startTime} />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <label className="text-secondary">End time</label>
                  <Datetime onChange={setEndTime} value={endTime} />
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
                    name="description"
                    onChange= {(e) => setValue(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button color="primary" disabled={loading} onClick={() => onSubmit()}>
                  {loading ? <Spinner loading={true} /> : "Create"}
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

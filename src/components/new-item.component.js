import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import { GAS } from "../helper/constant";
export default function NewItemComponent({ methods, owner, setAlert }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (address.length > 0 && id.length > 0) {
        await methods.addItem(id, address).send({
          from: owner,
          gas: GAS,
        });
        toggle();
      } else {
        alert("Field name is empty");
      }
    } catch (error) {
      setAlert("danger",error.message);
    }
  };
  return (
    <React.Fragment>
      <Button color="primary" onClick={toggle}>
        New item
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        modalClassName="modal-create-auction"
      >
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <label className="text-secondary">Store Address</label>
              <Input
                type="text"
                value={address}
                placeholder="0x1190abcdE0402D71aF957471BF9F71e5f406cf49"
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label className="text-secondary">Token ID</label>
              <Input
                type="number"
                value={id}
                placeholder="0"
                onChange={(e) => setId(e.target.value)}
              />
            </FormGroup>

            <Button color="primary" type="button" onClick={onSubmit}>
              Create
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

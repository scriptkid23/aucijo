import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import { GAS } from "../helper/constant";
export default function NewItemComponent({ methods, owner }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [name, setName] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (name.length > 0) {
        await methods.addItem(name).send({
          from: owner,
          gas: GAS,
        });
        toggle();
      } else {
        alert("Field name is empty");
      }
    } catch (error) {
      alert(error.message);
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
              <label className="text-secondary">Name</label>
              <Input
                type="text"
                value={name}
                placeholder="Type item name"
                onChange={(e) => setName(e.target.value)}
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

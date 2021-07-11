import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import { GAS } from "../helper/constant";
export default function NewItemComponent({ methods, owner }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      await methods.addItem(data.name).send({
        from: owner,
        gas: GAS,
      });
      toggle();
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <React.Fragment>
      <Button color="primary" onClick={toggle}>
        New item
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <label>Item name</label>
              <Input
                placeholder="Type item name"
                className="text-dark"
                {...register("name", { required: true })}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

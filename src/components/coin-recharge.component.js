import React, { useState } from "react";

import { Modal, Form, Input, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
export default function CoinRechargeComponent() {
  const [modal, setModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const toggle = () => setModal(!modal);
  const onCoinRecharge = (data) => {
    
  }
  return (
    <React.Fragment>
      <span className="text-info pointer" onClick={toggle}>
        Coin recharge
      </span>
      <Modal modalClassName="modal-search" isOpen={modal} toggle={toggle}>
        <ModalHeader className="search-header">
          <Form onSubmit={handleSubmit(onCoinRecharge)}>
            <Input
              className="w-100 font-weight-normal text-dark"
              placeholder="Type coin value is Multiples of 10000"
              {...register("coin", {
                required: true,
                min: 10000,
                validate: (value) => value % 10000 === 0,
              })}
              type="number"
            />
          </Form>

          <button aria-label="Close" className="close" onClick={toggle}>
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </React.Fragment>
  );
}

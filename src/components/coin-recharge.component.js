import React, { useState } from "react";

import { Modal, Form, Input, ModalHeader } from "reactstrap";
import { useForm } from "react-hook-form";
import WrapperDrizzleComponent from "./wrapper-drizzle.component";
import { GAS } from "../helper/constant";
import CustomHook from "../helper/hook";
import { compose } from "redux";
import WrapperAlertComponent from "./wrapper-alert.component";
import { connect } from "react-redux";
function CoinRechargeComponent({ methods, owner, member }) {
  const [modal, setModal] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { updateToken } = CustomHook();
  const toggle = () => setModal(!modal);
  const onCoinRecharge = async (data) => {
    try {
      await methods.coinCharge(data.coin).send({
        from: owner,
        gas: GAS,
      });
      updateToken(parseInt(member.tokens) + parseInt(data.coin / 10000));
    } catch (error) {
      alert(error.message);
    }
  };
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
const mapStateToProps = (state) => {
  return {
    member: state.member,
  };
};

const ComponseCoinRecharge = compose(
  WrapperDrizzleComponent,
  WrapperAlertComponent
)(CoinRechargeComponent);

export default connect(mapStateToProps)(ComponseCoinRecharge);

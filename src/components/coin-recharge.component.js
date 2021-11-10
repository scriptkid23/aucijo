import React, { useState } from "react";
import { Modal, Form, Input, ModalHeader, ModalBody, FormGroup, Button, InputGroup, ButtonDropdown, DropdownToggle } from "reactstrap";
import { useForm } from "react-hook-form";
import WrapperDrizzleComponent from "./wrapper-drizzle.component";
import { GAS } from "../helper/constant";
import CustomHook from "../helper/hook";
import { compose } from "redux";
import BN from 'bn.js'
import WrapperAlertComponent from "./wrapper-alert.component";
import { connect } from "react-redux";
function CoinRechargeComponent({ methods, owner, member }) {
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState(null);
  const [unit, setUnit] = useState(1);
  const {
    register,
    handleSubmit,
  } = useForm();
  const { updateToken } = CustomHook();
  const toggle = () => setModal(!modal);
  const onCoinRecharge = async () => {
    let coin = parseFloat(unit) * parseFloat(value);
    console.log(coin);
    try {
      await methods.coinCharge().send({
        from: owner,
        gas: GAS,
        value: coin,
      });
      updateToken(parseFloat(member.tokens) + coin*100);
      setModal(false);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <React.Fragment>
      <span className="text-info pointer" onClick={toggle}>
        Coin recharge
      </span>
      <Modal isOpen={modal} toggle={toggle} modalClassName="modal-create-auction">
        {/* <ModalHeader className="search-header">
          <Form onSubmit={handleSubmit(onCoinRecharge)}>
            <Input
              className="w-100 font-weight-normal text-dark"
              placeholder="type the amount of ETH you want to transfer"
              {...register("coin")}
              type="text"
            />
          </Form>

          <button aria-label="Close" className="close" onClick={toggle}>
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader> */}
        <ModalBody>
          <Form>
          <FormGroup>
              <label className="text-secondary">Ether</label>
              <InputGroup>

                <Input onChange={e => setValue(e.target.value)} placeholder="value" type="text"/>
                <Input type="select" value={unit} onChange={e => setUnit(e.target.value)}>
                  <option value={Math.pow(10,18)}>Ether</option>
                  <option value={Math.pow(10,9)}>Gwei</option>
                  <option value={1}>Wei</option>
                </Input>
              </InputGroup>
              
             
            </FormGroup>
            <Button color="primary" type="button" onClick={onCoinRecharge}>
              Charge
            </Button>
          </Form>
        </ModalBody>
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

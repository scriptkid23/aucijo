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
function WithdrawalComponent({ methods, owner, member }) {
  const [modal, setModal] = useState(false);
  const [value, setValue] = useState(0);
  const toggle = () => setModal(!modal);
  const onWithdrawal = async () => {
    if(value > 0){
      let payload = parseFloat(value).toString().split('.');
      let decimal = 0;
      let coin = parseInt(payload[0]);
      if(payload.length === 2) {
        coin = parseInt(payload[0]) * Math.pow(10,payload[1].length);
        decimal = parseInt(payload[1].length);
      }
      try {
        await methods.withdrawal(coin,decimal).send({
          from: owner,
          gas: GAS
        });
        setModal(false);
      } catch (error) {
        alert(error.message);
      }
    }
  
  };
  return (
    <React.Fragment>
      <span className="text-danger pointer float-right" onClick={toggle}>
        Withdrawal
      </span>
      <Modal isOpen={modal} toggle={toggle} modalClassName="modal-create-auction">
        <ModalBody>
          <Form>
          <FormGroup>
              <label className="text-secondary">SPT numbers</label>
              <InputGroup>
                <Input onChange={e => setValue(e.target.value)} placeholder="value" type="tel"/>
              </InputGroup>
            </FormGroup>
            <Button color="primary" onClick={onWithdrawal}>
                Withdrawal
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

const ComponseWithdrawal = compose(
  WrapperDrizzleComponent,
  WrapperAlertComponent
)(WithdrawalComponent);

export default connect(mapStateToProps)(ComponseWithdrawal);

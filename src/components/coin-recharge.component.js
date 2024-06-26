import React, { useState } from "react";
import { Modal, Form, Input, ModalBody, FormGroup, Button, InputGroup} from "reactstrap";
import WrapperDrizzleComponent from "./wrapper-drizzle.component";
import { GAS } from "../helper/constant";
import CustomHook from "../helper/hook";
import { compose } from "redux";
import WrapperAlertComponent from "./wrapper-alert.component";
import { connect } from "react-redux";
function CoinRechargeComponent({ methods, owner, member }) {
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(0);
  const toggle = () => setModal(!modal);
  const onCoinRecharge = async (data) => {
    if(coin != 0){
      try {
        await methods.coinCharge().send({
          from: owner,
          gas: GAS,
          value: coin * Math.pow(10,18),
        });
        setModal(false);
      } catch (error) {
        alert(error.message);
      }
    }
   
  };
  return (
    <React.Fragment>
      <span className="text-info pointer" onClick={toggle}>
        Coin recharge
      </span>
      <Modal isOpen={modal} toggle={toggle} modalClassName="modal-create-auction">
        <ModalBody>
          <Form>
          <FormGroup>
              <label className="text-secondary">Ether</label>
              <InputGroup>
                <Input onChange={e => setCoin(e.target.value)} placeholder="value" type="number"/>
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

import React from "react";
import { CardFooter, Button, UncontrolledTooltip } from "reactstrap";
import { GAS } from "../helper/constant";
export default function AuctionActionWithOwner({
  auction,
  methods,
  itemId,
  owner,
  setAlert,
}) {
  const onAgree = async() => {
    try {
      await methods.agree(itemId).send({from:owner, gas:GAS});
      setAlert('success','Transaction was succeeded');
    } catch (error) {
      setAlert('danger',error.message)
    }
  }
  const onRevoke = async() => {
    try {
      await methods.revokeAuction(itemId).send({from:owner, gas:GAS});
      setAlert('success','Revoke aution was succeeded');
    } catch (error) {
      setAlert('danger',error.message);
    }
  }
  return (
    <CardFooter>
      <div className="button-container">
        <Button
          className="btn-icon btn-round"
          color="success"
          id="tooltip-agree"
          onClick={onAgree}
        >
          <i className="far fa-handshake"></i>
        </Button>
        <UncontrolledTooltip
          delay={0}
          target="tooltip-agree"
          placement="bottom"
        >
          Agree
        </UncontrolledTooltip>
        <Button
          className="btn-icon btn-round"
          color="primary"
          id="tooltip-revoke"
          onClick={onRevoke}
        >
          <i className="far fa-times-circle"></i>
        </Button>
        <UncontrolledTooltip
          delay={0}
          target="tooltip-revoke"
          placement="bottom"
          
        >
          Revoke
        </UncontrolledTooltip>
      </div>
    </CardFooter>
  );
}

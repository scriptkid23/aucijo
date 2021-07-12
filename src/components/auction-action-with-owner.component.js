import React from "react";
import { CardFooter, Button, UncontrolledTooltip } from "reactstrap";
export default function AuctionActionWithOwner({
  auction,
  methods,
  itemId,
  owner,
}) {
  return (
    <CardFooter>
      <div className="button-container">
        <Button
          className="btn-icon btn-round"
          color="success"
          id="tooltip-agree"
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

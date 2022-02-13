import React from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import {
  CardFooter,
  Button,
  UncontrolledTooltip,
  Input,
  Form,
} from "reactstrap";
import { ethers } from 'ethers'
import { GAS } from "../helper/constant";
import { convertToDecimal } from "../helper/utils";
export default function AuctionActionWithGuest({
  auction,
  methods,
  itemId,
  owner,
  setAlert,
}) {
  const [price, setPrice] = React.useState('');
  const bid = async () => {
    try {
      await methods.bid(parseInt(itemId), ethers.utils.parseEther(price)).send({
        from: owner,
        gas: GAS,
      });
      setAlert('success','You bid: '+price+' SPT');
    } catch (error) {
      setAlert("danger", error.message);
    }
  };
  const revokeToken = async () => {
     try {
         await methods.revokeToken(itemId).send({
             from: owner,
             gas: GAS
         })
         setAlert("success","Revoke token succeded");
     } catch (error) {
         setAlert("danger",error.message)
     }
  }

  return (
    <CardFooter>
      <div className="button-container">
        {parseInt(auction.end_time) >= moment().unix() && (
          <Form
            className="d-flex align-items-center"
          >
            <Input
              placeholder="Type the number of SPT"
              onChange={e => setPrice(e.target.value)}
            />
            <Button className="btn-icon" color="success" id="tooltip-bid" onClick={() => bid()}>
              <i className="far fa-hand-paper"></i>
            </Button>
            <UncontrolledTooltip
              delay={0}
              target="tooltip-bid"
              placement="bottom"
            >
              Bid
            </UncontrolledTooltip>
          </Form>
        )}

        {parseInt(auction.end_time) < moment().unix() && (
          <React.Fragment>
            <Button
              className="btn-icon btn-round"
              color="primary"
              id="tooltip-revoke"
              onClick={revokeToken}
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
          </React.Fragment>
        )}
      </div>
    </CardFooter>
  );
}

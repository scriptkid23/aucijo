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
import { GAS } from "../helper/constant";
export default function AuctionActionWithGuest({
  auction,
  methods,
  itemId,
  owner,
  setAlert,
}) {
  const bid = async (data) => {
    try {
      await methods.bid(parseInt(itemId), parseInt(data.price)).send({
        from: owner,
        gas: GAS,
      });
      setAlert('success','You bid: '+data.price+' SPT');
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
  const { register, handleSubmit } = useForm();
  return (
    <CardFooter>
      <div className="button-container">
        {parseInt(auction.end_time) >= moment().unix() && (
          <Form
            className="d-flex align-items-center"
            onSubmit={handleSubmit(bid)}
          >
            <Input
              placeholder="Type the number of SPT"
              {...register("price", { required: true })}
            />
            <Button className="btn-icon" color="success" id="tooltip-bid">
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

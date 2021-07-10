import React from "react";
import { Button } from "reactstrap";
import MetamaskIcon from "../assets/img/metamask.svg";
export default function MetamaskButton() {
  return (
    <div>
      <Button color={"danger"}>
        <img src={MetamaskIcon} alt="metamask-icon" width={"30px"} className="mr-3"/>
        Login with Metamask
      </Button>
    </div>
  );
}

import React from "react";
import { Button } from "reactstrap";
import MetamaskIcon from "../assets/img/metamask.svg";
export default function MetamaskButton({onClick}) {
  return (
    <div>
      <Button color={"danger"} onClick={onClick}>
        <img src={MetamaskIcon} alt="metamask-icon" width={"30px"} className="mr-3"/>
        Login with Metamask
      </Button>
    </div>
  );
}

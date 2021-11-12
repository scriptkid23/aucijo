import Web3 from "web3";
import Aucijo from "../artifacts/Aucijo.json";

export const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7545"),
  },
  contracts: [Aucijo],
  events: {
    Aucijo: ["AddItem","AddAuction", "BecomeKing","CoinCharge","Withdrawal"],
  },
  polls: {
    // set polling interval to 30secs so we don't get buried in poll events
    accounts: 30000,
  },
};
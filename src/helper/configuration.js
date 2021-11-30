import Web3 from "web3";
import Aucijo from "../artifacts/Aucijo.json";
import SpiMarket from '../artifacts/SpiMarket.json';

export const options = {
  web3: {
    block: false,
    customProvider: new Web3("wss://ropsten.infura.io/ws/v3/72891fd15ab34c8b9de55cb9c41fcf7a"),
  },
  contracts: [Aucijo, SpiMarket],
  events: {
    Aucijo: ["AddItem","AddAuction", "BecomeKing","CoinCharge","Withdrawal"],
    SpiMarket:["AwardRecipient"],
  },
  polls: {
    // set polling interval to 30secs so we don't get buried in poll events
    accounts: 30000,
  },
};
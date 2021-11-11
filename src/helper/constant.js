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
export const GAS = 700000;

export const GameItem = [
  {
      name: "Legion",
      strength: "300",
      star: "2",
  },
  {
      name: "Gaint",
      strength: "400",
      star: "3",
  },
  {
      name: "Shape",
      strength: "500",
      star: "2",
  },
  {
      name: "Ginger",
      strength: "50",
      star: "1",
  },
  {
      name: "Splendid",
      strength: "10",
      star: "1",
  },
  {
      name: "Snooty",
      strength: "800",
      star: "5",
  },
  {
      name: "Wobbly",
      strength: "300",
      star: "2",
  },
  {
      name: "Giving",
      strength: "300",
      star: "2",
  },
]
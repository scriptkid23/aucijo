import React, { Component } from "react";
import { DrizzleContext } from "../context/drizzle.context";

const WrapperDrizzleComponent = (OriginalComponent) => {
  class WrapperDrizzleComponent extends Component {
    static contextType = DrizzleContext;
    constructor(props) {
      super(props);
      this.state = {};
    }
    render() {
      return (
        <OriginalComponent
          methods={this.context.contracts.Aucijo.methods}
          methodsMarket = {this.context.contracts.SpiMarket.methods}
          spimarketAddress = {this.context.contracts.SpiMarket.address}
          aucijoAddress = {this.context.contracts.Aucijo.address}
          context={this.context}
          events = {this.context.contracts.Aucijo.events}
          eventsMarket = {this.context.contracts.SpiMarket.events}
          owner={localStorage.getItem("address")}
          {...this.props}
        />
      );
    }
  }
  return WrapperDrizzleComponent;
};
export default WrapperDrizzleComponent;

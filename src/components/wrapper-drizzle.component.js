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
          context={this.context}
          events = {this.context.contracts.Aucijo.events}
          owner={localStorage.getItem("address")}
          {...this.props}
        />
      );
    }
  }
  return WrapperDrizzleComponent;
};
export default WrapperDrizzleComponent;

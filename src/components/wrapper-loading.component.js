import React, { Component } from "react";
import LoadingComponent from "./loading.component";

const WrapperLoadingComponent = (OriginalComponent) => {
  class WrapperLoadingComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        title: "",
        backdrop: true,
      };
    }
    setLoading = ({flag, title}) => {
      this.setState({
        isLoading: flag,
        title: title,
      });
    };
    render() {
      return (
        <React.Fragment>
          <LoadingComponent
            title={this.state.title}
            isLoading={this.state.isLoading}
            backdrop={this.state.backdrop}
          />
          <OriginalComponent
            isLoading = {this.state.isLoading}
            setLoading={this.setLoading}
            {...this.props}
          />
        </React.Fragment>
      );
    }
  }
  return WrapperLoadingComponent;
};
export default WrapperLoadingComponent;

import React, { Component } from "react";
import NotificationAlert from "react-notification-alert";

const WrapperAlertComponent = (OriginalComponent) => {
  class WrapperAlertComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isAlert: false,
        title: "",
        color: "",
      };
      this.notificationAlertRef = React.createRef();
    }
    setAlert = (color, message) => {
        const options = {
            place: 'tr',
            message: (
              <div>
                <div>
                    {message}
                </div>
              </div>
            ),
            type: color,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7,
          };
        this.notificationAlertRef.current.notificationAlert(options);
    }
    render() {
      return (
        <React.Fragment>
          <div className="react-notification-alert-container">
            <NotificationAlert ref={this.notificationAlertRef} />
          </div>
          <OriginalComponent
            isAlert={this.state.isAlert}
            setAlert={this.setAlert}
            {...this.props}
          />
        </React.Fragment>
      );
    }
  }
  return WrapperAlertComponent;
};
export default WrapperAlertComponent;

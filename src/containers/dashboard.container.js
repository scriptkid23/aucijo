import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import CoinRechargeComponent from "../components/coin-recharge.component";
import { connect } from "react-redux";
import moment from "moment";
import WithdrawalComponent from "../components/withdrawal.component";
import { compose } from "redux";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import WrapperAlertComponent from "../components/wrapper-alert.component";
import CustomHook from "../helper/hook";
import { convertSPT } from "../helper/utils";
function DashboardContainer({ member,events }) {
  const {updateToken} = CustomHook()
  React.useEffect(() => {
    events.CoinCharge(
      {
        filter: { owner: localStorage.getItem('address') },
      },
      (err, event) => {
        updateToken(event.returnValues.value);
      }
    );
    events.Withdrawal(
      {
        filter: { owner: localStorage.getItem('address') },
      },
      (err, event) => {
        updateToken(event.returnValues.value);
      }
    );
  },[])
  return (
    <div className="content">
      <Row>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <h5 className="card-category">Assets</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-app text-info" />{" "}
                {member.items.length} items
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Link to="/home/dashboard/items">Show more</Link>
            </CardBody>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <CardHeader>
              <h5 className="card-category">Token</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-coins text-info" /> {convertSPT(member.tokens)}{" "}
                SPT
              </CardTitle>
            </CardHeader>
            <CardBody>
              <CoinRechargeComponent />
              <WithdrawalComponent/>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="12">
          <Card className="card-tasks">
            <CardHeader>
              <h6 className="title d-inline">History Transactions</h6>
            </CardHeader>
            <CardBody>
              <div className="table-full-width table-responsive">
                <Table>
                  <tbody>
                    {member.historyTransaction
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .map((value, index) => {
                        return (
                          <tr key={value.id}>
                            <td>
                              <p className="title">
                                You {value.action} {value.itemName}
                              </p>
                              <p className="text-muted">
                                You transaction with{" "}
                                <span className="text-info">{value.dest}</span>{" "}
                                at{" "}
                                {moment
                                  .unix(value.createdAt)
                                  .format("DD/MM/YYYY h:mm A")}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    member: state.member,
  };
};
const composeDashboardContainer = compose(
  WrapperDrizzleComponent,
  WrapperAlertComponent,
)(DashboardContainer);
export default connect(mapStateToProps)(composeDashboardContainer);

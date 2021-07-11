import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Row,
  CardFooter,
  Button,
  UncontrolledTooltip,
  Input,
  CardHeader,
  Table,
} from "reactstrap";
import { compose } from "redux";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import CustomHook from "../helper/hook";
function AuctionActionWithOwner() {
  return (
    <CardFooter>
      <div className="button-container">
        <Button
          className="btn-icon btn-round"
          color="success"
          id="tooltip-agree"
        >
          <i className="far fa-handshake"></i>
        </Button>
        <UncontrolledTooltip
          delay={0}
          target="tooltip-agree"
          placement="bottom"
        >
          Agree
        </UncontrolledTooltip>
        <Button
          className="btn-icon btn-round"
          color="primary"
          id="tooltip-revoke"
        >
          <i className="far fa-times-circle"></i>
        </Button>
        <UncontrolledTooltip
          delay={0}
          target="tooltip-revoke"
          placement="bottom"
        >
          Revoke
        </UncontrolledTooltip>
      </div>
    </CardFooter>
  );
}
function AuctionActionWithGuest() {
  return (
    <CardFooter>
      <div className="button-container d-flex align-items-center">
        <Input placeholder="Type the number of SPT" />
        <Button className="btn-icon" color="success" id="tooltip-bid">
          <i className="far fa-hand-paper"></i>
        </Button>
        <UncontrolledTooltip delay={0} target="tooltip-bid" placement="bottom">
          Bid
        </UncontrolledTooltip>
        {/* if current time > end time then render  */}
        {/* <Button
      className="btn-icon btn-round"
      color="primary"
      id="tooltip-revoke"
    >
      <i className="far fa-times-circle"></i>
    </Button>
    <UncontrolledTooltip
      delay={0}
      target="tooltip-revoke"
      placement="bottom"
    >
      Revoke
    </UncontrolledTooltip> */}
      </div>
    </CardFooter>
  );
}
function AuctionDetail({ methods, owner, auction }) {
  const history = useHistory();
  const { id } = useParams();
  const { fetchAuctionDetail } = CustomHook();
  const goBack = () => {
    history.goBack();
  };
  const getAuctionDetail = async (id) => {
    const data = await methods.findAuctionById(id).call({ from: owner });
    fetchAuctionDetail(data);
  };
  React.useEffect(() => {
    getAuctionDetail(id);
  }, []);
  console.log(auction);
  return (
    <div className="content">
      <div className="mb-3">
        <i
          className="tim-icons icon-minimal-left text-info pointer"
          onClick={goBack}
        />
      </div>

      <div>
        <Row>
          <Col md={4}>
            <Card className="card-user">
              <CardBody>
                <div className="author">
                  <div className="block block-one" />
                  <div className="block block-two" />
                  <div className="block block-three" />
                  <div className="block block-four" />
                  <a>
                    <img
                      alt="..."
                      style={{ objectFit: "cover" }}
                      className="avatar"
                      src={require("../assets/img/items.png").default}
                    />
                    <h5 className="title">ID: {auction.id}</h5>
                  </a>
                  <p className="description">{auction.name}</p>
                </div>
                <div className="card-description text-center">
                  {auction.description}
                </div>
              </CardBody>

              {auction.owner.toLowerCase() === owner.toLowerCase() && (
                <AuctionActionWithOwner />
              )}

              {auction.owner.toLowerCase() !== owner.toLowerCase() && (
                <AuctionActionWithGuest />
              )}
            </Card>
          </Col>
          <Col md={8}>
            <Card className="card-tasks">
              <CardHeader>
                <div>
                  Current king:{" "}
                  <span className="text-info">{auction.currentKing}</span>
                </div>
                <div>
                  Start time{" "}
                  <span className="text-info">{moment.unix(auction.start_time).format('MMMM Do YYYY, h:mm:ss a')}</span>{" "}
                  to{" "}<span className="text-info">{moment.unix(auction.end_time).format('MMMM Do YYYY, h:mm:ss a')}</span>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <p className="title">Update the new king</p>
                          <p className="text-muted">
                            <span className="text-info">Gucci Gang</span> become
                            the king at 24/06/2021 8:30 PM
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    auction: state.auctions.auctionDetail,
  };
};
const composeAuctionDetail = compose(WrapperDrizzleComponent)(AuctionDetail);
export default connect(mapStateToProps)(composeAuctionDetail);

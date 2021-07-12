import moment from "moment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  Form,
} from "reactstrap";
import { compose } from "redux";
import WrapperAlertComponent from "../components/wrapper-alert.component";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import { GAS } from "../helper/constant";
import CustomHook from "../helper/hook";
function AuctionActionWithOwner({ auction, methods, itemId, owner }) {
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
function AuctionActionWithGuest({ auction, methods, itemId, owner, setAlert }) {
  const bid = async (data) => {
    try {
      await methods.bid(itemId, data.price).send({
        from: owner,
        gas: GAS,
      });
    } catch (error) {
      setAlert("danger", error.message);
    }
  };
  const { register, handleSubmit } = useForm();
  return (
    <CardFooter>
      <div className="button-container">
        {parseInt(auction.end_time) >= moment().unix() && (
          <Form
            className="d-flex align-items-center"
            onSubmit={handleSubmit(bid)}
          >
            <Input
              placeholder="Type the number of SPT"
              {...register("price", { required: true })}
            />
            <Button className="btn-icon" color="success" id="tooltip-bid">
              <i className="far fa-hand-paper"></i>
            </Button>
            <UncontrolledTooltip
              delay={0}
              target="tooltip-bid"
              placement="bottom"
            >
              Bid
            </UncontrolledTooltip>
          </Form>
        )}

        {parseInt(auction.end_time) < moment().unix() && (
          <React.Fragment>
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
          </React.Fragment>
        )}
      </div>
    </CardFooter>
  );
}
function AuctionDetail({ methods, owner, auction, events, setAlert }) {
  const history = useHistory();
  const { id } = useParams();
  const [logs, setLog] = useState([]);
  const { fetchAuctionDetail, updateAuctionDetail } = CustomHook();
  const goBack = () => {
    history.goBack();
  };
  const getAuctionDetail = async (id) => {
    const data = await methods.findAuctionById(id).call({ from: owner });
    fetchAuctionDetail(data);
  };
  React.useEffect(() => {
    getAuctionDetail(id);
    events.BecomeKing(
      {
        filter: { id: id },
      },
      (err, event) => {
        let object = {
          currentKing: event.returnValues.currentKing,
          price: event.returnValues.price,
          becomeAt: event.returnValues.becomeAt,
        };
        logs.push(object);
        setLog(logs);
        updateAuctionDetail(object);
      }
    );
  }, []);

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
                    <h5 className="title">Price {auction.price} SPT</h5>
                  </a>
                  <p className="description">{auction.name}</p>
                </div>
                <div className="card-description text-center">
                  {auction.description}
                </div>
              </CardBody>

              {auction.owner.toLowerCase() === owner.toLowerCase() && (
                <AuctionActionWithOwner
                  auction={auction}
                  methods={methods}
                  itemId={id}
                  owner={owner}
                  setAlert={setAlert}
                />
              )}

              {auction.owner.toLowerCase() !== owner.toLowerCase() && (
                <AuctionActionWithGuest
                  auction={auction}
                  methods={methods}
                  itemId={id}
                  owner={owner}
                  setAlert={setAlert}
                />
              )}
            </Card>
          </Col>
          <Col md={8}>
            <Card className="card-tasks">
              <CardHeader>
                <div>
                  Current king:{" "}
                  <span className="text-info">
                    {auction.currentKing.toLowerCase() === owner.toLowerCase()
                      ? "Me"
                      : auction.currentKing}
                  </span>
                </div>
                <div>
                  Start time{" "}
                  <span className="text-info">
                    {moment
                      .unix(auction.start_time)
                      .format("MMMM Do YYYY, h:mm:ss A")}
                  </span>{" "}
                  to{" "}
                  <span className="text-info">
                    {moment
                      .unix(auction.end_time)
                      .format("MMMM Do YYYY, h:mm:ss A")}
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      {logs.map((value, index) => {
                        return (
                          <tr>
                            <td>
                              <p className="title">Update the new king</p>
                              <p className="text-muted">
                                <span className="text-info">
                                  {value.currentKing}
                                </span>{" "}
                                become the king at{" "}
                                {moment
                                  .unix(value.becomeAt)
                                  .format("MM/DD/YYYY h:mm:ss A")}
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
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    auction: state.auctions.auctionDetail,
  };
};
const composeAuctionDetail = compose(
  WrapperDrizzleComponent,
  WrapperAlertComponent
)(AuctionDetail);
export default connect(mapStateToProps)(composeAuctionDetail);

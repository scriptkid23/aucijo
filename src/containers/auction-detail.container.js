import moment from "moment";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody, Col, Row, CardHeader, Table } from "reactstrap";
import { compose } from "redux";
import AuctionActionWithOwner from "../components/auction-action-with-owner.component";
import AuctionActionWithGuest from "../components/auction-action-with-guest.component";
import WrapperAlertComponent from "../components/wrapper-alert.component";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import CustomHook from "../helper/hook";
import _ from 'lodash';
import { convertSPT } from "../helper/utils";

function AuctionDetail({ methods, owner, auction, events, setAlert }) {
  const history = useHistory();
  const { id } = useParams();
  const [logs, setLog] = useState([]);
  const { fetchAuctionDetail, updateAuctionDetail } = CustomHook();
  const [item, setItem] = useState(null);
  const goBack = () => {
    history.goBack();
  };
  const getAuctionDetail = async (id) => {
    const data = await methods.findAuctionById(id).call({ from: owner });
    if(data){
      const itemDetail = await methods.findItemById(id).call({from: owner});
      setItem(Object.assign({},itemDetail));
      fetchAuctionDetail(data);
    }
    
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
        setLog(logs.reverse());
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
                    <h5 className="title">Price {convertSPT(auction.price)} SPT</h5>
                  </a>
                  <p className="description">{item && _.capitalize(item.name)}</p>
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
                <div>
                  Owner address: <span className="text-info">{item && item.owner}</span>
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

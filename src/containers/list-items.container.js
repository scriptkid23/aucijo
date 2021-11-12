import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Row, Col, Card,  CardBody } from "reactstrap";
import { compose } from "redux";
import CreateAuctionComponent from "../components/create-auction.component";
import NewItemComponent from "../components/new-item.component";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import CustomHook from "../helper/hook";

function ListItemsContainer({member, methods, owner, aucijoAddress, spimarketAddress, methodsMarket }) {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="content">
      <div className="d-flex align-items-center justify-content-between">
        <i
          className="tim-icons icon-minimal-left text-info pointer"
          onClick={goBack}
        />
        <NewItemComponent methods={methods} owner={owner} />
      </div>
      <div>
        <h5 className="title">
          Currently there are{" "}
          <span className="text-info">{member.items.length}</span> items
        </h5>
        <Row>
          {member.items.map((value, index) => {
            return (
              <Col md={3} key={value.id}>
                <Card>
                  <CardBody className="all-icons">
                    <div className="font-icon-detail">
                      <i className="tim-icons icon-tag" />
                      <p>
                        ID: {value.id}
                        <br />
                        {value.content}
                      </p>

                      <CreateAuctionComponent
                        data={value}
                        methods={methods}
                        owner={owner}
                        aucijoAddress = {aucijoAddress}
                        spimarketAddress = {spimarketAddress}
                        methodsMarket={methodsMarket}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    member: state.member,
  };
};
const componseListItemsContainer = compose(WrapperDrizzleComponent)(
  ListItemsContainer
);
export default connect(mapStateToProps)(componseListItemsContainer);

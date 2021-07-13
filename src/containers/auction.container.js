import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Col, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import { compose } from "redux";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
function AuctionContainer({ auctions }) {
  const history = useHistory();
  return (
    <div className="content">
      <Row>
        <Col md={12}>
          <Card>
            <CardHeader>
              <h5 className="title">
                Currently there are{" "}
                <span className="text-info">{auctions.length}</span> auction
                activities
              </h5>
            </CardHeader>
            <CardBody className="all-icons">
              <Row>
                {auctions
                  .sort((a, b) => b.id - a.id)
                  .map((value, index) => {
                    return (
                      value.status == 1 && (
                        <Col
                          className="font-icon-list col-xs-6 col-xs-6"
                          md="4"
                          key={value.id}
                        >
                          <div className="font-icon-detail">
                            <i className="tim-icons icon-tag" />
                            <p>
                              ID: {value.id}
                              <br />
                              {value.name}
                            </p>

                            <Button
                              onClick={() =>
                                history.push(`/home/auction/${value.id}`)
                              }
                            >
                              Join
                            </Button>
                          </div>
                        </Col>
                      )
                    );
                  })}
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
const componseAuctionContainer = compose(WrapperDrizzleComponent)(
  AuctionContainer
);
const mapStateToProps = (state) => {
  return {
    auctions: state.auctions.auctions,
  };
};
export default connect(mapStateToProps)(componseAuctionContainer);

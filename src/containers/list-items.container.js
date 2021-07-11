import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { compose } from "redux";
import NewItemComponent from "../components/new-item.component";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import WrapperLoadingComponent from "../components/wrapper-loading.component";
import CustomHook from "../helper/hook";

function ListItemsContainer({ setLoading, member, methods, owner, events }) {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  const { updateItem } = CustomHook();
  useEffect(() => {
    events.AddItem(
      {
        filter: { _from: owner },
      },
      (err, event) => {
        let newItem = {
          id: event.returnValues._id,
          name: event.returnValues._value,
          owner: event.returnValues._from,
        };
        updateItem(newItem);
      }
    );
  }, []);
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
                        {value.name}
                      </p>

                      <Button>Auction</Button>
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

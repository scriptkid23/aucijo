import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'

export default function MarketContainer() {
    return (
        <div className="content">
            <Row>
                <Col md={12}>
                    <Card>
                        <CardHeader>
                            <h5 className="title">
                                Welcome to the <span className="text-info">decentralized marketplace</span>
                            </h5>
                        </CardHeader>
                        <CardBody className="all-icons">
                            <Row>
                                <Col
                                    className="font-icon-list col-xs-6 col-xs-6"
                                    md="4"
                                >
                                    <div className="font-icon-detail">
                                        <i className="tim-icons icon-bag-16" />
                                        <p className="font-size-15 text-uppercase">Legion</p>
                                        <p className="mt-0 font-size-13 text-uppercase">25 SPT </p>
                                        <p>By Mechmaster</p>
                                        <Button>Buy</Button>
                                    </div>
                                </Col>
                              
                            </Row>
                           
                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

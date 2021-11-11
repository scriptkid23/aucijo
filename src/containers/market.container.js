import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import Wheel from '../components/Wheel'
export default function MarketContainer() {
    const [places, setPlaces] = React.useState(['Pizzas', 'Sandwiches', 'Salads', 'Soup', 'Japanese food', 'Pastas']);
    return (
        <div className="content d-flex vh-100">
            <Wheel items={places}/>
        </div>
    )
}

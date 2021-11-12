import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import Wheel from '../components/Wheel'
import { GameItem } from '../helper/constant'

export default function MarketContainer() {
    const timeOut = 4000;
    const onSelectItem = (data) => {
        setTimeout(() =>  alert(JSON.stringify(GameItem[data])),timeOut);
    }
    return (
        <div className="content d-flex vh-100">
            <Wheel items={GameItem} onSelectItem={onSelectItem}/>
        </div>
    )
}

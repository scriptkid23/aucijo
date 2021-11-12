import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { compose } from 'redux';
import Wheel from '../components/Wheel'
import WrapperDrizzleComponent from '../components/wrapper-drizzle.component';
import WrapperAlertComponent from '../components/wrapper-alert.component';
import { GameItem, GAS } from '../helper/constant'

function MarketContainer({methods, methodsMarket, eventsMarket , setAlert, owner}) {
    const timeOut = 4000;
    const [address, setAddress] = React.useState("");
    const [turn, setTurn] = React.useState(false);
    const onSelectItem = (data) => {
        setTimeout(() =>  award(JSON.stringify(GameItem[data])),timeOut);
    }
    React.useEffect(() => {
        try{
            getAddressMarket();
            getTurn();
            eventsMarket.AwardRecipient({filter: {recipient: owner}},
                (err, event) => {
                    if(!err){
                        setAlert("success","congratulations️ 🎉 you already own " + event.returnValues.tokenId);
                        setTurn(true);
                        addItem(event.returnValues.tokenId);
                    }
                    else{
                        setAlert("danger","error: " + err)
                    }
                })
        }
        catch(error){
            alert(error.message);
        }
       
    },[])
    const award = async(data) => {
        await methodsMarket.awardItem(data).send({from: owner, gas: GAS});
    }
    const addItem = async (_tokenId) => {
        const _address = localStorage.getItem("ADDRESS_MARKET");
        await methods.addItem(_tokenId, _address).send({from:owner, gas: GAS});
    }
    const getTurn = async() => {
        const turn = await methodsMarket.getWasSpin().call({from: owner });
        setTurn(turn);
    }
    const getAddressMarket = async() => {
        const address = await methodsMarket.getAddressContract().call({from: owner});
        localStorage.setItem("ADDRESS_MARKET",address);
        setAddress(address);
    }
    return (
        <div className="content d-flex vh-100">
            <p className="position-absolute">Market Address: <span className="text-info">{address}</span></p>
            <Wheel items={GameItem} onSelectItem={onSelectItem} turn={turn} setAlert={setAlert}/>
        </div>
    )
}
const composeMarketContainer  = compose(WrapperDrizzleComponent, WrapperAlertComponent )(MarketContainer);
export default composeMarketContainer;

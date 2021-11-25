import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Row } from 'reactstrap'
import { compose } from 'redux';
import Wheel from '../components/Wheel'
import WrapperDrizzleComponent from '../components/wrapper-drizzle.component';
import WrapperAlertComponent from '../components/wrapper-alert.component';
import { GameItem, GAS } from '../helper/constant'
import { shuffle } from '../helper/utils';

function MarketContainer({ methods, methodsMarket, eventsMarket, setAlert, owner, spiMarketAddress }) {
    const timeOut = 4000;
    const [turn, setTurn] = React.useState(false);
    const [items, setItems] = React.useState([]);
    const onSelectItem = (data) => {
        setTimeout(() => award(JSON.stringify(GameItem[data])), timeOut);
    }
    React.useLayoutEffect(() => {
        setItems(shuffle(GameItem));
    }, [])
    React.useEffect(() => {
        try {
            getTurn();
            eventsMarket.AwardRecipient({ filter: { recipient: owner } },
                (err, event) => {
                    if (!err) {
                        setAlert(
                            "success", "congratulations️ 🎉 you already own token with id: " +
                        event.returnValues.tokenId);
                        setTurn(true);
                    }
                    else {
                        setAlert("danger", "error: " + err)
                    }
                })
        }
        catch (error) {
            alert(error.message);
        }

    }, [])
    const award = async (data) => {
        await methodsMarket.awardItem(data).send({ from: owner, gas: GAS });
    }
    const getTurn = async () => {
        const turn = await methodsMarket.getWasSpin().call({ from: owner });
        setTurn(turn);
    }
    const copyAddress = () => {
        var copyText = document.getElementById("address-market");
        navigator.clipboard.writeText(copyText.textContent);
        setAlert("success", "Copied to clipboard")
    }
    return (
        <div className="content d-flex vh-100">
            <p className="position-absolute">Market Address: <span className="text-info pointer" id="address-market" onClick={copyAddress}>{spiMarketAddress}</span></p>
            <Wheel items={items} onSelectItem={onSelectItem} turn={turn} setAlert={setAlert} />
        </div>
    )
}
const composeMarketContainer = compose(WrapperDrizzleComponent, WrapperAlertComponent)(MarketContainer);
export default composeMarketContainer;

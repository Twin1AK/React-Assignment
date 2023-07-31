import { useEffect, useState } from 'react';
import { apiCall } from '../../services/apiCall';
import { BACKEND_URL } from '../../Shared/BackendUrls';
import Table from 'react-bootstrap/Table';
import Coin from './Coin';
import Labels from '../../Shared/Labels';

const PurchaseCoins = () => {

    const [skip, setSkip] = useState(false);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        
        const fetchCoins = async () => {
            let response = await apiCall(BACKEND_URL.GET_LIVE_COINS, 'GET');
            if (response.success) {
                const ratesArray = Object.entries(response.rates).slice(0, 10).map(([name, rate]) => ({
                    name,
                    rate,
                }));
                setCoins(ratesArray);
                console.log(ratesArray)
            }
        }
        if (!skip) {
            fetchCoins();
        }
        setSkip(true);
    },[skip])

    return (
        <>
            <div className="container-fluid">
                <div className="row p-3">
                    <div className="col-md-12 text-start">
                        <h1 className="mt-5">{ Labels.PurchaseCoins}</h1>
                    </div>
                </div>
                <div className="row p-3">
                    <div className="col-md-12">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>{Labels.CoinName}</th>
                                    <th>{Labels.CurrentRate} (USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    coins.map((coin) => {
                                        return <Coin key={coin?.name} coin={coin} isPurchase={true}></Coin>
                                    })
                                }

                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            
            
        </>
    );
}

export default PurchaseCoins;
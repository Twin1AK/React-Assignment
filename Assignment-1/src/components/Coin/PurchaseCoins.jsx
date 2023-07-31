import { useEffect, useState, useCallback } from 'react';
import { apiCall } from '../../services/apiCall';
import { BACKEND_URL } from '../../Shared/BackendUrls';
import Table from 'react-bootstrap/Table';
import Coin from './Coin';
import Labels from '../../Shared/Labels';
import Spinner from 'react-bootstrap/Spinner';
import '../../Shared/Styles/Coins.scss';

const PurchaseCoins = () => {

    const [coins, setCoins] = useState([]);
    const [loader, setLoader] = useState(true);

    const fetchCoins = useCallback(async () => {
        let response = await apiCall(BACKEND_URL.GET_LIVE_COINS, 'GET');
        if (response.success) {
            const ratesArray = Object.entries(response.rates).slice(0, 10).map(([name, rate]) => ({
                name,
                rate,
            }));
            setCoins(ratesArray);
            console.log(ratesArray)
        }
    },[setCoins]);
    useEffect(() => {
        const fetchData = async () => {
            await fetchCoins();
            setLoader(false);
        }
        fetchData();
    }, [fetchCoins]);

    return (
        <>
            {
                loader ? 
                <Spinner animation="grow" variant="dark" className="loader"
                        style={{ zIndex: 999, position: 'absolute', top: '50%', left: '50%' }} />
                    
                    :
                    coins.length === 0 ?
                        <div className="container-flui mt-5">
                            <div className="row">
                                <div className="col-md-12">
                                    <h3>Something Went Wrong</h3>
                                    <h4>Please try again later</h4>
                                </div>
                            </div>
                        </div>
                        
                        :
                    <div className="container-fluid">
                        <div className="row p-3">
                            <div className="col-md-12 text-start">
                                <h1 className="mt-5">{Labels.PurchaseCoins}</h1>
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

            }
           
            
        </>
    );
}

export default PurchaseCoins;
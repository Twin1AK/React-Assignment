import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback, useState} from 'react';
import Coin from '../components/Coin/Coin';
import Labels from '../Shared/Labels';
import { apiCall } from '../services/apiCall';
import { BACKEND_URL } from '../Shared/BackendUrls';
import { setCoins } from '../redux/Actions/coinsActions';
import React from 'react';

const CryptoCoinsPage = () => {

    const [userCoins, setUserCoins] = useState([]);
    let loggedInUser = useSelector(state => state.users.loggedInUser.loggedInUser) || null;
    if (!loggedInUser) {
        loggedInUser = {};
        loggedInUser['id'] = '';
    }
    let dispatch = useDispatch();
    const fetchCoinsRates = useCallback(async () => {
        try {
            const response = await apiCall(`${BACKEND_URL.GET_USER_COINS}?userId=${loggedInUser.id}`, "GET");
            setUserCoins(response.data);
            dispatch(setCoins(response.data));
        } catch (error) {
            console.error(error);
        }
    }, [setUserCoins, dispatch, loggedInUser.id]);
    useEffect(() => {
        const fetchData = async () => {
            await fetchCoinsRates();
        }
        fetchData();
    }, [fetchCoinsRates]);

  

   
    

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>{Labels.CoinName}</th>
                        <th>{Labels.CurrentRate} ({Labels.USD})</th>
                        <th>{Labels.TransferCoin}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userCoins.map((coin) => {
                            return <Coin key={coin?.name} coin={coin} ></Coin>
                        })
                    }

                </tbody>
            </Table>
            
        </>
    );
}

export default CryptoCoinsPage;
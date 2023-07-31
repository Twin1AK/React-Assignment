import Labels from "../../Shared/Labels";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setCoins, setSelectedCoin } from "../../redux/Actions/coinsActions";
import { apiCall } from "../../services/apiCall";
import { BACKEND_URL } from "../../Shared/BackendUrls";
import Toaster from "../Toaster";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Coin = ({coin, isPurchase}) => {

    const [toaster, setShowToaster] = useState(false);
    const [errorHeading, setErrorHeading] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.users.loggedInUser.loggedInUser);

    const transferCoin = () => {
        dispatch(setSelectedCoin(coin));
        navigate('/home/transfer');
    }
    const purchaseCoin = async () => {
        let response = await apiCall(BACKEND_URL.PURCHASE_COIN, 'POST',
            {
                coin: {
                    name: coin.name,
                    rate: coin.rate,
                    userId: loggedInUser.id
                }
            });
        if (response.success) {
            setErrorHeading(Labels.Success);
            setErrorMsg(Labels.CoinPurchasedSuccessfully);
            setShowToaster(true);
            dispatch(setCoins(response.updatedUserCoins));
        }
        else {
            setErrorHeading('Error');
            setErrorMsg(Labels.CoinAlreadyPurchased);
            setShowToaster(true)
        }
    }

    return (
        <>
            <tr >
                {
                    !isPurchase?
                <td><LazyLoadImage src={coin?.img}
                    width={50} height={50}
                    alt="Coin Img"
                        /></td>
                        : null
                }

                <td>{coin?.name}</td>
                <td>{coin?.rate}</td>
                <td>
                    <Button variant="outline-dark" className="action-btn"
                        onClick={isPurchase ? purchaseCoin : transferCoin}
                    >{isPurchase ? Labels.Purchase : Labels.Transfer}</Button>
                </td>
            </tr>

            {
                toaster ? <Toaster heading={errorHeading} message={errorMsg}
                    resetToaster={() => { setErrorMsg(''); setErrorHeading(''); setShowToaster(false); }}></Toaster>
                    : null
            }
        </>
    );
}

export default Coin;
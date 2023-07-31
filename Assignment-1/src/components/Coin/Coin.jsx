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
import Spinner from 'react-bootstrap/Spinner';
import '../../Shared/Styles/Coins.scss';

const Coin = ({coin, isPurchase}) => {

    const [toaster, setShowToaster] = useState(false);
    const [errorHeading, setErrorHeading] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.users.loggedInUser.loggedInUser);
    const [loader, setLoader] = useState(false);

    const transferCoin = () => {
        dispatch(setSelectedCoin(coin));
        navigate('/home/transfer');
    }
    const purchaseCoin = async () => {
        setLoader(true);
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
        setLoader(false);
    }

    return (
        <>
            {
                loader ? <Spinner animation="grow" variant="dark" className="loader"
                    style={{ zIndex: 999, position: 'absolute', top: '50%', left: '50%' }} />
                    :
                    <tr >
                        {
                            !isPurchase ?
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
            }
            

            {
                toaster ? <Toaster heading={errorHeading} message={errorMsg}
                    resetToaster={() => { setErrorMsg(''); setErrorHeading(''); setShowToaster(false); }}></Toaster>
                    : null
            }
        </>
    );
}

export default Coin;
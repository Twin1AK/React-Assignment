import Labels from "../../Shared/Labels";
import Button from 'react-bootstrap/Button';
import '../../Shared/Styles/Signup.scss';
import '../../Shared/Styles/Coins.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
import Toaster from "../Toaster";
import { apiCall } from '../../services/apiCall';
import { BACKEND_URL } from '../../Shared/BackendUrls';
import { setCoins } from '../../redux/Actions/coinsActions';
import ListComponent from '../../Shared/Components/List';
import React from 'react';

const CoinTransfer = () => {
    const [toaster, setShowToaster] = useState(false);
    const [errorHeading, setErrorHeading] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [selectedVal, setSelectedVal] = useState('');
    const [selectedAddress, setSelectedAddress] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [chains, setChains] = useState([]);

    const selectedCoin = useSelector(state => state.coins.selectedCoin.selectedCoin);
    const loggedInUser = useSelector(state => state.users.loggedInUser.loggedInUser);

    let dispatch = useDispatch();
    const fetchCoinChains = useCallback(async () => {
        try {
            const response = await apiCall(BACKEND_URL.GET_COINS, "GET");
            let cryptoArray = [];
            if (response) {
                 cryptoArray = Object.keys(response.crypto).slice(0, 30).map((key) => ({
                    id: key,
                    ...response.crypto[key],
                }));
            }

           setChains(cryptoArray);
        } catch (error) {
          
        }
    }, []);

    const fetchTransferAddress = useCallback(async () => {
        let response = await apiCall(BACKEND_URL.GET_TRANSFER_ADDRESSES, 'GET');
        if (response && response.success) {
            setAddresses(response.data);
        }
    }, [setAddresses])


    useEffect(() => {
        const fetchData = async () => {
            await fetchCoinChains();
        };
        fetchData();
    }, [fetchCoinChains]);


    useEffect(() => {
        fetchTransferAddress();
    }, [fetchTransferAddress]);
    

    
    

    const handleDropdownChange = (item) => {
        setSelectedVal(item);
    };
    const handleDropdownAddress = (item) => {
        setSelectedAddress(item);
    };
    const handleTransfer = async () => {
        if (selectedVal && selectedAddress) {
            let response = await apiCall(BACKEND_URL.TRANSFER_COIN, 'POST',
                {
                    senderId: loggedInUser.id,
                    receiverId: selectedAddress,
                    coin: selectedCoin
                })
            if (response && response.success) {
                dispatch(setCoins(response.updatedUserCoins));
                setErrorHeading(Labels.Success);
                setErrorMsg(response.message);
                setShowToaster(true);
            }
        }
        
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row p-5 mt-4 pb-1">
                    <div className="col-md-12  justify-content-center">
                        <div className="form-header row">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4>{Labels.TransferCoin} <b>{selectedCoin?.name}</b></h4>
                                        <h5>{Labels.CurrentRate} <b>{selectedCoin?.rate}</b></h5>
                                    </div>
                                    
                                </div>
                                
                            </div>
                            
                        </div>
                        
                        <div className="row justify-content-center">
                            <div className="col-md-5 p-3 coin-transfer-form-wrapper" >
                                    <div className="dropdownClass dropDownAbsolute">
                                        <ListComponent data={addresses.map(address => address.id)} view={'address'}
                                            handleDropdownAddress={(item) => handleDropdownAddress(item)}></ListComponent>
                                    </div>
                                    {/* <div className="errorMsg">
                                        {errors.address ? <div>{errors.address}</div> : null}
                                    </div> */}
                                    <div className="dropdownClass dropDownAbsolute mt-4rem">
                                        <ListComponent data={chains.map(chain => chain.name_full)} view={'chain'}
                                            handleDropdownChange={(item) => handleDropdownChange(item)}></ListComponent>
                                    </div>
                                    {/* <div className="errorMsg">
                                        {errors.chain ? <div>{errors.chain}</div> : null}
                                    </div> */}
                                   
                               
                            </div>

                        </div>

                        <div className="row">
                            <div className="col-md-6 zIndex99">
                                <div className="submitButton transferBtn mt-3">
                                    <Button variant="outline-dark" type="submit" size="lg" onClick={handleTransfer}
                                    >{Labels.Transfer}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                    
            </div>
            {
                toaster ? <Toaster heading={errorHeading} message={errorMsg}
                    resetToaster={() => { setErrorMsg(''); setErrorHeading(''); setShowToaster(false); }}></Toaster>
                    : null
            }
            
        </>
    );

}

export default CoinTransfer;
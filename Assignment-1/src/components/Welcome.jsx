import CryptoCoinsPage from '../pages/CryptoCoinsPage';
import Labels from '../Shared/Labels';
import '../Shared/Styles/Home.scss';
import { Link } from 'react-router-dom'
import React from 'react';


const  Welcome = () => {
    
    return (
        <>
            <div className="container-fluid pt-5 m-0 mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="text-wrapper">
                            <div className="row p-2">
                                <div className="text-dark header col-md-6 text-start">
                                    <h1>{Labels.PurchasedCryptoCoins}</h1>
                                </div>
                                <div className="col-md-6 text-end">
                                    <Link to="/home/purchase" className="navItem">{Labels.PurchaseCoins}</Link>
                                </div>
                            </div>
                            <div className="row p-3" data-testid="crypto-coins-page">
                                <div className="col-md-12">
                                    <CryptoCoinsPage ></CryptoCoinsPage>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                   
                </div>
            </div>
        </>
    );
}
export default Welcome;
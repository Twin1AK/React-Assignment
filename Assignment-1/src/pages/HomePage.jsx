// import Footer from '../components/Footer';
import NavbarComp from '../components/Navbar';
import '../Shared/Styles/Home.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AboutUsPage from './AboutUsPage';
import Welcome from '../components/Welcome';
import { useEffect } from 'react';
import BlogsPage from './BlogsPage';
import CoinTransfer from '../components/Coin/CoinTransfer';
import PurchaseCoins from '../components/Coin/PurchaseCoins';
import ProtectedRoutes from '../Shared/Components/ProtectedRoutes';

function HomePage() {
    let navigate = useNavigate();

    useEffect(() => {
        if (!(localStorage.getItem('isLoggedIn')) || (localStorage.getItem('isLoggedIn') === 'false')) {
            navigate('/signup');
        }
    });
    
    return (
        <>
           <NavbarComp />
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Welcome />}></Route>
                    <Route path="/aboutUs"  element={<AboutUsPage/>} ></Route>
                    <Route path="/blogs" element={<BlogsPage/>}></Route>
                    <Route path="/transfer" element={<CoinTransfer/>}></Route>
                    <Route path="/purchase" element={<PurchaseCoins/>}></Route>
                </Route>

            </Routes>
            {/* <Footer/> */}
        </>
        
    );
}
export default HomePage;
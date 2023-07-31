import Footer from '../components/Footer';
import NavbarComp from '../components/Navbar';
import '../Shared/Styles/Home.scss';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AboutUsPage from './AboutUsPage';
import Welcome from '../components/Welcome';
import { useState, useEffect } from 'react';
import BlogsPage from './BlogsPage';

function HomePage() {
    let navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        console.log(localStorage.getItem('isLoggedIn'))
        if (!(localStorage.getItem('isLoggedIn')) || (localStorage.getItem('isLoggedIn') === 'false')) {
            navigate('/signup');
            
		}
    });
    return (
        <>
           <NavbarComp />
			<Routes>
				<Route path="/" element={<Welcome/>}></Route>
                <Route path="/aboutUs" element={ <AboutUsPage/>}></Route>
                <Route path="/blogs" element={ <BlogsPage/>}></Route>
            </Routes>
            {/* <Footer/> */}
        </>
        
    );
}
export default HomePage;
import { useState, useEffect } from 'react';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Labels from '../Shared/Labels';
import '../Shared/Styles/Signup.scss';
import { useNavigate } from "react-router-dom";

function SignUpPage() {

    let navigate = useNavigate();
    const [view, setView] = useState('login');
    useEffect(() => {
        if ((localStorage.getItem('isLoggedIn') === 'true')) {
            navigate('/home');
        }
    });
    return (
        view === 'login' ?
            <div className="container-fluid" style={{ backgroundImage: "url(/imgs/signupbg.jpg)", backgroundSize: 'cover', height: '100vh' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <Login switchFormHandler={ () => {setView('signup')}}></Login>
                        </div>
                    </div>
                </div>
            </div>
            
            :
            <div className="container-fluid" style={{ backgroundImage: "url(/imgs/signupbg.jpg)", backgroundSize: 'cover', height: '100vh' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <SignUp switchFormHandler={ () => {setView('login')}}></SignUp>
                        </div>
                    </div>
                </div>
            </div>
    );
}
export default SignUpPage;
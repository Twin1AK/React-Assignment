import Labels from "../Shared/Labels";
import { ErrorMessage, useFormik } from 'formik';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../Shared/Styles/Signup.scss';
// import jwt from 'jsonwebtoken';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Toaster from "./Toaster";

const Login = (props) => {
    let navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [toaster, setShowToaster] = useState(false);
    const [errorHeading, setErrorHeading] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') && localStorage.getItem('isLoggedIn') === 'true') {
            navigate('/home');
        }
    });
    
    const validate = values => {
        const errors = {};
        if (!values.password) {
            errors.password = Labels.FieldRequired;
        } else if (values.password.length < 8) {
            errors.password = 'Password should be 8 characters long';
        }
        if (!values.email) {
            errors.email = Labels.FieldRequired;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        return errors;
    };
    
    const {values, errors, handleBlur, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: values => {
            console.log(values);
            authenticateUser(values);
        },
    });

    function authenticateUser(userInfo) {
        let savedUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        setUsers(savedUsers);
        console.log('users while validation => ' ,users);
        let response = getUser(userInfo, savedUsers);
        if (response.isUserExists) {
            response.userInfo.loginAttempts++;
            updateUserLoginAttempts(userInfo, response.userInfo.loginAttempts, savedUsers, false);
            if ((loginAttemptsExpired(response.userInfo) === false)) {
                if (!response.userInfo.isBlocked) {
                    if ((response.userInfo.email === userInfo.email) && (response.userInfo.password === userInfo.password)) {
                        setLoginSuccess(true);
                        setErrorHeading('Success');
                        setErrorMsg(`Logged in successfully!`);
                        setShowToaster(true);
                        localStorage.setItem('isLoggedIn', 'true');
                        updateUserLoginAttempts(response.userInfo, 0, savedUsers, true);
                        setTimeout(() => {
                            navigate("/home")                            
                        }, 5000);
                    }
                    else {
                        setErrorHeading('Error');
                        setErrorMsg('Invalid Username or password!');
                        setShowToaster(true);
                    }
                }
                else {
                    blockUser();
                    setErrorHeading('User Blocked');
                    setErrorMsg(`This account ${userInfo.email} is Blocked!`);
                    setShowToaster(true);
                    setLoginSuccess(false);
                    localStorage.setItem('isLoggedIn', 'false');
                } 
            }
        }
        else {
             setErrorHeading('Error');
            setErrorMsg('Invalid Username or password!');
            setShowToaster(true);
        }
        resetForm();
    }
    function getUser(userInfo, savedUsers) {
        let isUserExists = false;
        if (savedUsers) {
            savedUsers.forEach(user => {
                if (user.email === userInfo.email) {
                    userInfo = user;
                    isUserExists = true;
                }
            })
        }
        return { userInfo: userInfo ? userInfo: null, isUserExists };
    }

    function loginAttemptsExpired(userInfo){
        if (userInfo.loginAttempts >= 3) {
            setErrorHeading('User Blocked');
            setErrorMsg(`This account ${userInfo.email} is Blocked!`);
            setShowToaster(true);
            return true;
        }
        return false;
    }

    function blockUser(userInfo, savedUsers) {
        let index = savedUsers.findIndex(i => i.email === userInfo.email);
        if (index && index !== -1) {
            savedUsers[index]['isBlocked'] = true;
            localStorage.setItem('users', JSON.stringify(savedUsers));
        }
    }

    function updateUserLoginAttempts(userInfo, loginAttempts, savedUsers, isReset) {
        let index = savedUsers.findIndex(i => i.email === userInfo.email);
        if (index !== -1) {
            if (isReset) {
                savedUsers[index]['loginAttempts'] = 0;
            }
            else {
                savedUsers[index]['loginAttempts'] = loginAttempts;
            }
             localStorage.setItem('users', JSON.stringify(savedUsers));
        }
    }
    
   
    return (
        <>
            {
                toaster ? <Toaster heading={errorHeading} message={errorMsg}
                    resetToaster={() => { setErrorMsg(''); setErrorHeading(''); setShowToaster(false);}}></Toaster>
                : null
            }
            <div className="container-fluid">
                <div className="row p-5 mt-4 pb-1">
                    <div className="col-md-12  justify-content-center">
                        <div className="form-header row">
                            <h1>{Labels.Login}</h1>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-5 p-3" style={{border: '1px solid grey'}}>
                                <form onSubmit={handleSubmit}>
                                    <FloatingLabel
                                        controlId="email"
                                        label="Email Address"
                                        className="mb-3"
                                        
                                    >
                                        <Form.Control type="email" placeholder="john@example.com"
                                            name ="email"
                                            onChange={handleChange}
                                            value={values.email}
                                            onBlur={handleBlur}
                                        />
                                    </FloatingLabel>
                                    <div className="errorMsg">
                                        {errors.email ? <div>{errors.email}</div> : null}
                                    </div>
                                    <FloatingLabel
                                        controlId="password"
                                        label="Password"
                                        className="mb-3"
                                    >
                                        <Form.Control type="password" placeholder="********"
                                            name ="password"
                                            onChange={handleChange}
                                            value={values.password}
                                            onBlur={handleBlur}
                                        />
                                    </FloatingLabel>
                                    <div className="errorMsg">
                                        {errors.password  ? <div>{errors.password}</div> : null}
                                    </div>

                                    <div className="submitButton">
                                        <Button variant="outline-dark" type="submit" size="lg"
                                            >Login</Button>
                                    </div>
                                    {props.switchFormHandler}
                                    {props.view}
                                    <span className="text-dark">{Labels.NoAccount} <a onClick={props.switchFormHandler} className="navLink">{Labels.SignUp}</a></span>

                                </form>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            
        </>
    );
}
export default Login;
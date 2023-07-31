import Labels from "../Shared/Labels";
import { useFormik } from 'formik';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../Shared/Styles/Signup.scss';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Toaster from "./Toaster";
import { apiCall } from "../services/apiCall";
import { BACKEND_URL } from "../Shared/BackendUrls";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../redux/Actions/usersActions";
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import '../Shared/Styles/Coins.scss';

const Login = (props) => {
    let dispatch = useDispatch()
    let navigate = useNavigate();
    const [toaster, setShowToaster] = useState(false);
    const [errorHeading, setErrorHeading] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loader, setLoader] = useState(false);


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

    async function authenticateUser(userInfo) {
        setLoader(true);
        let response = await apiCall(BACKEND_URL.LOGIN, 'POST', {user: userInfo});
        if (response.success) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('token', response.token);
            dispatch(setLoggedInUser(response.user));
            navigate('/home')
        }
        else {
            setErrorHeading('Error');
            setErrorMsg(response?.msg || 'Something went wrong');
            setShowToaster(true);
        }
        resetForm();
        setLoader(false);
    }
   
    return (
        <>
            {
                toaster ? <Toaster heading={errorHeading} message={errorMsg}
                    resetToaster={() => { setErrorMsg(''); setErrorHeading(''); setShowToaster(false);}}></Toaster>
                : null
            }
            {
                loader ?
                    <Spinner animation="grow" variant="dark" className="loader"
                        style={{ zIndex: 999, position: 'absolute', top: '50%', left: '50%' }} />
                    :
                    <div className="container-fluid">
                        <div className="row p-5 mt-4 pb-1">
                            <div className="col-md-12  justify-content-center">
                                <div className="form-header row">
                                    <h1>{Labels.Login}</h1>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-5 p-3" style={{ border: '1px solid grey' }}>
                                        <form onSubmit={handleSubmit}>
                                            <FloatingLabel
                                                controlId="email"
                                                label="Email Address"
                                                className="mb-3"

                                            >
                                                <Form.Control type="email" placeholder="john@example.com"
                                                    name="email"
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
                                                    name="password"
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    onBlur={handleBlur}
                                                />
                                            </FloatingLabel>
                                            <div className="errorMsg">
                                                {errors.password ? <div>{errors.password}</div> : null}
                                            </div>

                                            <div className="submitButton">
                                                <Button variant="outline-dark" type="submit" size="lg"
                                                >Login</Button>
                                            </div>
                                            {props.switchFormHandler}
                                            {props.view}
                                            <span className="text-dark">{Labels.NoAccount} <span onClick={props.switchFormHandler} className="navLink">{Labels.SignUp}</span></span>

                                        </form>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
            }
            
            
        </>
    );
}
export default Login;
import Labels from "../Shared/Labels";
import { useFormik } from 'formik';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../Shared/Styles/Signup.scss';
import { useState } from 'react';
import Toaster from "./Toaster";
import { apiCall } from '../services/apiCall';
import { BACKEND_URL } from "../Shared/BackendUrls";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../redux/Actions/usersActions";
import Spinner from 'react-bootstrap/Spinner';
import '../Shared/Styles/Coins.scss';

const SignUp = (props) => {
    const [loader, setLoader] = useState(false);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const [invalidUser, setInvalidUser] = useState(false);
    const [selectedFile, setSelectedFile] = useState('null');
    const [toaster, setShowToaster] = useState(false);
    const [errorHeading, setErrorHeading] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const handleFileSubmit = (e) => {
        setSelectedFile(e.target.files[0])
    }
    const validate = values => {
        let upperCase = /[A-Z]/g;
        let numbers = /[0-9]/g;
        const errors = {};
        if (!values.name) {
            errors.name = Labels.FieldRequired;
        } else if (values.name.length > 15) {
            errors.name = 'Must be 15 characters or less';
        }
        if (!values.password) {
            errors.password = Labels.FieldRequired;
        } else if (values.password.length < 8) {
            errors.password = 'Password should be 8 characters long';
        } else if (!values.password.match(upperCase)) {
            errors.password = 'Password must contain at least one Upper case letter';
        } else if (!values.password.match(numbers)) {
            errors.password = 'Password must contain at least one digit';
        }
        
        if (!values.email) {
            errors.email = Labels.FieldRequired;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.homeAddress) {
            errors.homeAddress = Labels.FieldRequired
        }
        // if (!values.cnic) {
        //     errors.cnic = Labels.FieldRequired
        // }
        return errors;
    };
    
    const {values, errors, handleBlur, handleChange, handleSubmit, resetForm} = useFormik({
        initialValues: {
        email: '', name: '', homeAddress: '', cnic: '', password: ''
            },
       validate,
        onSubmit: values => {
            console.log(values);
            values.cnic = selectedFile?.name;
            let userInfo = values;
            userInfo['isBlocked'] = false;
            userInfo['loginAttempts'] = 0;
            // userInfo['id'] = uuid.v4();
            addUser(values);
            resetForm();
        },
    });

    async function addUser(userInfo) {
        setLoader(true);
        setInvalidUser(false);
        let savedUsers = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
        if (savedUsers) {
            savedUsers.push(userInfo);
            localStorage.setItem('users', JSON.stringify(savedUsers));
            const response = await apiCall(BACKEND_URL.ADD_USER, "POST", { user: userInfo });
            console.log(response);
            if (response?.success) {
                setLoader(false)
                setTimeout(() => {
                    setErrorHeading('Success');
                    setErrorMsg(`Account created successfully!`);
                    setShowToaster(true);
                    localStorage.setItem('token', response?.token);
                    localStorage.setItem('isLoggedIn', "true");
                    dispatch(setLoggedInUser(response.user));
                    navigate('/home')
                }, 100);
            }
            else{
                setInvalidUser(true)
            }
        }
    }


    return (
        <>
            {
                loader ? <Spinner animation="grow" variant="dark" className="loader"
                    style={{ zIndex: 999, position: 'absolute', top: '50%', left: '50%' }} /> :
                    <div className="container-fluid">
                        <div className="row p-5 mt-4 pb-1">
                            <div className="col-md-12  justify-content-center">
                                <div className="form-header row">
                                    <h1>{Labels.SignUp}</h1>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-md-5 p-3" style={{ border: '1px solid grey' }}>
                                        <form onSubmit={handleSubmit}>
                                            <FloatingLabel
                                                controlId="floatingInput"
                                                label="Name"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" placeholder="John"
                                                    name="name"
                                                    onChange={handleChange}
                                                    value={values.name}
                                                    onBlur={handleBlur}
                                                />
                                            </FloatingLabel>
                                            <div className="errorMsg">
                                                {errors.name ? <div>{errors.name}</div> : null}
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
                                                controlId="homeAddress"
                                                label="Home Address"
                                                className="mb-3"
                                            >
                                                <Form.Control type="text" placeholder="Street 1, House 9, California"
                                                    as="textarea" rows={3} name="homeAddress"
                                                    onChange={handleChange}
                                                    value={values.homeAddress}
                                                    onBlur={handleBlur}
                                                />
                                            </FloatingLabel>
                                            <div className="errorMsg">
                                                {errors.homeAddress ? <div>{errors.homeAddress}</div> : null}
                                            </div>

                                            <Form.Group controlId="formFile" className="mb-3">
                                                <Form.Control type="file" onChange={handleFileSubmit}
                                                    name="file"
                                                    onBlur={handleBlur}
                                                />
                                            </Form.Group>
                                            <div className="errorMsg">
                                                {errors.cnic ? <div>{errors.cnic}</div> : null}
                                                {invalidUser ? <span className="errorMsg">{Labels.UserAlreadyExists}</span> : null}
                                            </div>

                                            <div className="submitButton">
                                                <Button variant="outline-dark" type="submit" size="lg"
                                                >Submit</Button>
                                            </div>
                                            <span>{Labels.AlreadyAccount}<span onClick={props.switchFormHandler} className="navLink">{Labels.Login}</span></span>

                                        </form>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

            }
            {
                toaster ? <Toaster heading={errorHeading} message={errorMsg}
                    resetToaster={() => { setErrorMsg(''); setErrorHeading(''); setShowToaster(false);}}></Toaster>
                : null
            }
            {

            }
          
        </>
    );
}
export default SignUp;
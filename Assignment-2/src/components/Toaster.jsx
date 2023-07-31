import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const Toaster = (props) => {
    const [showToast, setToastShow] = useState(true);
    const toggleToaster = () => {
        setToastShow(!showToast);
        props.resetToaster();
    };


    return (
        <>
            <ToastContainer position="top-center" className="p-3">
                <Toast show={showToast} onClose={toggleToaster} >
                    <Toast.Header className={props.heading === 'Success' ? 'bg-success': 'bg-danger'}>
                        <strong className="me-auto text-white">{props.heading}</strong>
                    </Toast.Header>
                    <Toast.Body className={props.heading === 'Success' ? 'text-bold text-dark' : 'text-bold text-danger'}>{props.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        
        </>
    );
}


export default Toaster;
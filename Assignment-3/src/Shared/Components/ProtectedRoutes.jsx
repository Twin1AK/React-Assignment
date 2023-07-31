import React from 'react';
import { Navigate, Outlet  } from 'react-router-dom';

const ProtectedRoute = () => {
    
    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        return token !== null && token !== undefined;
    };
    return (isAuthenticated ? <Outlet /> : <Navigate to="/signup" />);
};

export default ProtectedRoute;
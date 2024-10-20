// src/components/PrivateRoute.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; 
import Cookies from 'js-cookie'; 

const PrivateRoute = ({ children }) => {
    const { isAuthenticated, login } = useAuth(); 

    useEffect(() => {
        const sessionId = Cookies.get('sessionId'); 
        if (sessionId) {
            login(); // If sessionId exists, set isAuthenticated to true
        }
    }, [login]);

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

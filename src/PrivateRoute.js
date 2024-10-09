// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Get the authentication state from context

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;

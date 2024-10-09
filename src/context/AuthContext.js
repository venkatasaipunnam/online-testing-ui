// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the AuthContext
export const AuthContext = createContext(); // Exporting AuthContext

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

    const login = () => {
        setIsAuthenticated(true); // Set authentication state to true
    };

    const logout = () => {
        setIsAuthenticated(false); // Set authentication state to false
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext); // Return the context value
};

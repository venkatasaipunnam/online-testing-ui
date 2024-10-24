// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext(); 

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

    const login = () => {
        setIsAuthenticated(true); 
    };

    const logout = () => {
        setIsAuthenticated(false); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext); 
};

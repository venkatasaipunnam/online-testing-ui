import React, { createContext, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, doLogout } from '../redux/reducers/UserReducers';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const isUserAuthenticated = useSelector((state) => state.user.value.isUserAuthenticated);

    const login = (userData) => {

        dispatch(saveUser(userData));

        if (userData?.data?.isTempPassword) {
            navigate('/change-password');
        } else {
            navigate('/home');
        }

    };

    const logout = () => {
        dispatch(doLogout());
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: isUserAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext); 
};

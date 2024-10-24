// src/services/AuthService.js
import axios from 'axios';
import Cookies from 'js-cookie'; 
const API_URL = 'http://ec2-18-232-117-108.compute-1.amazonaws.com:8090/login'; 

export const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL, {
            username: email,        // Use the email as username
            emailId: email,         
            password: password,      
            isLoginByEmail: true     
        });
        
        // Store session ID in cookies with 1 day expiration
        const sessionId = response.data.session.sessionId; 
        Cookies.set('sessionId', sessionId, { expires: 1 }); 
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed'); 
    }
};

// src/services/AuthService.js
// export const login = async (email, password) => {
//     // Simulating a dummy API call
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (email === "test@example.com" && password === "password123") {
//                 resolve({ message: "Login successful" });
//             } else {
//                 reject({ message: "Invalid email or password" });
//             }
//         }, 1000);
//     });
// };


import axios from 'axios';

const API_URL = 'https://reqres.in/api/login'; // Replace with your actual API URL

export const login = async (email, password) => {
    try {
        const response = await axios.post(API_URL, {
            username: email, //eve.holt@reqres.in
            password: password, //pistol
            expiresInMins: 30, // optional, defaults to 60
        }, {
           // withCredentials: true 
        });
        
        return response.data; // Return the response data
    } catch (error) {
        // Handle error appropriately
        throw new Error(error.response?.data?.message || 'Login failed'); // Provide a fallback error message
    }
};

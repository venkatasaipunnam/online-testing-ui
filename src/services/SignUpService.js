// src/services/SignUpService.js
import axios from 'axios';

// Define the API endpoint
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response status indicates success
    if (response.status >= 200 && response.status < 300) {
      return response.data; // Return the response data on success
    } else {
      // Handle unexpected status codes (like 4xx or 5xx)
      throw new Error('Registration failed: ' + response.statusText);
    }
  } catch (error) {
    // Handle network or other errors
    throw new Error(error.response ? error.response.data : 'Registration failed');
  }
};

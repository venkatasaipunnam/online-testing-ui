import axios from 'axios';

// Define the API endpoint
const API_URL = 'http://ec2-18-232-117-108.compute-1.amazonaws.com:8090/signup';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response status indicates success
    if (response.status >= 200 && response.status < 300) {
      return response.data; 
    } else {
      throw new Error('Registration failed: ' + response.statusText);
    }
  } catch (error) {
    throw new Error(error.response ? error.response.data : 'Registration failed');
  }
};

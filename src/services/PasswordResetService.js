// src/services/PasswordResetService.js
import axios from 'axios';

// Function to request a password reset email
export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.get('http://ec2-18-232-117-108.compute-1.amazonaws.com:8090/forgetpassword', {
      params: { emailId: email }, // Send the email as a query parameter with the key 'emailId'
    });

    if (response.data) {
      return true; // Return true if the response is successful
    } else {
      throw new Error('Failed to send reset email');
    }
  } catch (error) {
    throw new Error('Failed to send reset email');
  }
};

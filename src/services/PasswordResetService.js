// passwordResetService.js
import axios from 'axios';

// Function to request a password reset email
export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post('https://reqres.in/api/users', { email }); // Using dummy API
    return response.data;
  } catch (error) {
    throw new Error('Failed to send reset email');
  }
};

// Function to confirm the new password using a token
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post('https://reqres.in/api/users', { token, newPassword }); // Using dummy API
    return response.data;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

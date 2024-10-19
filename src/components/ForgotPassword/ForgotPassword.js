// src/components/ForgotPassword/ForgotPassword.js

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { requestPasswordReset } from '../../services/PasswordResetService';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ForgotPassword.css'; // Import your CSS

const ForgotPassword = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const result = await requestPasswordReset(values.email);  //backend returns boolean
        if (result) { // Check if result is true
          toast.success('Password reset email sent!');

          setTimeout(()=>{
            toast.info('Redirecting to login page');
          }, 1000);

          setTimeout(() => {
            navigate('/login'); 
          }, 2000);
          
        } else {
          toast.error('Failed to send reset email');
        }
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="container">
      <h2>Forgot Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Enter your email"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="error-message">{formik.errors.email}</div>
        )}
        <button type="submit" disabled={formik.isSubmitting}>
          Send Password Reset Email
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;

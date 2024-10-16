// src/components/ForgotPassword/ForgotPassword.js

import React from 'react';
import './ForgotPassword.css'; // Import your CSS
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { requestPasswordReset } from '../../services/PasswordResetService'; // Use new service file
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await requestPasswordReset(values.email); // Use the new service function
        toast.success('Password reset email sent!');
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

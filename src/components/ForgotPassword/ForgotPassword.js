import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { requestPasswordReset } from '../../services/PasswordResetService'; // Use new service file
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await requestPasswordReset(values.email);  // Use the new service function
        toast.success('Password reset email sent!');
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          placeholder="Enter your email"
        />
        {formik.errors.email && formik.touched.email && (
          <div>{formik.errors.email}</div>
        )}
        <button type="submit">Send Password Reset Email</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;

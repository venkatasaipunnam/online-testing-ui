import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/PasswordResetService'; // Import your service function
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from 'yup'; // Import Yup
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import Formik components
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate(); // Use navigate to redirect the user after password reset

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Call the reset password service and pass the token and new password
      await resetPassword(token, values.password);
      toast.success('Password reset successful! Redirecting to login...');
      
      // Redirect the user to the login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3 second delay for user to see success message

    } catch (error) {
      toast.error(error.message); // Display error message if any issues occur
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <Formik
        initialValues={{ password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <div>
              <label htmlFor="password">New Password:</label>
              <Field type="password" name="password" placeholder="Enter new password" />
              <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <Field type="password" name="confirmPassword" placeholder="Confirm new password" />
              <ErrorMessage name="confirmPassword" component="div" style={{ color: 'red' }} />
            </div>
            {/* Enable the button only if passwords match and form is not submitting */}
            <button type="submit" disabled={isSubmitting || values.password !== values.confirmPassword}>
              Reset Password
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;

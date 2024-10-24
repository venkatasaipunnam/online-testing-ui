import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './SignUp.css'; // Import the CSS file
import { registerUser } from '../../services/SignUpService'; // Import the updated service function
import { ToastContainer, toast } from 'react-toastify'; // Import React-Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const SignUp = () => {
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
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
    termsAccepted: Yup.bool().oneOf([true], 'Terms and Conditions must be accepted'),
  });

  // Form setup with react-hook-form and Yup
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onBlur', // Trigger validation on blur
    reValidateMode: 'onChange', // Re-validate on input change
  });

  const email = watch('email'); // Watch email field to derive username

  const onSubmit = async (data) => {
    console.log('Form data:', data); // Debugging log
    try {
      // Deriving username from email
      const username = data.email.split('@')[0];

      const result = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        emailId: data.email, // Match with the expected field name in the backend
        userName: username,
        userType: 'STUDENT', // Replace with the actual user type if needed
        createPassword: data.password,
        confirmPassword: data.confirmPassword,
      });
      console.log('Registration success:', result);
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error.message);
      toast.error('There was an error with the registration');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <h2>Register</h2>

      <div className="name-container">
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input id="firstName" type="text" {...register('firstName')} />
          {errors.firstName && <span className="error">{errors.firstName.message}</span>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input id="lastName" type="text" {...register('lastName')} />
          {errors.lastName && <span className="error">{errors.lastName.message}</span>}
        </div>
      </div>

      <label htmlFor="email">Email:</label>
      <input id="email" type="email" {...register('email')} />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <label htmlFor="password">Password:</label>
      <input id="password" type="password" {...register('password')} />
      {errors.password && <span className="error">{errors.password.message}</span>}

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input id="confirmPassword" type="password" {...register('confirmPassword')} />
      {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

      <div className="terms-container">
        <input className="terms-checkbox" type="checkbox" {...register('termsAccepted')} />
        <label className="terms-label">
          I accept the Terms and Conditions
        </label>
        {errors.termsAccepted && <span className="error">{errors.termsAccepted.message}</span>}
      </div>

      <button type="submit">Sign Up</button>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </form>
  );
};

export default SignUp;

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './SignUp.css'; // Import the CSS file
import { registerUser } from '../../services/SignUpService'; // Import the updated service function
import { ToastContainer, toast } from 'react-toastify'; // Import React-Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const SignUp = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
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
    termsAccepted: Yup.bool()
      .oneOf([true], 'Terms and Conditions must be accepted'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const result = await registerUser({
        email: data.email,
        username: data.username,
        password: data.password,
        termsAccepted: data.termsAccepted,
      });
      console.log('Registration success:', result);
      toast.success('Registration successful!'); // Display success toast
    } catch (error) {
      console.error('Registration error:', error.message);
      toast.error('There was an error with the registration'); // Display error toast
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="signup-form">
      <h2>Register</h2>

      <label>Email:</label>
      <input type="email" {...register('email')} />
      {errors.email && <span className="error">{errors.email.message}</span>}

      <label>Username:</label>
      <input type="text" {...register('username')} />
      {errors.username && <span className="error">{errors.username.message}</span>}

      <label>Password:</label>
      <input type="password" {...register('password')} />
      {errors.password && <span className="error">{errors.password.message}</span>}

      <label>Confirm Password:</label>
      <input type="password" {...register('confirmPassword')} />
      {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}

      <label>
        <input type="checkbox" {...register('termsAccepted')} />
        I accept the Terms and Conditions
      </label>
      {errors.termsAccepted && <span className="error">{errors.termsAccepted.message}</span>}

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

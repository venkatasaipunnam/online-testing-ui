// src/components/Login.js
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Login.css';
import { login } from '../../services/AuthService'; // Adjust the import path as necessary
import { AuthContext } from '../../context/AuthContext'; 
import Cookies from 'js-cookie'; // Import js-cookie to manage cookies

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    // Check if sessionId exists in cookies and redirect to home if so
    useEffect(() => {
        const sessionId = Cookies.get('sessionId'); // Get sessionId from cookies
        if (sessionId) {
            navigate('/home'); // If sessionId exists, redirect to home page
        }
    }, [navigate]); // Run this effect only when the component mounts

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            //.min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const { email, password } = values; // Destructure values for better readability

        setLoading(true);
        setError(''); // Reset error state
    
        try {
            const response = await login(email, password); // Call the login function from AuthService
            if (response && response.session) {
                // Store the session ID in cookies
                Cookies.set('sessionId', response.session.sessionId, { expires: 1 }); // Expires in 1 day
                navigate('/home'); // Redirect to home page on successful login
            } else {
                console.log("Login successful, but no session data returned"); 
            }
        } catch (err) {
            console.error(err); // Log the error for debugging
            setError(err.response?.data?.message || 'Login failed. Please try again.'); // Show error if login fails
        } finally {
            setLoading(false); // Reset loading state
            setSubmitting(false); // Reset submitting state for Formik
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>} {/* Show error message if exists */}
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <div className="input-group">
                                <i className="fas fa-envelope"></i>
                                <Field type="text" id="email" name="email" placeholder="your@email.com" />
                            </div>
                            <ErrorMessage name="email" component="p" className="error" />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <Field type="password" id="password" name="password" placeholder="Your Password" />
                            </div>
                            <ErrorMessage name="password" component="p" className="error" />
                        </div>
                        <button type="submit" disabled={loading || isSubmitting}>
                            {loading ? 'Loading...' : 'Login'} {/* Show loading text if in loading state */}
                        </button>
                    </Form>
                )}
            </Formik>
            <p className="forgot-password">
                <a href="#">Forgot Password?</a>
            </p>
        </div>
    );
};

export default Login;

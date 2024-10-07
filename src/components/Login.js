// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        setError('');

        if (!email && touchedEmail) {
            return 'Please enter your email.';
        }

        if (!password && touchedPassword) {
            return 'Please enter your password.';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailPattern.test(email) && touchedEmail) {
            return 'Please enter a valid email address.';
        }

        if (password && password.length < 8 && touchedPassword) {
            return 'Password must be at least 8 characters long.';
        }

        return null; // No errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return; // Stop the submission process
        }

        navigate('/home'); // Redirect to home page on successful login
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <div className="input-group">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => setTouchedEmail(true)}
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    {touchedEmail && !email && (
                        <p className="error">Please enter your email.</p>
                    )}
                    {touchedEmail && email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                        <p className="error">Please enter a valid email address.</p>
                    )}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <div className="input-group">
                        <i className="fas fa-lock"></i>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={() => setTouchedPassword(true)}
                            className={touchedPassword && error.includes('Password') ? 'error' : ''}
                            placeholder="Your Password"
                            required
                        />
                        
                    </div>
                    {touchedPassword && !password && (
                        <p className="error">Please enter your password.</p>
                    )}
                    {touchedPassword && password && password.length < 8 && (
                        <p className="error">Password must be at least 8 characters long.</p>
                    )}
                </div>
                <button type="submit">Login</button>
            </form>
            <p className="forgot-password">
                <a href="#">Forgot Password?</a>
            </p>
        </div>
    );
};

export default Login;

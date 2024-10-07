// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

       // Redirect to the home page on successful login
       navigate('/home'); // Change to home page
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
                            required
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <div className="input-group">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
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

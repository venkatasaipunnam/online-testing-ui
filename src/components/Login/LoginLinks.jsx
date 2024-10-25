import React from 'react';
import './LoginLinks.css';
import { Link } from 'react-router-dom';

const LoginLinks = () => {
    return (
        <p className="links-container">
            <span className="first-time-user" >
                First time user? <Link to="/signup" data-automation-id="signup-link">Sign Up</Link>
            </span>
            <span className="forgot-password">
                <Link to="/forgot-password" data-automation-id="forgot-password-link">Forgot Password?</Link>
            </span>
        </p>
    );
};

export default LoginLinks;
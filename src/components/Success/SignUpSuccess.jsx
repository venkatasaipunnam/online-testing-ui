import React from 'react';
import './Success.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SignUpSuccess = ({ message }) => {
    return (
        <div className="success-message" data-automation-id="signup-success">
            <FontAwesomeIcon icon={faSmile} className="celebration-icon" />
            <h3>{message}</h3>
            <p>Welcome to our community!</p>
            <Link to="/login" className="login-link" data-automation-id="signup-login-link">Go to Login</Link>
        </div>
    );
};

export default SignUpSuccess;
import React from 'react';
import './Success.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ForgetPasswordSuccess = ({ message }) => {
    return (
        <div className="success-message" data-automation-id="forget-password-success">
            <FontAwesomeIcon icon={faSmile} className="celebration-icon" />
            <h3>{message}</h3>
            <p>We have sent an temporary password to your registered email. Please Login and change password.</p>
            <Link to="/login" className="login-link" data-automation-id="forget-password-login-link">Go to Login</Link>
        </div>
    );
};

export default ForgetPasswordSuccess;
import React from 'react';
import './SignUpLinks.css';
import { Link } from 'react-router-dom';


const SignUpLinks = () => {
    return (
        <p className="links-container">
            <span className="already-user" data-automation-id="login-link">
                Already have an account? <Link to="/login" data-automation-id="sigup-login-link">Log In</Link>
            </span>
        </p>
    );
};

export default SignUpLinks;
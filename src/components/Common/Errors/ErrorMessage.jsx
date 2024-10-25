
import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, automationId }) => {
    return (
        <div className="error-message" data-automation-id={automationId}>
            {message}
        </div>
    );
};

export default ErrorMessage;
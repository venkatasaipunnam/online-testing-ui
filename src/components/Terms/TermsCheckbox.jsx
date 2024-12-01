import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './TermsCheckbox.css';

const TermsCheckbox = ({ name }) => {
    return (
        <div className="terms-container">
            <label className="terms-label">
                <Field type="checkbox" name={name} />
                I accept the Terms and Conditions
            </label>
            <ErrorMessage 
                name={name} 
                component="div" 
                className="error-message" 
                data-automation-id={`${name}-error`}
            />
        </div>
    );
};

export default TermsCheckbox;
import React from 'react';
import { Field, ErrorMessage } from 'formik';
import './FormInput.css';

const FormInput = ({ type, name, label, isLabel, placeholder, icon, automationId }) => {
    return (
        <div>
            {isLabel && <label htmlFor={name}>{label}</label> }
            <div className="input-group">
                <i className={icon}></i>
                <Field
                    type={type}
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    data-automation-id={automationId}
                />
            </div>
            <ErrorMessage 
                name={name} 
                component="div" 
                className="error-message" 
                data-automation-id={`${name}-error`}
            />
        </div>
    );
};

export default FormInput;
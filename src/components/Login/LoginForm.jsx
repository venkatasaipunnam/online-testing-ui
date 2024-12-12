import React from 'react';
import { Form } from 'formik';
import FormInput from '../Forms/FormInput';
import SubmitButton from '../Common/SubmitButton/SubmitButton';
import './LoginForm.css';

const LoginForm = ({ isLoginByEmail, setLoginWithEmail, isSubmitting, setFieldValue }) => {

    const handleToggle = (e) => {
        const checked = e.target.checked;
        setLoginWithEmail(checked);
        setFieldValue('isLoginByEmail', checked);
        
        if (checked) {
            setFieldValue('username', '');
        } else {
            setFieldValue('email', '');
        }
    };

    return (
        <Form>
            {isLoginByEmail ? (
                <FormInput
                    type="email"
                    name="emailId"
                    label="Email:"
                    isLabel={true}
                    placeholder="your@email.com"
                    icon="fas fa-envelope"
                    automationId="email-input"
                />
            ) : (
                <FormInput
                    type="text"
                    name="username"
                    label="Username:"
                    isLabel={true}
                    placeholder="Username"
                    icon="fas fa-user"
                    automationId="username-input"
                />
            )}

            <FormInput
                type="password"
                name="password"
                label="Password:"
                isLabel={true}
                placeholder="Password"
                icon="fas fa-lock"
                automationId="password-input"
            />

            <div className="switch-toggle">
                <label className="custom-switch" data-automation-id="toggle-email-username">
                    <input
                        type="checkbox"
                        checked={isLoginByEmail}
                        onChange={handleToggle}
                        data-automation-id="email-username-toggle-input"
                    />
                    <span className="custom-slider"></span>
                </label>
                <span className="switch-label">Use Email</span>
            </div>

            <SubmitButton isSubmitting={isSubmitting} text="Login" />
        </Form>
    );
};

export default LoginForm;
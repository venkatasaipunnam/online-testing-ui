import React from 'react';
import { Form, Field } from 'formik';
import FormInput from '../Forms/FormInput';
import SubmitButton from '../Common/SubmitButton/SubmitButton';
import './SignUpForm.css';

const SignUpForm = ({ isSubmitting }) => {
    return (
        <Form className="signup-form">
            <div className="input-group">
                <FormInput
                    type="text"
                    name="firstName"
                    label="First Name:"
                    placeholder="First Name"
                    icon="fas fa-user"
                    automationId="first-name-input"
                />
                <FormInput
                    type="text"
                    name="lastName"
                    label="Last Name:"
                    placeholder="Last Name"
                    icon="fas fa-user"
                    automationId="last-name-input"
                />
            </div>
            <FormInput
                type="text"
                name="userName"
                label="UserName:"
                placeholder="UserName"
                icon="fas fa-user"
                automationId="user-name-input"
            />
            <FormInput
                type="email"
                name="emailId"
                label="Email:"
                placeholder="Email"
                icon="fas fa-envelope"
                automationId="email-input"
            />
            <div className="input-group">
                <i className="fas fa-users"></i>
                <Field as="select" name="userType" id="userType" className="select-field">
                    <option value="STUDENT">Student</option>
                    <option value="INSTRUCTOR">Instructor</option>
                </Field>
            </div>
            <div className="input-group">
                <FormInput
                    type="password"
                    name="createPassword"
                    label="Password:"
                    placeholder="Password"
                    icon="fas fa-lock"
                    automationId="password-input"
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password:"
                    placeholder="Confirm Password"
                    icon="fas fa-lock"
                    automationId="confirm-password-input"
                />
            </div>
            {/* <TermsCheckbox name="termsAccepted" /> */}
            <SubmitButton isSubmitting={isSubmitting} text="Sign Up" />
        </Form>
    );
};

export default SignUpForm;
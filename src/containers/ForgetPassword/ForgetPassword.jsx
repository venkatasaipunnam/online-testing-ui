import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { resetPasswordRequestValidationSchema } from '../../utils/Validation';
import './ForgetPassword.css';
import SubmitButton from '../../components/Common/SubmitButton/SubmitButton';
import { useState } from 'react';
import FormInput from '../../components/Forms/FormInput';
import ForgetPasswordSuccess from '../../components/Success/ForgetPasswordSuccess';
import { forgetPassword } from '../../redux/actions/PreLoginActions';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [forgetPasswordSuccess, setForgetPasswordSuccess] = useState(false);
    const [forgetPasswordError, setForgetPasswordError] = useState('');

    const initialValues = { emailId: '' };

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const response = await forgetPassword(values.emailId);
            if (response.status === 201 || response.status === 200) {
                setForgetPasswordError('');
                setForgetPasswordSuccess(true);
            }
        } catch (error) {
            setForgetPasswordError(error?.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className='forgot-password'>
            <div className="forgot-password-container">
                {forgetPasswordSuccess ? (
                    <ForgetPasswordSuccess message={"Password Reset Successful!"} /> // Show success message
                ) : (
                    <>
                        <h2>Forgot Password</h2>
                        {forgetPasswordError && <ErrorMessage message={forgetPasswordError} automationId="forget-password-error" />}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={resetPasswordRequestValidationSchema}
                            validateOnBlur={false}
                            validateOnChange={false}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div>
                                        <FormInput
                                            type="email"
                                            name="emailId"
                                            label="Email:"
                                            isLabel={true}
                                            placeholder="your@email.com"
                                            icon="fas fa-envelope"
                                            automationId="forget-password-email-input"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="error-message"
                                            data-automation-id="forgot-password-email-error"
                                        />
                                    </div>
                                    <SubmitButton isSubmitting={isSubmitting} text="Submit" />
                                </Form>
                            )}
                        </Formik>
                        <p className="links-container">
                            <span className="already-user" data-automation-id="login-link">
                                Back to <Link to="/login" data-automation-id="forget-password-login-link">Log In</Link>
                            </span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
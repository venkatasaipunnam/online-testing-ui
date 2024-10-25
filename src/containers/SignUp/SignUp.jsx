import React, { useState } from 'react';
import { Formik } from 'formik';
import { signUpUser } from '../../redux/actions/PreLoginActions';
import { signUpValidationSchema } from '../../utils/Validation';
import SignUpForm from '../../components/SignUp/SignUpForm';
import SignUpLinks from '../../components/SignUp/SignUpLinks';
import ErrorMessage from '../../components/Common/Errors/ErrorMessage';
import './SignUp.css';
import SignUpSuccess from '../../components/Success/SignUpSuccess';

const SignUp = () => {
    const [signUpError, setSignUpError] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleSubmit = async (values, { setSubmitting }) => {
        setSignUpError('');
        setSubmitting(true);
        setRegistrationSuccess(false);

        try {
            const response = await signUpUser(values);
            if (response.status === 201 || response.status === 200) {
                setSignUpError(''); // Clear error message
                setRegistrationSuccess(true); // Set success state on successful registration
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setSignUpError(error?.response?.data?.message || "An unexpected error occurred.");
            setTimeout(() => {
                setSignUpError('');
            }, 5000);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="signup-container">
            {registrationSuccess ? (
                <SignUpSuccess message="Registration successful!" /> // Show success message
            ) : (
                <>
                    <h2>Register</h2>
                    {signUpError && <ErrorMessage message={signUpError} automationId="signup-error" />}

                    <Formik
                        initialValues={{ firstName: '', lastName: '', userName: '', emailId: '', userType: 'STUDENT', createPassword: '', confirmPassword: '' }}
                        validationSchema={signUpValidationSchema}
                        validate={(values) => console.log(values)}
                        onSubmit={handleSubmit}
                    >
                        {({ formikProps }) => (
                            <SignUpForm
                                {...formikProps}
                            />
                        )}
                    </Formik>
                    <SignUpLinks />
                </>
            )}
        </div>
    );
};

export default SignUp;
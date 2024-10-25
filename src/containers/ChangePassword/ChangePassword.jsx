import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import SubmitButton from '../../components/Common/SubmitButton/SubmitButton';
import FormInput from '../../components/Forms/FormInput';
import './ChangePassword.css';
import { changePassword } from '../../redux/actions/UserActions';
import  { changePasswordValidationSchema } from '../../utils/Validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [changePasswordError, setChangePasswordError] = useState('');

    const initialValues = {
        currentPassword: '',
        createPassword: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
            const response = await changePassword(values);
            if (response.status === 200) {
                console.log('Password changed successfully');
                toast.success('Password changed successfully!');
                setTimeout(() => {
                    toast.info('Redirecting to home page');
                    navigate("/home");
                }, 1000);
            }
        } catch (error) {
            setChangePasswordError(error?.response?.data?.message || "An unexpected error occurred.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            {changePasswordError && <div className="error-message">{changePasswordError}</div>}
            <Formik
                initialValues={initialValues}
                validationSchema={changePasswordValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <FormInput
                            type="password"
                            name="currentPassword"
                            label="Current Password:"
                            placeholder="Current Password"
                            icon="fas fa-lock"
                            automationId="current-password-input"
                        />
                        <FormInput
                            type="password"
                            name="createPassword"
                            label="Password:"
                            placeholder="Password"
                            icon="fas fa-lock"
                            automationId="create-password-input"
                        />
                        <FormInput
                            type="password"
                            name="confirmPassword"
                            label="Confirm Password:"
                            placeholder="Confirm Password"
                            icon="fas fa-lock"
                            automationId="confirm-password-input"
                        />
                        <SubmitButton isSubmitting={isSubmitting} text="Change Password" />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ChangePassword;
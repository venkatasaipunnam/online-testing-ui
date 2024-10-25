import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { AuthContext } from '../../context/AuthContext';
import { loginValidationSchema } from '../../utils/Validation';
import { doLogin } from '../../redux/actions/PreLoginActions';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/Login/LoginForm';
import LoginLinks from '../../components/Login/LoginLinks';
import ErrorMessage from '../../components/Common/Errors/ErrorMessage';
import './LoginContainer.css';

const LoginContainer = () => {
    const [isLoginByEmail, setLoginWithEmail] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (values, { setSubmitting }) => {
        setLoginError('');
        
        setSubmitting(true);
        try {
            const response = await doLogin(values);
            login(response);
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError(error?.response?.data?.message || "An unexpected error occurred.");
            
            setTimeout(() => {
                setLoginError('');
            }, 5000);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            {loginError && <ErrorMessage message={loginError} automationId="login-error" />}
            <Formik
                initialValues={{ username: '', emailId: '', password: '', isLoginByEmail }}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <LoginForm 
                        isLoginByEmail={isLoginByEmail}
                        setLoginWithEmail={setLoginWithEmail}
                        {...formikProps}
                    />
                )}
            </Formik>
            <LoginLinks />
        </div>
    );
};

export default LoginContainer;
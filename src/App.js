import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginContainer from './containers/LoginContainer/LoginContainer';
import SignUp from './containers/SignUp/SignUp';
import ForgotPassword from './containers/ForgetPassword/ForgetPassword';
import { PrivateRouter } from './PrivateRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LoginContainer />} />
          <Route path='/login' element={<LoginContainer />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='*' element={<PrivateRouter />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          pauseOnHover
          closeButton={false}
          className="toast-container"
        />
      </AuthProvider>
    </Router>
  );
};

export default App;

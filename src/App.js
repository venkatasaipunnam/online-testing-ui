// src/App.js
import React from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import PrivateRoute from './PrivateRoute'; // Adjust the import path as necessary
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Adjust the import path as necessary

const App = () => {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path='/' element={<Login />} /> {/* Use element prop for login */}
                  <Route path='/home' element={
                      <PrivateRoute>
                          <Home /> {/* Wrap Home with PrivateRoute */}
                      </PrivateRoute>
                  } />
              </Routes>
          </Router>
      </AuthProvider>
  );
};


export default App;

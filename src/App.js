// src/App.js
import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
       <Router>
        <Routes>
          <Route path='/' exact Component={Login} />
          <Route path='/home' Component={Home} />
        </Routes>
       </Router>
    );
};

export default App;

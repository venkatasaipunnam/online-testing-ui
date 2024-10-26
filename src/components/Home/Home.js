// src/components/Home.js
import React from 'react';
import Navbar from '../NavBar/Navbar';
import './Home.css';

const Home = () => {
    return (
        <div className='home'>
            <Navbar />
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Login Successful</h1>
                <p>Welcome to your dashboard!</p>
            </div>
        </div>

    );
};

export default Home;

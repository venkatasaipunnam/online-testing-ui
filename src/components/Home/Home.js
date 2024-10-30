// src/components/Home.js
import React from 'react';
import Navbar from '../NavBar/Navbar';
import './Home.css';
import HomePage from './HomePage';
import { useSelector } from 'react-redux';
import ExamContainer from '../../containers/Exams/ExamContainer';
import ExamDetails from '../Tests/Exams/ExamDetails';
import CreateTestPage from '../Tests/CreateTestPage';

const Home = (props) => {

    const { path } = props;

    const userState = useSelector((state) => state.user.value)

    return (
        <div className='home'>
            <Navbar user = {userState?.user}/>
            {path === '/exams' ? <ExamContainer /> : 
            path==='/exam-details' ? <ExamDetails /> :
            path=== '/create-test' ? <CreateTestPage /> : <HomePage />}
        </div>

    );
};

export default Home;

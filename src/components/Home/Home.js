// src/components/Home.js
import React from 'react';
import Navbar from '../NavBar/Navbar';
import './Home.css';
import HomePage from './HomePage';
import { useSelector } from 'react-redux';
import ExamContainer from '../../containers/Exams/ExamContainer';
import ExamDetails from '../Tests/Exams/ExamDetails';
import CreateTestPage from '../Tests/CreateTestPage';
import UpdateExamContainer from '../../containers/Exams/UpdateExamContainer';

const Home = (props) => {

    const { path } = props;

    const userState = useSelector((state) => state.user.value)

    const user = userState?.user;

    return (
        <div className='home'>
            <Navbar user = {user}/>
            {path === '/exams' ? <ExamContainer role = {user?.userType} /> : 
            path==='/exam-details' ? <ExamDetails role = {user?.userType}/> :
            path==='/update-exam' ? <UpdateExamContainer /> :
            path=== '/create-test' ? <CreateTestPage role = {user?.userType} /> : <HomePage user = {user} />}
        </div>

    );
};

export default Home;

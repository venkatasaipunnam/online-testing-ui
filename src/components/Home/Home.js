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
import ExamPage from '../../containers/Exams/ExamPage';
import AssignStudentPage from '../../containers/Exams/AssignStudentPage';
import UpcomingExamsPage from '../../containers/Exams/UpcomingExamsPage';
import ProfilePage from '../../containers/Profile/ProfilePage';
import ExamGradingPage from '../../containers/Evaluation/ExamGradingPage';
import EvaluationPage from '../../containers/Evaluation/EvaluationPage';
import ListGradesPage from '../../containers/Grade/ListGradesPage';
import ExamStudentResponses from '../../containers/Evaluation/ExamStudentResponses';
import ViewExamGrades from '../../containers/Grade/ViewExamGrades';
import ViewExamGrade from '../../containers/Grade/ViewExamGrade';
import ResultsComponent from '../Results/ResultsComponent';

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
            path=== '/create-test' ? <CreateTestPage role = {user?.userType} /> : 
            path=== '/start-test' ? <ExamPage /> : 
            path=== '/assign-exam' ? <AssignStudentPage /> :
            path=== '/feedback' ? <ExamStudentResponses /> :
            path=== '/review-grades' ? <ViewExamGrades /> :
            path=== '/view-results' ? <ViewExamGrade /> :
            path=== '/results' ? <ResultsComponent role={user?.userType} /> :
            path=== '/evaluate-tests' ? <EvaluationPage /> :
            path=== '/profile' ? <ProfilePage /> :
            path=== '/grades' ? <ListGradesPage /> :
            path=== '/grade' ? <ExamGradingPage /> :
            <HomePage user = {user} />}
            {path === '/home' && <UpcomingExamsPage role = {user?.userType}/>}
        </div>

    );
};

export default Home;

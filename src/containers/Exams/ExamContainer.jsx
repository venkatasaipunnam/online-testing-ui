import React, { useEffect, useState } from 'react';
import './ExamContainer.css';
import { useNavigate } from 'react-router-dom';

import { getCreatedExamDetails, getAssignedExamDetails } from '../../redux/actions/ExamActions';
import { useDispatch } from'react-redux';
import { saveExams } from '../../redux/reducers/ExamReducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcaseClock, faClipboardCheck, faClock, faClockFour, faClockRotateLeft, faStopwatch, faTrophy, faUserClock } from '@fortawesome/free-solid-svg-icons';

const ExamContainer = (props) => {

    const { role } = props;

    const [examsData, setExamsData] = useState([]); 
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchCreatedExams = async () => {
            try {
                const response = await getCreatedExamDetails();
                dispatch(saveExams(response));
                console.log("Exams fetched successfully + ", response);
                setExamsData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                setIsLoading(false);
            }finally{
                setIsLoading(false);
            }
        };
        const fetchAssignedExams = async () => {
            try {
                const response = await getAssignedExamDetails();
                dispatch(saveExams(response));
                console.log("Exams fetched successfully + ", response);
                setExamsData(response.data);
            } catch (error) {
                console.error("Error : ", error);
            } finally {
                setIsLoading(false);
            }
        };
        if (isLoading) {
            if (role === 'INSTRUCTOR') {
                fetchCreatedExams();
            } else if (role === 'STUDENT') {
                fetchAssignedExams();
            } else if (role === 'ADMIN') {
                setIsLoading(false);
            }
        }  else {
            setIsLoading(false);
        }


        
    }, []); // empty dependency array to run effect only once on mount

    const navigate = useNavigate()

    const handleViewDetails = (examId) => {
        // Navigate to the exam details page
        navigate(`/exam/${examId}`);
        // Here you could use a router to navigate, e.g., using React Router
    };

    return  isLoading ? (<>Loading ...</>) : (

            <div className="exam-container">
            {examsData.map((exam) => (
                <div className="exam-card" key={exam.examId}>
                    <h3>{exam.title}</h3>
                    <p>{exam.description}</p>
                    <div className="exam-details">
                        <p><FontAwesomeIcon icon={faTrophy} />  <strong>Total Points:</strong> {exam.totalPoints}</p>
                        <p><FontAwesomeIcon icon={faStopwatch} /> <strong>Duration:</strong> {exam.duration} minutes</p>
                        <p><FontAwesomeIcon icon={faClockFour} /> <strong>Start Time:</strong> {new Date(exam.startTime).toLocaleString()}</p>
                        <p><FontAwesomeIcon icon={faClock} /> <strong>End Time:</strong> {new Date(exam.endTime).toLocaleString()}</p>
                        <p><FontAwesomeIcon icon={faClipboardCheck} /> <strong>Status:</strong> {exam.status}</p>
                    </div>
                    <button 
                        className="view-button" 
                        onClick={() => handleViewDetails(exam.examId)}
                    >
                        View Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ExamContainer;
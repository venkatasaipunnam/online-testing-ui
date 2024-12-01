import React, { useEffect, useState } from 'react';
import './UpcomingExamsPage.css';
import { useDispatch } from 'react-redux';
import { getAssignedExamDetails, getCreatedExamDetails } from '../../redux/actions/ExamActions';
import { saveExams } from '../../redux/reducers/ExamReducers';
import { useNavigate } from 'react-router-dom';
import { getExamProcessedData } from '../../utils/Helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faExclamationCircle, faInfo, faWarning } from '@fortawesome/free-solid-svg-icons';


const UpcomingExamsPage = (props) => {


    const { role } = props;

    const [examsData, setExamsData] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        const fetchCreatedExams = async () => {
            try {
                const response = await getCreatedExamDetails();
                dispatch(saveExams(response));
                setExamsData(response.data);
                if (response.data.length > 0) {
                    const sortedExams = response.data
                        .filter(exam => new Date(exam.endTime) > new Date())
                        .slice() // Create a shallow copy to avoid mutating original data
                        .sort((a, b) => new Date(a.endTime) - new Date(b.endTime)) // Sort exams by startTime
                        .slice(0, 5) // Get top 5 upcoming exams
                        .map(exam => getExamProcessedData(exam)); // Process exam data

                    setFilteredExams(sortedExams);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        const fetchAssignedExams = async () => {
            try {
                const response = await getAssignedExamDetails();
                dispatch(saveExams(response));
                setExamsData(response.data);
                if (response.data.length > 0) {
                    const sortedExams = response.data
                        .filter(exam => new Date(exam.endTime) > new Date())
                        .slice() // Create a shallow copy to avoid mutating original data
                        .sort((a, b) => new Date(a.endTime) - new Date(b.endTime)) // Sort exams by startTime
                        .slice(0, 5) // Get top 5 upcoming exams
                        .map(exam => getExamProcessedData(exam)); // Process exam data

                    setFilteredExams(sortedExams);
                }
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
        } else {
            setIsLoading(false);
        }

    }, []);

    const navigate = useNavigate()

    const handleViewDetails = (examId) => {
        // Navigate to the exam details page
        navigate(`/exam/${examId}`);
        // Here you could use a router to navigate, e.g., using React Router
    };

    const handleViewAllExams = () => {
        // Navigate to the exam details page
        navigate(`/exams`);
        // Here you could use a router to navigate, e.g., using React Router
    };

    return isLoading ? (<>Loading ...</>) : (
        <div className="upcoming-exams-container">
            <header className="exams-header">
                <h1>Upcoming Exams</h1>
            </header>
            <div className="exams-list-container">
                {filteredExams.length === 0 ? (
                    <p>No upcoming exams scheduled.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr className='table-head'>
                                <th></th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Timings</th>
                                <th>Duration</th>
                                <th>Days Left</th>
                                <th>Exam By</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExams.map(exam => (

                                <tr key={exam.examId}>
                                    <td className='exam-list-indicater'>

                                        {role === 'INSTRUCTOR' ?
                                            (String(exam.daysLeft).includes('hours') ? <FontAwesomeIcon className='exam-list-indicator-warning' icon={faWarning} title={exam.daysLeft}/> :
                                                String(exam.daysLeft).includes('1') ? <FontAwesomeIcon className='exam-list-indicator-remind' icon={faExclamationCircle} />
                                                    : <FontAwesomeIcon className='exam-list-indicator-info' icon={faCircle} />)
                                            : (
                                                String(exam.daysLeft).includes('hours') ? 
                                                (
                                                    exam.examIndicator === 'Completed' ? 
                                                    <FontAwesomeIcon className='exam-list-indicator-info' icon={faCircle} title='Already Completed' />
                                                    : 
                                                    <FontAwesomeIcon className='exam-list-indicator-warning' icon={faWarning} title={exam.daysLeft}/>
                                                )
                                                    :
                                                    String(exam.daysLeft).includes('1') ? <FontAwesomeIcon className='exam-list-indicator-remind' icon={faExclamationCircle} />
                                                        : <FontAwesomeIcon className='exam-list-indicator-info' icon={faCircle} />

                                            )
                                        }
                                    </td>
                                    <td className="exam-list-examTitle">{exam.title}</td>
                                    <td className="exam-list-examDate">{exam.examDate}</td>
                                    <td className="exam-list-examTiming">{exam.examTime}</td>
                                    <td className="exam-list-duration">{exam.duration}</td>
                                    <td className="exam-list-examDaysLeft">{exam.daysLeft}</td>
                                    <td className="exam-list-instructor">{exam.createdUser}</td>
                                    <td className="exam-list-actions">
                                        <FontAwesomeIcon className='exam-list-action-info' icon={faInfo}
                                            onClick={() => { handleViewDetails(exam.examId) }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="view-all-exams-text" onClick={handleViewAllExams}>
                    Show All Exams
                </div>
            </div>
        </div>
    );
};

export default UpcomingExamsPage;
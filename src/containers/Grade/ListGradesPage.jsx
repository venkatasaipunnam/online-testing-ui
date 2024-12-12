import React, { useEffect, useState } from 'react';
import './ListGradesPage.css';
import { useDispatch } from 'react-redux';
import { getCreatedExamDetails } from '../../redux/actions/ExamActions';
import { saveExams } from '../../redux/reducers/ExamReducers';
import { useNavigate } from 'react-router-dom';
import { getExamProcessedData } from '../../utils/Helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faCircle, faExclamationCircle, faInfo, faWarning } from '@fortawesome/free-solid-svg-icons';


const ListGradesPage = (props) => {

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
                        .filter(exam => exam.status === 'GRADED')
                        .slice() // Create a shallow copy to avoid mutating original data
                        .sort((a, b) => new Date(a.endTime) - new Date(b.endTime)) // Sort exams by startTime
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
        if (isLoading) {
            fetchCreatedExams();
        } else {
            setIsLoading(false);
        }

    }, []);

    const navigate = useNavigate()

    const handleViewGrades = (examId) => {
        // Navigate to the exam details page
        navigate(`/exam/${examId}/grades`);
        // Here you could use a router to navigate, e.g., using React Router
    };

    return isLoading ? (<>Loading ...</>) : (
        <div className="upcoming-exams-container">
            <header className="exams-header">
                <h1>Graded Exams</h1>
            </header>
            <div className="exams-list-container">
                {filteredExams.length === 0 ? (
                    <p>No exams are graded</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr className='table-head'>
                                <th></th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Timings</th>
                                <th>Duration</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExams.map(exam => (

                                <tr key={exam.examId}>
                                    <td className='exam-list-indicater'>


                                        {(String(exam.daysLeft).includes('hours') ? <FontAwesomeIcon className='exam-list-indicator-warning' icon={faWarning} title={exam.daysLeft} /> :
                                            String(exam.daysLeft).includes('1') ? <FontAwesomeIcon className='exam-list-indicator-remind' icon={faExclamationCircle} />
                                                : <FontAwesomeIcon className='exam-list-indicator-info' icon={faCircle} />)
                                        }
                                    </td>
                                    <td className="exam-list-examTitle">{exam.title}</td>
                                    <td className="exam-list-examDate">{exam.examDate}</td>
                                    <td className="exam-list-examTiming">{exam.examTime}</td>
                                    <td className="exam-list-duration">{exam.duration}</td>
                                    <td className="exam-list-actions">
                                        <button className='exam-list-action-grade-btn' onClick={() => { handleViewGrades(exam.examId) }} >
                                            <FontAwesomeIcon className='exam-list-action-grade' icon={faAward} /> View Grades
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ListGradesPage;
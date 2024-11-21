import React, { useEffect, useState } from 'react';
import './EvaluationPage.css';
import { useDispatch } from 'react-redux';
import { getUserExamResponses } from '../../redux/actions/ExamActions';
import { saveUserExamResponses } from '../../redux/reducers/ExamReducers';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faCircle } from '@fortawesome/free-solid-svg-icons';


const ExamStudentResponses = (props) => {

    const { examId } = useParams();

    const [studentsData, setStudentsData] = useState([]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [examData, setExamsData] = useState(undefined);

    useEffect(() => {

        const fetchCreatedExams = async () => {
            try {
                const response = await getUserExamResponses(examId);
                dispatch(saveUserExamResponses(response));
                console.log("Exams fetched successfully + ", response);
                setExamsData(response?.data);
                setStudentsData(response?.data?.respondedUsers);
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

    const handleStartGrading = (userId) => {
        // Navigate to the exam details page
        navigate(`/exam/${examId}/grade/${userId}`);
        // Here you could use a router to navigate, e.g., using React Router
    };

    return isLoading ? (<>Loading ...</>) : (
        <div className="upcoming-exams-container">
            <header className="exams-header">
                <h1>Grade Students</h1>
            </header>
            <div className="exams-list-container">
                {studentsData.length === 0 ? (
                    <p>No Users to grade</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr className='table-head'>
                                <th></th>
                                <th className='align-left'>Name</th>
                                <th className='align-left'>Email</th>
                                <th className='align-left'>User Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsData.map(student => (

                                <tr key={student.userId}>
                                    <td className='exam-list-indicater'>
                                        <FontAwesomeIcon className='exam-list-indicator-info' icon={faCircle} />
                                        
                                    </td>
                                    <td className="exam-list-examTitle">{student.firstName} {student.lastName}</td>
                                    <td className="exam-list-examDate">{student.emailId}</td>
                                    <td className="exam-list-examTiming">{student.userType}</td>
                                    <td className="exam-list-actions">
                                        <button className='exam-list-action-grade-btn' onClick={() => { handleStartGrading(student.userId) }} >
                                            <FontAwesomeIcon className='exam-list-action-grade' icon={faAward} /> Grade
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

export default ExamStudentResponses;
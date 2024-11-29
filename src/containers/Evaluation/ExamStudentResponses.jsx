import React, { useEffect, useState } from 'react';
import './EvaluationPage.css';
import { useDispatch } from 'react-redux';
import { getUserExamResponses, PublishExamGrades } from '../../redux/actions/ExamActions';
import { saveUserExamResponses } from '../../redux/reducers/ExamReducers';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faCircle, faGraduationCap, faWarning } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';


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

    const handleStartGrading = (examSession) => {
        // Navigate to the exam details page
        navigate(`/exam/${examId}/grade/${examSession}`);
        // Here you could use a router to navigate, e.g., using React Router
    };

    const handlePublishResults = async () => {
        try {
            const response = await PublishExamGrades(examId);
            console.log("Exams fetched successfully + ", response);
            if (response.data) {
                toast.success("Exam Results Published successfully")
                navigate(`/exam/${examId}`);
            }
        } catch (error) {
            console.error("Error : ", error);
        }
    }

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
                                <th className='align-left'>Grades</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsData.map(student => (

                                <tr key={student.userId}>
                                    <td className='exam-list-indicater'>
                                        {student?.isGraded ?
                                            <FontAwesomeIcon className='exam-list-indicator-info' icon={faCircle} title='Already Completed' />
                                            :
                                            <FontAwesomeIcon className='exam-list-indicator-warning' icon={faWarning} title='Not Graded' />

                                        }            
                                        {/* <FontAwesomeIcon className='exam-list-indicator-info' icon={faCircle} /> */}

                                    </td>
                                    <td className="exam-list-examTitle">{student.firstName} {student.lastName}</td>
                                    <td className="exam-list-examDate">{student.emailId}</td>
                                    <td className="exam-list-examTiming">{student.isGraded ? 'Done' : 'Pending'}</td>
                                    <td className="exam-list-actions">
                                        <button className='exam-list-action-grade-btn' onClick={() => { handleStartGrading(student.examRespondentSession) }} >
                                            <FontAwesomeIcon className='exam-list-action-grade' icon={faAward} /> {student.isGraded ? 'Graded' : 'Grade'}
                                        </button>

                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                )}
                <div>
                    <button className='exam-student-response-publish' onClick={() => handlePublishResults()}
                        disabled={examData?.isResultsPublished}>
                        <FontAwesomeIcon className='exam-student-response-publish-icon' icon={faGraduationCap} /> {examData?.isResultsPublished ? 'Results Published' : 'Publish Results'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExamStudentResponses;
import React, { useEffect, useState } from 'react';
import './ViewExamGrades.css';
import { useDispatch } from 'react-redux';
import { getUserExamGrades, getUserExamResponses, PublishExamGrades } from '../../redux/actions/ExamActions';
import { saveExamGrades, saveUserExamResponses } from '../../redux/reducers/ExamReducers';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faCircle, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const ViewExamGrades = (props) => {

    const { examId } = useParams();

    const [studentsData, setStudentsData] = useState([]);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [gradesData, setGradesData] = useState(undefined);

    useEffect(() => {

        const fetchCreatedExams = async () => {
            try {
                const response = await getUserExamGrades(examId);
                dispatch(saveExamGrades(response));

                setGradesData(response?.data);
                setStudentsData(response?.data?.studentResults);
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

    const handleViewGrades = (examSession) => {

        // Navigate to the exam details page
        navigate(`/exam/${examId}/grade/${examSession}`);
        // Here you could use a router to navigate, e.g., using React Router
    };

    return isLoading ? (<>Loading ...</>) : (
        <div className="upcoming-exams-container">
            <header className="exams-header">
                <h1>Exam Grades</h1>
            </header>
            <div className="exams-list-container">
                {studentsData.length === 0 ? (
                    <p>No Users to grade</p>
                ) : (
                    <>
                        <div className='view-exam-grades-highlights'>
                            <div className='view-exam-grades-highlight'>
                                <h4 className='view-exam-grades-highlight-label'>Exam Attendece</h4>
                                <Gauge width={100} height={100} value={gradesData?.numberOfStudentsTaken} valueMin={0} valueMax={gradesData?.assignedUserEmails?.length}
                                startAngle={-110}
                                endAngle={110}
                                text={
                                    ({ value, valueMax }) => `${value} / ${valueMax}`
                                 } />
                            </div>
                            <div className='view-exam-grades-highlight'>
                                <h4 className='view-exam-grades-highlight-label'> Average Score</h4>
                                <Gauge width={100} height={100} value={gradesData?.averageScore} valueMin={0} valueMax={gradesData?.totalPoints} 
                                startAngle={-110}
                                endAngle={110}
                                text={
                                    ({ value, valueMax }) => `${value} / ${valueMax}`
                                 }/>
                            </div>
                            <div className='view-exam-grades-highlight'>
                                <h4 className='view-exam-grades-highlight-label'>Performance</h4>
                                <Gauge width={100} height={100} value={(gradesData?.averageScore / gradesData?.totalPoints) * 100} valueMin={0} valueMax={100} 
                                startAngle={-110}
                                endAngle={110}
                                text={
                                    ({ value }) => `${value}%`
                                 }/>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr className='table-header'>
                                    {/* <th></th> */}
                                    <th className='align-left'>Name</th>
                                    <th className='align-left'>Score</th>
                                    <th className='align-left'>Percentage</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsData.map(student => (

                                    <tr key={student.studentId} className='table-body-rows'>
                                        {/* <td></td> */}
                                        <td className="exam-list-examTitle">{student.studentName}</td>
                                        <td className="exam-list-examDate">{student.examScore}/{gradesData?.totalPoints}</td>
                                        <td className="exam-list-examTiming">{student.examPercentage * 100}%</td>
                                        <td className="exam-list-actions">
                                            <button className='exam-list-action-grade-btn' onClick={() => { handleViewGrades(student?.examSession) }} >
                                                <FontAwesomeIcon className='exam-list-action-grade' icon={faAward} /> {student.isGraded ? 'Graded' : 'Grade'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </>
                )}
                {/* <div>
                    <button className='exam-student-response-publish' onClick={() => handlePublishResults()} 
                        disabled={examData?.isResultsPublished}>
                        <FontAwesomeIcon className='exam-student-response-publish-icon' icon={faGraduationCap} /> {examData?.isResultsPublished ? 'Results Published' : 'Publish Results'}
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default ViewExamGrades;
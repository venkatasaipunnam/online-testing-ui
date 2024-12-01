import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ExamDetails.css';
import { useSelector } from 'react-redux';
import { saveExam } from '../../../redux/reducers/ExamReducers';
import { useDispatch } from 'react-redux';
import { getExamDetails, deleteExam } from '../../../redux/actions/ExamActions';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck, faClock, faClockFour, faInfoCircle, faStopwatch, faTrophy } from '@fortawesome/free-solid-svg-icons';


const ExamDetails = (props) => {

    const { role } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { examId } = useParams();
    const examData = useSelector((state) => state.exam?.value)
    const [exams, setExams] = useState(examData.exams);
    const [exam, setExam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchExam = async (examId) => {
            try {
                const response = await getExamDetails(examId);
                dispatch(saveExam(response));
                setExam(response.data);
            } catch (error) {
                console.error("Error : ", error);
            } finally {
                setIsLoading(false);
            }
        }

        if (isLoading) {
            if (exams === undefined || exams == [] || exams.length === 0) {
                fetchExam(examId);
            } else {
                setExam(exams.find(e => e.examId === parseInt(examId)));
            }
        } else {
            setIsLoading(false);
        }
        setExams(examData.exams);
    }, [examData]);

    const handleExam = () => {
        if (role === "INSTRUCTOR") {
            navigate(`/exam/update/${examId}`);
        } else {
            navigate(`/exam/${examId}/start`);
        }
    }

    const handleDelete = () => {
        const performDelete = async () => {
            try {
                const response = await deleteExam(examId);
                if (response.status === 200) {
                    setExams(exams.filter(e => e.examId !== parseInt(examId)));
                    toast.success("Exam deleted successfully");
                    navigate(`/exams`);
                } else {
                    console.error("Error during exam deletion");
                    toast.error("Error during exam deletion");
                }
            } catch (error) {
                console.error("Error during logout", error);
            }
        };
        performDelete();
    }

    const handleAssign = () => {

        navigate(`/exam/${examId}/assign`);
    }

    
    const handleGrades = () => {

        navigate(`/exam/${examId}/feedback`);
    }

    if (!exam) {
        return <div>Exam not found.</div>;
    }

    return (
        <div className="exam-details-container exam-details-list">
            <div className="exam-card">
                <h2>{exam.title}</h2>
                <p><FontAwesomeIcon icon={faInfoCircle} /> <strong>Description:</strong> {exam.description}</p>
                <p><FontAwesomeIcon icon={faTrophy} /> <strong>Total Points:</strong> {exam.totalPoints}</p>
                <p><FontAwesomeIcon icon={faStopwatch} /> <strong>Duration:</strong> {exam.duration} minutes</p>
                <p><FontAwesomeIcon icon={faClockFour} /> <strong>Start Time:</strong> {new Date(exam.startTime).toLocaleString()}</p>
                <p><FontAwesomeIcon icon={faClock} /> <strong>End Time:</strong> {new Date(exam.endTime).toLocaleString()}</p>
                <p><FontAwesomeIcon icon={faClipboardCheck} /> <strong>Status:</strong> {exam.status}</p>
                {/* {role === "INSTRUCTOR" && (
                    <div className='exam-card-actions'>
                        <FontAwesomeIcon className="btn-add-option edit-exam-button" title='Edit Exam' icon={faEdit} onClick={() => handleExam()} />
                        <FontAwesomeIcon className="btn-add-option delete-exam-button" title='Delete Exam' icon={faTrash} onClick={() => handleDelete()} />
                    </div>
                )} */}
                <div className='exam-column-fields'>
                    {role === "INSTRUCTOR" &&  !["COMPLETED", "GRADED", "GRADES INPROGRESS"].includes(exam.status) &&
                    <button className="start-exam-button" disabled={exam.status === "COMPLETED"} onClick={() => handleExam()}>Update Exam</button>}
                    {role === "INSTRUCTOR" && ["COMPLETED", "GRADED", "GRADES INPROGRESS"].includes(exam.status) &&
                    <button className="start-exam-button" onClick={() => handleGrades()}>{exam.status === "COMPLETED" ? 'Start Grades' : exam.status === 'GRADED' ? 'Graded' : 'Grades Inprogress'} </button>}
                    {role === "INSTRUCTOR" && !["COMPLETED", "GRADED", "GRADES INPROGRESS"].includes(exam.status) &&
                    <button className="assign-exam-button" disabled={["COMPLETED", "GRADED", "GRADES INPROGRESS"].includes(exam.status)} onClick={() => handleAssign()}>Assign Exam</button>}
                    {role === "INSTRUCTOR" && !["COMPLETED", "GRADED", "GRADES INPROGRESS"].includes(exam.status) &&
                    <button className="delete-exam-button" disabled={exam.status === "COMPLETED"} onClick={() => handleDelete()}>Delete Exam</button>}
                    {role === "STUDENT" && !["COMPLETED", "GRADED", "GRADES INPROGRESS"].includes(exam.status) && exam.examIndicator != 'Completed' && <button className="start-exam-button" onClick={() => handleExam()}>Start Exam</button>}
                    {role === "STUDENT" && !["COMPLETED", "GRADED", "GRADES INPROGRESS"].includes(exam.status) && exam.examIndicator === 'Completed' && <button className="finished-exam-button" disabled={true} onClick={() => {console.log("implment handle results")}}>Exam Finished</button>}
                    {role === "STUDENT" && ["COMPLETED", "GRADED", "GRADES INPROGRESS"].includes(exam.status) && exam.examIndicator != 'Completed' && <button className="ended-exam-button" disabled={true} onClick={() => {console.log("implment handle results")}}>Exam Ended</button>}
                    {role === "STUDENT" && (["COMPLETED", "GRADED", "GRADES INPROGRESS"].includes(exam.status) && 
                        exam.status === "COMPLETED" ? <button className="notgraded-exam-button" disabled={true} onClick={() => {console.log("implment handle results")}}>Not Yet Graded</button>
                        : exam.status === "GRADED" ? <button className="graded-exam-button" onClick={() => {navigate(`/results/${exam.examId}`)}}>View Grades</button>
                        : exam.status === "GRADES INPROGRESS" && <button className="grading-exam-button" disabled={true} onClick={() => {console.log("implment handle results")}}>Grades In Progress</button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ExamDetails;
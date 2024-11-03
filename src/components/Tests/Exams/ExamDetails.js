import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ExamDetails.css';
import { useSelector } from 'react-redux';
import { saveExam } from '../../../redux/reducers/ExamReducers';
import { useDispatch } from 'react-redux';
import { getExamDetails } from '../../../redux/actions/ExamActions';


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
                console.log("Exam fetched successfully + ", response);
                setExam(response.data);
            } catch (error) {
                console.error("Error : ", error);
            } finally {
                setIsLoading(false);
            }
        }

        if (isLoading) {
            if (exams === undefined || exams == [] || exams.length === 0 ) {
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

    if (!exam) {
        return <div>Exam not found.</div>;
    }

    return (
        <div className="exam-details-container exam-details-list">
            <div className="exam-card">
                <h2>{exam.title}</h2>
                <p><strong>Description:</strong> {exam.description}</p>
                <p><strong>Total Points:</strong> {exam.totalPoints}</p>
                <p><strong>Duration:</strong> {exam.duration} minutes</p>
                <p><strong>Start Time:</strong> {new Date(exam.startTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(exam.endTime).toLocaleString()}</p>
                <p><strong>Status:</strong> {exam.status}</p>
                <button className="start-exam-button" onClick={() => handleExam()}>{role === "INSTRUCTOR" ? "Update Exam" : "Start Exam"}</button>
            </div>
        </div>
    );
};

export default ExamDetails;
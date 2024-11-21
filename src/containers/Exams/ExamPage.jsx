import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ExamPage.css';
import { saveExam } from '../../redux/reducers/ExamReducers';
import { useDispatch } from 'react-redux';
import { getExamDetails, startExam, saveUserExamResponse, submitExam } from '../../redux/actions/ExamActions';
import { toast } from 'react-toastify';
import { setExamSession } from '../../utils/Helper';
import ExamTakingPage from '../../components/Tests/Exams/ExamTakingPage';


const ExamPage = (props) => {

    const { role } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [examSessionData, setExamSessionData] = useState(null);

    useEffect(() => {

        const fetchExam = async (examId) => {
            try {
                const response = await getExamDetails(examId);
                dispatch(saveExam(response));
                console.log("Exam fetched successfully + ", response);
                setExam(response.data);
            } catch (error) {
                console.error("Error : ", error);
            }
        }
        const start = async (examId) => {
            try {
                const response = await startExam(examId);
                if (response.status === 200) {
                    console.log("Exam started successfully + ", response);
                    setExamSession(response?.data?.examSessionId);
                    setExamSessionData(response?.data);
                } else {
                    console.error("Error starting exam");
                    toast.error("Error starting exam");
                    navigate(`/exams`);
                }
            } catch (error) {
                console.error("Error : ", error);
                toast.error(error?.response?.data?.message);
                navigate(`/exams`);
            } finally {
                setIsLoading(false);
            }
        }

        if (isLoading) {
            if (exam === null) {
                fetchExam(examId);
                start(examId);
            }
        } else {
            setIsLoading(false);
        }
    }, [exam]);

    const saveExamResponse = (data) => {
        const performSave = async (data) => {
            try {
                const response = await saveUserExamResponse(data);
                if (response.status === 200) {
                    console.log("Exam deleted successfully");
                    console.log(response.data);
                } else {
                    console.error("Error during exam deletion");
                    toast.error("Error during exam deletion");
                }
            } catch (error) {
                console.error("Error during logout", error);
            }
        };
        performSave(data);
    }

    const finishExam = (data) => {
        const finish = async (data) => {
            try {
                const response = await submitExam(data);
                if (response.status === 200) {
                    console.log("Exam submitted successfully");
                    console.log(response.data);
                    toast.success("Exam submitted successfully");
                    navigate(`/home/exam-finished`)
                } else {
                    console.error("Error during exam deletion");
                    toast.error("Error during exam finished");
                }
            } catch (error) {
                console.error("Error during submitting exam", error);
            }
        };
        finish(data);
    }

    if (!exam || isLoading ) {
        return <div>Exam not found.</div>;
    }

    return (
        <div className="exam-taking-container">
            <ExamTakingPage 
                exam = { exam }
                examSession = {examSessionData}
                saveUserResponse = {saveExamResponse}
                finishExam = {finishExam}
            />
        </div>
    );
};

export default ExamPage;
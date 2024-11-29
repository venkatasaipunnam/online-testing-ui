import React, { useEffect, useState } from 'react';
import './ResultsComponent.css';
import { useDispatch } from 'react-redux';
import { getAssignedExamDetails, getCreatedExamDetails } from '../../redux/actions/ExamActions';
import { saveExams } from '../../redux/reducers/ExamReducers';
import { useNavigate } from 'react-router-dom';
import { getExamProcessedData } from '../../utils/Helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';


const ResultsComponent = (props) => {


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
                console.log("Exams fetched successfully + ", response);
                setExamsData(response.data);
                if (response.data.length > 0) {
                    console.log("Exams fetched successfully")
                    const sortedExams = response.data
                        .filter(exam => exam?.status == "GRADED")
                        .slice()
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
                console.log("Exams fetched successfully + ", response);
                setExamsData(response.data);
                if (response.data.length > 0) {
                    const sortedExams = response.data
                        .filter(exam => exam?.status == "GRADED")
                        .slice()
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

    const handleViewGrades = (examId) => {
        // Navigate to the exam details page
        navigate(`/results/${examId}`);
        // Here you could use a router to navigate, e.g., using React Router
    };

    return isLoading ? (<>Loading ...</>) : (
        <div className="upcoming-exams-container">
            <header className="exams-header">
                <h1>Results</h1>
            </header>
            <div className="exams-list-container">
                {filteredExams.length === 0 ? (
                    <p>No Results.</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr className='table-header table-body-rows'>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Timings</th>
                                <th>Duration</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExams.map(exam => (

                                <tr key={exam.examId} className='table-body-rows'>
                                    
                                    <td className="exam-list-examTitle">{exam.title}</td>
                                    <td className="exam-list-examDate">{exam.examDate}</td>
                                    <td className="exam-list-examTiming">{exam.examTime}</td>
                                    <td className="exam-list-duration">{exam.duration}</td>
                                    <td className="exam-list-actions">
                                        <button className='exam-list-action-grade-btn' onClick={() => { handleViewGrades(exam?.examId) }} >
                                            <FontAwesomeIcon className='exam-list-action-grade' icon={faAward} /> View Results
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

export default ResultsComponent;
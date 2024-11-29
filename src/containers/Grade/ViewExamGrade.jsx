import { useDispatch } from 'react-redux';
import './ViewExamGrade.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudentGrades } from '../../redux/actions/ExamActions';
import { saveStudentGrades } from '../../redux/reducers/ExamReducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Gauge, gaugeClasses } from '@mui/x-charts';


const ViewExamGrade = (props) => {

    const { examId } = useParams();

    const [studentsData, setStudentsData] = useState([]);
    const dispatch = useDispatch();
    const [optionQuestionTypes, setOptionQuestionTypes] = useState(['MCQ', 'MSQ', 'TF'])
    const [isLoading, setIsLoading] = useState(true);
    const [gradesData, setGradesData] = useState(undefined);
    const [questionInfo, setQuestionInfo] = useState(undefined);
    const [feedbacks, setFeedbacks] = useState(undefined);
    const [showQuestion, setShowQuestions] = useState(false);

    useEffect(() => {

        const fetchCreatedExams = async () => {
            try {
                const response = await getStudentGrades(examId);
                dispatch(saveStudentGrades(response));
                console.log("Exams fetched successfully + ", response);
                setGradesData(response?.data);
                setStudentsData(response?.data?.studentResults);
                filterAndMapResponses(response?.data);
            } catch (error) {
                console.error("Error : ", error);
                setIsLoading(false);
            }
        };
        if (isLoading) {
            fetchCreatedExams();
        } else {
            setIsLoading(false);
        }

    }, []);

    useEffect(() => {
        if (isLoading) {
            console.log(feedbacks?.size)
            if (studentsData && gradesData) {
                filterAndMapResponses(gradesData);
            }
            if (feedbacks && feedbacks?.size > 0) {
                setIsLoading(false);
            }
        }
    }, [isLoading, feedbacks, questionInfo, studentsData, gradesData]);

    // Function to create a map of question info
    const createQuestionInfoMap = (questions) => {
        const questionInfoMap = new Map();

        questions?.forEach((question) => {
            // Store relevant question details
            const currentPoints = questionInfoMap.get(question.questionId) || 0;
            questionInfoMap.set(question.questionId, currentPoints + question.pointsGained);
        });

        return questionInfoMap;
    };

    // Function to create a map of student feedback by questionId
    const createFeedbackMap = (studentResponses) => {
        const feedbackMap = new Map();

        studentResponses?.forEach((response) => {
            // Store feedback (e.g., grade comments)
            feedbackMap.set(response?.questionId, {
                gradeComments: response?.feedback?.feedback,
                pointsGained: response?.pointsGained,
                choosenOption: response?.choosenOption,
                choosenOptions: response?.choosenOptions,
                correctOption: response?.correctOption,
                correctOptions: response?.correctOptions,
                answerText: response?.answerText,
                isCorrect: response?.isCorrect,
                feedbackerName: response?.feedback?.feedbackerName
            });
        });

        return feedbackMap;
    };


    const filterAndMapResponses = (studentData) => {

        console.log(gradesData)
        if (!gradesData) {
            const gradesData = studentData;
        };

        const questionInfoMap = createQuestionInfoMap(gradesData?.studentResults[0]?.studentResponses);
        const feedbackMap = createFeedbackMap(gradesData?.studentResults[0]?.studentResponses);
        setFeedbacks(feedbackMap)
        setQuestionInfo(questionInfoMap);
        console.log(questionInfoMap)
    };

    return isLoading ? (<>Loading ...</>) : (
        <div className="upcoming-exams-container">
            <header className="exams-header">
                <h1>Exam Results</h1>
            </header>
            <div className="exams-list-container">
                {studentsData.length === 0 ? (
                    <p>Something Went Wrong </p>
                ) :
                    (
                        <>
                            <div className="view-exam-grades-header">
                                <h2>{gradesData.title}</h2>
                                {/* <p><strong>Description:</strong> {gradesData.description}</p>
                                <p><strong>Start Time:</strong> {new Date(gradesData.startTime).toLocaleString()}</p>
                                <p><strong>End Time:</strong> {new Date(gradesData.endTime).toLocaleString()}</p> */}
                                
                            </div>
                            <div className='view-exam-grades-highlights'>
                                <div className='view-exam-grades-highlight'>
                                    <h4 className='view-exam-grades-highlight-label'>Exam Score</h4>
                                    <Gauge width={100} height={100} value={studentsData[0]?.examScore} valueMin={0} valueMax={gradesData?.totalPoints}
                                        startAngle={-110}
                                        endAngle={110}
                                        text={
                                            ({ value, valueMax }) => `${value} / ${valueMax}`
                                        }

                                        sx={() => ({
                                            [`& .${gaugeClasses.valueArc}`]: {
                                                fill: (studentsData[0]?.examScore / gradesData?.totalPoints) * 100 >= 75 ? '#52b202' : (studentsData[0]?.examScore / gradesData?.totalPoints) * 100 > 40 ? '#ffab05' : '#ff4f05',
                                            }
                                        })}
                                    />
                                </div>

                                <div className='view-exam-grades-highlight'>
                                    <h4 className='view-exam-grades-highlight-label'>Performance</h4>
                                    <Gauge width={100} height={100} value={studentsData[0]?.examPercentage * 100} valueMin={0} valueMax={100}
                                        startAngle={-110}
                                        endAngle={110}
                                        text={
                                            ({ value }) => `${value}%`
                                        }
                                        sx={() => ({
                                            [`& .${gaugeClasses.valueArc}`]: {
                                                fill: studentsData[0]?.examPercentage * 100 >= 75 ? '#52b202' : studentsData[0]?.examPercentage * 100 > 40 ? '#ffab05' : '#ff4f05',
                                            }
                                        })}
                                    />
                                </div>

                                {/* <div className='view-exam-grades-highlight'>
                                    <h4 className='view-exam-grades-highlight-label'>Attempted</h4>
                                    <Gauge width={100} height={100} value={studentsData[0]?.totalAnswered}
                                        valueMin={0} valueMax={gradesData?.questions.length}
                                        text={
                                            ({ value, valueMax }) => `${value} / ${valueMax}`
                                        }
                                        sx={() => ({
                                            [`& .${gaugeClasses.valueArc}`]: {
                                                fill: (studentsData[0]?.totalAnswered / gradesData?.questions.length) * 100 >= 75 ? '#52b202' : (studentsData[0]?.totalAnswered / gradesData?.questions.length) * 100 > 40 ? '#ffab05' : '#ff4f05',
                                            }
                                        })}

                                    />
                                </div> */}


                                <div className='view-exam-grades-highlight'>
                                    <h4 className='view-exam-grades-highlight-label'>Correct</h4>
                                    <Gauge width={100} height={100} value={studentsData[0]?.totalCorrect}
                                        valueMin={0} valueMax={gradesData?.questions.length}
                                        text={
                                            ({ value, valueMax }) => `${value} / ${valueMax}`
                                        }
                                        sx={() => ({
                                            [`& .${gaugeClasses.valueArc}`]: {
                                                fill: (studentsData[0]?.totalCorrect / gradesData?.questions.length) * 100 >= 75 ? '#52b202' : (studentsData[0]?.totalCorrect / gradesData?.questions.length) * 100 > 40 ? '#ffab05' : '#ff4f05',
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                            <div>
                                <button onClick={() => setShowQuestions(!showQuestion)}
                                    className='view-exam-grades-show-questions-button'

                                > {showQuestion ? 'Hide Questions' : 'Show Questions'}</button>
                            </div>
                            {showQuestion &&
                                <div className="exam-grading-questions-container">
                                    {gradesData?.questions?.map((question) => {
                                        const response = feedbacks.get(question.questionId);
                                        const isMSQ = question.questionType === 'MSQ';
                                        const selectedOptions = isMSQ
                                            ? response?.choosenOptions || []
                                            : [response?.choosenOption];

                                        const correctOptions = isMSQ
                                            ? response?.correctOptions || []
                                            : [response?.correctOption];
                                        return (
                                            <div key={question.questionId} className="exam-grading-question-card">
                                                <div className="exam-grading-question-details">
                                                    <div className="exam-grading-detail-row">
                                                        <div className="exam-grading-detail-value">{question.questionTitle}</div>
                                                        <div className="exam-grading-points-details">
                                                            <div className="exam-grading-question-graded-points">{questionInfo.get(question.questionId) || 0}</div>
                                                            <div className="exam-grading-points-divider">/</div>
                                                            <div className="exam-grading-question-total-points">{question.points}</div>
                                                        </div>
                                                    </div>
                                                    {optionQuestionTypes.includes(question.questionType) ? (
                                                        <div className="exam-grading-options-container">
                                                            {question.options.map((option) => {
                                                                const isCorrect = correctOptions.includes(option.optionId);
                                                                const isSelected = selectedOptions.includes(option.optionId);
                                                                const optionBackgroundColor = isCorrect ? 'rgb(0 202 14)' : (isSelected ? 'rgb(214 0 0)' : 'inherit');

                                                                return (
                                                                    <div
                                                                        key={option.optionId}
                                                                        className="exam-grading-option-row"
                                                                        style={{ color: optionBackgroundColor }}
                                                                    >
                                                                        <div className="exam-grading-option-label">
                                                                            {isSelected && isCorrect ? <FontAwesomeIcon icon={faCheck} color='rgb(0 202 14)' /> : isSelected ? <FontAwesomeIcon icon={faTimes} color='rgb(214 0 0)' /> : ''}
                                                                        </div>
                                                                        <div className="exam-grading-option-value">{option.optionText}</div>
                                                                        {response && (
                                                                            <div className="exam-grading-option-correct">
                                                                                {isSelected && isCorrect ? 'Correct' : isSelected ? 'Incorrect' : ''}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    ) : (
                                                        <div className="exam-grading-text">
                                                            <div className="exam-grading-text-answers">
                                                                {feedbacks.get(question.questionId)?.answerText || "Not answered."}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="exam-grading-review-label"> Grade Comments:</div>
                                                    <div className="exam-grading-flex">

                                                        <div className="exam-grading-text-comments">
                                                            <textarea
                                                                rows="2"
                                                                className="exam-grading-text-comments-field"
                                                                placeholder="No Comments Provided"
                                                                value={response?.gradeComments || ''}
                                                                disabled
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            }
                        </>
                    )}
            </div>
        </div>
    );

}


export default ViewExamGrade;
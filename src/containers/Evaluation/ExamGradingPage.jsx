import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserExamResponses } from "../../redux/reducers/ExamReducers";
import { getUserExamResponsesBySession, PostStudentExamGrades, saveUserFeedback, updateUserFeedback } from "../../redux/actions/ExamActions";
import { useNavigate, useParams } from "react-router-dom";
import { LoadingPage } from "../../components/Loading/Loading";
import './ExamGradingPage.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCross, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { toast } from "react-toastify";


const ExamGradingPage = (props) => {

    const { examId, examSession } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userResponses = useSelector((state) => state.exam.value.userExamResponses);
    const [examsData, setExamsData] = useState(null);  // Default to an empty object
    const [userResponse, setUserResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPoints, setTotalPoints] = useState(0);
    const [receivedPoints, setReceivedPoints] = useState(0);
    const [optionQuestionTypes, setOptionQuestionTypes] = useState(['MCQ', 'MSQ', 'TF'])
    const [feedback, setFeedback] = useState(undefined); // State to track feedback for each question
    const [prevFeedbacks, setPrevFeedbacks] = useState({}); // State to track
    const [isFeedbackChanges, setIsFeedbackChanges] = useState({});

    const filterAndMapResponses = (studentSession) => {
        setReceivedPoints(0)

        if (!examsData || !examsData?.respondedUsers) {
            const examsData = userResponses
        };

        const respondents = examsData.respondedUsers.filter(
            response => response.examRespondentSession === studentSession
        );

        if (!respondents.length) return; // Avoid errors if no respondent matches
        setTotalPoints(examsData.totalPoints);

        const respondentId = respondents[0].respondentId;
        const filteredResponses = examsData.studentResponses.filter(
            response => response.studentId === respondentId
        );

        setFeedback({})
        filteredResponses.forEach(response => {
            setReceivedPoints(prev => prev + (response?.pointsGained || 0));

            setFeedback((prevFeedback) => ({
                ...prevFeedback,
                [response.questionId]: {
                    ...prevFeedback[response.questionId],
                    choosenOptions: [
                        ...(prevFeedback[response.questionId]?.choosenOptions || []), // Spread existing options
                        response?.choosenOption, // Append the new option
                    ],
                    choosenOption: response?.choosenOption,
                    pointsGained: (prevFeedback[response.questionId]?.pointsGained || 0) + (response?.pointsGained || 0),
                    answerText: response?.answerText,
                    feedback: response?.feedback || "",
                    responseId: response?.responseId,
                    ...response?.feedback,
                },
            }));
            setPrevFeedbacks((prevFeedback) => ({
                ...prevFeedback,
                [response.questionId]: examsData?.studentResponses
                    ?.filter((res) => res.questionId === response.questionId)
                    ?.map((res) => res.feedback)
            }));
        });
    };

    useEffect(() => {
        const fetchExamSession = async () => {
            try {
                const response = await getUserExamResponsesBySession(examId, examSession);
                dispatch(saveUserExamResponses(response));
                setExamsData(response?.data);
            } catch (error) {
                console.error("Error fetching exam session: ", error);
            }
        };

        if (!userResponses) {
            fetchExamSession();
        }
    }, [examId, examSession, dispatch, userResponses]);

    useEffect(() => {
        if (userResponses) {
            setExamsData(userResponses);
        }
    }, [userResponses]);

    useEffect(() => {
        if (isLoading) {
            if (userResponses && examsData) {
                filterAndMapResponses(examSession);
            }
            if (feedback) {
                setIsLoading(false);
            }
        }
    }, [isLoading, userResponses, examsData, examSession, examId, feedback]);

    const handleSaveFeedback = async (data) => {
        try {
            const response = await saveUserFeedback(data);
            toast.success('Feedback Saved successfully!');
        } catch (error) {
            console.error('Error:', error);
            toast.error(error?.response?.data?.message);
        }
    };

    const handleUpdateFeedback = async (data) => {
        try {
            const response = await updateUserFeedback(data);
            toast.success('Feedback Updated Successfully!');
        } catch (error) {
            console.error('Error assigning users:', error);
            toast.error(error?.response?.data?.message);
        }
    };

    const saveQuestionFeedback = (question, feedback) => {
        if (feedback['feedbackId'] == null) {
            handleSaveFeedback({
                "responseId": feedback['responseId'],
                "feedback": feedback['feedback'],
                "isCorrect": feedback['isCorrect'],
                "gainedPoints": feedback['pointsGained']
            })
        } else {
            handleUpdateFeedback({
                ...feedback,
                "gainedPoints": feedback['pointsGained']
            });
        }
    }

    const handleFeedbackChange = (question, field, value) => {
        setFeedback((prevFeedback) => ({
            ...prevFeedback,
            [question.questionId]: {
                ...prevFeedback[question.questionId],
                [field]: value,
            },
        }));
        if (examsData.isResultsPublished === true) {
            saveQuestionFeedback(question, feedback[question?.questionId]);
        }
    };

    const handleFeedbackBlur = (question) => {
        let isChanges = false;
        if (prevFeedbacks[question.questionId][0] == null) {
            isChanges = true;
        }
        if (prevFeedbacks[question.questionId][0] && prevFeedbacks[question.questionId][0]['feedback'] !== feedback[question.questionId]['feedback']) {
            isChanges = true;
        }
        if (prevFeedbacks[question.questionId][0] && prevFeedbacks[question.questionId][0]['pointsGained'] !== String(feedback[question.questionId]['gainedPoints'])) {
            isChanges = true;
        }
        if (prevFeedbacks[question.questionId][0] && prevFeedbacks[question.questionId][0]['isCorrect'] !== String(feedback[question.questionId]['isCorrect'])) {
            isChanges = true;
        }
        setIsFeedbackChanges((prevChanges) => ({ ...prevChanges, [question.questionId]: isChanges }));
    };


    const handleUserGrades = async () => {
        try {
            const response = await PostStudentExamGrades(examSession);
            toast.success('Grades Saved Successfully!');
            if (response.data) {
                navigate(`/exam/${examId}/feedback`)
            }
        } catch (error) {
            console.error('Error Saving Student Grades :', error);
            toast.error(error?.response?.data?.message);
        }
    };

    const handlePostGrades = () => {
        handleUserGrades();
    }



    if (isLoading || !examsData || !feedback) {
        return <LoadingPage />
    }
    return (
        <div className="exam-grading-container">
            <header className="exam-grading-header">
                <h1>{examsData.title}</h1>
                <div className="exam-points">
                    Score: {receivedPoints}/{totalPoints}
                </div>
            </header>
            <div className="exam-grading-questions-container">
                {examsData.questions?.map((question) => {
                    const response = feedback[question.questionId];
                    const isMSQ = question.questionType === 'MSQ';
                    const selectedOptions = isMSQ
                        ? response?.choosenOptions || []
                        : [response?.choosenOption];

                    return (
                        <div key={question.questionId} className="exam-grading-question-card">
                            <div className="exam-grading-question-details">
                                <div className="exam-grading-detail-row">
                                    <div className="exam-grading-detail-value">{question.questionTitle}</div>
                                    <div className="exam-grading-points-details">
                                        <input
                                            type="number"
                                            value={response?.pointsGained || 0}
                                            className="exam-grading-points-input"
                                            onChange={(e) => handleFeedbackChange(question, 'pointsGained', e.target.value)}
                                            onBlur={(e) => handleFeedbackBlur(question)}
                                        />
                                        <div className="exam-grading-points-divider">/</div>
                                        <div className="exam-grading-question-total-points">{question.points}</div>
                                    </div>
                                </div>
                                {optionQuestionTypes.includes(question.questionType) ? (
                                    <div className="exam-grading-options-container">
                                        {question.options.map((option) => {
                                            const isCorrect = option.isCorrect;
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
                                            {feedback[question.questionId]?.answerText || "Not answered."}
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
                                            placeholder="Please Provide Gradding Comments/Feedback"
                                            value={feedback[question.questionId]?.feedback || ''}
                                            onChange={(e) => handleFeedbackChange(question, 'feedback', e.target.value)}
                                            onBlur={(e) => handleFeedbackBlur(question)}
                                        />
                                    </div>
                                    <button className="exam-grading-question-feedback-save"
                                        onClick={() => saveQuestionFeedback(question, response)}
                                        disabled={isFeedbackChanges[question.questionId] == false || isFeedbackChanges[question.questionId] == undefined}
                                    >
                                        <FontAwesomeIcon icon={faSave} className="green" /> Save
                                    </button>
                                </div>
                                <div>
                                    <div className="exam-grading-review-label"> Correct:</div>
                                    <div className="exam-grading-flex-correct">
                                        <div
                                            className={`icon-toggle check-icon ${feedback[question.questionId]?.isCorrect ? "active" : ""}`}
                                            onClick={(e) => handleFeedbackChange(question, 'isCorrect', true)}
                                            onChange={(e) => handleFeedbackChange(question, 'isCorrect', true)}
                                            onBlur={(e) => handleFeedbackBlur(question)}
                                            data-automation-id="icon-check"
                                        >
                                            <FontAwesomeIcon icon={faCheck} /> Correct
                                        </div>
                                        <div
                                            className={`icon-toggle times-icon ${!feedback[question.questionId]?.isCorrect ? "active" : ""}`}
                                            onClick={(e) => handleFeedbackChange(question, 'isCorrect', false)}
                                            onChange={(e) => handleFeedbackChange(question, 'isCorrect', true)}
                                            onBlur={(e) => handleFeedbackBlur(question)}
                                            data-automation-id="icon-times"
                                        >
                                            <FontAwesomeIcon icon={faTimes} /> Wrong
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="exam-grading-actions-container">
                <button className="exam-grading-publish-button"
                    disabled={examsData?.isResultsPublished}
                    onClick={() => handlePostGrades()}>Post Grades</button>
            </div>
        </div>
    );


}


export default ExamGradingPage;
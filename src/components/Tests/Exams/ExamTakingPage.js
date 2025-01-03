import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ExamTakingPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-regular-svg-icons';

const ExamTakingPage = (props) => {
    const { examSession, exam, saveUserResponse, finishExam } = props;
    const [timeLeft, setTimeLeft] = useState(parseInt((new Date(examSession?.endTime) - Date.now()) / (1000)))
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const questions = exam?.questions?.reduce((acc, question) => {
        acc[question?.questionId] = question
        return acc;
    }, {});

      const [userResponses, setUserResponses] = useState(() => {
        return examSession?.userResponses.reduce((acc, response) => {
          const questionId = response.questionId;
          const questionType = questions[questionId]?.questionType;
      
          if (!acc[questionId]) {
            acc[questionId] = ['MCQ', 'MSQ', 'TF'].includes(questionType) ? [] : "";
          }
      
          if (['MCQ', 'MSQ', 'TF'].includes(questionType)) {
            // Append the optionId for MCQ, MSQ, TF types
            acc[questionId].push(response?.optionId);
          } else {
            // Set the answerResponse for other types
            acc[questionId] = response.answerResponse;
          }
      
          return acc;
        }, {});
      });

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime == 180) {
                    clearInterval(timerInterval);
                    toast.warning('Time is up! Your responses are being submitted.');
                    return prevTime - 1;
                }
                if(prevTime == 5) {
                    toast.warning('Time is almost up! Auto submitting your responses.');
                    return prevTime - 1;
                }
                if(prevTime <= 1) {
                    handleSubmit();
                    return prevTime - 1;
                }
                return prevTime-1;
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [exam.duration]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(parseInt(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleOptionChange = (questionId, optionId, isChecked) => {
        const updatedResponses = { ...userResponses };
        const questionResponses = updatedResponses[questionId] || [];
        const questionType = exam.questions.find(q => q.questionId === questionId).questionType;

        if (questionType === 'MCQ' || questionType === 'TF') {
            updatedResponses[questionId] = [optionId]; // Single-select (radio)
        } else if (questionType === 'MSQ') {
            if (isChecked) {
                questionResponses.push(optionId);
            } else {
                const index = questionResponses.indexOf(optionId);
                if (index > -1) {
                    questionResponses.splice(index, 1);
                }
            }
            updatedResponses[questionId] = questionResponses; // Multi-select (checkbox)
        }

        setUserResponses(updatedResponses);
    };

    const handleTextChange = (questionId, value) => {
        setUserResponses(prev => ({ ...prev, [questionId]: value }));
    };

    const saveResponse = (questionId) => {
        const response = userResponses[questionId] || '';
        
        if (Array.isArray(response) && response.length > 0) {
            // If multiple options are selected, make separate API calls for each optionId
            // response.forEach(optionId => {
            if (response.length === 1) {
                const payload = {
                    examId: examSession?.exam?.examId,
                    questionId: questionId,
                    optionId: response[0],
                    msqOptions: response,
                    answerResponse: '',
                };
                saveUserResponse(payload);
            }
            else {
                const payload = {
                    examId: examSession?.exam?.examId,
                    questionId: questionId,
                    msqOptions: response,
                    answerResponse: '',
                };
                saveUserResponse(payload); 
            }
        } else {
            // Single response scenario (string or single optionId)
            const payload = {
                examId: examSession?.exam?.examId,
                questionId: questionId,
                answerResponse: response
            };
            saveUserResponse(payload);
        }
    };

    const navigateToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const handleNext = () => {
        if (currentQuestionIndex < exam.questions.length - 1) {
            saveResponse(exam.questions[currentQuestionIndex].questionId); // Save before moving to the next question
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSkip = () => {
        if (currentQuestionIndex < exam.questions.length - 1) {
            saveResponse(exam.questions[currentQuestionIndex].questionId); // Save before skipping
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            saveResponse(exam.questions[currentQuestionIndex].questionId); // Save before going back
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
        finishExam(exam.examId);
    };

    if (!examSession) {
        return <div>Loading...</div>;
    }

    return (
        <div className="test-taking-container">
            <header className="test-header">
                <h1>{examSession.exam.title}</h1>
                <div className='exam-data'>
                    <div className="exam-timer">Time Left: {formatTime(timeLeft)}</div>
                    <button className="exam-submit-button" onClick={handleSubmit}>Submit Test</button>
                </div>
            </header>
            <div className="exam-content">
                <aside className="question-index">
                    <h3>Questions</h3>
                    <div className="question-index-buttons">
                        {exam.questions.map((question, index) => (
                            <button
                                key={question.questionId}
                                className={`question-index-item ${currentQuestionIndex === index ? 'active' : ''}`}
                                onClick={() => navigateToQuestion(index)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </aside>
                <div className="questions-container">
                    {exam.questions[currentQuestionIndex] && (
                        <div className="question-card">
                            <div className='question-card-info'>
                                <h2 className='exam-question-title'>{exam.questions[currentQuestionIndex].questionTitle}</h2>
                                {exam.questions[currentQuestionIndex].questionDetails && (
                                    <p>{exam.questions[currentQuestionIndex].questionDetails}</p>
                                )}
                                <div className="options">
                                    {(() => {
                                        const question = exam.questions[currentQuestionIndex];
                                        const questionType = question.questionType;

                                        if (questionType === 'MCQ' || questionType === 'TF') {
                                            return question.options.map((option) => (
                                                <div key={option.optionId} className="option">
                                                    <label>
                                                        <input
                                                            type="radio"
                                                            name={`question-${question.questionId}`}
                                                            checked={userResponses[question.questionId]?.[0] === option.optionId}
                                                            onChange={() => handleOptionChange(question.questionId, option.optionId)}
                                                        />
                                                        {option.optionText}
                                                    </label>
                                                </div>
                                            ));
                                        } else if (questionType === 'MSQ') {
                                            return question.options.map((option) => (
                                                <div key={option.optionId} className="option">
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={userResponses[question.questionId]?.includes(option.optionId)}
                                                            onChange={(e) => handleOptionChange(question.questionId, option.optionId, e.target.checked)}
                                                        />
                                                        {option.optionText}
                                                    </label>
                                                </div>
                                            ));
                                        } else if (questionType === 'BLANK') {
                                            return (
                                                <input
                                                    className='question-answer-blank'
                                                    type="text"
                                                    placeholder="Type your answer here..."
                                                    value={userResponses[question.questionId] || ''}
                                                    onChange={(e) => handleTextChange(question.questionId, e.target.value)}
                                                />
                                            );
                                        } else if (questionType === 'SHORT') {
                                            return (
                                                <textarea
                                                    className='question-answer-short'
                                                    placeholder="Short answer..."
                                                    value={userResponses[question.questionId] || ''}
                                                    onChange={(e) => handleTextChange(question.questionId, e.target.value)}
                                                />
                                            );
                                        } else if (questionType === 'ESSAY') {
                                            return (
                                                <textarea
                                                    className='question-answer-essay'
                                                    placeholder="Type your essay here..."
                                                    value={userResponses[question.questionId] || ''}
                                                    onChange={(e) => handleTextChange(question.questionId, e.target.value)}
                                                    rows="5"
                                                />
                                            );
                                        }
                                        return null;
                                    })()}
                                </div>
                            </div>
                            <div className="navigation-buttons">
                                <button className='exam-action-btn previous' onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                                    <FontAwesomeIcon icon={faChevronLeft} /> Previous
                                </button>
                                <button className='exam-action-btn skip' onClick={handleSkip} disabled={currentQuestionIndex === exam.questions.length - 1}>
                                    Skip <FontAwesomeIcon icon={faStepForward} />
                                </button>
                                <button className='exam-action-btn save' onClick={() => saveResponse(exam.questions[currentQuestionIndex].questionId)}>
                                    <FontAwesomeIcon icon={faSave} /> Save
                                </button>
                                <button className='exam-action-btn next' onClick={handleNext} disabled={currentQuestionIndex === exam.questions.length - 1}>
                                    Next <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="exam-submission-button">
                        {currentQuestionIndex === exam.questions.length - 1 && (
                            <button className="exam-submit-button" onClick={handleSubmit}>Finish Test</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamTakingPage;
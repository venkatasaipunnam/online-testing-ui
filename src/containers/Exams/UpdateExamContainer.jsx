import React, { useEffect } from 'react';
import { Formik, ErrorMessage } from 'formik';
import './UpdateExamContainer.css';
import { createQuestion, createOption, getExamDetails, updateExamDetails, updateQuestionDetails, updateOptionDetails, deleteOption, deleteQuestion } from '../../redux/actions/ExamActions';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { saveExam } from '../../redux/reducers/ExamReducers';
import UpdateExamComponent from '../../components/Tests/Exams/UpdateExamComponent';

const UpdateExamContainer = () => {

    const [Submitting, setSubmitting] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { examId } = useParams();
    const [exam, setExam] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const cleanData = (data) => {
        var data = { ...data };
        if (data.questions === undefined || data.questions === null || data.questions.length === 0) {
            data.questions = [];
        } else {
            data?.questions?.forEach((question, index) => {
                if (question?.options === undefined) {
                    question.options = [];
                }
            });
        }
        // data.duration = "0" + String(data.duration / 60) + ":" + (data.duration % 60) + "0";
        return data;
    }

    useEffect(() => {
        const fetchExam = async () => {
            try {
                const response = await getExamDetails(examId);
                const data = cleanData(response.data);
                response.data = data;
                dispatch(saveExam(response));
                setExam(data);
            } catch (error) {
                console.error("Error : ", error);
            } finally {
                setIsLoading(false);
            }
        }
        if (isLoading) {
            if (!exam || exam === undefined) {
                fetchExam();
            } else {
                setExam(cleanData(exam));
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }, [isLoading, dispatch]);

    const validateExam = (values) => {
        console.log(values);

        const errors = {};
        if (values.title.trim().length === 0) {
            errors.examName = 'Required';
            toast.error('Exam name is required');
        }
        if (!values.duration) {
            errors.duration = 'Required';
            toast.error('Duration is required');
        }
        if (values.startTime > values.endTime) {
            errors.endTime = 'Start time must be before end time';
            toast.error('Start time must be before end time');
        }
        return errors;
    }

    const handleUpdateExam = (values) => {
        
        const updateExamData = async () => {
            try {
                const response = await updateExamDetails(values);
                if (response.status === 200) {
                    toast.success('Exam updated successfully.');
                    // Update the question options in the exam
                    const data = cleanData(values);
                
                    dispatch(saveExam({data:  data }));
                    setExam(values);
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        }
        const errors = validateExam(values);
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            updateExamData();
        }
    };

    const handleUpdateQuestion = (values) => {
        if (!('examId' in values) ){
            values['examId'] = exam.examId;
        }
        const updateQuestionData = async () => {
            try {
                const response = await updateQuestionDetails(values);
                if (response.status === 200) {
                    toast.success('Question updated successfully.');
                    // Update the question options in the exam
                    const updatedQuestions = exam.questions.map(question => question?.questionId === values.questionId? values : question);
                    dispatch(saveExam({data: {...exam, questions: updatedQuestions }}));
                    setExam({...exam, questions: updatedQuestions });
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        }
        updateQuestionData();
    };

    const handleCreateQuestion = (values) => {
        if (!('examId' in values) ){
            values['examId'] = exam.examId;
        }
        const createQuestionData = async () => {
            try {
                const response = await updateQuestionDetails(values);
                if (response.status === 200) {
                    toast.success('Question Created Successfully.');
                    // Update the question options in the exam
                    const questionData = response.data;
                    const updatedQuestions = [...exam.questions.filter(question => question?.questionId), questionData];
                    dispatch(saveExam({data: {...exam, questions: updatedQuestions }}));
                    setExam({...exam, questions: updatedQuestions });
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        }
        createQuestionData();
    };

    const handleUpdateOption = (questionId, values) => {
        if (!('questionId' in values) ){
            values['questionId'] = questionId;
        }
        const updateQuestionOption = async () => {
            try {
                const response = await updateOptionDetails(values);
                if (response.status === 200) {
                    toast.success('Option updated successfully.');
                    // Update the question options in the exam
                    const updatedQuestions = exam.questions.map(question => {
                        if (question.questionId === questionId) {
                            // exam.questions.map(question => question?.questionId === values.questionId? values : question);
                            return {...question, options: question.options.map(option => option?.optionId === values.optionId ? values : option)};
                        }
                        return question;
                    });
                    dispatch(saveExam({data: {...exam, questions: updatedQuestions }}));
                    setExam({...exam, questions: updatedQuestions });
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        }
        updateQuestionOption();
    };

    const handleCreateOption = (questionId, values) => {
        values['questionId'] = questionId;
        values['optionType'] = "CHOOSE"
        // Logic for creating the exam can be added here
        const createQuestionOption = async () => {
            try {
                const response = await createOption(values);
                if (response.status === 200) {
                    toast.success('Option created successfully.');
                    const responseData = response.data;
                    // Update the question options in the exam
                    const updatedQuestions = exam.questions.map(question => {
                        if (question.questionId === questionId) {
                            return {...question, options: [...question.options.filter(option => option?.optionId), responseData]};
                        }
                        return question;
                    });
                    setExam({...exam, questions: updatedQuestions });
                    dispatch(saveExam({data: exam}));
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        }
        createQuestionOption();
    };

    const handleDeleteQuestion = (questionId) => {
        console.log('Deleting Question at index:', questionId);
        const deleteExamQuestion = async () => {
            try {
                const response = await deleteQuestion(questionId);
                if (response.status === 200) {
                    toast.success('Question deleted successfully.');
                    // Deleting the question options in the exam
                    setExam({...exam, questions: [...exam.questions.filter(question => question?.questionId!== questionId)] });
                    dispatch(saveExam({data: exam}));
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        }
        deleteExamQuestion();
    };

    const handleDeleteOption = (questionId, optionId) => {
        console.log('Deleting Option at question index:',optionId);
        const deleteQuestionOption = async () => {
            try {
                const response = await deleteOption(optionId);
                if (response.status === 200) {
                    toast.success('Option deleted successfully.');
                    // Deleting the question options in the exam
                    const updatedQuestions = exam.questions.map(question => {
                        if (question.questionId === questionId) {
                            return {...question, options: [...question.options.filter(option => option?.optionId!== optionId)]};
                        }
                        return question;
                    });
                    setExam({...exam, questions: updatedQuestions });
                    dispatch(saveExam({data: exam}));
                }
            } catch (error) {
                console.error("Error : ", error);
            }
        }
        deleteQuestionOption();
    };

    const validateOptions = (question, option, changeName, changeValue) => {

        if (changeName === 'isCorrect') {
            if (question.questionType === 'MCQ' || question.questionType === 'TF') {
                let correctOptionsCount = question.options.filter(option => option.isCorrect).length;
                if (correctOptionsCount >= 1 && changeValue) {
                    toast.error('Only one correct option can be selected.');
                    return false;
                }
            } 
        }
        if (changeName === 'optionText') {
            let optionTexts = question.options.map(option => option.optionText);
            if (optionTexts.includes(changeValue)) {
                toast.error('Option text must be unique.');
                return false;
            }
        }
        return true;
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="exam-create-container">
            <h1>Update Exam</h1>
            <p>Update only the fields need to be updated in exam.</p>
            <Formik
                initialValues={exam}
                onSubmit={handleUpdateExam}
                enableReinitialize
            >
                {({ values, setFieldValue, handleChange }) => (
                    <UpdateExamComponent
                        values={values}
                        setFieldValue={setFieldValue}
                        handleChange={handleChange}
                        handleCreateQuestion={handleCreateQuestion}
                        handleCreateOption={handleCreateOption}
                        handleUpdateQuestion={handleUpdateQuestion}
                        handleUpdateOption={handleUpdateOption}
                        handleDeleteQuestion={handleDeleteQuestion}
                        handleDeleteOption={handleDeleteOption}
                        handleUpdateExam={handleUpdateExam}
                        validateOptions={validateOptions}
                        exam={exam}
                    />
                )}
            </Formik >
        </div >
    );
};

export default UpdateExamContainer;
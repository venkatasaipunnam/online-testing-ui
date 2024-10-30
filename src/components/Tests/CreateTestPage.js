import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import ExamComponent from './Exams/ExamComponent';
import QuestionComponent from './Questions/QuestionComponent';
import './CreateTestPage.css';

const CreateTestPage = () => {
    const initialValues = {
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        duration: 0,
        totalPoints: 0,
        autoGrade: true,
        status: '',
        questions: [
            {
                questionTitle: '',
                questionDetails: '',
                questionImagePath: '',
                questionType: 'multiple',
                points: 0,
                options: [{ optionText: '', optionImagePath: '', optionType: 'text', isCorrect: false }],
            }
        ]
    };

    const handleSubmit = (values) => {
        console.log(JSON.stringify(values, null, 2));
    };

    return (
        <div className='create-test'>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <ExamComponent
                            testData={values}
                            handleChange={handleChange}
                        />
                        <FieldArray name="questions">
                            {({ push, remove }) => (
                                <>
                                    {values.questions.map((question, index) => (
                                        <QuestionComponent
                                            key={index}
                                            questionData={question}
                                            index={index}
                                            onChange={(updatedQuestion) => {
                                                const updatedQuestions = [...values.questions];
                                                updatedQuestions[index] = updatedQuestion;
                                                handleChange({ target: { name: 'questions', value: updatedQuestions } });
                                            }}
                                            remove={() => remove(index)}
                                        />
                                    ))}
                                    <button type="button" onClick={() => push({ questionTitle: '', questionDetails: '', questionImagePath: '', questionType: 'multiple', points: 0, options: [{ optionText: '', optionImagePath: '', optionType: 'text', isCorrect: false }] })}>
                                        Add Question
                                    </button>
                                </>
                            )}
                        </FieldArray>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default CreateTestPage;
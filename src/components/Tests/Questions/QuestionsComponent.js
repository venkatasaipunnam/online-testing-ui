import React, { useEffect, useState } from 'react';
import { Field, FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSave, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import OptionsComponent from '../Options/OptionsComponent';
import { useSelector } from 'react-redux';

const QuestionsComponent = (props) => {

    const { exam, values, handleChange, validateOptions, handleCreateQuestion, handleUpdateQuestion, handleUpdateOption, handleDeleteQuestion, handleDeleteOption, handleCreateOption } = props
    const [isEditMode, setIsEditMode] = useState({});
    const [isFieldChanged, setIsFieldChanged] = useState({});
    let examData = useSelector((state) => state.exam?.value?.exam);
    const [questions, setQuestions] = useState(examData?.questions);

    useEffect(() => {
        setQuestions(examData?.questions);
    }, [questions, isFieldChanged, isEditMode, examData]);

    const handleIsChanges = ({ question, questionIndex, isReset }) => {
        let isChanged = false;
        if (isReset) {
            handleChange({ target: { name: `questions.${questionIndex}.questionTitle`, value: questions[questionIndex]?.questionTitle } })
            handleChange({ target: { name: `questions.${questionIndex}.questionDetails`, value: questions[questionIndex]?.questionDetails } })
            handleChange({ target: { name: `questions.${questionIndex}.questionType`, value: questions[questionIndex]?.questionType } })
            handleChange({ target: { name: `questions.${questionIndex}.points`, value: questions[questionIndex]?.points } })
            handleChange({ target: { name: `questions.${questionIndex}.options`, value: questions[questionIndex]?.options } })
            setIsFieldChanged({});
        } else {
            if (questions[questionIndex]?.questionTitle !== question?.questionTitle ||
                questions[questionIndex]?.questionDetails !== question?.questionDetails ||
                questions[questionIndex]?.questionType !== question?.questionType ||
                questions[questionIndex]?.points !== question?.points
            ) {
                isChanged = true;
            } else {
                setIsFieldChanged({});
            }
            if (!(questionIndex in questions)) {
                isChanged = true;
            }
            return isChanged;
        }
    }

    return (
        <div className="questions-container" >
            <h2>Questions</h2>
            <FieldArray name="questions">
                {({ push, remove }) => (
                    <>
                        {values.questions.map((question, index) => (
                            <div className="question-item" key={index}>
                                <div className='question-headers'>
                                    <h3 >Question {index + 1}</h3>
                                    <div className='column-fields'>
                                        {!isEditMode[index] &&
                                            <FontAwesomeIcon className="btn-add-option edit-question-button" title='Edit Question' icon={faEdit} onClick={() => {
                                                setIsEditMode({ ...isEditMode, [index]: !isEditMode[index] });
                                            }} />
                                        }
                                        {isEditMode[index] && <FontAwesomeIcon icon={faSave} className="btn-add-option save-question-button" title="Save Question" onClick={() => {
                                            const isChanged = handleIsChanges({ question: question, questionIndex: index })
                                            if (isChanged) {
                                                if (question?.questionId) {
                                                    handleUpdateQuestion(question);
                                                    setIsFieldChanged({});
                                                } else {
                                                    handleCreateQuestion(question);
                                                    setIsFieldChanged({});
                                                }
                                            }
                                            setIsEditMode({ ...isEditMode, [index]: !isEditMode[index] })
                                        }}
                                        />
                                        }
                                        {isEditMode[index] &&
                                            <FontAwesomeIcon icon={faTimes} className="btn-cancel cancel-question-button" title="Cancel Edit" onClick={() => {
                                                handleIsChanges({ questionIndex: index, isReset: true });
                                                setIsEditMode({ ...isEditMode, [index]: !isEditMode[index] });
                                            }} />
                                        }
                                        <FontAwesomeIcon icon={faTrashAlt} className="btn-remove-option remove-question-button" title='Delete Question' onClick={() => {
                                            if (question?.questionId) {
                                                handleDeleteQuestion(question?.questionId);
                                            }
                                            remove(index);
                                        }} />
                                    </div>

                                </div>

                                <div className="form-group">
                                    <label htmlFor={`questions.${index}.questionTitle`}>Question Title</label>
                                    <Field
                                        type="text"
                                        id={`questions.${index}.questionTitle`}
                                        name={`questions.${index}.questionTitle`}
                                        placeholder="Enter question title"
                                        disabled={!isEditMode[index]}
                                        onChange={(e) => {
                                            handleIsChanges({ questionIndex: index, field: 'questionTitle', value: e.target.value })
                                            handleChange({ target: { name: `questions.${index}.questionTitle`, value: e.target.value } })
                                        }
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor={`questions.${index}.questionDetails`}>Question Details</label>
                                    <Field as="textarea"
                                        id={`questions.${index}.questionDetails`}
                                        name={`questions.${index}.questionDetails`}
                                        placeholder="Enter question Details"
                                        disabled={!isEditMode[index]}
                                        onChange={(e) => {
                                            handleIsChanges({ questionIndex: index, field: 'questionDetails', value: e.target.value })
                                            handleChange({ target: { name: `questions.${index}.questionDetails`, value: e.target.value } })
                                        }
                                        }
                                    />
                                </div>
                                <div className='form-group column-fields'>

                                    <div className="form-group">
                                        <label htmlFor={`questions.${index}.questionType`}>Question Type</label>
                                        <Field
                                            as="select"
                                            id={`questions.${index}.questionType`}
                                            name={`questions.${index}.questionType`}
                                            disabled={!isEditMode[index]}
                                            onChange={(e) => {
                                                handleIsChanges({ questionIndex: index, field: 'questionType', value: e.target.value })
                                                handleChange({ target: { name: `questions.${index}.questionType`, value: e.target.value } })
                                            }
                                            }

                                        >
                                            <option value="MCQ">Single Choice</option>
                                            <option value="MSQ">Multiple Choice</option>
                                            <option value="TF">True/False</option>
                                            <option value="ESSAY">Essay</option>
                                            <option value="BLANK">Fill In Blank</option>
                                            <option value="SHORT">Short Answer</option>
                                        </Field>
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor={`questions.${index}.points`}>Points</label>
                                        <Field
                                            type="number"
                                            id={`questions.${index}.points`}
                                            name={`questions.${index}.points`}
                                            placeholder="Enter points"
                                            disabled={!isEditMode[index]}
                                            onChange={(e) => {
                                                handleIsChanges({ questionIndex: index, field: 'points', value: e.target.value })
                                                handleChange({ target: { name: `questions.${index}.points`, value: e.target.value } })
                                            }
                                            }
                                        />
                                    </div>
                                </div>
                                <OptionsComponent
                                    handleUpdateOption={handleUpdateOption}
                                    handleDeleteOption={handleDeleteOption}
                                    handleCreateOption={handleCreateOption}
                                    question={question}
                                    index={index}
                                    handleChange={handleChange}
                                    validateOptions={validateOptions}
                                    exam={exam}
                                />
                            </div>
                        ))}
                        {values.questions.length > 0 && (<div className='form-group no-question-add-question'>
                            <button type="button" className="btn-add-question add-question-button"
                                onClick={() => {
                                    push({ questionTitle: '', questionDetails: '', questionType: 'MCQ', points: 0, options: [] })
                                    setIsEditMode({ ...isEditMode, [values.questions.length]: !isEditMode[values.questions.length] })
                                }
                                }>
                                Add New Question
                            </button>
                        </div>)}
                        {values.questions.length === 0 && (
                            <div className='form-group column-fields no-questions'>
                                <div className="no-questions-added">
                                    No questions have been added yet.
                                </div>
                                <div className='form-group no-question-add-question'>
                                    <button type="button" className="btn-add-question add-question-button"
                                        onClick={() => {
                                            push({ questionTitle: '', questionDetails: '', questionType: 'MCQ', points: 0, options: [] })
                                            setIsEditMode({ ...isEditMode, [values.questions.length]: !isEditMode[values.questions.length] })
                                        }
                                        }>
                                        Add New Question
                                    </button>
                                </div>
                            </div>
                        )}

                    </>
                )}
            </FieldArray>
        </div >
    );
};

export default QuestionsComponent;
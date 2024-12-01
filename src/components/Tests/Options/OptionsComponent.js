import React, { useEffect, useState } from 'react';
import { Field, FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTimes, faPlus, faSave, faEdit } from '@fortawesome/free-solid-svg-icons';
import { shallowEqual, useSelector } from 'react-redux';

const OptionsComponent = (props) => {
    const { handleUpdateOption, handleDeleteOption, handleCreateOption, question, index, handleChange, validateOptions, exam } = props
    const [isEditMode, setIsEditMode] = useState({});
    const [isFieldChanged, setIsFieldChanged] = useState({});
    let examData = useSelector((state) => state.exam?.value?.exam);
    const [options, setOptions] = useState(examData?.questions[index]?.options);

    useEffect(() => {
        setOptions(examData?.questions[index]?.options);
    }, [options, isFieldChanged, isEditMode, examData]);

    const handleIsChanges = ({ optionIndex, field, value, isReset }) => {
        let isChanged = false;
        if (isReset) {
            handleChange({ target: { name: `questions.${index}.options.${optionIndex}.optionText`, value: options ? options[optionIndex]?.optionText : '' } })
            handleChange({ target: { name: `questions.${index}.options.${optionIndex}.isCorrect`, value: options ? options[optionIndex]?.isCorrect : '' } })
            setIsFieldChanged({});
        } else {
            if (!options || !(optionIndex in options)) {
                isChanged = true;
                return isChanged;
            }
            if (field === 'isCorrect') {
                if (options && options[optionIndex]?.isCorrect !== value) {
                    setIsFieldChanged({ ...isFieldChanged, [optionIndex]: true });
                    isChanged = true;
                } else {
                    setIsFieldChanged({ ...isFieldChanged, [optionIndex]: false });
                }
            } else if (field === 'optionText') {
                if (options && options[optionIndex]?.optionText !== value) {
                    setIsFieldChanged({ ...isFieldChanged, [optionIndex]: true });
                    isChanged = true;
                } else {
                    setIsFieldChanged({ ...isFieldChanged, [optionIndex]: false });
                }
            }
            return isChanged;
        }
    }
    return (
        < div className="options-container" >

            {/* Disable options for other types */}
            {['ESSAY', 'BLANK', 'SHORT'].includes(question?.questionType) && (
                <div className="options-disabled">
                    <p>Options are not applicable for this question type.</p>
                </div>
            )}


            {/* Options Section */}
            {['MCQ', 'MSQ', 'TF'].includes(question?.questionType) && (<div className="options-container">
                <h4>Options</h4>
                <FieldArray name={`questions.${index}.options`}>
                    {({ push: pushOption, remove: removeOption }) => (
                        <>
                            {question?.options?.map((option, optionIndex) => (
                                <div className="option-item" key={optionIndex}>
                                    <div className="form-group option-text">
                                        <Field
                                            type="text"
                                            disabled={!isEditMode[optionIndex]}
                                            id={`questions.${index}.options.${optionIndex}.optionText`}
                                            name={`questions.${index}.options.${optionIndex}.optionText`}
                                            placeholder="Enter option text"
                                            onChange={(e) => {
                                                handleIsChanges({ optionIndex: optionIndex, field: 'optionText', value: e.target.value })
                                                handleChange({ target: { name: `questions.${index}.options.${optionIndex}.optionText`, value: e.target.value } })
                                            }
                                            }
                                            onBlur={(e) => {
                                                const isChanged = handleIsChanges({ optionIndex: optionIndex, field: 'optionText', value: e.target.value })
                                                if (isChanged) {
                                                    if (option?.optionId) {
                                                        handleUpdateOption(question?.questionId, option);
                                                        setIsFieldChanged({ ...isFieldChanged, [optionIndex]: false });
                                                        setIsEditMode({ ...isEditMode, [optionIndex]: false });
                                                    } else {
                                                        handleCreateOption(question?.questionId, option);
                                                        setIsFieldChanged({ ...isFieldChanged, [optionIndex]: false });
                                                        setIsEditMode({ ...isEditMode, [optionIndex]: false });
                                                    }
                                                }
                                            }}

                                        />
                                    </div>
                                    <div className="form-row is-correct-switch-toggle form-group">
                                        <span className="switch-label">Correct</span>
                                        <label className="custom-switch" data-automation-id="toggle-iscorrect">
                                            <Field
                                                type="checkbox"
                                                disabled={!isEditMode[optionIndex]}
                                                name={`questions.${index}.options.${optionIndex}.isCorrect`}
                                                checked={option?.isCorrect}
                                                onBlur={(e) => {
                                                    const isChanged = handleIsChanges({ optionIndex: optionIndex, field: 'isCorrect', value: e.target.checked })
                                                    if (isChanged) {
                                                        if (option?.optionId) {
                                                            handleUpdateOption(question.questionId, option);
                                                            setIsFieldChanged({ ...isFieldChanged, [optionIndex]: false });
                                                            setIsEditMode({ ...isEditMode, [optionIndex]: false });
                                                        } else {
                                                            handleCreateOption(question.questionId, option);
                                                            setIsFieldChanged({ ...isFieldChanged, [optionIndex]: false });
                                                            setIsEditMode({ ...isEditMode, [optionIndex]: false });
                                                        }
                                                    }
                                                }}
                                                onChange={(e) => {
                                                    const isValidated = validateOptions(question, option, 'isCorrect', e.target.checked);
                                                    if (isValidated) {
                                                        handleIsChanges({ optionIndex: optionIndex, field: 'isCorrect', value: e.target.checked })
                                                        handleChange({ target: { name: `questions.${index}.options.${optionIndex}.isCorrect`, value: e.target.checked } })
                                                        // if (option.optionId) {
                                                        //     handleUpdateOption(question.questionId, option);
                                                        // } 
                                                        // else {
                                                        //     handleCreateOption(question.questionId, option);
                                                        // }
                                                    }
                                                }
                                                }
                                                data-automation-id="option_iscorrect-toggle-input"
                                            />
                                            <span className="custom-slider"></span>
                                        </label>
                                    </div>
                                    {!isEditMode[optionIndex] &&
                                        <button type="button" className="btn-add-option add-option-button" title='Edit Option' onClick={() => {
                                            setIsEditMode({ ...isEditMode, [optionIndex]: !isEditMode[optionIndex] });
                                        }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    }
                                    {/* {isFieldChanged[optionIndex] &&
                                        <button type="button" className="btn-add-option add-option-button" title="Save Option" onClick={() => {
                                            handleUpdateOption(question, option)
                                            setIsEditMode({ ...isEditMode, [optionIndex]: !isEditMode[optionIndex] });
                                        }}>
                                            <FontAwesomeIcon icon={faSave} />
                                        </button>
                                    } */}
                                    {isEditMode[optionIndex] &&
                                        <button type="button" className="btn-cancel" title="Cancel Edit" onClick={() => {
                                            handleIsChanges({ optionIndex: optionIndex, isReset: true });
                                            setIsEditMode({ ...isEditMode, [optionIndex]: !isEditMode[optionIndex] });
                                        }}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    }
                                    <button type="button" className="btn-remove-option remove-option-button" title='Delete Option' onClick={() => {
                                        if (option.optionId) {
                                            handleDeleteOption(question?.questionId, option?.optionId);
                                        }
                                        removeOption(optionIndex);
                                    }
                                    }>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </div>
                            ))}
                            <div className='form-group no-question-add-question'>
                                <button type="button" className="btn-add-question add-question-button"
                                disabled={ question.questionType === 'TF' && question?.options?.length >=2}
                                    onClick={() => {
                                        handleCreateOption(question?.questionId, { optionText: '', isCorrect: false, isEdit: true })
                                        setIsEditMode({ ...isEditMode, [question?.options?.length]: !isEditMode[question?.options?.length] });
                                        pushOption({ optionText: '', isCorrect: false })
                                    }}>
                                    Add Options
                                </button>
                            </div>
                        </>

                    )}
                </FieldArray>

            </div>
            )}
        </div >
    );
};

export default OptionsComponent;
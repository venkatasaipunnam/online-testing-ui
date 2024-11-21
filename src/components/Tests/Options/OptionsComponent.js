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
            handleChange({ target: { name: `questions.${index}.options.${optionIndex}.optionText`, value: options[optionIndex]?.optionText } })
            handleChange({ target: { name: `questions.${index}.options.${optionIndex}.isCorrect`, value: options[optionIndex]?.isCorrect } })
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
            {question.questionType === 'TF' && (
                <div className="options-container">
                    <h4>Options</h4>
                    <FieldArray name={`questions.${index}.options`}>
                        {({ push: pushOption, remove: removeOption }) => (
                            <>
                                <div className="option-item" key="true">
                                    <Field
                                        type="text"
                                        id={`questions.${index}.options.0.optionText`}
                                        name={`questions.${index}.options.0.optionText`}
                                        placeholder="True"
                                        disabled={!isEditMode[0]}
                                        onChange={(e) => {
                                            handleIsChanges({ optionIndex: 0, field: 'optionText', value: e.target.value })
                                            handleChange({ target: { name: `questions.${index}.options.${0}.optionText`, value: e.target.value } })
                                        }
                                        }
                                        onBlur={(e) => {
                                            const isChanged = handleIsChanges({ optionIndex: 0, field: 'optionText', value: e.target.value })
                                            if (isChanged) {
                                                if (question.options[0]?.optionId) {
                                                    console.log(question, question.options[0])
                                                    handleUpdateOption(question.questionId, question.options[0]);
                                                    setIsFieldChanged({ ...isFieldChanged, [0]: false });
                                                    setIsEditMode({ ...isEditMode, [0]: false });
                                                } else {
                                                    handleCreateOption(question.questionId, question.options[0]);
                                                    setIsFieldChanged({ ...isFieldChanged, [0]: false });
                                                    setIsEditMode({ ...isEditMode, [0]: false });
                                                }
                                            }
                                        }}
                                    />
                                    <Field type="checkbox" name={`questions.${index}.options.0.isCorrect`} disabled={!isEditMode[0]}
                                        onChange={(e) => {
                                            const isValidated = validateOptions(question, question.options[0], 'isCorrect', !question.options[0].isCorrect);
                                            if (isValidated) {
                                                handleIsChanges({ optionIndex: 0, field: 'isCorrect', value: !question.options[0].isCorrect })
                                                handleChange({ target: { name: `questions.${index}.options.${0}.isCorrect`, value: !question.options[0].isCorrect } })
                                            }
                                        }
                                        }
                                        onBlur={(e) => {
                                            const isChanged = handleIsChanges({ optionIndex: 0, field: 'isCorrect', value: e.target.value })
                                            if (isChanged) {
                                                if (question.options[0]?.optionId) {
                                                    console.log(question, question.options[0])
                                                    handleUpdateOption(question.questionId, question.options[0]);
                                                    setIsFieldChanged({ ...isFieldChanged, [0]: false });
                                                    setIsEditMode({ ...isEditMode, [0]: false });
                                                } else {
                                                    handleCreateOption(question.questionId, question.options[0]);
                                                    setIsFieldChanged({ ...isFieldChanged, [0]: false });
                                                    setIsEditMode({ ...isEditMode, [0]: false });
                                                }
                                            }
                                        }} />
                                    <label>Correct</label>
                                    {!isEditMode[0] &&
                                        <button type="button" className="btn-add-option add-option-button" title='Edit Option' onClick={() => {
                                            setIsEditMode({ ...isEditMode, [0]: !isEditMode[0] });
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
                                    {isEditMode[0] &&
                                        <button type="button" className="btn-cancel" title="Cancel Edit" onClick={() => {
                                            handleIsChanges({ optionIndex: 0, isReset: true });
                                            setIsEditMode({ ...isEditMode, [0]: !isEditMode[0] });
                                        }}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    }
                                </div>
                                <div className="option-item" key="false">
                                    <Field type="text"
                                        disabled={!isEditMode[1]}
                                        id={`questions.${index}.options.1.optionText`}
                                        name={`questions.${index}.options.1.optionText`}
                                        placeholder="False"
                                        onChange={(e) => {

                                            handleIsChanges({ optionIndex: 1, field: 'optionText', value: e.target.value })
                                            handleChange({ target: { name: `questions.${index}.options.${1}.optionText`, value: e.target.value } })
                                        }
                                        }
                                        onBlur={(e) => {
                                            const isChanged = handleIsChanges({ optionIndex: 1, field: 'optionText', value: e.target.value })
                                            if (isChanged) {
                                                if (question.options[1]?.optionId) {
                                                    console.log(question, question.options[1])
                                                    handleUpdateOption(question.questionId, question.options[1]);
                                                    setIsFieldChanged({ ...isFieldChanged, [1]: false });
                                                    setIsEditMode({ ...isEditMode, [1]: false });
                                                } else {
                                                    handleCreateOption(question.questionId, question.options[1]);
                                                    setIsFieldChanged({ ...isFieldChanged, [1]: false });
                                                    setIsEditMode({ ...isEditMode, [1]: false });
                                                }
                                            }
                                        }}
                                    />
                                    <Field type="checkbox" disabled={!isEditMode[1]} name={`questions.${index}.options.1.isCorrect`}
                                        onChange={(e) => {
                                            const isValidated = validateOptions(question, question.options[1], 'isCorrect', !question.options[1].isCorrect);
                                            if (isValidated) {

                                                handleIsChanges({ optionIndex: 1, field: 'isCorrect', value: !question.options[1].isCorrect })
                                                handleChange({ target: { name: `questions.${index}.options.${1}.isCorrect`, value: !question.options[1].isCorrect } })
                                            }
                                        }
                                        }
                                        onBlur={(e) => {
                                            const isChanged = handleIsChanges({ optionIndex: 1, field: 'isCorrect', value: e.target.value })
                                            if (isChanged) {
                                                if (question.options[1]?.optionId) {
                                                    handleUpdateOption(question.questionId, question.options[1]);
                                                    setIsFieldChanged({ ...isFieldChanged, [1]: false });
                                                    setIsEditMode({ ...isEditMode, [1]: false });
                                                } else {
                                                    handleCreateOption(question.questionId, question.options[1]);
                                                    setIsFieldChanged({ ...isFieldChanged, [1]: false });
                                                    setIsEditMode({ ...isEditMode, [1]: false });
                                                }
                                            }
                                        }} />
                                    <label>Correct</label>
                                    {!isEditMode[1] &&
                                        <button type="button" className="btn-add-option add-option-button" title='Edit Option' onClick={() => {
                                            setIsEditMode({ ...isEditMode, [1]: !isEditMode[1] });
                                        }}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    }
                                    {/* {isFieldChanged[1] &&
                                        <button type="button" className="btn-add-option add-option-button" title="Save Option" onClick={() => {
                                            handleUpdateOption(question, question.options[1])
                                            setIsEditMode({ ...isEditMode, [1]: !isEditMode[1] });
                                        }}>
                                            <FontAwesomeIcon icon={faSave} />
                                        </button>
                                    } */}
                                    {isEditMode[1] &&
                                        <button type="button" className="btn-cancel" title="Cancel Edit" onClick={() => {
                                            handleIsChanges({ optionIndex: 1, isReset: true });
                                            setIsEditMode({ ...isEditMode, [1]: !isEditMode[1] });
                                        }}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    }

                                </div>
                            </>
                        )}
                    </FieldArray>
                </div>
            )}

            {/* Disable options for other types */}
            {['ESSAY', 'BLANK', 'SHORT'].includes(question.questionType) && (
                <div className="options-disabled">
                    <p>Options are not applicable for this question type.</p>
                </div>
            )}


            {/* Options Section */}
            {['MCQ', 'MSQ'].includes(question.questionType) && (<div className="options-container">
                <h4>Options</h4>
                <FieldArray name={`questions.${index}.options`}>
                    {({ push: pushOption, remove: removeOption }) => (
                        <>
                            {question.options.map((option, optionIndex) => (
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
                                                        console.log(question, option)
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

                                        />
                                    </div>
                                    <div className="form-row is-correct-switch-toggle form-group">
                                        <span className="switch-label">Correct</span>
                                        <label className="custom-switch" data-automation-id="toggle-iscorrect">
                                            <Field
                                                type="checkbox"
                                                disabled={!isEditMode[optionIndex]}
                                                name={`questions.${index}.options.${optionIndex}.isCorrect`}
                                                checked={option.isCorrect}
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
                                            handleDeleteOption(question.questionId, option?.optionId);
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
                                    onClick={() => {
                                        handleCreateOption(question.questionId, { optionText: '', isCorrect: false, isEdit: true })
                                        setIsEditMode({ ...isEditMode, [question.options.length]: !isEditMode[question.options.length] });
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
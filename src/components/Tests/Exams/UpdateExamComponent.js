import React, { useEffect, useState } from 'react';
import { Form, Field, FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSave, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import QuestionsComponent from '../Questions/QuestionsComponent';
import { useSelector } from 'react-redux';

const UpdateExamComponent = (props) => {

    const [isFormEditMode, setIsFormEditMode] = useState(false);
    const { exam, values, setFieldValue, validateOptions, handleChange, handleCreateQuestion, handleUpdateQuestion, handleUpdateOption, handleDeleteQuestion, handleDeleteOption, handleUpdateExam, handleCreateOption } = props

    const [isEditMode, setIsEditMode] = useState(false);
    const [isFieldChanged, setIsFieldChanged] = useState(false);
    let examData = useSelector((state) => state.exam?.value?.exam);
    const [savedExam, setSavedExam] = useState(examData);

    useEffect(() => {
        setSavedExam(examData);
    }, [savedExam, isFieldChanged, isEditMode, examData]);

    const handleIsChanges = ({ updatedExam, isReset }) => {
        let isChanged = false;
        if (isReset) {
            handleChange({ target: { name: `title`, value: savedExam.title } })
            handleChange({ target: { name: `description`, value: savedExam.description } })
            handleChange({ target: { name: `startTime`, value: savedExam.startTime } })
            handleChange({ target: { name: `endTime`, value: savedExam.endTime } })
            handleChange({ target: { name: `duration`, value: savedExam.duration } })
            handleChange({ target: { name: `totalPoints`, value: savedExam.totalPoints } })
            handleChange({ target: { name: `autoGrade`, value: savedExam.autoGrade } })
            setIsFieldChanged({});
        } else {
            if (savedExam.title !== updatedExam.title ||
                savedExam.description !== updatedExam.description ||
                savedExam.startTime !== updatedExam.startTime ||
                savedExam.endTime !== updatedExam.endTime ||
                savedExam.duration !== updatedExam.duration ||
                savedExam.totalPoints !== updatedExam.totalPoints ||
                savedExam.autoGrade !== updatedExam.autoGrade
            ) {
                console.log("isupdated")
                setIsFieldChanged(true);
            } else {
                setIsFieldChanged(false);
            }
            if (!(updatedExam?.examId)) {
                isChanged = true;
                setIsEditMode(true);
            }
        }
    }

    return (
        <Form>
            {/* Exam Details Section */}
            <div className="exam-details-container">
                <h2>Exam Details</h2>
                <div className='exam-action-container' >
                    <div className='column-fields exam-action-control'>
                        {!isEditMode &&
                            <FontAwesomeIcon className="btn-add-option edit-question-button" title='Edit Exam' icon={faEdit} onClick={() => {
                                setIsEditMode(true);
                            }} />
                        }
                        {isEditMode && <FontAwesomeIcon icon={faSave} className="btn-add-option save-question-button" title="Save Exam" onClick={() => {
                            handleIsChanges({ updatedExam: values })
                            if (isFieldChanged) {
                                if (exam?.examId) {
                                    handleUpdateExam(values);
                                    setIsFieldChanged(false);
                                }
                            }
                            setIsEditMode(false)
                        }}
                        />
                        }
                        {isEditMode &&
                            <FontAwesomeIcon icon={faTimes} className="btn-cancel cancel-question-button" title="Cancel Edit" onClick={() => {
                                handleIsChanges({ isReset: true });
                                setIsEditMode(false);
                            }} />
                        }
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <Field
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter exam title"
                        disabled={!isEditMode}
                        data-automation-id="create-exam-title"
                        onChange={(e) => {
                            handleChange({ target: { name: `title`, value: e.target.value } })
                            handleIsChanges({ updatedExam: values })
                        }
                        }
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field
                        as="textarea"
                        id="description" name="description" placeholder="Enter exam description"
                        disabled={!isEditMode}
                        data-automation-id="create-exam-description"
                        onChange={(e) => {
                            handleChange({ target: { name: `description`, value: e.target.value } })
                            handleIsChanges({ updatedExam: values })
                        }
                        }
                    />
                </div>
                <div className="form-row date-row">
                    <div className="date-input form-group" >
                        <label htmlFor="startTime">Start Time</label>
                        <Field
                            type="datetime-local"
                            id="startTime"
                            name="startTime"
                            data-automation-id="create-exam-start-time"
                            disabled={!isEditMode}
                            onChange={(e) => {
                                handleChange({ target: { name: `startTime`, value: e.target.value } })
                                handleIsChanges({ updatedExam: values })
                            }
                            }
                        />
                    </div>
                    <div className="date-input form-group">
                        <label htmlFor="endTime">End Time</label>
                        <Field
                            type="datetime-local"
                            id="endTime"
                            name="endTime"
                            data-automation-id="create-exam-end-time"
                            disabled={!isEditMode}
                            onChange={(e) => {
                                handleChange({ target: { name: `endTime`, value: e.target.value } })
                                handleIsChanges({ updatedExam: values })
                            }
                            } />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration (Minutes)</label>
                        <Field
                            type="number"
                            id="duration"
                            name="duration"
                            data-automation-id="create-exam-duration"
                            disabled={!isEditMode} onChange={(e) => {
                                handleChange({ target: { name: `duration`, value: e.target.value } })
                                handleIsChanges({ updatedExam: values })
                            }
                            } />
                    </div>
                </div>
                <div className="form-row date-row">

                    <div className="form-group">
                        <label htmlFor="totalPoints">Total Points</label>
                        <Field
                            type="number"
                            id="totalPoints"
                            name="totalPoints"
                            data-automation-id="create-exam-total-points"
                            disabled={!isEditMode}
                            onChange={(e) => {
                                handleChange({ target: { name: `totalPoints`, value: e.target.value } })
                                handleIsChanges({ updatedExam: values })
                            }
                            } />
                    </div>

                    <div className="form-row switch-toggle-auto-grade form-group">
                        <span className="switch-label">Auto-grade</span>
                        <label className="custom-switch" data-automation-id="toggle-auto-grade">
                            <Field
                                type="checkbox"
                                id="autoGrade"
                                name="autoGrade"
                                checked={values.autoGrade}
                                data-automation-id="auto-grade-toggle-input"
                                disabled={!isEditMode}
                                onChange={(e) => {
                                    handleChange({ target: { name: `autoGrade`, value: e.target.value } })
                                    handleIsChanges({ updatedExam: values })
                                }
                                }
                            />
                            <span className="custom-slider"></span>
                        </label>

                    </div>

                </div>
                {isEditMode && (
                    <button type="submit" className="btn btn-primary create-exam" onClick={() => handleUpdateExam(values)}>
                        <FontAwesomeIcon icon={faSave} /> Save Exam
                    </button>)
                }

            </div>

            <QuestionsComponent
                values={values}
                handleChange={handleChange}
                handleCreateQuestion={handleCreateQuestion}
                handleUpdateQuestion={handleUpdateQuestion}
                handleUpdateOption={handleUpdateOption}
                handleDeleteQuestion={handleDeleteQuestion}
                handleDeleteOption={handleDeleteOption}
                handleCreateOption={handleCreateOption}
                validateOptions={validateOptions}
                exam={exam}
            />
            {/* <button type="submit" className="btn-save">
                <FontAwesomeIcon icon={faSave} /> Save Exam
            </button> */}
        </Form >
    );
};

export default UpdateExamComponent;
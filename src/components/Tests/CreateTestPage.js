import React from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTimes, faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import './CreateTestPage.css';
import { createExam, createQuestion, createOption } from '../../redux/actions/ExamActions';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CreateTestPage = () => {

  const [Submitting, setSubmitting] = useState(false);
  const initialValues = {
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    duration: '',
    totalPoints: '',
    autoGrade: true,
    questions: [
      {
        questionTitle: '',
        questionDetails: '',
        questionType: 'MCQ',
        points: 0,
        options: [
          {
            optionText: '',
            isCorrect: false,
          },
        ],
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    startTime: Yup.date().required('Start time is required').nullable(),
    endTime: Yup.date().required('End time is required').nullable(),
    duration: Yup.string().required('Duration is required'),
    totalPoints: Yup.number().min(1, 'Total points must be greater than 0').required('Total points are required')
  });

  const handleCreateExam = (values) => {
    console.log('Creating Exam...');
    console.log('values:', values);
    // Logic for creating the exam can be added here
  };

  const handleCreateQuestion = (values) => {
    console.log('Creating Question...');
    console.log('Values', values);
    // Logic for creating the exam can be added here
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    try {
      values.duration = parseInt(values.duration.split(':')[0]) * 60 + parseInt(values.duration.split(':')[1]);
      const response = await createExam(values);
      if (response.status === 200) {
        toast.success('Exam Created Successfully!');
        setTimeout(() => {
          resetForm();
        }, 1000);
      }
    } catch (error) {
      console.error('Error creating exam:', error);
      toast.error('Failed to create exam : ' + error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="exam-create-container">
      <h1>Create a New Exam</h1>
      <p>Fill in the details below to create a new exam.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={()=>console.log(ErrorMessage)}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange }) => (
          <Form>
            {/* Exam Details Section */}
            <div className="exam-details-container">
              <h2>Exam Details</h2>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <Field
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter exam title"
                  data-automation-id="create-exam-title"
                />

              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <Field
                  as="textarea"
                  id="description" name="description" placeholder="Enter exam description"
                  data-automation-id="create-exam-description"
                />
              </div>
              <div className="form-row date-row">
                <div className="date-input form-group" >
                  <label htmlFor="startTime">Start Time</label>
                  <Field type="datetime-local" id="startTime" name="startTime" data-automation-id="create-exam-start-time" />
                </div>
                <div className="date-input form-group">
                  <label htmlFor="endTime">End Time</label>
                  <Field type="datetime-local" id="endTime" name="endTime" data-automation-id="create-exam-end-time" />
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration (HH:MM)</label>
                  <Field type="time" id="duration" name="duration" data-automation-id="create-exam-duration" />
                </div>
              </div>
              <div className="form-row date-row">

                <div className="form-group">
                  <label htmlFor="totalPoints">Total Points</label>

                  <Field type="number" id="totalPoints" name="totalPoints" data-automation-id="create-exam-total-points" />
                </div>

                <div className="form-row switch-toggle-auto-grade form-group">
                  <span className="switch-label">Auto-grade</span>
                  <label className="custom-switch" data-automation-id="toggle-auto-grade">
                    <Field
                      type="checkbox"
                      id="autoGrade"
                      name="autoGrade"
                      checked={values.autoGrade}
                      onChange={handleChange}
                      data-automation-id="auto-grade-toggle-input"
                    />
                    <span className="custom-slider"></span>
                  </label>

                </div>

              </div>
              <button type="submit" className="btn btn-primary create-exam" onClick={() => handleCreateExam(values)}>
                <FontAwesomeIcon icon={faSave} /> Save Exam
              </button>
            </div>

            {/* Questions Section */}
            <div className="questions-container">
              <h2>Questions</h2>
              <FieldArray name="questions">
                {({ push, remove }) => (
                  <>
                    {values.questions.map((question, index) => (
                      <div className="question-item" key={index}>
                        <h3>Question {index + 1}</h3>
                        <div className="form-group">
                          <label htmlFor={`questions.${index}.questionTitle`}>Question Title</label>
                          <Field type="text" id={`questions.${index}.questionTitle`} name={`questions.${index}.questionTitle`} placeholder="Enter question title" />
                        </div>
                        <div className="form-group">
                          <label htmlFor={`questions.${index}.questionDetails`}>Question Details</label>
                          <Field as="textarea" id={`questions.${index}.questionDetails`} name={`questions.${index}.questionDetails`} placeholder="Enter question Details" />
                        </div>
                        <div className='form-group column-fields'>

                          <div className="form-group">
                            <label htmlFor={`questions.${index}.questionType`}>Question Type</label>
                            <Field as="select" id={`questions.${index}.questionType`} name={`questions.${index}.questionType`}>
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
                            <Field type="number" id={`questions.${index}.points`} name={`questions.${index}.points`} placeholder="Enter points" />
                          </div>

                        </div>
                        {question.questionType === 'TF' && (
                          <div className="options-container">
                            <h4>Options</h4>
                            <FieldArray name={`questions.${index}.options`}>
                              {({ push: pushOption, remove: removeOption }) => (
                                <>
                                  <div className="option-item" key="true">
                                    <Field type="text" id={`questions.${index}.options.0.optionText`} name={`questions.${index}.options.0.optionText`} placeholder="True" />
                                    <Field type="checkbox" name={`questions.${index}.options.0.isCorrect`} />
                                    <label>Correct</label>
                                  </div>
                                  <div className="option-item" key="false">
                                    <Field type="text" id={`questions.${index}.options.1.optionText`} name={`questions.${index}.options.1.optionText`} placeholder="False" />
                                    <Field type="checkbox" name={`questions.${index}.options.1.isCorrect`} />
                                    <label>Correct</label>
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
                                      <Field type="text" id={`questions.${index}.options.${optionIndex}.optionText`} name={`questions.${index}.options.${optionIndex}.optionText`} placeholder="Enter option text" />
                                    </div>
                                    <div className="form-row is-correct-switch-toggle form-group">
                                      <span className="switch-label">Correct</span>
                                      <label className="custom-switch" data-automation-id="toggle-iscorrect">
                                        <Field
                                          type="checkbox"
                                          name={`questions.${index}.options.${optionIndex}.isCorrect`}
                                          checked={option.isCorrect}
                                          onChange={(e) => handleChange({ target: { name: `questions.${index}.options.${optionIndex}.isCorrect`, value: e.target.checked } })}
                                          data-automation-id="option_iscorrect-toggle-input"
                                        />
                                        <span className="custom-slider"></span>
                                      </label>
                                    </div>
                                    <button type="button" className="btn-add-option add-option-button" onClick={() => pushOption({ optionText: '', isCorrect: false })}>
                                      <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    <button type="button" className="btn-remove-option remove-option-button" onClick={() => removeOption(optionIndex)}>
                                      <FontAwesomeIcon icon={faTimes} />
                                    </button>

                                  </div>
                                ))}

                              </>
                            )}
                          </FieldArray>
                        </div>
                        )}
                        <div className='form-group column-fields'>
                          <button type="button" className="btn-add-question add-question-button"
                            onClick={() => push({ questionTitle: '', questionDetails: '', questionType: 'single', points: 0, options: [{ optionText: '', isCorrect: false }] })}>
                            Add Question
                          </button>
                          <button type="button" className="btn-add-question save-question-button" onClick={() => handleCreateQuestion(values)} >
                            <FontAwesomeIcon icon={faSave} /> Save Question
                          </button>
                          <button type="button" className="btn-remove-question remove-question-button" onClick={() => remove(index)}>
                            <FontAwesomeIcon icon={faTrashAlt} /> Remove Question
                          </button>

                        </div>

                      </div>
                    ))}

                  </>
                )}
              </FieldArray>
            </div >
            <button type="submit" className="btn-save">
              <FontAwesomeIcon icon={faSave} /> Save Exam
            </button>
          </Form >
        )}
      </Formik >
    </div >
  );
};

export default CreateTestPage;
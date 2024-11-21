import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import './AssignStudentPage.css'; // Ensure to create the CSS file for styling
import { getCreatedExamDetails, assignUserToExams } from '../../redux/actions/ExamActions';
import { saveExams } from '../../redux/reducers/ExamReducers';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const AssignStudentPage = (props) => {
    const { examId } = useParams();
    const dispatch = useDispatch();
    const [exams, setExams] = useState([]);
    const [userEmails, setUserEmails] = useState([]); // Start with one empty email field

    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await getCreatedExamDetails(examId);
                dispatch(saveExams(response.data));
                console.log("Exams fetched successfully:", response.data);
                setExams(response.data);
            } catch (error) {
                console.error("Error fetching exams:", error);
            }
        };
        if (exams === undefined || exams.length === 0) {
            fetchExams();
        }
        if (exams || exams.length > 0) {
            const exam = exams.find((e) => e.examId === parseInt(examId));
            if (exam && exam.assignedUserEmails && exam.assignedUserEmails.length > 0) {
                setUserEmails(exam.assignedUserEmails);
            }
        }
    }, [examId, dispatch, exams]);

    const initialValues = {
        examId: examId || '',
    };

    const validationSchema = Yup.object().shape({
        examId: Yup.string().required('Exam Id is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
            const response = await assignUserToExams({ ...values, userEmails });
            console.log('Assigning users to exam:', values);
            toast.success('Users assigned successfully!');
        } catch (error) {
            console.error('Error assigning users:', error);
            toast.error(error?.response?.data?.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            e.preventDefault();
            const email = e.target.value.trim();
            if (email && !userEmails.includes(email)) {
                setUserEmails((prev) => [...prev, email]);
                e.target.value = ''; // Clear the input field
            }
        }
    };

    const removeEmail = (email) => {
        setUserEmails((prev) => prev.filter((e) => e !== email));
    };

    if (exams.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="assign-user-container">
            <h1>Assign Users to Exam</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="examId">Select Exam</label>
                            <Field as="select" id="examId" name="examId">
                                <option value="">Select an exam</option>
                                {exams.map((exam) => (
                                    <option key={exam.examId} value={exam.examId}>
                                        {exam.title}
                                    </option>
                                ))}
                            </Field>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userEmails">Enter Email Addresses</label>
                            <div className="email-input-container">
                                {userEmails.map((email) => (
                                    <div key={email} className="email-tag">
                                        {email}
                                        <FontAwesomeIcon icon={faTimes} className='btn-remove-each-email' onClick={() => removeEmail(email)} />

                                    </div>
                                ))}
                                <input
                                    type="text"
                                    placeholder="Add email and press Enter"
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn-send" disabled={isSubmitting}>
                            <FontAwesomeIcon icon={faPaperPlane} /> Send
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AssignStudentPage;
import React from 'react';
import { useParams } from 'react-router-dom';
import './ExamDetails.css';

// Sample data structure for exams (for demonstration purposes)
const examsData = [
    {
        id: 1,
        title: 'Math Exam',
        description: 'A comprehensive math exam covering algebra and geometry.',
        totalPoints: 100,
        duration: 60,
        startTime: '2024-11-01T10:00',
        endTime: '2024-11-01T11:00',
        status: 'Scheduled',
    },
    {
        id: 2,
        title: 'History Exam',
        description: 'An exam on world history from the 20th century.',
        totalPoints: 100,
        duration: 90,
        startTime: '2024-11-02T12:00',
        endTime: '2024-11-02T13:30',
        status: 'Scheduled',
    },
    // Add more exams as needed
];

const ExamDetails = () => {
    const { examId } = useParams(); // Get the exam ID from the URL
    const exam = examsData.find(e => e.id === parseInt(examId)); // Find the exam in the data

    if (!exam) {
        return <div>Exam not found.</div>; // Handle case where exam doesn't exist
    }

    return (
        <div className="exam-details-container exam-details-list">
            <div className="exam-card">
                <h2>{exam.title}</h2>
                <p><strong>Description:</strong> {exam.description}</p>
                <p><strong>Total Points:</strong> {exam.totalPoints}</p>
                <p><strong>Duration:</strong> {exam.duration} minutes</p>
                <p><strong>Start Time:</strong> {new Date(exam.startTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(exam.endTime).toLocaleString()}</p>
                <p><strong>Status:</strong> {exam.status}</p>
                <button className="start-exam-button">Start Exam</button>
            </div>
        </div>
    );
};

export default ExamDetails;
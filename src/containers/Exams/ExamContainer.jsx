import React from 'react';
import './ExamContainer.css';
import { useNavigate } from 'react-router-dom';

// Sample data structure for exams
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
    // Add more exam objects as needed
];

const ExamContainer = () => {

    const navigate = useNavigate()

    const handleViewDetails = (examId) => {
        // Navigate to the exam details page
        navigate(`/exam/${examId}`);
        // Here you could use a router to navigate, e.g., using React Router
    };

    return (
        <div className="exam-container">
            {examsData.map((exam) => (
                <div className="exam-card" key={exam.id}>
                    <h3>{exam.title}</h3>
                    <p>{exam.description}</p>
                    <div className="exam-details">
                        <p><strong>Total Points:</strong> {exam.totalPoints}</p>
                        <p><strong>Duration:</strong> {exam.duration} minutes</p>
                        <p><strong>Start Time:</strong> {new Date(exam.startTime).toLocaleString()}</p>
                        <p><strong>End Time:</strong> {new Date(exam.endTime).toLocaleString()}</p>
                        <p><strong>Status:</strong> {exam.status}</p>
                    </div>
                    <button 
                        className="view-button" 
                        onClick={() => handleViewDetails(exam.id)}
                    >
                        View Details
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ExamContainer;
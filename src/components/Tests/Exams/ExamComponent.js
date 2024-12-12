import React from 'react';
import FormInput from '../../Forms/FormInput'; // Adjust the path as necessary

const ExamComponent = ({ testData, handleChange }) => {
    return (
        <div className="exam-info">
            <FormInput 
                type="text" 
                name="title" 
                label="Title" 
                placeholder="Enter exam title" 
                value={testData.title} 
                onChange={handleChange} 
            />
            <FormInput 
                type="textarea" 
                name="description" 
                label="Description" 
                placeholder="Enter exam description" 
                value={testData.description} 
                onChange={handleChange} 
            />
            <FormInput 
                type="datetime-local" 
                name="startTime" 
                label="Start Time" 
                value={testData.startTime} 
                onChange={handleChange} 
            />
            <FormInput 
                type="datetime-local" 
                name="endTime" 
                label="End Time" 
                value={testData.endTime} 
                onChange={handleChange} 
            />
            <FormInput 
                type="number" 
                name="duration" 
                label="Duration (minutes)" 
                placeholder="Enter duration" 
                value={testData.duration} 
                onChange={handleChange} 
            />
            <FormInput 
                type="number" 
                name="totalPoints" 
                label="Total Points" 
                placeholder="Enter total points" 
                value={testData.totalPoints} 
                onChange={handleChange} 
            />
            <label>
                Auto Grade: 
                <input 
                    type="checkbox" 
                    name="autoGrade" 
                    checked={testData.autoGrade} 
                    onChange={() => handleChange({ target: { name: 'autoGrade', value: !testData.autoGrade } })} 
                />
            </label>
            <FormInput 
                type="text" 
                name="status" 
                label="Status" 
                placeholder="Enter exam status" 
                value={testData.status} 
                onChange={handleChange} 
            />
        </div>
    );
};

export default ExamComponent;
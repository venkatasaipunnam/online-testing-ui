import React from 'react';
import FormInput from '../../Forms/FormInput'; // Adjust the path as necessary
import OptionComponent from '../Options/OptionComponent';

const QuestionComponent = ({ questionData, index, onChange, remove }) => {
    return (
        <div className="question">
            <FormInput 
                type="text" 
                name={`questions[${index}].questionTitle`} 
                label="Question Title" 
                value={questionData.questionTitle} 
                onChange={onChange} 
            />
            <FormInput 
                type="textarea" 
                name={`questions[${index}].questionDetails`} 
                label="Question Details" 
                value={questionData.questionDetails} 
                onChange={onChange} 
            />
            <FormInput 
                type="text" 
                name={`questions[${index}].questionImagePath`} 
                label="Image Path (optional)" 
                value={questionData.questionImagePath} 
                onChange={onChange} 
            />
            <select 
                name={`questions[${index}].questionType`} 
                value={questionData.questionType} 
                onChange={onChange}
            >
                <option value="multiple">Multiple Choice</option>
                <option value="single">Single Choice</option>
                <option value="text">Text Response</option>
            </select>
            <FormInput 
                type="number" 
                name={`questions[${index}].points`} 
                label="Points" 
                value={questionData.points} 
                onChange={onChange} 
            />
            {questionData.options.map((option, optionIndex) => (
                <OptionComponent 
                    key={optionIndex} 
                    optionData={option} 
                    index={optionIndex}
                    questionIndex={index}
                    onChange={onChange} 
                />
            ))}
            <button type="button" onClick={remove}>Remove Question</button>
        </div>
    );
};

export default QuestionComponent;
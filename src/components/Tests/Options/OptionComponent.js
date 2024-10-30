import React from 'react';
import FormInput from '../../Forms/FormInput'; // Adjust the path as necessary

const OptionComponent = ({ optionData, index, questionIndex, onChange }) => {
    return (
        <div className="option">
            <FormInput 
                type="text" 
                name={`questions[${questionIndex}].options[${index}].optionText`} 
                label="Option Text" 
                value={optionData.optionText} 
                onChange={onChange} 
            />
            <FormInput 
                type="text" 
                name={`questions[${questionIndex}].options[${index}].optionImagePath`} 
                label="Image Path (optional)" 
                value={optionData.optionImagePath} 
                onChange={onChange} 
            />
            <select 
                name={`questions[${questionIndex}].options[${index}].optionType`} 
                value={optionData.optionType} 
                onChange={onChange}
            >
                <option value="text">Text</option>
                <option value="image">Image</option>
            </select>
            <label>
                Correct:
                <input 
                    type="checkbox" 
                    name={`questions[${questionIndex}].options[${index}].isCorrect`} 
                    checked={optionData.isCorrect} 
                    onChange={onChange} 
                />
            </label>
        </div>
    );
};

export default OptionComponent;
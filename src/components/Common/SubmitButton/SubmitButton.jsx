import React from 'react';
import Spinner from '../Spinner/Spinner';
import './SubmitButton.css';

const SubmitButton = ({ isSubmitting, text }) => {
    return (
        <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
                <Spinner size="20px" color="#fff" />
            ) : (
                text
            )}
        </button>
    );
};

export default SubmitButton;
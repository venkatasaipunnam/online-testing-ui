import React from 'react';
import './Spinner.css';

const Spinner = ({ size = '20px', color = '#000' }) => {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderColor: `${color} transparent transparent transparent`,
      }}
    ></div>
  );
};

export default Spinner;

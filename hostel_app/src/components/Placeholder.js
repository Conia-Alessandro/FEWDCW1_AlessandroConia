import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const Placeholder = () => {
  return (
    <div className="placeholder">
      <h3>Work in Progress</h3>
      <FaExclamationTriangle className="icon" />
      <p>This part of the Website is under construction. Check back soon!</p>
    </div>
  );
};

export default Placeholder;

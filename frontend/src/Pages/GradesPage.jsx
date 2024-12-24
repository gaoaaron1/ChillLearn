import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/GradesPage.css'; // Import the CSS file

function GradesPage() {
  return (
    <div className="grades-page">
      <h1>Select Your Grade Level</h1>
      <div className="grade-options">
        <Link to="/kindergarten" className="grade-option">Kindergarten</Link>
        <Link to="/grade1" className="grade-option">Grade 1</Link>
        <Link to="/grade2" className="grade-option">Grade 2</Link>
        <Link to="/grade3" className="grade-option">Grade 3</Link>
        {/* Add more grade options as needed */}
      </div>
    </div>
  );
}

export default GradesPage;

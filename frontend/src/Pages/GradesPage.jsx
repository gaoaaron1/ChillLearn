import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/GradesPage.css'; // Import the CSS file
import { useGradeContext } from '../Context/GradeContext';

function GradesPage() {
  const { selectedGrade, setSelectedGrade } = useGradeContext();
  const [isExpanded, setIsExpanded] = useState(true); // Manage expanded/collapsed state

  useEffect(() => {
    if (!selectedGrade) {
      setSelectedGrade('kindergarten'); // Default to kindergarten if no grade is selected
    }
  }, [selectedGrade, setSelectedGrade]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded); // Toggle the expanded/collapsed state
  };

  return (
    <div className="grades-page">
      <h1>Select Your Grade Level</h1>
      
      <button className="expand-btn" onClick={toggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'} Options
      </button>

      <div className={`grade-options ${isExpanded ? 'expanded' : 'collapsed'}`}>
        <Link
          to="/kindergarten"
          className={`grade-option ${selectedGrade === 'kindergarten' ? 'selected' : ''}`}
          onClick={() => setSelectedGrade('kindergarten')}
        >
          Kindergarten
        </Link>
        <Link
          to="/grade1"
          className={`grade-option ${selectedGrade === 'grade1' ? 'selected' : ''}`}
          onClick={() => setSelectedGrade('grade1')}
        >
          Grade 1
        </Link>
        <Link
          to="/grade2"
          className={`grade-option ${selectedGrade === 'grade2' ? 'selected' : ''}`}
          onClick={() => setSelectedGrade('grade2')}
        >
          Grade 2
        </Link>
        <Link
          to="/grade3"
          className={`grade-option ${selectedGrade === 'grade3' ? 'selected' : ''}`}
          onClick={() => setSelectedGrade('grade3')}
        >
          Grade 3
        </Link>
        <Link
          to="/grade7"
          className={`grade-option ${selectedGrade === 'grade7' ? 'selected' : ''}`}
          onClick={() => setSelectedGrade('grade7')}
        >
          Grade 7
        </Link>
        {/* Add more grade options as needed */}
      </div>
    </div>
  );
}

export default GradesPage;

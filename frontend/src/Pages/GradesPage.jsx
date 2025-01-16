import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CSS/GradesPage.css'; // Import the CSS file
import { useGradeContext } from '../Context/GradeContext';

function GradesPage() {
  const { selectedGrade, setSelectedGrade } = useGradeContext();

  useEffect(() => {
    if (!selectedGrade) {
      setSelectedGrade('kindergarten'); // Default to kindergarten if no grade is selected
    }
  }, [selectedGrade, setSelectedGrade]);

  // Array of grades
  const grades = [
    'kindergarten', 'grade1', 'grade2', 'grade3', 'grade4', 'grade5', 'grade6', 
    'grade7', 'grade8', 'grade9', 'grade10', 'grade11', 'grade12'
  ];

  return (
    <div className="grades-page">
      <h1>Select Your Grade Level</h1>

      <div className="grade-options-container">
        <div className="grade-options">
          {grades.map((grade) => (
            <Link
              key={grade}
              to={`/${grade}`}
              className={`grade-option ${selectedGrade === grade ? 'selected' : ''}`}
              onClick={() => setSelectedGrade(grade)}
            >
              {grade.charAt(0).toUpperCase() + grade.slice(1).replace(/grade(\d+)/, 'Grade $1')}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GradesPage;

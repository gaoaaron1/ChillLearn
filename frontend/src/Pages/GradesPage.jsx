import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './CSS/GradesPage.css'; // Import the CSS file
import { useGradeContext } from '../Context/GradeContext';

function GradesPage() {

  //Access global variable
  const { selectedGrade, setSelectedGrade } = useGradeContext();    

  // Optionally, you can set the grade if the user navigates to the GradesPage.
  // For example, let's say you want to highlight the selected grade.
  useEffect(() => {
    if (!selectedGrade) {
      setSelectedGrade('kindergarten'); // Default to kindergarten if no grade is selected
    }
  }, [selectedGrade, setSelectedGrade]); // Only run if selectedGrade or setSelectedGrade changes


  return (
    <div className="grades-page">
      <h1>Select Your Grade Level</h1>
      <div className="grade-options">
        <Link to="/kindergarten" className={`grade-option ${selectedGrade === 'kindergarten' ? 'selected' : ''}`} onClick={() => setSelectedGrade('kindergarten')}>
          Kindergarten
        </Link>
        <Link to="/grade1" className={`grade-option ${selectedGrade === 'grade1' ? 'selected' : ''}`} onClick={() => setSelectedGrade('grade1')}>
          Grade 1
        </Link>
        <Link to="/grade2" className={`grade-option ${selectedGrade === 'grade2' ? 'selected' : ''}`} onClick={() => setSelectedGrade('grade2')}>
          Grade 2
        </Link>
        <Link to="/grade3" className={`grade-option ${selectedGrade === 'grade3' ? 'selected' : ''}`} onClick={() => setSelectedGrade('grade3')}>
          Grade 3
        </Link>
        {/* Add more grade options as needed */}
      </div>
    </div>
  );
}

export default GradesPage;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create a Context for the Grade
const GradeContext = createContext();

// Custom hook to use GradeContext
export const useGrade = () => {
  return useContext(GradeContext);
};

// GradeProvider component to wrap your app
export const GradeProvider = ({ children }) => {
  const [selectedGrade, setSelectedGrade] = useState('grade1'); // default grade
  const navigate = useNavigate();

  useEffect(() => {
    const gradeFromURL = window.location.pathname.split('/')[1]; // Extract grade from URL
    if (gradeFromURL) {
      setSelectedGrade(gradeFromURL);
    }
  }, []);

  const handleGradeChange = (newGrade) => {
    setSelectedGrade(newGrade);
    navigate(`/${newGrade}`); // Use navigate to change route without reload
  };

  return (
    <GradeContext.Provider value={{ selectedGrade, handleGradeChange }}>
      {children}
    </GradeContext.Provider>
  );
};

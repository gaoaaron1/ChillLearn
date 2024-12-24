import React, { createContext, useContext, useState } from 'react';

// Create GradeContext
const GradeContext = createContext();

// GradeContext Provider Component
export const GradeProvider = ({ children }) => {
  const [selectedGrade, setSelectedGrade] = useState("kindergarten"); // Default to "kindergarten"

  return (
    <GradeContext.Provider value={{ selectedGrade, setSelectedGrade }}>
      {children}
    </GradeContext.Provider>
  );
};

// Custom hook to use GradeContext
export const useGradeContext = () => {
  const context = useContext(GradeContext);
  
  // If used outside of the provider, throw an error
  if (!context) {
    throw new Error("useGradeContext must be used within a GradeProvider");
  }

  return context;
};

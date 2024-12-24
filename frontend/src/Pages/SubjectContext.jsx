import React, { useContext, useState, useEffect } from 'react';
import './CSS/SubjectContext.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import subjectsData from '../../src/Components/Assets/subjectsData.json';

const SubjectContext = (props) => {
    const { all_product } = useContext(ShopContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('oldest');
    const [expandedSubjects, setExpandedSubjects] = useState({
        Math: false,
        English: false,
        Science: false,
        Social: false,
    });
    const [selectedGrade, setSelectedGrade] = useState(""); // Remove default grade value
    const itemsPerPage = 9;
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    const { grade } = useParams(); // Use useParams hook to get the grade from URL

    // Update selected grade when the grade in the URL changes
    useEffect(() => {
        if (grade) {
            setSelectedGrade(grade); // Set grade from URL
        }
    }, [grade]); // Re-run when grade changes

    // If selectedGrade is empty (initial load), default to "kindergarten"
    const subjects = selectedGrade ? subjectsData[selectedGrade] : subjectsData["kindergarten"]; 

    // Handle subject and unit expansion
    const handleExpandToggle = (subject) => {
        setExpandedSubjects({
            ...expandedSubjects,
            [subject]: !expandedSubjects[subject],
        });
    };

    // Handle grade selection
    const handleGradeChange = (e) => {
        const newGrade = e.target.value;
        setSelectedGrade(newGrade); // Update the selected grade
        navigate(`/${newGrade}`); // Navigate to the selected grade page
    };

    // Convert grade value to a more readable format
    const getGradeName = (grade) => {
        switch (grade) {
            case 'grade1': return 'Grade 1';
            case 'grade2': return 'Grade 2';
            case 'kindergarten': return 'Kindergarten';
            default: return 'Select Grade';
        }
    };

    // Handle unit selection and navigate to the questions page
    const handleUnitSelection = (subject, unit) => {
        // Navigate to the questions page with grade, subject, and unit as parameters
        navigate(`/questions/${selectedGrade}/${subject}/${unit}`);
    };

    return (
        <div className="subject-context">
            <img className="subject-banner" src={props.banner} alt="" />

            {/* Custom Grade Dropdown */}
            <div className="grade-selector">
                <label>Select Grade: </label>
                <div className="shopcategory-sort">
                    <button className="dropdown-btn">
                        {getGradeName(selectedGrade || "kindergarten")} {/* Display full grade name */}
                    </button>
                    <div className="dropdown-content">
                        <button value="kindergarten" onClick={handleGradeChange}>Kindergarten</button>
                        <button value="grade1" onClick={handleGradeChange}>Grade 1</button>
                        <button value="grade2" onClick={handleGradeChange}>Grade 2</button>
                    </div>
                </div>
            </div>

            {/* Subject Expand/Collapse */}
            <div className="subjects">
                {Object.keys(subjects).map((subject) => (
                    <div key={subject} className="subject-container">
                        <button
                            className="expand-btn"
                            onClick={() => handleExpandToggle(subject)}
                        >
                            {subject} {expandedSubjects[subject] ? '-' : '+'}
                        </button>
                        <div className={`topics ${expandedSubjects[subject] ? 'topics-expanded' : ''}`}>
                            {subjects[subject].map((unit, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleUnitSelection(subject, unit)} // Handle click and navigate to questions
                                    className="unit-item"
                                >
                                    {unit}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubjectContext;

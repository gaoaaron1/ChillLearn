import React, { useState, useEffect } from 'react';
import './CSS/SubjectContext.css';
import { useNavigate, useParams } from 'react-router-dom';
import subjectsData from '../../src/Components/Assets/subjectsData.json';
import { useGradeContext } from '../Context/GradeContext';

const SubjectContext = (props) => {
    const [expandedSubjects, setExpandedSubjects] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { grade } = useParams();
    const { selectedGrade, setSelectedGrade } = useGradeContext();

    useEffect(() => {
        if (grade) setSelectedGrade(grade);
    }, [grade, setSelectedGrade]);

    // Get the subjects for the selected grade
    const subjects = selectedGrade ? subjectsData[selectedGrade] : subjectsData["kindergarten"];

    const handleExpandToggle = (subject) => {
        setExpandedSubjects((prevState) => ({
            ...prevState,
            [subject]: !prevState[subject],
        }));
    };

    const handleUnitSelection = (subject, unit) => {
        navigate(`/questions/${selectedGrade}/${subject}/${unit}`);
    };

    const handleTutorialClick = (subject, unit) => {
        navigate(`/tutorial/${selectedGrade}/${subject}/${unit}`);
    };

    const handleGradeChange = (e) => {
        const newGrade = e.target.value;
        setSelectedGrade(newGrade);
        navigate(`/${newGrade}`);
        setIsDropdownOpen(false);
    };

    // Dynamically get the grade names from the subjectsData
    const getGradeName = (grade) => {
        switch (grade) {
            case 'kindergarten': return 'Kindergarten';
            default: return `Grade ${grade.replace('grade', '')}`;
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Get all available grades from the subjectsData
    const gradeOptions = Object.keys(subjectsData);

    return (
        <div className="subject-context">
            <img className="subject-banner" src={props.banner} alt="Subject Banner" />
            <div className="grade-selector">
                <label>Select Grade: </label>
                <div className="shopcategory-sort">
                    <button className="dropdown-btn" onClick={toggleDropdown}>
                        {getGradeName(selectedGrade || "kindergarten")}
                        <span className={`arrow ${isDropdownOpen ? 'up' : 'down'}`}>&#9660;</span>
                    </button>
                    {isDropdownOpen && (
                        <ul className="dropdown-menu">
                            {gradeOptions.map((gradeOption) => (
                                <li key={gradeOption}>
                                    <button value={gradeOption} onClick={handleGradeChange}>
                                        {getGradeName(gradeOption)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <div className="subjects">
                {Object.keys(subjects).map((subject) => (
                    <div key={subject} className="subject-container">
                        <button className="expand-btn" onClick={() => handleExpandToggle(subject)}>
                            {subject} {expandedSubjects[subject] ? '-' : '+'}
                        </button>
                        {expandedSubjects[subject] && (
                            <div className="topics">
                                {subjects[subject].map((unit, index) => (
                                    <div key={index} className="unit-item">
                                        <div className="unit-header">
                                            <span className="topic-tag">{unit.unit}</span>
                                            <div className="unit-actions">
                                                <button
                                                    className="test-btn"
                                                    onClick={() => handleUnitSelection(subject, unit.unit)}
                                                >
                                                    Test
                                                </button>
                                                <button
                                                    className="tutorial-btn"
                                                    onClick={() => handleTutorialClick(subject, unit.unit)}
                                                >
                                                    Tutorial
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubjectContext;

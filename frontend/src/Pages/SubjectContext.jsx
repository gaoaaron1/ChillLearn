import React, { useState, useEffect } from 'react';
import './CSS/SubjectContext.css';
import { useNavigate, useParams } from 'react-router-dom';
import subjectsData from '../../src/Components/Assets/subjectsData.json';
import { useGradeContext } from '../Context/GradeContext';

const SubjectContext = (props) => {
    const [expandedSubjects, setExpandedSubjects] = useState({});
    const navigate = useNavigate();
    const { grade } = useParams();
    const { selectedGrade, setSelectedGrade } = useGradeContext();

    useEffect(() => {
        if (grade) setSelectedGrade(grade);
    }, [grade, setSelectedGrade]);

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

    const handleGradeChange = (e) => {
        const newGrade = e.target.value;
        setSelectedGrade(newGrade);
        navigate(`/${newGrade}`);
    };

    const getGradeName = (grade) => {
        switch (grade) {
            case 'grade1': return 'Grade 1';
            case 'grade2': return 'Grade 2';
            case 'kindergarten': return 'Kindergarten';
            default: return 'Select Grade';
        }
    };

    return (
        <div className="subject-context">
            <img className="subject-banner" src={props.banner} alt="Subject Banner" />
            <div className="grade-selector">
                <label>Select Grade: </label>
                <div className="shopcategory-sort">
                    <button className="dropdown-btn">
                        {getGradeName(selectedGrade || "kindergarten")}
                    </button>
                    <div className="dropdown-content">
                        {["kindergarten", "grade1", "grade2"].map((gradeOption) => (
                            <button key={gradeOption} value={gradeOption} onClick={handleGradeChange}>
                                {getGradeName(gradeOption)}
                            </button>
                        ))}
                    </div>
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
                                    <div key={index} className="unit-item" onClick={() => handleUnitSelection(subject, unit)}>
                                        {unit}
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

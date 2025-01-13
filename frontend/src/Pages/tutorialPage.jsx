import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CSS/tutorialPage.css';

const TutorialPage = () => {
    const { grade, subject, unit } = useParams();
    const navigate = useNavigate();

    const getTutorialVideo = (grade, subject, unit) => {
        const subjects = require('../../src/Components/Assets/subjectsData.json'); // Import the data

        // Find the unit in the subjects data and return the tutorial video link
        const unitData = subjects[grade]?.[subject]?.find(u => u.unit === unit);
        return unitData ? unitData.tutorialVideo : null;
    };

    const videoLink = getTutorialVideo(grade, subject, unit);

    // Navigate back to the topics page
    const handleBackClick = () => {
        navigate(`/${grade}`);
    };

    // Navigate directly to the test
    const handleTestClick = () => {
        navigate(`/questions/${grade}/${subject}/${unit}`);
    };

    return (
        <div className="tutorial-page">
            {videoLink ? (
                <div className="video-container">
                    <h2 className="tutorial-title">{subject} - {unit} Tutorial</h2>
                    <div className="video-wrapper">
                        <iframe
                            width="100%"
                            height="100%"
                            src={videoLink}
                            title={`${subject} ${unit} Tutorial`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="button-container">
                        <button className="back-btn" onClick={handleBackClick}>Back to Topics</button>
                        <button className="exam-btn" onClick={handleTestClick}>Go to Test</button>
                    </div>
                </div>
            ) : (
                <p>No tutorial available for this topic.</p>
            )}
        </div>
    );
};

export default TutorialPage;

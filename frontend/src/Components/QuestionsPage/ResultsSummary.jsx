import React from 'react';

const ResultsSummary = ({ timeTaken, correctCount, totalQuestions, percentage }) => {
    return (
        <div className="results-summary">
            <h3>Results Summary</h3>
            <p>Time taken: {Math.floor(timeTaken / 60)} minutes and {timeTaken % 60} seconds</p>
            <p>Correct answers: {correctCount} out of {totalQuestions}</p>
            <p>Score: {percentage}%</p>
        </div>
    );
};

export default ResultsSummary;

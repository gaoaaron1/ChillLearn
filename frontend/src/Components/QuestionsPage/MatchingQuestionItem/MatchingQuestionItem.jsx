import React, { useState, useEffect } from 'react';
import './MatchingQuestionItem.css';

const MatchingQuestionItem = ({ questionItem, index, userAnswers, handleAnswerSelect, submitted }) => {
    // Initialize selected pairs based on user answers
    const [selectedPairs, setSelectedPairs] = useState(userAnswers[index] || []);

    // Prevent duplicate right options from being selected
    const usedRightOptions = selectedPairs.map(pair => pair.right);

    // Handle the selection of a pair (leftOption, rightOption)
    const handlePairSelect = (leftOption, rightOption) => {
        // Remove existing pair if leftOption is already selected
        const updatedPairs = selectedPairs.filter(pair => pair.left !== leftOption);

        // Add the new pair if the right option isn't already used
        if (!usedRightOptions.includes(rightOption)) {
            updatedPairs.push({ left: leftOption, right: rightOption });
            setSelectedPairs(updatedPairs);
            handleAnswerSelect(index, updatedPairs); // Update parent state
        }
    };

    // Check if the question has been answered correctly
    const isCorrect = () => {
        return selectedPairs.length === questionItem.pairs.length &&
            selectedPairs.every(pair => pair.right === questionItem.pairs.find(p => p.left === pair.left)?.right);
    };

    return (
        <div className="matching-question-item">
            <p className="question-text">
                {index + 1}. {questionItem.question}
            </p>

            <div className="matching-question-options">
                {/* Left column with cell components */}
                <div className="left-column">
                    {questionItem.pairs.map((pair, i) => {
                        // Check if a pair has been selected for this left item
                        const isMatched = selectedPairs.some(selectedPair => selectedPair.left === pair.left);
                        return (
                            <div
                                key={i}
                                className={`option-item ${isMatched ? 'matched' : ''}`}
                            >
                                {pair.left}
                            </div>
                        );
                    })}
                </div>

                {/* Right column with functions */}
                <div className="right-column">
                    {questionItem.pairs.map((pair, i) => {
                        // Check if a pair has been matched for this right item
                        const isMatched = selectedPairs.some(selectedPair => selectedPair.right === pair.right);
                        return (
                            <div
                                key={i}
                                className={`option-item ${isMatched ? 'matched' : ''}`}
                                onClick={() => handlePairSelect(pair.left, pair.right)}
                                style={{ cursor: submitted || isMatched ? 'not-allowed' : 'pointer' }}
                            >
                                {pair.right}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Feedback after quiz submission */}
            {submitted && (
                <div className="feedback">
                    {isCorrect() ? (
                        <p className="correct">✔ All pairs are correct!</p>
                    ) : (
                        <p className="incorrect">✘ Some pairs are incorrect.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default MatchingQuestionItem;

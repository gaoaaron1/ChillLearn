import React, { useState, useEffect } from 'react';
import './MultipleChoiceQuestionItem.css';

const shuffleArray = (array) => {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
};

const MultipleChoiceQuestionItem = ({ questionItem, index, userAnswers, handleAnswerSelect, submitted }) => {
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        if (questionItem.options) {
            setShuffledOptions(shuffleArray(questionItem.options));
        }
    }, [questionItem.options]);

    const handleCardClick = (option) => {
        if (submitted) return; // Prevent selection after submission
        setSelectedOption(option);
        handleAnswerSelect(index, option);
    };

    const isCorrect = userAnswers[index] === questionItem.answer;

    return (
        <div className="multiple-choice-question-item">
            <p className="question-text">
                {index + 1}. {questionItem.question}
            </p>

            <ul className="options-list">
                {shuffledOptions.map((option, i) => {
                    const isOptionCorrect = option === questionItem.answer;
                    const isOptionSelected = userAnswers[index] === option;
                    const optionClass = submitted
                        ? isOptionSelected
                            ? isOptionCorrect
                                ? 'correct'
                                : 'incorrect'
                            : isOptionCorrect
                            ? 'correct'
                            : ''
                        : '';
                    return (
                        <li
                            key={i}
                            className={`option-item ${optionClass}`}
                            onClick={() => handleCardClick(option)}
                        >
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={userAnswers[index] === option}
                                onChange={() => handleAnswerSelect(index, option)}
                                disabled={submitted}
                            />
                            <span className="option-label">
                                {String.fromCharCode(65 + i)}. {option}
                            </span>
                        </li>
                    );
                })}
            </ul>

            {/* Feedback message after submission */}
            {submitted && userAnswers[index] && (
                <p className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? '✔ Correct' : '✘ Incorrect'} - Correct answer: {questionItem.answer}
                </p>
            )}
        </div>
    );
};

export default MultipleChoiceQuestionItem;

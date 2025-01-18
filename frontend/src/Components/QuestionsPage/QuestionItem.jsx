import React from 'react';

const QuestionItem = ({ questionItem, index, userAnswers, handleAnswerSelect, results }) => {
    return (
        <div className="question-item">
            {questionItem.image && (
                <div className="question-image">
                    <img src={questionItem.image} alt={`Question ${index + 1}`} />
                </div>
            )}
            <p className="question-text">
                {index + 1}. {questionItem.question}
            </p>
            <ul className="options-list">
                {questionItem.options.map((option, i) => (
                    <li key={i} className="option-item">
                        <label>
                            <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={userAnswers[index] === option}
                                onChange={() => handleAnswerSelect(index, option)}
                            />
                            <span className="option-label">
                                {String.fromCharCode(65 + i)}. {option}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
            {results && (
                <p className={`feedback ${results[index].correct ? 'correct' : 'incorrect'}`}>
                    {results[index].correct
                        ? `✔ Correct answer: ${results[index].correctAnswer}`
                        : `✘ Wrong answer: Answer is ${results[index].correctAnswer}`}
                </p>
            )}
        </div>
    );
};

export default QuestionItem;

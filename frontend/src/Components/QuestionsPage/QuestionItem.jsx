import React, { useState, useEffect } from 'react';

//Array for randomizing questions
const shuffleArray = (array) => {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
};


const QuestionItem = ({ questionItem, index, userAnswers, handleAnswerSelect, results }) => {
    const [shuffledOptions, setShuffledOptions] = useState([]);
   
    useEffect(() => {
        // Shuffle options and store them in state
        setShuffledOptions(shuffleArray(questionItem.options));
    }, [questionItem.options]);

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
                {shuffledOptions.map((option, i) => (
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

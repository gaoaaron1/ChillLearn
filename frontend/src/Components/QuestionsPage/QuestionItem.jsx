import React, { useState, useEffect } from 'react';
import './QuestionItem.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Array for randomizing options if needed
const shuffleArray = (array) => {
    return array
        .map((item) => ({ item, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ item }) => item);
};

const QuestionItem = ({ questionItem, index, userAnswers, handleAnswerSelect, results, submitted }) => {
    const [shuffledOptions, setShuffledOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (questionItem.options) {
            setShuffledOptions(shuffleArray(questionItem.options)); // For multiple-choice
        }
    }, [questionItem.options]);

    const renderLaTeX = (text) => {
        // Handle multiplication symbol
        text = text.replace(/\\times/g, " \u00D7 ");

        // Handle exponents
        text = text.replace();

        // Handle fractions
        const latexPattern = /\\frac{[^}]*}{[^}]*}/g;
        const parts = text.split(latexPattern).map((part, index) => {
            return <span key={index}>{part}</span>;
        });
    
        const latexMatches = text.match(latexPattern);
        if (latexMatches) {
            latexMatches.forEach((latex, index) => {
                parts.splice(index * 2 + 1, 0, <InlineMath key={index} math={latex} />);
            });
        }

    
        // Render the final text as LaTeX
        return parts;
    };
    

    return (
        <div className="question-item">
            {/* Render image if available */}
            {questionItem.image && (
                <div className="question-image">
                    <img
                        src={questionItem.image}
                        alt={`Question ${index + 1}`}
                        onClick={() => setIsModalOpen(true)} // Open modal on click
                        className="question-thumbnail"
                    />
                </div>
            )}

            {/* Display question text */}
            <p className="question-text">
                {index + 1}. {renderLaTeX(questionItem.question)}
            </p>

            {/* Render fill-in-the-blank questions */}
            {questionItem.blanks ? (
                <div className="blanks">
                    {questionItem.blanks.map((blank, i) => (
                        <div key={i} className="blank-item">
                            <label>{blank.placeholder}</label>
                            <input
                                type="text"
                                value={userAnswers[index]?.[i] || ""}
                                onChange={(e) => handleAnswerSelect(index, e.target.value, i)}
                                disabled={submitted}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                // Render multiple choice questions
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
                                    disabled={submitted}
                                />
                                <span className="option-label">
                                    {String.fromCharCode(65 + i)}.
                                    {renderLaTeX(option)}
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            )}

            {/* Display feedback for results */}
            {results && (
                <>
                    {/* Feedback for multiple-choice questions */}
                    {!questionItem.blanks && (
                        <p className={`feedback ${results[index].correct ? 'correct' : 'incorrect'}`}>
                            {results[index].correct
                                ? <>
                                    ✔ Correct answer: {renderLaTeX(results[index].correctAnswer)}
                                  </>
                                : <>
                                    ✘ Wrong answer: Answer is {renderLaTeX(results[index].correctAnswer)}
                                  </>}
                        </p>
                    )}

    {/* Feedback for fill-in-the-blank questions */}
    {questionItem.blanks && results[index] && (
      <div className={`feedback ${results[index].correct ? 'correct' : 'incorrect'}`}>
        <p>
          {results[index].partialCorrect === results[index].totalBlanks
            ? `✔ All correct!`
            : `✔ ${results[index].partialCorrect}/${results[index].totalBlanks} correct`}
        </p>
        <p><strong>Correct answers:</strong> 
          {/* Ensure the correct answers are rendered as LaTeX */}
          {Array.isArray(results[index].correctAnswer) 
            ? results[index].correctAnswer.map((answer, idx) => (
                <span key={idx}>{renderLaTeX(answer)}</span>
              ))
            : renderLaTeX(results[index].correctAnswer)
          }
        </p>
      </div>
    )}
                </>
            )}

            {/* Image Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content">
                        <img src={questionItem.image} alt={`Question ${index + 1}`} />
                        <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionItem;

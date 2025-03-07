import React, { useState, useEffect } from 'react';
import './QuestionItem.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import AudioButton from './AudioButton'; // Import the AudioButton component

const shuffleArray = (array) => {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
};

const QuestionItem = ({ questionItem, index, userAnswers, handleAnswerSelect, results, submitted, language }) => {
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (questionItem.options) {
      setShuffledOptions(shuffleArray(questionItem.options)); // For multiple-choice
    }
  }, [questionItem.options]);

  const renderLaTeX = (text) => {
    text = text.replace(/\\times/g, " \\times ");
    const exponentPattern = /(\w+)\^(\d+)/g;
    text = text.replace(exponentPattern, "$1^{ $2 }");

    const latexPattern = /\\frac{[^}]*}{[^}]*}|\w+\^{\s*\d+\s*}/g;
    const parts = text.split(latexPattern).map((part, index) => <span key={index}>{part}</span>);

    const latexMatches = text.match(latexPattern);
    if (latexMatches) {
      latexMatches.forEach((latex, index) => {
        parts.splice(index * 2 + 1, 0, <InlineMath key={index} math={latex} />);
      });
    }

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

      {/* Add the AudioButton to read the question */}
      <AudioButton
        questionText={questionItem.question} // Pass the question text to AudioButton
        isReadingAnswer={false} // Indicating this button is for reading the question
      />


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
        // Render multiple-choice questions
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

              {/* Add the AudioButton to read the option */}
              <AudioButton
                questionText={option} // Pass the option text to AudioButton
                isReadingAnswer={false} // Indicating this button is for reading the option
              />
            </li>
          ))}
        </ul>
      )}

      {/* Display feedback for results */}
      {results && (
        <>
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

          {questionItem.blanks && results[index] && (
            <div className={`feedback ${results[index].correct ? 'correct' : 'incorrect'}`}>
              <p>
                {results[index].partialCorrect === results[index].totalBlanks
                  ? `✔ All correct!`
                  : `✔ ${results[index].partialCorrect}/${results[index].totalBlanks} correct`}
              </p>
              <p><strong>Correct answers:</strong>
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

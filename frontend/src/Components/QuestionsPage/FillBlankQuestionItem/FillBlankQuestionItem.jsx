import React from 'react';
import './FillBlankQuestionItem.css';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const FillBlankQuestionItem = ({ questionItem, index, userAnswers, handleAnswerSelect, submitted }) => {
  // Function to render LaTeX expressions using InlineMath
  const renderLaTeX = (text) => {
    const latexPattern = /\\frac{[^}]*}{[^}]*}/g;
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
    <div className="fill-blank-question-item">
      {/* Render question text with LaTeX */}
      <h3>{renderLaTeX(questionItem.question)}</h3>

      {/* Render fill-in-the-blank inputs */}
      {questionItem.blanks && (
        <div className="blanks">
          {questionItem.blanks.map((blank, i) => (
            <div key={i} className="blank-item">
              <label>{renderLaTeX(blank.placeholder)}</label>
              <input
                type="text"
                value={userAnswers[index]?.[i] || ""}
                onChange={(e) => handleAnswerSelect(index, e.target.value, i)}
                disabled={submitted}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FillBlankQuestionItem;

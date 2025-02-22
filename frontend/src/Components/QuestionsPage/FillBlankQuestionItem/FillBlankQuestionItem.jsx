import React from 'react';
import './FillBlankQuestionItem.css';

const FillBlankQuestionItem = ({ questionItem, index, userAnswers, handleAnswerSelect, submitted }) => {
  return (
    <div className="fill-blank-question-item">
      <h3>{questionItem.question}</h3>

      {/* Render fill-in-the-blank inputs */}
      {questionItem.blanks && (
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
      )}
    </div>
  );
};

export default FillBlankQuestionItem;

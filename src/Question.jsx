// src/Question.js
import React from 'react';

function Question({
  question,
  selectedOption,
  onOptionChange,
  onSubmit,
  isLastQuestion,
}) {
  return (
    <div className="question-container">
      <h2>{question.questionText}</h2>
      <form onSubmit={onSubmit}>
        <div className="options-container">
          {question.options.map((option, index) => (
            <label key={index} className="option-label">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => onOptionChange(option)}
                required
              />
              {option}
            </label>
          ))}
        </div>
        <button type="submit" disabled={!selectedOption}>
          {isLastQuestion ? 'Pokaż wyniki' : 'Dalej'}
        </button>
      </form>
    </div>
  );
}

export default Question;
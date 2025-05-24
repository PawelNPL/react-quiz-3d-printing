// src/Results.js
import React from 'react';

function Results({ questions, userAnswers, score, onReset }) {
  return (
    <div className="results-container">
      <h2>Wyniki Quizu</h2>
      <p>
        Uzyskałeś {score} z {questions.length} poprawnych odpowiedzi.
      </p>
      <h3>Szczegółowe odpowiedzi:</h3>
      <ul>
        {questions.map((question, index) => (
          <li
            key={question.id}
            className={
              userAnswers[index] === question.correctAnswer
                ? 'correct-answer'
                : 'incorrect-answer'
            }
          >
            <strong>{question.questionText}</strong>
            <br />
            Twoja odpowiedź: {userAnswers[index] || 'Brak odpowiedzi'}
            <br />
            {userAnswers[index] !== question.correctAnswer && (
              <span>Poprawna odpowiedź: {question.correctAnswer}</span>
            )}
          </li>
        ))}
      </ul>
      <button onClick={onReset}>Spróbuj ponownie</button>
    </div>
  );
}

export default Results;
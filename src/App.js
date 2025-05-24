// src/App.js
import React, { useState, useEffect } from 'react';
import { quizData } from './QuizData';
import Question from './Question';
import Results from './Results';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); 
  const [selectedOption, setSelectedOption] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuestions(quizData);
    setUserAnswers(Array(quizData.length).fill(null));
  }, []);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = (event) => {
    event.preventDefault(); 
    
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(''); 
    } else {
      calculateResults(newAnswers);
      setShowResults(true);
    }
  };

  const calculateResults = (finalAnswers) => {
    let currentScore = 0;
    questions.forEach((question, index) => {
      if (finalAnswers[index] === question.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(null));
    setSelectedOption('');
    setShowResults(false);
    setScore(0);
  };

  if (questions.length === 0) {
    return <div className="app-container">Ładowanie pytań...</div>;
  }

  return (
    <div className="app-container">
      <h1>Quiz o druku 3D</h1>
      {!showResults ? (
        <Question
          question={questions[currentQuestionIndex]}
          selectedOption={selectedOption}
          onOptionChange={handleOptionChange}
          onSubmit={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      ) : (
        <Results
          questions={questions}
          userAnswers={userAnswers}
          score={score}
          onReset={handleResetQuiz}
        />
      )}
    </div>
  );
}

export default App; 
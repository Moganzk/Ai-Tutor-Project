import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { quizAPI } from '../api';

const Quiz = () => {
  const [quizSubject, setQuizSubject] = useState('');
  const [quizDifficulty, setQuizDifficulty] = useState('medium');
  const [quiz, setQuiz] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizError, setQuizError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", 
    "History", "English", "Computer Science", "Economics"
  ];

  const handleGenerateQuiz = async () => {
    if (!quizSubject) {
      setQuizError('Please select a subject.');
      return;
    }
    setQuizLoading(true);
    setQuizError('');
    setQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    
    try {
      const response = await quizAPI.generate(quizSubject, quizDifficulty, 5);
      const questions = response.questions || response;
      setQuiz(questions);
    } catch (err) {
      console.error('Quiz generation error:', err);
      setQuizError('Could not generate quiz. Please try again.');
    }
    setQuizLoading(false);
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;
    
    let correctAnswers = 0;
    quiz.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      if (selectedAnswer === question.correct_answer) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setShowResults(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!quiz) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <BookOpen size={20} />
          <span>Quiz Generator</span>
        </div>
        
        <div className="quiz-setup">
          <div className="form-group">
            <label className="form-label">Select Subject</label>
            <select 
              className="form-input" 
              value={quizSubject}
              onChange={(e) => setQuizSubject(e.target.value)}
            >
              <option value="">Choose a subject...</option>
              {subjects.map((subject, index) => (
                <option key={index} value={subject.toLowerCase()}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Difficulty Level</label>
            <select 
              className="form-input" 
              value={quizDifficulty}
              onChange={(e) => setQuizDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          
          <button 
            className="btn btn-primary" 
            onClick={handleGenerateQuiz} 
            disabled={quizLoading}
          >
            {quizLoading ? 'Generating Quiz...' : 'Generate Quiz'}
          </button>
          
          {quizError && <p className="error-message">{quizError}</p>}
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <BookOpen size={20} />
          <span>Quiz Results</span>
        </div>
        
        <div className="quiz-results">
          <div className="score-display">
            <h3>Your Score</h3>
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {quiz.length}</span>
            </div>
            <p className="score-percentage">
              {Math.round((score / quiz.length) * 100)}%
            </p>
          </div>
          
          <div className="quiz-review">
            <h4>Question Review</h4>
            {quiz.map((question, index) => {
              const selectedAnswer = selectedAnswers[index];
              const isCorrect = selectedAnswer === question.correct_answer;
              
              return (
                <div key={index} className={`question-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="question-header">
                    <span className="question-number">Q{index + 1}</span>
                    {isCorrect ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  </div>
                  <p className="question-text">{question.question}</p>
                  <div className="answer-review">
                    <p><strong>Your answer:</strong> {selectedAnswer || 'Not answered'}</p>
                    <p><strong>Correct answer:</strong> {question.correct_answer}</p>
                    {question.explanation && (
                      <p><strong>Explanation:</strong> {question.explanation}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="quiz-actions">
            <button className="btn btn-secondary" onClick={handleRetakeQuiz}>
              <RotateCcw size={16} />
              Retake Quiz
            </button>
            <button className="btn btn-primary" onClick={handleGenerateQuiz}>
              New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quiz[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <BookOpen size={20} />
        <span>Quiz - {quizSubject}</span>
        <span className="quiz-progress">
          Question {currentQuestion + 1} of {quiz.length}
        </span>
      </div>
      
      <div className="quiz-question">
        <div className="question-content">
          <h3>{currentQ.question}</h3>
          
          <div className="answer-options">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`answer-option ${
                  selectedAnswers[currentQuestion] === option ? 'selected' : ''
                }`}
                onClick={() => handleAnswerSelect(currentQuestion, option)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="quiz-navigation">
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          
          {currentQuestion === quiz.length - 1 ? (
            <button
              className="btn btn-primary"
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length < quiz.length}
            >
              Submit Quiz
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setCurrentQuestion(prev => Math.min(quiz.length - 1, prev + 1))}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz; 
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
      <div className="page-container">
        <section className="section section-quiz">
          <div className="card quiz-card">
            <div className="card-header flex items-center gap-2">
              <BookOpen size={20} />
              <span className="card-title">Quiz Generator</span>
            </div>
            <div className="card-body quiz-setup grid gap-4">
              <div className="form-group">
                <label className="form-label">Select Subject</label>
                <select 
                  className="input input-lg w-full" 
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
                  className="input input-lg w-full" 
                  value={quizDifficulty}
                  onChange={(e) => setQuizDifficulty(e.target.value)}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button 
                className="btn btn-primary btn-lg w-full" 
                onClick={handleGenerateQuiz} 
                disabled={quizLoading}
              >
                {quizLoading ? 'Generating Quiz...' : 'Generate Quiz'}
              </button>
              {quizError && <p className="alert alert-danger mt-2">{quizError}</p>}
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="page-container">
        <section className="section section-quiz">
          <div className="card quiz-card">
            <div className="card-header flex items-center gap-2">
              <BookOpen size={20} />
              <span className="card-title">Quiz Results</span>
            </div>
            <div className="card-body quiz-results">
              <div className="score-display flex flex-col items-center mb-6">
                <h3 className="mb-2">Your Score</h3>
                <div className="score-circle mb-1">
                  <span className="score-number">{score}</span>
                  <span className="score-total">/ {quiz.length}</span>
                </div>
                <p className="score-percentage text-lg font-bold">
                  {Math.round((score / quiz.length) * 100)}%
                </p>
              </div>
              <div className="quiz-review">
                <h4 className="mb-2">Question Review</h4>
                {quiz.map((question, index) => {
                  const selectedAnswer = selectedAnswers[index];
                  const isCorrect = selectedAnswer === question.correct_answer;
                  return (
                    <div key={index} className={`card mb-3 question-review ${isCorrect ? 'border-success' : 'border-danger'}`}>
                      <div className="card-header flex items-center gap-2">
                        <span className="question-number">Q{index + 1}</span>
                        {isCorrect ? <CheckCircle size={16} className="text-success" /> : <XCircle size={16} className="text-danger" />}
                      </div>
                      <div className="card-body">
                        <p className="question-text font-semibold">{question.question}</p>
                        <div className="answer-review mt-2">
                          <p><strong>Your answer:</strong> {selectedAnswer || <span className="text-muted">Not answered</span>}</p>
                          <p><strong>Correct answer:</strong> {question.correct_answer}</p>
                          {question.explanation && (
                            <p><strong>Explanation:</strong> {question.explanation}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="quiz-actions flex gap-2 mt-4">
                <button className="btn btn-secondary flex items-center gap-1" onClick={handleRetakeQuiz}>
                  <RotateCcw size={16} />
                  Retake Quiz
                </button>
                <button className="btn btn-primary" onClick={handleGenerateQuiz}>
                  New Quiz
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const currentQ = quiz[currentQuestion];

  return (
    <div className="page-container">
      <section className="section section-quiz">
        <div className="card quiz-card">
          <div className="card-header flex items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={20} />
              <span className="card-title">Quiz - {quizSubject}</span>
            </div>
            <span className="badge badge-info quiz-progress">
              Question {currentQuestion + 1} of {quiz.length}
            </span>
          </div>
          <div className="card-body quiz-question">
            <div className="question-content mb-4">
              <h3 className="mb-3">{currentQ.question}</h3>
              <div className="answer-options grid gap-2">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`btn btn-outline flex items-center gap-2 answer-option ${selectedAnswers[currentQuestion] === option ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(currentQuestion, option)}
                    aria-pressed={selectedAnswers[currentQuestion] === option}
                  >
                    <span className="option-letter font-bold">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="option-text">{option}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="quiz-navigation flex gap-2 justify-end">
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
      </section>
    </div>
  );
};

export default Quiz;
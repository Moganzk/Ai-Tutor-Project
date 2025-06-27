import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Users, Zap, ArrowRight } from 'lucide-react';
import Chat from '../Components/Chat';
import Quiz from '../Components/Quiz';

const Home = () => {
  const [activeTab, setActiveTab] = useState('chat');

  const features = [
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Learning",
      description: "Get personalized explanations and step-by-step guidance for any subject."
    },
    {
      icon: <BookOpen size={24} />,
      title: "Interactive Quizzes",
      description: "Test your knowledge with AI-generated quizzes tailored to your study topics."
    },
    {
      icon: <Users size={24} />,
      title: "24/7 Availability",
      description: "Study anytime, anywhere with our always-available AI tutor."
    },
    {
      icon: <Zap size={24} />,
      title: "Instant Feedback",
      description: "Get immediate responses and explanations to accelerate your learning."
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Your Personal AI Tutor</h1>
          <p className="hero-subtitle">
            Get instant help with homework, understand complex concepts, and ace your exams 
            with our intelligent learning assistant.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn btn-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-section">
        <div className="container">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <Brain size={20} />
              AI Chat
            </button>
            <button 
              className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              <BookOpen size={20} />
              Quiz Generator
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'chat' && (
              <div className="chat-section">
                <div className="section-header">
                  <h2>Chat with Your AI Tutor</h2>
                  <p>Ask questions about any subject and get detailed, educational responses.</p>
                </div>
                <Chat />
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="quiz-section">
                <div className="section-header">
                  <h2>Generate Custom Quizzes</h2>
                  <p>Create personalized quizzes to test your knowledge and track your progress.</p>
                </div>
                <Quiz />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Why Choose AI Tutor?</h2>
            <p>Experience the future of personalized learning</p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Transform Your Learning?</h2>
            <p>Join thousands of students who are already learning smarter with AI Tutor.</p>
            <Link to="/signup" className="btn btn-primary">
              Start Learning Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

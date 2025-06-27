import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Users, Zap, ArrowRight, Monitor, Target, TrendingUp } from 'lucide-react';
import Chat from '../Components/Chat';
import Quiz from '../Components/Quiz';
import TutorIframe from '../Components/TutorIframe';
import { ReactComponent as LearningSVG } from '../assets/undraw_online_learning.svg';

const useFadeInOnScroll = () => {
  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        node.classList.add('visible');
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('tutor');

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

  const platformFeatures = [
    {
      icon: <Monitor size={24} />,
      title: "Integrated Platform",
      description: "Seamlessly integrated with MoganSpace Live for comprehensive learning experience."
    },
    {
      icon: <Target size={24} />,
      title: "Goal Tracking",
      description: "Set learning goals and track your progress with detailed analytics."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Progress Analytics",
      description: "Monitor your learning journey with detailed progress reports and insights."
    }
  ];

  // Section refs
  const mainSectionRef = useFadeInOnScroll();
  const platformFeaturesRef = useFadeInOnScroll();
  const featuresRef = useFadeInOnScroll();
  const quickAccessRef = useFadeInOnScroll();
  const ctaRef = useFadeInOnScroll();

  return (
    <div className="home page-container">
      {/* Hero Section */}
      <section className="hero hero-animated section">
        <div className="hero-content container">
          <div className="hero-text">
            <h1 className="hero-title page-title">Your Complete AI Learning Platform</h1>
            <p className="hero-subtitle page-subtitle">
              Experience the future of education with our integrated AI tutor, powered by MoganSpace Live. 
              Get instant help, take interactive quizzes, and track your learning progress all in one place.
            </p>
            <div className="hero-buttons actions-container">
              <Link to="/signup" className="btn btn-primary btn-with-icon">
                Get Started Free
                <ArrowRight size={16} />
              </Link>
              <Link to="/about" className="btn btn-secondary btn-with-icon">
                Learn More
              </Link>
            </div>
          </div>
          <div className="hero-illustration">
            <LearningSVG className="hero-svg" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="main-section section fade-in-section" ref={mainSectionRef}>
        <div className="container">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button 
              className={`tab-button ${activeTab === 'tutor' ? 'active' : ''}`}
              onClick={() => setActiveTab('tutor')}
            >
              <Brain size={20} />
              AI Tutor Platform
            </button>
            <button 
              className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
              onClick={() => setActiveTab('chat')}
            >
              <Brain size={20} />
              Quick Chat
            </button>
            <button 
              className={`tab-button ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              <BookOpen size={20} />
              Quiz Generator
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'tutor' && (
              <div className="tutor-section card card-hover">
                <div className="section-header">
                  <h2 className="section-title">AI Tutor Platform</h2>
                  <p className="page-subtitle">Access the full MoganSpace Live platform with advanced AI tutoring capabilities.</p>
                </div>
                <TutorIframe />
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="chat-section card card-hover">
                <div className="section-header">
                  <h2 className="section-title">Quick AI Chat</h2>
                  <p className="page-subtitle">Get instant answers to your questions with our AI tutor.</p>
                </div>
                <Chat />
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="quiz-section card card-hover">
                <div className="section-header">
                  <h2 className="section-title">Generate Custom Quizzes</h2>
                  <p className="page-subtitle">Create personalized quizzes to test your knowledge and track your progress.</p>
                </div>
                <Quiz />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="platform-features-section section fade-in-section" ref={platformFeaturesRef}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Complete Learning Platform</h2>
            <p className="page-subtitle">Everything you need for successful learning in one integrated platform</p>
          </div>
          <div className="features-grid card-grid">
            {platformFeatures.map((feature, index) => (
              <div key={index} className="feature-card card card-hover staggered-fade-in" style={{ animationDelay: `${0.1 * index + 0.2}s` }}>
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

      {/* Features Section */}
      <section className="features-section section fade-in-section" ref={featuresRef}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Choose Our AI Tutor?</h2>
            <p className="page-subtitle">Experience the future of personalized learning</p>
          </div>
          <div className="features-grid card-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card card card-hover staggered-fade-in" style={{ animationDelay: `${0.1 * index + 0.2}s` }}>
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

      {/* Quick Access Section */}
      <section className="quick-access-section section fade-in-section" ref={quickAccessRef}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Quick Access</h2>
            <p className="page-subtitle">Jump directly to what you need</p>
          </div>
          <div className="quick-access-grid card-grid">
            <Link to="/resources" className="quick-access-card card card-hover">
              <BookOpen size={32} />
              <h3>Learning Resources</h3>
              <p>Access educational materials, videos, and interactive content</p>
            </Link>
            <Link to="/reminders" className="quick-access-card card card-hover">
              <Target size={32} />
              <h3>Study Reminders</h3>
              <p>Set goals and track your learning progress</p>
            </Link>
            <Link to="/notifications" className="quick-access-card card card-hover">
              <Brain size={32} />
              <h3>Notifications</h3>
              <p>Stay updated with your learning activities</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section fade-in-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-content text-center card card-hover">
            <h2 className="section-title">Ready to Transform Your Learning?</h2>
            <p className="page-subtitle">Join thousands of students who are already learning smarter with our AI Tutor platform.</p>
            <Link to="/signup" className="btn btn-primary btn-with-icon">
              Start Learning Today
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

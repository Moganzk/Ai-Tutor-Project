import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Users, Zap, Code, Database, Globe, Monitor, Target, TrendingUp, Shield, Clock } from 'lucide-react';

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

const About = () => {
  const techStack = [
    { icon: <Code size={24} />, name: "React", description: "Modern frontend framework" },
    { icon: <Code size={24} />, name: "Python Flask", description: "Robust backend API" },
    { icon: <Database size={24} />, name: "Supabase", description: "Database & Authentication" },
    { icon: <Brain size={24} />, name: "OpenAI GPT", description: "AI-powered responses" },
    { icon: <Globe size={24} />, name: "MoganSpace Live", description: "Integrated tutor platform" },
    { icon: <Globe size={24} />, name: "Vercel/Render", description: "Cloud hosting" }
  ];

  const features = [
    {
      title: "Integrated AI Platform",
      description: "Seamlessly integrated with MoganSpace Live for a comprehensive learning experience with advanced AI tutoring capabilities.",
      icon: <Monitor size={32} />
    },
    {
      title: "AI-Powered Learning",
      description: "Our advanced AI understands context and provides personalized explanations tailored to your learning style and level.",
      icon: <Brain size={32} />
    },
    {
      title: "Interactive Quizzes",
      description: "Generate custom quizzes on any topic to test your knowledge and track your progress over time.",
      icon: <BookOpen size={32} />
    },
    {
      title: "Goal Tracking & Analytics",
      description: "Set learning goals, track your progress, and get detailed analytics to optimize your learning journey.",
      icon: <Target size={32} />
    },
    {
      title: "24/7 Availability",
      description: "Study anytime, anywhere. Our AI tutor is always available to help you with your questions.",
      icon: <Clock size={32} />
    },
    {
      title: "Secure & Reliable",
      description: "Enterprise-grade security and reliability to ensure your learning data is always protected.",
      icon: <Shield size={32} />
    }
  ];

  const platformBenefits = [
    {
      title: "Complete Learning Ecosystem",
      description: "Everything you need for successful learning in one integrated platform - from AI tutoring to progress tracking.",
      icon: <Monitor size={24} />
    },
    {
      title: "Personalized Learning Paths",
      description: "AI-driven recommendations and adaptive learning paths that evolve with your progress and preferences.",
      icon: <TrendingUp size={24} />
    },
    {
      title: "Real-time Collaboration",
      description: "Connect with other learners, share resources, and collaborate on projects in real-time.",
      icon: <Users size={24} />
    }
  ];

  // Section refs
  const missionRef = useFadeInOnScroll();
  const benefitsRef = useFadeInOnScroll();
  const featuresRef = useFadeInOnScroll();
  const techRef = useFadeInOnScroll();
  const integrationRef = useFadeInOnScroll();
  const teamRef = useFadeInOnScroll();
  const ctaRef = useFadeInOnScroll();

  return (
    <div className="about page-container">
      {/* Hero Section */}
      <section className="hero hero-animated section">
        <div className="hero-content container">
          <h1 className="hero-title page-title">About Our AI Learning Platform</h1>
          <p className="hero-subtitle page-subtitle">
            Discover how our integrated AI tutor, powered by MoganSpace Live, is transforming education for students everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section fade-in-section" ref={missionRef}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Our Mission</h2>
            <p className="page-subtitle">Empowering every learner with personalized, accessible, and effective AI-driven education.</p>
          </div>
        </div>
      </section>

      {/* Platform Benefits Section */}
      <section className="section fade-in-section" ref={benefitsRef}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Platform Benefits</h2>
            <p className="page-subtitle">Why choose our AI Tutor platform?</p>
          </div>
          <div className="features-grid card-grid">
            {platformBenefits.map((benefit, idx) => (
              <div key={idx} className="feature-card card card-hover staggered-fade-in" style={{ animationDelay: `${0.1 * idx + 0.2}s` }}>
                <div className="feature-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section fade-in-section" ref={featuresRef}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Key Features</h2>
            <p className="page-subtitle">Experience the future of learning</p>
          </div>
          <div className="features-grid card-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card card card-hover staggered-fade-in" style={{ animationDelay: `${0.1 * idx + 0.2}s` }}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section fade-in-section" ref={techRef}>
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Technology Stack</h2>
            <p className="page-subtitle">Built with modern, scalable, and secure technologies</p>
          </div>
          <div className="features-grid card-grid">
            {techStack.map((tech, idx) => (
              <div key={idx} className="feature-card card card-hover staggered-fade-in" style={{ animationDelay: `${0.1 * idx + 0.2}s` }}>
                <div className="feature-icon">{tech.icon}</div>
                <h3>{tech.name}</h3>
                <p>{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section fade-in-section" ref={ctaRef}>
        <div className="container">
          <div className="cta-content text-center card card-hover">
            <h2 className="section-title">Ready to Experience AI-Powered Learning?</h2>
            <p className="page-subtitle">Join thousands of students who are already learning smarter with our AI Tutor platform.</p>
            <Link to="/signup" className="btn btn-primary btn-with-icon">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
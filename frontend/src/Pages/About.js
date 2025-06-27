import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Users, Zap, Code, Database, Globe } from 'lucide-react';

const About = () => {
  const techStack = [
    { icon: <Code size={24} />, name: "React", description: "Modern frontend framework" },
    { icon: <Code size={24} />, name: "Python Flask", description: "Robust backend API" },
    { icon: <Database size={24} />, name: "Supabase", description: "Database & Authentication" },
    { icon: <Brain size={24} />, name: "OpenAI GPT", description: "AI-powered responses" },
    { icon: <Globe size={24} />, name: "Vercel/Render", description: "Cloud hosting" }
  ];

  const features = [
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
      title: "24/7 Availability",
      description: "Study anytime, anywhere. Our AI tutor is always available to help you with your questions.",
      icon: <Users size={32} />
    },
    {
      title: "Instant Feedback",
      description: "Get immediate responses and detailed explanations to accelerate your learning process.",
      icon: <Zap size={32} />
    }
  ];

  return (
    <div className="about">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>About AI Tutor</h1>
          <p className="hero-subtitle">
            Revolutionizing education through artificial intelligence and personalized learning experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              AI Tutor was created with a simple yet powerful mission: to make quality education 
              accessible to everyone, everywhere. We believe that every student deserves a 
              personalized learning experience that adapts to their unique needs and learning style.
            </p>
            <p>
              By leveraging cutting-edge artificial intelligence, we provide students with an 
              intelligent tutor that can explain complex concepts, answer questions, and generate 
              custom quizzes to help them master any subject.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>What Makes Us Different</h2>
            <p>Discover the features that set AI Tutor apart from traditional learning methods</p>
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

      {/* Tech Stack Section */}
      <section className="tech-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Technology Stack</h2>
            <p>Built with modern technologies for optimal performance and user experience</p>
          </div>
          
          <div className="tech-grid">
            {techStack.map((tech, index) => (
              <div key={index} className="tech-card">
                <div className="tech-icon">
                  {tech.icon}
                </div>
                <h4>{tech.name}</h4>
                <p>{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Meet the Creator</h2>
            <p>The mind behind AI Tutor</p>
          </div>
          
          <div className="team-member">
            <div className="member-avatar">
              <div className="avatar-placeholder">SM</div>
            </div>
            <div className="member-info">
              <h3>Samuel Mogaka Nyamwange</h3>
              <p className="member-role">Full Stack Developer & AI Enthusiast</p>
              <p className="member-bio">
                A passionate developer with a deep interest in artificial intelligence and 
                educational technology. Samuel believes in the power of AI to transform 
                education and make learning more accessible and effective for everyone.
              </p>
              <div className="member-links">
                <a href="mailto:sammokogoti77@gmail.com" className="member-link">
                  📧 Email
                </a>
                <a 
                  href="https://www.linkedin.com/in/samwel-nyamwange-4a4744334" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="member-link"
                >
                  🌍 LinkedIn
                </a>
                <a 
                  href="https://github.com/Moganzk" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="member-link"
                >
                  💻 GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Ready to Experience the Future of Learning?</h2>
            <p>Join thousands of students who are already learning smarter with AI Tutor.</p>
            <Link to="/" className="btn btn-primary">
              Start Learning Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 
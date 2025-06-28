import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../supabaseClient';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { name: formData.name } }
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for a confirmation link!');
      navigate('/signin');
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="signup-page accent-bg">
      <div className="signup-container">
        <div className="signup-card shadow-lg animate-fade-in">
          <div className="signup-header" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <img src={require('../assets/undraw_educator.svg')} alt="AI Tutor Logo" className="auth-logo" style={{ width: 60, height: 60, marginBottom: 10, objectFit: 'contain', borderRadius: '50%' }} />
            <h1 style={{ fontWeight: 700, fontSize: '2.1rem', color: 'var(--primary-dark)', marginBottom: 0 }}>Create Account</h1>
            <p style={{ color: 'var(--neutral-500)', fontSize: '1.08rem', marginBottom: 0 }}>Join AI Tutor and start your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form" aria-label="Sign up form">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <div className="input-group">
                <User size={20} className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-group">
                <Mail size={20} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  autoComplete="username"
                  aria-required="true"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-group">
                <Lock size={20} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Create a password"
                  required
                  autoComplete="new-password"
                  aria-required="true"
                />
                <button
                  type="button"
                  className="password-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-group">
                <Lock size={20} className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                  aria-required="true"
                />
                <button
                  type="button"
                  className="password-toggle"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={0}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" required tabIndex={0} />
                <span>I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a></span>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary signup-btn"
              disabled={isLoading}
              aria-busy={isLoading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.01em', padding: '0.85em 0', borderRadius: '9999px' }}
            >
              {isLoading ? (
                <>
                  <span className="loading" aria-hidden="true"></span>
                  Creating account...
                </>
              ) : (
                <span style={{ width: '100%', textAlign: 'center' }}>Create Account</span>
              )}
            </button>
          </form>

          <div className="signup-divider" role="presentation">
            <span>or</span>
          </div>

          <div className="social-auth" style={{ marginBottom: 0, width: '100%' }}>
            <button 
              className="btn btn-secondary social-btn" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              aria-label="Sign up with Google"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '0.85em 0' }}
            >
              <img src={require('../assets/undraw_online-learning_tgmv.png')} alt="Google" className="social-icon" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', marginRight: 8 }} />
              <span style={{ fontWeight: 600, fontSize: '1.08rem' }}>Continue with Google</span>
            </button>
          </div>

          <div className="signup-footer" style={{ marginTop: 8, width: '100%' }}>
            <p style={{ textAlign: 'center', fontSize: '1rem' }}>
              Already have an account?{' '}
              <Link to="/signin" className="signup-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

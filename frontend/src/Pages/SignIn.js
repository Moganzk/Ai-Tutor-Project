import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const SignIn = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Sign in failed. Please try again.');
    }
    setIsLoading(false);
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    } catch (err) {
      setError('Google sign-in failed.');
    }
    setIsLoading(false);
  };

  return (
    <div className="auth-page accent-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-container" style={{ width: '100%', maxWidth: 410, margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="auth-card shadow-lg animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="auth-header" style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            <img src={require('../assets/undraw_educator.svg')} alt="AI Tutor Logo" className="auth-logo" style={{ width: 64, height: 64, marginBottom: 12, objectFit: 'contain', borderRadius: '50%' }} />
            <h1 className="auth-title" style={{ marginBottom: 0 }}>Welcome Back</h1>
            <p className="auth-subtitle" style={{ marginBottom: 0 }}>Sign in to continue your learning journey</p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" aria-label="Sign in form" style={{ width: '100%' }}>
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
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
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

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" tabIndex={0} />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary auth-btn" 
              disabled={isLoading}
              aria-busy={isLoading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', fontWeight: 700, fontSize: '1.25rem', letterSpacing: '0.01em', padding: '0.85em 0', borderRadius: '9999px' }}
            >
              {isLoading ? (
                <>
                  <span className="loading" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : (
                <span style={{ width: '100%', textAlign: 'center' }}>Sign In</span>
              )}
            </button>
          </form>

          <div className="auth-divider" role="presentation" style={{ width: '100%' }}>
            <span>or</span>
          </div>

          <div className="social-auth" style={{ marginBottom: 0, width: '100%' }}>
            <button 
              className="btn btn-secondary social-btn" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
              aria-label="Sign in with Google"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '0.85em 0' }}
            >
              <img src={require('../assets/undraw_online-learning_tgmv.png')} alt="Google" className="social-icon" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', marginRight: 8 }} />
              <span style={{ fontWeight: 600, fontSize: '1.08rem' }}>Continue with Google</span>
            </button>
          </div>

          <div className="auth-footer" style={{ marginTop: 8, width: '100%' }}>
            <p style={{ textAlign: 'center', fontSize: '1rem' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

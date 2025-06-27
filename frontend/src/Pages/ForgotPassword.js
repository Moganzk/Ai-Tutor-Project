import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password'
    });
    if (error) {
      alert(error.message);
    } else {
      setSent(true);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1>Forgot Password</h1>
          {sent ? (
            <p>Check your email for a password reset link.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="form-input"
              />
              <button className="btn btn-primary" type="submit">
                Send Reset Link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 
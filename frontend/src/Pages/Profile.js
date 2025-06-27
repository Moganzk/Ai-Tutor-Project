import React, { useState } from 'react';
import { User, Mail, Calendar, Edit, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    avatar: null
  });
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save profile changes
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMsg('');
    const { error } = await supabase.auth.resend({ type: 'signup', email: user.email });
    if (error) {
      setResendMsg(error.message);
    } else {
      setResendMsg('Verification email sent!');
    }
    setResendLoading(false);
  };

  return (
    <div className="profile-page page-container">
      <div className="container">
        <div className="page-header profile-header">
          <h1 className="page-title">
            <User className="page-title-icon" size={28} />
            Profile
          </h1>
          <p className="page-subtitle">Manage your account settings and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-card card card-hover">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="user-avatar" />
                ) : (
                  <User size={48} strokeWidth={1.5} />
                )}
                <div className="avatar-badge icon-button">
                  <Edit size={16} />
                </div>
              </div>
            </div>

            <div className="profile-info">
              <div className="info-row">
                <label className="form-label">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="form-control"
                  />
                ) : (
                  <span>{profile.name}</span>
                )}
              </div>

              <div className="info-row">
                <label className="form-label">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="form-control"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>

              <div className="info-row">
                <label className="form-label">Member Since</label>
                <span>{profile.joinDate}</span>
              </div>

              <div className="profile-actions">
                {isEditing ? (
                  <>
                    <button onClick={handleSave} className="btn btn-primary btn-with-icon">
                      <Save size={16} />
                      Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} className="btn btn-outline btn-with-icon">
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-with-icon">
                    <Edit size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {user && !user.email_confirmed_at && (
              <div className="verify-box card card-hover">
                <p>Your email is <b>not verified</b>.</p>
                <button className="btn btn-secondary btn-with-icon" onClick={handleResend} disabled={resendLoading}>
                  {resendLoading ? 'Sending...' : 'Resend verification email'}
                </button>
                {resendMsg && <p>{resendMsg}</p>}
              </div>
            )}

            <button className="btn btn-primary btn-with-icon" onClick={logout} style={{ marginTop: 24 }}>
              <X size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

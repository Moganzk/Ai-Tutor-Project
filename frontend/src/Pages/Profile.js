import React, { useState, useEffect, useRef } from 'react';
import { User, Edit, Save, X, Upload, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    joinDate: '',
    avatar: null
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const fileInputRef = useRef();

  // Fetch user profile from Supabase
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from('users')
        .select('name, avatar_url, created_at')
        .eq('id', user.id)
        .single();

      // Remove insert logic: only set profile if found, else fallback to auth data
      if (!data) {
        const fullName = user.user_metadata?.full_name || '';
        setProfile({
          name: fullName,
          email: user.email,
          joinDate: user.created_at
            ? new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
            : '',
          avatar: null
        });
      } else {
        setProfile({
          name: data.name || user.user_metadata?.full_name || '',
          email: user.email,
          joinDate: data.created_at
            ? new Date(data.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })
            : '',
          avatar: data.avatar_url || null
        });
      }
    };
    fetchProfile();
  }, [user]);

  // Avatar preview
  useEffect(() => {
    if (avatarFile) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(avatarFile);
    } else {
      setAvatarPreview(null);
    }
  }, [avatarFile]);

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarFile(file);
    setIsEditing(true);
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return null;
    const fileExt = avatarFile.name.split('.').pop();
    const fileName = `${user.id}_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage
      .from('avatars')
      .upload(fileName, avatarFile, { upsert: true });
    if (error) throw error;
    const { data: publicUrlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);
    return publicUrlData.publicUrl;
  };

  // Save profile changes
  const handleSave = async () => {
    setLoading(true);
    setError('');
    setFeedback('');
    let avatarUrl = profile.avatar;
    try {
      if (avatarFile) {
        avatarUrl = await uploadAvatar();
      }
      const { error: updateError } = await supabase
        .from('users')
        .update({ name: profile.name, avatar_url: avatarUrl })
        .eq('id', user.id);
      if (updateError) throw updateError;
      setProfile((prev) => ({ ...prev, avatar: avatarUrl }));
      setFeedback('Profile updated successfully!');
      setIsEditing(false);
      setAvatarFile(null);
    } catch (err) {
      setError('Failed to update profile. ' + (err.message || err.error_description || ''));
    }
    setLoading(false);
  };

  // Password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg('');
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setPasswordMsg(error.message);
    } else {
      setPasswordMsg('Password updated!');
      setShowPasswordModal(false);
      setPassword('');
    }
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
              <div className="avatar-placeholder" style={{ position: 'relative' }}>
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar Preview" className="user-avatar" />
                ) : profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="user-avatar" />
                ) : (
                  <User size={48} strokeWidth={1.5} />
                )}
                <button
                  className="avatar-badge icon-button"
                  title="Change avatar"
                  onClick={() => fileInputRef.current.click()}
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                  <Upload size={16} />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            <div className="profile-info">
              <div className="info-row">
                <label className="form-label">Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="form-control"
                  />
                ) : (
                  <span>{profile.name}</span>
                )}
              </div>

              <div className="info-row">
                <label className="form-label">Email</label>
                <span>{profile.email}</span>
              </div>

              <div className="info-row">
                <label className="form-label">Member Since</label>
                <span>{profile.joinDate}</span>
              </div>

              <div className="profile-actions">
                {isEditing ? (
                  <>
                    <button onClick={handleSave} className="btn btn-primary btn-with-icon" disabled={loading}>
                      <Save size={16} />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button onClick={() => { setIsEditing(false); setAvatarFile(null); }} className="btn btn-outline btn-with-icon">
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-with-icon">
                      <Edit size={16} />
                      Edit Profile
                    </button>
                    <button onClick={() => setShowPasswordModal(true)} className="btn btn-secondary btn-with-icon" style={{ marginLeft: 12 }}>
                      <Lock size={16} />
                      Change Password
                    </button>
                  </>
                )}
              </div>
              {feedback && <div className="alert alert-success mt-2">{feedback}</div>}
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>

            <button className="btn btn-primary btn-with-icon mt-4" onClick={logout}>
              <X size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal card-animated" style={{ maxWidth: 400 }}>
            <div className="modal-header">
              <h3 className="modal-title">
                <Lock size={18} className="modal-title-icon" />
                Change Password
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="modal-close"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <form className="modal-content" onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  minLength={6}
                  required
                  autoFocus
                />
              </div>
              {passwordMsg && <div className="alert alert-info">{passwordMsg}</div>}
              <div className="modal-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowPasswordModal(false)}
                  type="button"
                >
                  Cancel
                </button>
                <button className="btn btn-primary btn-with-icon" type="submit">
                  <Lock size={16} />
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

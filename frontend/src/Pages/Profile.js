import React, { useState } from 'react';
import { User, Mail, Calendar, Edit, Save, X } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    joinDate: 'January 2024',
    avatar: null
  });

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save profile changes
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1>Profile</h1>
          <p>Manage your account settings and preferences</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" />
                ) : (
                  <User size={48} />
                )}
              </div>
            </div>

            <div className="profile-info">
              <div className="info-row">
                <label>Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="form-input"
                  />
                ) : (
                  <span>{profile.name}</span>
                )}
              </div>

              <div className="info-row">
                <label>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="form-input"
                  />
                ) : (
                  <span>{profile.email}</span>
                )}
              </div>

              <div className="info-row">
                <label>Member Since</label>
                <span>{profile.joinDate}</span>
              </div>

              <div className="profile-actions">
                {isEditing ? (
                  <>
                    <button onClick={handleSave} className="btn btn-primary">
                      <Save size={16} />
                      Save Changes
                    </button>
                    <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
                      <X size={16} />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="btn btn-primary">
                    <Edit size={16} />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

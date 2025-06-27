import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, LogOut } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    autoSave: true
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLogout = () => {
    // TODO: Implement logout
    console.log('Logging out...');
  };

  return (
    <div className="settings-page">
      <div className="container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Customize your AI Tutor experience</p>
        </div>

        <div className="settings-content">
          {/* Notifications */}
          <div className="settings-section">
            <div className="section-header">
              <Bell size={24} />
              <h3>Notifications</h3>
            </div>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <label>Push Notifications</label>
                  <p>Receive notifications about new features and updates</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <label>Email Updates</label>
                  <p>Get weekly summaries of your learning progress</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.emailUpdates}
                    onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Appearance */}
          <div className="settings-section">
            <div className="section-header">
              <Palette size={24} />
              <h3>Appearance</h3>
            </div>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <label>Dark Mode</label>
                  <p>Switch to dark theme for better viewing in low light</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="settings-section">
            <div className="section-header">
              <Shield size={24} />
              <h3>Privacy & Security</h3>
            </div>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <label>Auto-save Chat History</label>
                  <p>Automatically save your chat conversations for future reference</p>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="settings-section">
            <div className="section-header">
              <SettingsIcon size={24} />
              <h3>Account</h3>
            </div>
            <div className="settings-options">
              <button onClick={handleLogout} className="btn btn-secondary logout-btn">
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, LogOut, Save, Database, Monitor, Clock, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user, logout } = useAuth();
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    autoSave: true,
    dataSync: true,
    sessionTimeout: 30
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    // Here you would normally fetch user settings from an API
    // This is a mock to simulate loading settings
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Show saved message
    setMessage({ text: 'Setting updated!', type: 'success' });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const handleSaveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ text: 'All settings saved successfully!', type: 'success' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }, 1000);
  };

  return (
    <div className="settings-page page-container">
      <div className="container">
        <div className="page-header settings-header">
          <h1 className="page-title">
            <SettingsIcon className="page-title-icon" size={28} />
            Settings
          </h1>
          <p className="page-subtitle">Customize your AI Tutor experience</p>
        </div>
        {message.text && (
          <div className={`message-toast toast ${message.type}`}>
            {message.text}
          </div>
        )}
        <div className="settings-content card card-hover">
          {/* Notifications */}
          <div className="settings-section section">
            <div className="section-header">
              <Bell size={24} className="section-icon" />
              <h3 className="section-title">Notifications</h3>
            </div>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <label className="form-label">Push Notifications</label>
                  <p>Receive notifications about new features and updates</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              <div className="setting-item">
                <div className="setting-info">
                  <label className="form-label">Email Updates</label>
                  <p>Get weekly summaries of your learning progress</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.emailUpdates}
                    onChange={(e) => handleSettingChange('emailUpdates', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
          {/* Appearance */}
          <div className="settings-section section">
            <div className="section-header">
              <Palette size={24} className="section-icon" />
              <h3 className="section-title">Appearance</h3>
            </div>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <label className="form-label">Dark Mode</label>
                  <p>Switch to dark theme for better viewing in low light</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
          {/* Privacy & Security */}
          <div className="settings-section section">
            <div className="section-header">
              <Shield size={24} className="section-icon" strokeWidth={1.5} />
              <h3 className="section-title">Privacy & Security</h3>
            </div>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <label className="form-label">Auto-save Chat History</label>
                  <p>Automatically save your chat conversations for future reference</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) => handleSettingChange('autoSave', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>
          {/* Account Actions */}
          <div className="settings-section section">
            <div className="section-header">
              <SettingsIcon size={24} className="section-icon" />
              <h3 className="section-title">Account</h3>
            </div>
            <div className="settings-options">
              <button onClick={logout} className="btn btn-outline btn-with-icon logout-btn">
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </div>
          <div className="settings-actions card-actions">
            <button onClick={handleSaveSettings} className="btn btn-primary btn-with-icon" disabled={isLoading}>
              <Save size={16} />
              {isLoading ? 'Saving...' : 'Save All Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

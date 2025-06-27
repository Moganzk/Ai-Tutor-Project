import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, AlertCircle, Info, X, Trash2, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showSettings, setShowSettings] = useState(false);

  // Mock notifications data - replace with API calls
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'reminder',
        title: 'Study Session Reminder',
        message: 'You have a scheduled study session in 30 minutes.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false,
        priority: 'high'
      },
      {
        id: 2,
        type: 'achievement',
        title: 'Quiz Completed!',
        message: 'Great job! You scored 85% on your Mathematics quiz.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true,
        priority: 'medium'
      },
      {
        id: 3,
        type: 'system',
        title: 'New Feature Available',
        message: 'Voice-to-text capability is now available in the chat.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        read: false,
        priority: 'low'
      },
      {
        id: 4,
        type: 'reminder',
        title: 'Daily Goal Check-in',
        message: 'Don\'t forget to review your daily learning goals.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
        read: true,
        priority: 'medium'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder':
        return <Bell size={20} className="text-blue-500" />;
      case 'achievement':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'system':
        return <Info size={20} className="text-purple-500" />;
      default:
        return <AlertCircle size={20} className="text-orange-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-500';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="notifications-page page-container">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <Bell className="page-title-icon" size={24} />
            Notifications
            {unreadCount > 0 && (
              <span className="badge badge-primary">{unreadCount} unread</span>
            )}
          </h1>
          <div className="header-actions actions-container">
            <button 
              className="btn btn-secondary btn-with-icon"
              onClick={() => setShowSettings(!showSettings)}
              aria-expanded={showSettings}
            >
              <Settings size={16} />
              Settings
            </button>
            {unreadCount > 0 && (
              <button 
                className="btn btn-primary btn-with-icon"
                onClick={markAllAsRead}
              >
                <CheckCircle size={16} />
                Mark All Read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="settings-panel card card-animated">
          <h3 className="settings-title">Notification Settings</h3>
          <div className="settings-grid">
            <div className="setting-item">
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
                <span className="toggle-label">Study Reminders</span>
              </label>
            </div>
            <div className="setting-item">
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
                <span className="toggle-label">Achievement Notifications</span>
              </label>
            </div>
            <div className="setting-item">
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
                <span className="toggle-label">System Updates</span>
              </label>
            </div>
            <div className="setting-item">
              <label className="toggle-switch">
                <input type="checkbox" defaultChecked />
                <span className="toggle-slider"></span>
                <span className="toggle-label">Email Notifications</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All <span className="tab-count">{notifications.length}</span>
        </button>
        <button 
          className={`tab-button ${filter === 'unread' ? 'active' : ''}`}
          onClick={() => setFilter('unread')}
        >
          Unread <span className="tab-count">{unreadCount}</span>
        </button>
        <button 
          className={`tab-button ${filter === 'reminder' ? 'active' : ''}`}
          onClick={() => setFilter('reminder')}
        >
          Reminders
        </button>
        <button 
          className={`tab-button ${filter === 'achievement' ? 'active' : ''}`}
          onClick={() => setFilter('achievement')}
        >
          Achievements
        </button>
      </div>

      {/* Notifications List */}
      <div className="notifications-container">
        {filteredNotifications.length === 0 ? (
          <div className="empty-state">
            <Bell size={64} className="empty-icon" />
            <h3 className="empty-title">No notifications</h3>
            <p className="empty-description">You're all caught up! Check back later for new updates.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item card card-hover ${!notification.read ? 'unread' : ''} ${getPriorityColor(notification.priority)}`}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <h4 className="notification-title">{notification.title}</h4>
                    <span className="notification-time">
                      {formatTime(notification.timestamp)}
                    </span>
                  </div>
                  <p className="notification-message">
                    {notification.message}
                  </p>
                  <div className="notification-actions">
                    {!notification.read && (
                      <button 
                        className="btn btn-sm btn-outline btn-with-icon"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <CheckCircle size={14} /> Mark as read
                      </button>
                    )}
                    <button 
                      className="btn btn-sm btn-danger btn-icon"
                      onClick={() => deleteNotification(notification.id)}
                      aria-label="Delete notification"
                      title="Delete notification"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
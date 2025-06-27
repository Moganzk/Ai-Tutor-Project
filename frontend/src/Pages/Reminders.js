import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Plus, Edit, Trash2, CheckCircle, AlertCircle, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Reminders = () => {
  const { user } = useAuth();
  const [reminders, setReminders] = useState([]);
  const [goals, setGoals] = useState([]);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState('all');

  // Mock data - replace with API calls
  useEffect(() => {
    const mockReminders = [
      {
        id: 1,
        title: 'Study Mathematics',
        description: 'Review algebra concepts and practice problems',
        date: new Date(Date.now() + 1000 * 60 * 60 * 2), // 2 hours from now
        time: '14:00',
        category: 'study',
        priority: 'high',
        completed: false,
        recurring: 'daily'
      },
      {
        id: 2,
        title: 'Complete Physics Quiz',
        description: 'Take the online quiz on mechanics',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
        time: '10:00',
        category: 'quiz',
        priority: 'medium',
        completed: false,
        recurring: 'none'
      },
      {
        id: 3,
        title: 'Read Literature Chapter',
        description: 'Read Chapter 5 of assigned novel',
        date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        time: '09:00',
        category: 'reading',
        priority: 'low',
        completed: true,
        recurring: 'weekly'
      }
    ];

    const mockGoals = [
      {
        id: 1,
        title: 'Master Algebra Fundamentals',
        description: 'Complete all algebra modules and achieve 90%+ on assessments',
        targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        progress: 75,
        category: 'mathematics',
        status: 'in-progress'
      },
      {
        id: 2,
        title: 'Read 5 Books This Month',
        description: 'Complete reading list including classic literature',
        targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 days
        progress: 60,
        category: 'reading',
        status: 'in-progress'
      },
      {
        id: 3,
        title: 'Complete Physics Course',
        description: 'Finish all physics modules and final exam',
        targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45), // 45 days
        progress: 30,
        category: 'science',
        status: 'in-progress'
      }
    ];

    setReminders(mockReminders);
    setGoals(mockGoals);
  }, []);

  const categories = [
    { id: 'study', name: 'Study Session', color: '#667eea' },
    { id: 'quiz', name: 'Quiz/Test', color: '#dc3545' },
    { id: 'reading', name: 'Reading', color: '#28a745' },
    { id: 'project', name: 'Project', color: '#ffc107' },
    { id: 'review', name: 'Review', color: '#17a2b8' }
  ];

  const priorities = [
    { id: 'high', name: 'High', color: '#dc3545' },
    { id: 'medium', name: 'Medium', color: '#ffc107' },
    { id: 'low', name: 'Low', color: '#28a745' }
  ];

  const getCategoryColor = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : '#6c757d';
  };

  const getPriorityColor = (priorityId) => {
    const priority = priorities.find(p => p.id === priorityId);
    return priority ? priority.color : '#6c757d';
  };

  const toggleReminder = (id) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
      )
    );
  };

  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const deleteGoal = (id) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const filteredReminders = reminders.filter(reminder => {
    if (filter === 'all') return true;
    if (filter === 'completed') return reminder.completed;
    if (filter === 'pending') return !reminder.completed;
    if (filter === 'overdue') return !reminder.completed && reminder.date < new Date();
    return reminder.category === filter;
  });

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (time) => {
    return time;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#28a745';
    if (progress >= 60) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div className="reminders-page page-container">
      <div className="container">
        {/* Header */}
        <div className="page-header reminders-header">
          <h1 className="page-title">
            <Calendar className="page-title-icon" size={28} />
            Reminders & Goals
          </h1>
          <p className="page-subtitle">Stay organized with study reminders and track your learning goals.</p>
        </div>
        
        {/* Actions */}
        <div className="actions-container">
          <div className="tab-navigation">
            <button
              className={`tab-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`tab-button ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`tab-button ${filter === 'overdue' ? 'active' : ''}`}
              onClick={() => setFilter('overdue')}
            >
              Overdue
            </button>
            <button
              className={`tab-button ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          
          <div className="action-buttons">
            <button 
              className="btn btn-primary btn-with-icon"
              onClick={() => setShowAddReminder(true)}
            >
              <Plus size={16} />
              Add Reminder
            </button>
            <button 
              className="btn btn-secondary btn-with-icon"
              onClick={() => setShowAddGoal(true)}
            >
              <Target size={16} />
              Add Goal
            </button>
          </div>
        </div>

      {/* Stats Overview */}
      <div className="stats-overview card-grid">
        <div className="stat-card card card-hover">
          <div className="stat-icon primary-gradient">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{reminders.filter(r => !r.completed).length}</h3>
            <p>Pending Reminders</p>
          </div>
        </div>
        <div className="stat-card card card-hover">
          <div className="stat-icon secondary-gradient">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>{goals.length}</h3>
            <p>Active Goals</p>
          </div>
        </div>
        <div className="stat-card card card-hover">
          <div className="stat-icon accent-gradient">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>{Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / (goals.length || 1))}%</h3>
            <p>Average Progress</p>
          </div>
        </div>
        <div className="stat-card card card-hover">
          <div className="stat-icon success-gradient">
            <CheckCircle size={24} />
          </div>
          <div className="stat-content">
            <h3>{reminders.filter(r => r.completed).length}</h3>
            <p>Completed</p>
          </div>
        </div>
      </div>

      {/* Goals Section */}
      <section className="section goals-section">
        <div className="section-header">
          <h2 className="section-title">
            <Target size={20} className="section-icon" /> 
            Learning Goals
          </h2>
        </div>
        <div className="card-grid goals-grid">
          {goals.map(goal => (
            <div key={goal.id} className="goal-card card card-hover">
              <div className="goal-header">
                <h3 className="card-title">{goal.title}</h3>
                <button 
                  className="icon-button danger"
                  onClick={() => deleteGoal(goal.id)}
                  aria-label="Delete goal"
                  title="Delete goal"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="card-description">{goal.description}</p>
              <div className="goal-meta">
                <span className="badge badge-primary">{categories.find(c => c.id === goal.category)?.name}</span>
                <span className="badge badge-secondary">Due: {formatDate(goal.targetDate)}</span>
              </div>
              <div className="goal-progress">
                <label className="progress-label">Progress: <strong>{goal.progress}%</strong></label>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${goal.progress}%`,
                      backgroundColor: getProgressColor(goal.progress)
                    }}
                  ></div>
                </div>
              </div>
              <div className="card-actions">
                <button className="btn btn-primary btn-sm">Update Progress</button>
                <button className="btn btn-outline btn-sm">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reminders Section */}
      <section className="section reminders-section">
        <div className="section-header">
          <h2 className="section-title">
            <Clock size={20} className="section-icon" /> 
            Reminders
          </h2>
          <div className="inline-tab-navigation">
            <button 
              className={`tab-button-sm ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`tab-button-sm ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button 
              className={`tab-button-sm ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
            <button 
              className={`tab-button-sm ${filter === 'overdue' ? 'active' : ''}`}
              onClick={() => setFilter('overdue')}
            >
              Overdue
            </button>
          </div>
        </div>

        <div className="reminders-list">
          {filteredReminders.map(reminder => (
            <div 
              key={reminder.id} 
              className={`reminder-item card card-hover ${reminder.completed ? 'completed' : ''} ${reminder.date < new Date() && !reminder.completed ? 'overdue' : ''}`}
            >
              <div className="reminder-checkbox">
                <button 
                  className={`checkbox ${reminder.completed ? 'checked' : ''}`}
                  onClick={() => toggleReminder(reminder.id)}
                  title={reminder.completed ? "Mark as incomplete" : "Mark as complete"}
                  aria-label={reminder.completed ? "Mark as incomplete" : "Mark as complete"}
                >
                  {reminder.completed && <CheckCircle size={16} />}
                </button>
              </div>
              <div className="reminder-content">
                <div className="reminder-header">
                  <h4 className="reminder-title">{reminder.title}</h4>
                  <div className="reminder-meta">
                    <span 
                      className="badge"
                      style={{ backgroundColor: getCategoryColor(reminder.category) }}
                    >
                      {categories.find(c => c.id === reminder.category)?.name}
                    </span>
                    <span 
                      className="badge"
                      style={{ backgroundColor: getPriorityColor(reminder.priority) }}
                    >
                      {priorities.find(p => p.id === reminder.priority)?.name}
                    </span>
                  </div>
                </div>
                <p className="reminder-description">{reminder.description}</p>
                <div className="reminder-time">
                  <Calendar size={14} className="icon-inline" />
                  {formatDate(reminder.date)} at {formatTime(reminder.time)}
                  {reminder.recurring !== 'none' && (
                    <span className="badge badge-small badge-secondary ml-2">{reminder.recurring}</span>
                  )}
                </div>
              </div>
              <div className="reminder-actions">
                <button className="icon-button" title="Edit reminder" aria-label="Edit reminder">
                  <Edit size={16} />
                </button>
                <button 
                  className="icon-button danger"
                  onClick={() => deleteReminder(reminder.id)}
                  title="Delete reminder"
                  aria-label="Delete reminder"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredReminders.length === 0 && (
          <div className="empty-state">
            <Clock size={64} className="empty-icon" />
            <h3 className="empty-title">No reminders found</h3>
            <p className="empty-description">Create your first reminder to get started with organized studying.</p>
            <button 
              className="btn btn-primary btn-with-icon"
              onClick={() => setShowAddReminder(true)}
            >
              <Plus size={16} />
              Add Your First Reminder
            </button>
          </div>
        )}
      </section>

      {/* Add Reminder Modal */}
      {showAddReminder && (
        <div className="modal-overlay">
          <div className="modal card-animated">
            <div className="modal-header">
              <h3 className="modal-title">
                <Plus size={18} className="modal-title-icon" />
                Add New Reminder
              </h3>
              <button 
                onClick={() => setShowAddReminder(false)} 
                className="modal-close"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label className="form-label">Reminder Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter reminder title" 
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  placeholder="Enter description"
                  rows={3}
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input type="time" className="form-control" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-control">
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select className="form-control">
                    {priorities.map(priority => (
                      <option key={priority.id} value={priority.id}>
                        {priority.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Recurring</label>
                <div className="form-check-group">
                  <label className="form-check">
                    <input type="radio" name="recurring" value="none" defaultChecked /> None
                  </label>
                  <label className="form-check">
                    <input type="radio" name="recurring" value="daily" /> Daily
                  </label>
                  <label className="form-check">
                    <input type="radio" name="recurring" value="weekly" /> Weekly
                  </label>
                  <label className="form-check">
                    <input type="radio" name="recurring" value="monthly" /> Monthly
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowAddReminder(false)}
                type="button"
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-with-icon" type="submit">
                <Plus size={16} />
                Add Reminder
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <div className="modal-overlay">
          <div className="modal card-animated">
            <div className="modal-header">
              <h3 className="modal-title">
                <Target size={18} className="modal-title-icon" />
                Add New Learning Goal
              </h3>
              <button 
                onClick={() => setShowAddGoal(false)} 
                className="modal-close"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="modal-content">
              <div className="form-group">
                <label className="form-label">Goal Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter goal title"
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  placeholder="Enter goal description"
                  rows={3}
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-control">
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Target Date</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Initial Progress</label>
                <div className="range-slider-container">
                  <input 
                    type="range" 
                    className="range-slider" 
                    min="0" 
                    max="100" 
                    defaultValue="0" 
                    step="5"
                  />
                  <div className="range-value">0%</div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowAddGoal(false)}
                type="button"
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-with-icon" type="submit">
                <Target size={16} />
                Add Goal
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Reminders; 
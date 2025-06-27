import React, { useState } from 'react';
import { Search, BookOpen, Video, FileText, ExternalLink, Download, Star, Filter } from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', icon: <BookOpen size={16} /> },
    { id: 'mathematics', name: 'Mathematics', icon: <BookOpen size={16} /> },
    { id: 'science', name: 'Science', icon: <BookOpen size={16} /> },
    { id: 'history', name: 'History', icon: <BookOpen size={16} /> },
    { id: 'english', name: 'English', icon: <BookOpen size={16} /> },
    { id: 'computer-science', name: 'Computer Science', icon: <BookOpen size={16} /> }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const resourceTypes = [
    { id: 'video', name: 'Videos', icon: <Video size={16} /> },
    { id: 'document', name: 'Documents', icon: <FileText size={16} /> },
    { id: 'interactive', name: 'Interactive', icon: <BookOpen size={16} /> }
  ];

  // Mock resources data - replace with API calls
  const resources = [
    {
      id: 1,
      title: 'Introduction to Algebra',
      description: 'A comprehensive guide to basic algebraic concepts and problem-solving techniques.',
      category: 'mathematics',
      level: 'beginner',
      type: 'video',
      duration: '45 min',
      rating: 4.8,
      views: 1250,
      thumbnail: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Algebra',
      url: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      description: 'Learn the core principles of physics including mechanics, thermodynamics, and waves.',
      category: 'science',
      level: 'intermediate',
      type: 'document',
      pages: 85,
      rating: 4.6,
      views: 890,
      thumbnail: 'https://via.placeholder.com/300x200/764ba2/ffffff?text=Physics',
      url: '#',
      featured: false
    },
    {
      id: 3,
      title: 'World History Timeline',
      description: 'Interactive timeline covering major historical events from ancient civilizations to modern times.',
      category: 'history',
      level: 'beginner',
      type: 'interactive',
      duration: '30 min',
      rating: 4.9,
      views: 2100,
      thumbnail: 'https://via.placeholder.com/300x200/28a745/ffffff?text=History',
      url: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Advanced Calculus',
      description: 'Deep dive into calculus concepts including derivatives, integrals, and applications.',
      category: 'mathematics',
      level: 'advanced',
      type: 'video',
      duration: '90 min',
      rating: 4.7,
      views: 650,
      thumbnail: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=Calculus',
      url: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Programming Basics',
      description: 'Learn the fundamentals of programming with Python and JavaScript.',
      category: 'computer-science',
      level: 'beginner',
      type: 'interactive',
      duration: '60 min',
      rating: 4.5,
      views: 1800,
      thumbnail: 'https://via.placeholder.com/300x200/ffc107/ffffff?text=Programming',
      url: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Literature Analysis',
      description: 'Techniques for analyzing and interpreting literary works from various genres.',
      category: 'english',
      level: 'intermediate',
      type: 'document',
      pages: 120,
      rating: 4.4,
      views: 720,
      thumbnail: 'https://via.placeholder.com/300x200/17a2b8/ffffff?text=Literature',
      url: '#',
      featured: false
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || resource.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getTypeIcon = (type) => {
    const typeInfo = resourceTypes.find(t => t.id === type);
    return typeInfo ? typeInfo.icon : <BookOpen size={16} />;
  };

  const getTypeName = (type) => {
    const typeInfo = resourceTypes.find(t => t.id === type);
    return typeInfo ? typeInfo.name : 'Resource';
  };

  return (
    <div className="resources-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <h1>Learning Resources</h1>
          <p>Discover educational materials, videos, and interactive content to enhance your learning journey.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="search-bar">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Level:</label>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map(level => (
                <option key={level.id} value={level.id}>
                  {level.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      {filteredResources.filter(r => r.featured).length > 0 && (
        <section className="featured-section">
          <h2>Featured Resources</h2>
          <div className="resources-grid featured">
            {filteredResources
              .filter(resource => resource.featured)
              .map(resource => (
                <div key={resource.id} className="resource-card featured">
                  <div className="resource-thumbnail">
                    <img src={resource.thumbnail} alt={resource.title} />
                    <div className="resource-type">
                      {getTypeIcon(resource.type)}
                      {getTypeName(resource.type)}
                    </div>
                    <div className="featured-badge">Featured</div>
                  </div>
                  <div className="resource-content">
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <div className="resource-meta">
                      <span className="category">{categories.find(c => c.id === resource.category)?.name}</span>
                      <span className="level">{resource.level}</span>
                      <span className="duration">
                        {resource.type === 'video' || resource.type === 'interactive' 
                          ? resource.duration 
                          : `${resource.pages} pages`}
                      </span>
                    </div>
                    <div className="resource-stats">
                      <span className="rating">
                        <Star size={14} fill="currentColor" />
                        {resource.rating}
                      </span>
                      <span className="views">{resource.views} views</span>
                    </div>
                    <div className="resource-actions">
                      <button className="btn btn-primary">
                        <ExternalLink size={16} />
                        Open Resource
                      </button>
                      <button className="btn btn-secondary">
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* All Resources */}
      <section className="all-resources">
        <h2>All Resources ({filteredResources.length})</h2>
        <div className="resources-grid">
          {filteredResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-thumbnail">
                <img src={resource.thumbnail} alt={resource.title} />
                <div className="resource-type">
                  {getTypeIcon(resource.type)}
                  {getTypeName(resource.type)}
                </div>
              </div>
              <div className="resource-content">
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className="resource-meta">
                  <span className="category">{categories.find(c => c.id === resource.category)?.name}</span>
                  <span className="level">{resource.level}</span>
                  <span className="duration">
                    {resource.type === 'video' || resource.type === 'interactive' 
                      ? resource.duration 
                      : `${resource.pages} pages`}
                  </span>
                </div>
                <div className="resource-stats">
                  <span className="rating">
                    <Star size={14} fill="currentColor" />
                    {resource.rating}
                  </span>
                  <span className="views">{resource.views} views</span>
                </div>
                <div className="resource-actions">
                  <button className="btn btn-primary">
                    <ExternalLink size={16} />
                    Open
                  </button>
                  <button className="btn btn-secondary">
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="empty-state">
          <BookOpen size={48} className="empty-icon" />
          <h3>No resources found</h3>
          <p>Try adjusting your search terms or filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default Resources; 
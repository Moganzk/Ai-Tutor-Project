import React, { useState, useEffect } from 'react';
import { ExternalLink, Maximize2, Minimize2, RefreshCw } from 'lucide-react';

const TutorIframe = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const tutorUrl = 'https://www.moganspace.live';

  useEffect(() => {
    const handleMessage = (event) => {
      // Handle messages from the iframe if needed
      if (event.origin === tutorUrl) {
        console.log('Message from tutor platform:', event.data);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
    setError(null);
  };

  const handleError = () => {
    setIsLoading(false);
    setError('Failed to load the tutor platform. Please check your connection.');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const refreshIframe = () => {
    setIsLoading(true);
    setError(null);
    const iframe = document.getElementById('tutor-iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const openInNewTab = () => {
    window.open(tutorUrl, '_blank');
  };

  return (
    <div className={`tutor-iframe-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="iframe-header">
        <div className="iframe-title">
          <h3>AI Tutor Platform</h3>
          <p>Powered by MoganSpace Live</p>
        </div>
        <div className="iframe-actions">
          <button 
            className="action-btn"
            onClick={refreshIframe}
            title="Refresh"
          >
            <RefreshCw size={16} />
          </button>
          <button 
            className="action-btn"
            onClick={openInNewTab}
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </button>
          <button 
            className="action-btn"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      <div className="iframe-wrapper">
        {isLoading && (
          <div className="iframe-loading">
            <div className="loading-spinner"></div>
            <p>Loading AI Tutor Platform...</p>
          </div>
        )}
        
        {error && (
          <div className="iframe-error">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={refreshIframe}>
              Try Again
            </button>
          </div>
        )}

        <iframe
          id="tutor-iframe"
          src={tutorUrl}
          title="AI Tutor Platform"
          onLoad={handleLoad}
          onError={handleError}
          className={`tutor-iframe ${isLoading ? 'loading' : ''}`}
          allow="camera; microphone; geolocation"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
        />
      </div>

      <div className="iframe-footer">
        <p>
          <strong>Note:</strong> This platform is powered by MoganSpace Live. 
          For the best experience, you can also{' '}
          <button className="link-btn" onClick={openInNewTab}>
            open it in a new tab
          </button>.
        </p>
      </div>
    </div>
  );
};

export default TutorIframe; 
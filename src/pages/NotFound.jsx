import React from 'react';
import './NotFound.css'; // Import your CSS file for styling

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Page Not Found</p>
        <p className="not-found-description">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <a href="/" className="not-found-link">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

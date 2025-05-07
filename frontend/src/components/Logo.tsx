import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="logo-container">
      <div className="logo">
        <div className="logo-icon">
          <div className="logo-circle"></div>
          <div className="logo-line"></div>
        </div>
        <div className="logo-text">
          <span className="logo-text-main">Resume</span>
          <span className="logo-text-sub">Suggestor</span>
        </div>
      </div>
    </div>
  );
};

export default Logo; 
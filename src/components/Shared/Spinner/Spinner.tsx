import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'medical';
  message?: string;
  overlay?: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'medium', 
  variant = 'medical', 
  message = 'Loading...', 
  overlay = false 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  const variantClasses = {
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    medical: 'spinner-medical'
  };

  const containerClass = overlay ? 'spinner-overlay' : 'spinner-container';

  return (
    <div className={`${containerClass} ${sizeClasses[size]} ${variantClasses[variant]}`}>
      <div className="spinner-wrapper">
        {/* Medical Cross Animation */}
        <div className="medical-spinner">
          <div className="medical-cross">
            <div className="cross-horizontal"></div>
            <div className="cross-vertical"></div>
          </div>
          <div className="pulse-ring pulse-ring-1"></div>
          <div className="pulse-ring pulse-ring-2"></div>
          <div className="pulse-ring pulse-ring-3"></div>
        </div>
        
        {/* Heartbeat Line Animation */}
        <div className="heartbeat-line">
          <div className="line"></div>
          <div className="beat"></div>
        </div>
        
        {/* Loading Message */}
        <div className="spinner-message">
          <span className="message-text">{message}</span>
          <div className="dots">
            <span className="dot dot-1">.</span>
            <span className="dot dot-2">.</span>
            <span className="dot dot-3">.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;

import React, { useState } from 'react';
import Spinner from './Spinner';

const SpinnerDemo = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ marginBottom: '2rem', color: '#2E7D32' }}>Healthcare Spinner Variations</h2>
      
      {/* Basic Usage */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Basic Usage</h3>
        <Spinner />
      </div>

      {/* Size Variants */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Size Variants</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div>
            <p>Small</p>
            <Spinner size="small" message="Loading..." />
          </div>
          <div>
            <p>Medium (Default)</p>
            <Spinner size="medium" message="Processing..." />
          </div>
          <div>
            <p>Large</p>
            <Spinner size="large" message="Please wait..." />
          </div>
        </div>
      </div>

      {/* Color Variants */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Color Variants</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div>
            <p>Medical (Default)</p>
            <Spinner variant="medical" message="Medical data loading..." />
          </div>
          <div>
            <p>Primary</p>
            <Spinner variant="primary" message="System loading..." />
          </div>
          <div>
            <p>Secondary</p>
            <Spinner variant="secondary" message="Processing request..." />
          </div>
        </div>
      </div>

      {/* Custom Messages */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Custom Messages</h3>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Spinner message="Connecting to doctor..." />
          <Spinner message="Booking appointment..." />
          <Spinner message="Fetching medical records..." />
        </div>
      </div>

      {/* Overlay Example */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Overlay Example</h3>
        <button 
          onClick={() => setShowOverlay(true)}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Show Overlay Spinner
        </button>
        {showOverlay && (
          <div>
            <Spinner 
              overlay={true} 
              message="Processing your request..." 
              variant="medical"
              size="large"
            />
            <button 
              onClick={() => setShowOverlay(false)}
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '0.5rem 1rem',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                zIndex: 10000
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Usage Examples */}
      <div style={{ marginBottom: '3rem' }}>
        <h3>Usage Examples</h3>
        <pre style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '1rem', 
          borderRadius: '5px',
          fontSize: '0.9rem',
          overflow: 'auto'
        }}>
{`// Basic usage
<Spinner />

// With custom message
<Spinner message="Loading patient data..." />

// Different sizes
<Spinner size="small" />
<Spinner size="medium" />
<Spinner size="large" />

// Different variants
<Spinner variant="medical" />
<Spinner variant="primary" />
<Spinner variant="secondary" />

// Full screen overlay
<Spinner overlay={true} message="Processing..." />

// Combined options
<Spinner 
  size="large" 
  variant="medical" 
  message="Booking your appointment..." 
  overlay={false} 
/>`}
        </pre>
      </div>
    </div>
  );
};

export default SpinnerDemo;

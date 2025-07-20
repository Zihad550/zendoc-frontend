'use client';

import { useTheme } from '@mui/material/styles';
import React from 'react';
import {
    iconOnlySVG,
    logoColorPalettes,
    type LogoTheme
} from './logo-variants';

export interface ZenDocIconProps {
  /** Size of the icon in pixels */
  size?: number;
  /** Custom color override */
  color?: string;
  /** Theme override - auto detects from MUI theme if not provided */
  theme?: LogoTheme | 'auto';
  /** Additional CSS classes */
  className?: string;
  /** Click handler for navigation */
  onClick?: () => void;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * ZenDoc Icon Component
 * 
 * Simplified icon-only version of the ZenDoc logo optimized for small sizes.
 * Perfect for favicons, mobile sidebars, and compact layouts.
 */
export const ZenDocIcon: React.FC<ZenDocIconProps> = ({
  size = 24,
  color,
  theme = 'auto',
  className = '',
  onClick,
  ariaLabel = 'ZenDoc Icon'
}) => {
  const muiTheme = useTheme();
  
  // Determine the actual theme to use
  const actualTheme: LogoTheme = theme === 'auto' 
    ? (muiTheme.palette.mode as LogoTheme)
    : theme;
  
  // Determine color
  const iconColor = color || logoColorPalettes[actualTheme].primary;
  
  // Create the SVG content with proper color
  const svgContent = iconOnlySVG.replace(/currentColor/g, iconColor);
  
  // Handle click events
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  
  // Determine cursor style
  const cursorStyle = onClick ? 'pointer' : 'default';
  
  return (
    <div
      className={`zendoc-icon ${className}`}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: cursorStyle,
        userSelect: 'none'
      }}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          minWidth: '16px',
          maxWidth: '80px'
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

// Memoize the component for performance
export default React.memo(ZenDocIcon);
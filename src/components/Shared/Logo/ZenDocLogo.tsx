'use client';

import { useTheme } from '@mui/material/styles';
import React from 'react';
import {
    logoColorPalettes,
    logoSizePresets,
    logoVariants,
    type LogoSize,
    type LogoTheme,
    type LogoVariantType
} from './logo-variants';

export interface ZenDocLogoProps {
  /** Size of the logo - can be preset name or custom number */
  size?: LogoSize;
  /** Logo variant to display */
  variant?: LogoVariantType;
  /** Theme override - auto detects from MUI theme if not provided */
  theme?: LogoTheme | 'auto';
  /** Custom color override */
  color?: string;
  /** Click handler for navigation */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * ZenDoc Logo Component
 * 
 * Professional medical-themed logo with medical cross and zen elements.
 * Supports multiple variants, themes, and sizes for consistent branding.
 */
export const ZenDocLogo: React.FC<ZenDocLogoProps> = (props) => {
  const {
    size = 'medium',
    variant = 'full',
    theme = 'auto',
    color,
    onClick,
    className = '',
    ariaLabel = 'ZenDoc Healthcare Platform Logo'
  } = props;
  
  const muiTheme = useTheme();
  
  // Determine the actual theme to use
  const actualTheme: LogoTheme = theme === 'auto' 
    ? (muiTheme.palette.mode as LogoTheme)
    : theme;
  
  // Get the logo variant configuration
  const logoVariant = logoVariants[variant];
  if (!logoVariant) {
    console.warn(`Unknown logo variant: ${variant}. Using 'full' variant.`);
    return <ZenDocLogo {...props} variant="full" />;
  }
  
  // Calculate dimensions
  const logoSize = typeof size === 'number' ? size : logoSizePresets[size];
  const width = logoSize * logoVariant.aspectRatio;
  const height = logoSize;
  
  // Determine color
  const logoColor = color || logoColorPalettes[actualTheme].primary;
  
  // Create the SVG content with proper color
  const svgContent = logoVariant.svg.replace(/currentColor/g, logoColor);
  
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
      className={`zendoc-logo ${className}`}
      onClick={handleClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
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
          width: `${width}px`,
          height: `${height}px`,
          minWidth: `${logoVariant.minSize}px`,
          maxWidth: `${logoVariant.maxSize}px`
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};

// Memoize the component for performance
export default React.memo(ZenDocLogo);
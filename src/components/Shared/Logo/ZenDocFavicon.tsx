'use client';

import React from 'react';
import { logoColorPalettes, type LogoTheme } from './logo-variants';

export interface ZenDocFaviconProps {
  /** Size of the favicon in pixels (typically 16, 32, or 48) */
  size?: 16 | 32 | 48;
  /** Theme for the favicon colors */
  theme?: LogoTheme;
  /** Custom color override */
  color?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Favicon-optimized SVG that remains recognizable at very small sizes (16x16, 32x32)
 * Simplified design with stronger contrast and thicker elements for better visibility
 */
const faviconSVG = `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <!-- Simplified medical cross optimized for small sizes -->
  <g id="favicon-symbol">
    <!-- Background circle for better contrast -->
    <circle cx="16" cy="16" r="15" fill="currentColor" opacity="0.15"/>
    
    <!-- Medical cross with thicker strokes for visibility -->
    <g fill="currentColor">
      <!-- Vertical bar - thicker for small sizes -->
      <rect x="13" y="6" width="6" height="20" rx="1"/>
      <!-- Horizontal bar - thicker for small sizes -->
      <rect x="6" y="13" width="20" height="6" rx="1"/>
      <!-- Center dot for zen element -->
      <circle cx="16" cy="16" r="3" fill="currentColor"/>
    </g>
    
    <!-- Subtle outer ring for definition -->
    <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  </g>
</svg>
`;/**

 * ZenDoc Favicon Component
 * 
 * Favicon-optimized version of the ZenDoc logo designed specifically for browser tabs.
 * Features simplified design with enhanced contrast for visibility at 16x16 and 32x32 pixels.
 */
export const ZenDocFavicon: React.FC<ZenDocFaviconProps> = ({
  size = 32,
  theme = 'light',
  color,
  className = ''
}) => {
  // Determine color - use stronger contrast for favicons
  const faviconColor = color || logoColorPalettes[theme].primary;
  
  // Create the SVG content with proper color
  const svgContent = faviconSVG.replace(/currentColor/g, faviconColor);
  
  return (
    <div
      className={`zendoc-favicon ${className}`}
      style={{
        display: 'inline-block',
        width: `${size}px`,
        height: `${size}px`,
        minWidth: '16px',
        maxWidth: '48px'
      }}
      role="img"
      aria-label="ZenDoc Favicon"
    >
      <div
        style={{
          width: '100%',
          height: '100%'
        }}
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
};/**
 *
 Generate favicon data URL for use in HTML meta tags
 * @param size - Size of the favicon (16, 32, or 48)
 * @param theme - Theme for colors
 * @param color - Custom color override
 * @returns Data URL string for the favicon
 */
export const generateFaviconDataURL = (
  size: 16 | 32 | 48 = 32,
  theme: LogoTheme = 'light',
  color?: string
): string => {
  const faviconColor = color || logoColorPalettes[theme].primary;
  const svgContent = faviconSVG.replace(/currentColor/g, faviconColor);
  
  // Create complete SVG with proper dimensions
  const completeSVG = `<svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">${svgContent.replace('<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">', '').replace('</svg>', '')}</svg>`;
  
  // Encode as data URL
  const encodedSVG = encodeURIComponent(completeSVG);
  return `data:image/svg+xml,${encodedSVG}`;
};

/**
 * Generate favicon blob for download or programmatic use
 * @param size - Size of the favicon
 * @param theme - Theme for colors
 * @param color - Custom color override
 * @returns Promise<Blob> containing the SVG favicon
 */
export const generateFaviconBlob = async (
  size: 16 | 32 | 48 = 32,
  theme: LogoTheme = 'light',
  color?: string
): Promise<Blob> => {
  const faviconColor = color || logoColorPalettes[theme].primary;
  const svgContent = faviconSVG.replace(/currentColor/g, faviconColor);
  
  // Create complete SVG with proper dimensions
  const completeSVG = `<svg width="${size}" height="${size}" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">${svgContent.replace('<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">', '').replace('</svg>', '')}</svg>`;
  
  return new Blob([completeSVG], { type: 'image/svg+xml' });
};

// Memoize the component for performance
export default React.memo(ZenDocFavicon);
/**
 * ZenDoc Logo Variants and Configuration
 * Contains SVG definitions and color variations for the ZenDoc logo system
 */

export interface LogoColors {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
}

export interface LogoVariant {
  name: string;
  svg: string;
  viewBox: string;
  aspectRatio: number;
  minSize: number;
  maxSize: number;
}

export interface LogoConfig {
  variant: 'full' | 'compact' | 'icon-only';
  size: {
    width: number;
    height: number;
  };
  colors: LogoColors;
  theme: 'light' | 'dark';
}

// Color palettes for different themes
export const logoColorPalettes = {
  light: {
    primary: '#1586FD',
    secondary: '#0D47A1',
    accent: '#2E7D32',
    text: '#1A1A1A'
  },
  dark: {
    primary: '#42A5F5',
    secondary: '#90CAF9',
    accent: '#66BB6A',
    text: '#FFFFFF'
  }
} as const;

// Full logo with text - optimized for navbar and large displays
export const fullLogoSVG = `
<svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
  <!-- Medical Cross Symbol with Zen Circle -->
  <g id="medical-symbol">
    <!-- Zen circle background -->
    <circle cx="30" cy="30" r="24" fill="currentColor" opacity="0.1"/>
    <circle cx="30" cy="30" r="22" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
    
    <!-- Medical cross -->
    <g fill="currentColor">
      <!-- Vertical bar -->
      <rect x="26" y="16" width="8" height="28" rx="2"/>
      <!-- Horizontal bar -->
      <rect x="16" y="26" width="28" height="8" rx="2"/>
      <!-- Center circle for zen element -->
      <circle cx="30" cy="30" r="4" fill="currentColor"/>
    </g>
  </g>
  
  <!-- ZenDoc Typography -->
  <g id="wordmark" fill="currentColor">
    <!-- Zen text -->
    <text x="70" y="25" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" letter-spacing="-0.5px">
      Zen
    </text>
    <!-- Doc text -->
    <text x="70" y="45" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" letter-spacing="-0.5px" opacity="0.8">
      Doc
    </text>
  </g>
</svg>
`;

// Compact logo - for medium spaces
export const compactLogoSVG = `
<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
  <!-- Medical Cross Symbol with Zen Circle -->
  <g id="medical-symbol">
    <!-- Zen circle background -->
    <circle cx="20" cy="20" r="16" fill="currentColor" opacity="0.1"/>
    <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    
    <!-- Medical cross -->
    <g fill="currentColor">
      <!-- Vertical bar -->
      <rect x="17" y="10" width="6" height="20" rx="1.5"/>
      <!-- Horizontal bar -->
      <rect x="10" y="17" width="20" height="6" rx="1.5"/>
      <!-- Center circle -->
      <circle cx="20" cy="20" r="3" fill="currentColor"/>
    </g>
  </g>
  
  <!-- ZenDoc Typography -->
  <g id="wordmark" fill="currentColor">
    <text x="45" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" letter-spacing="-0.3px">
      ZenDoc
    </text>
  </g>
</svg>
`;

// Icon-only version - for favicons and small spaces
export const iconOnlySVG = `
<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <!-- Medical Cross Symbol with Zen Circle -->
  <g id="medical-symbol">
    <!-- Zen circle background -->
    <circle cx="20" cy="20" r="18" fill="currentColor" opacity="0.1"/>
    <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>
    
    <!-- Medical cross -->
    <g fill="currentColor">
      <!-- Vertical bar -->
      <rect x="16" y="8" width="8" height="24" rx="2"/>
      <!-- Horizontal bar -->
      <rect x="8" y="16" width="24" height="8" rx="2"/>
      <!-- Center circle for zen element -->
      <circle cx="20" cy="20" r="4" fill="currentColor"/>
    </g>
  </g>
</svg>
`;

// Logo variants configuration
export const logoVariants: Record<string, LogoVariant> = {
  full: {
    name: 'full',
    svg: fullLogoSVG,
    viewBox: '0 0 200 60',
    aspectRatio: 200 / 60,
    minSize: 120,
    maxSize: 400
  },
  compact: {
    name: 'compact',
    svg: compactLogoSVG,
    viewBox: '0 0 120 40',
    aspectRatio: 120 / 40,
    minSize: 80,
    maxSize: 200
  },
  'icon-only': {
    name: 'icon-only',
    svg: iconOnlySVG,
    viewBox: '0 0 40 40',
    aspectRatio: 1,
    minSize: 16,
    maxSize: 80
  }
};

// Size presets for common use cases
export const logoSizePresets = {
  small: 24,
  medium: 40,
  large: 60,
  navbar: 36,
  sidebar: 32,
  favicon: 16
} as const;

export type LogoSize = keyof typeof logoSizePresets | number;
export type LogoVariantType = keyof typeof logoVariants;
export type LogoTheme = keyof typeof logoColorPalettes;
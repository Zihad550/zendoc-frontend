/**
 * ZenDoc Logo System
 * 
 * Professional medical-themed logo components with medical cross and zen elements.
 * Supports multiple variants, themes, and sizes for consistent branding across
 * the ZenDoc healthcare platform.
 */

// Main logo components
export { ZenDocFavicon, generateFaviconDataURL, type ZenDocFaviconProps } from './ZenDocFavicon';
export { ZenDocIcon, type ZenDocIconProps } from './ZenDocIcon';
export { ZenDocLogo, type ZenDocLogoProps } from './ZenDocLogo';

// Logo configuration and variants
export {
    compactLogoSVG, fullLogoSVG, iconOnlySVG, logoColorPalettes,
    logoSizePresets, logoVariants, type LogoColors, type LogoConfig,
    type LogoSize, type LogoTheme, type LogoVariant, type LogoVariantType
} from './logo-variants';

// Default exports for convenience
export { default as ZenDocFaviconDefault } from './ZenDocFavicon';
export { default as ZenDocIconDefault } from './ZenDocIcon';
export { default as ZenDocLogoDefault } from './ZenDocLogo';

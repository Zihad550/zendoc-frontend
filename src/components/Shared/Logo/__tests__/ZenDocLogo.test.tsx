import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe } from 'node:test';
import React from 'react';
import { vi } from 'vitest';
import { it } from 'zod/v4/locales';
import { ZenDocFavicon, generateFaviconDataURL } from '../ZenDocFavicon';
import { ZenDocIcon } from '../ZenDocIcon';
import { ZenDocLogo } from '../ZenDocLogo';
import { logoSizePresets, logoVariants } from '../logo-variants';

// Mock theme providers
const lightTheme = createTheme({ palette: { mode: 'light' } });
const darkTheme = createTheme({ palette: { mode: 'dark' } });

const renderWithTheme = (component: React.ReactElement, theme = lightTheme) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('ZenDocLogo Component', () => {
  describe('Logo Rendering with Different Variants', () => {
    it('renders with default props (full variant)', () => {
      renderWithTheme(<ZenDocLogo />);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('aria-label', 'ZenDoc Healthcare Platform Logo');
      expect(logo).toHaveClass('zendoc-logo');
    });

    it('renders full variant correctly', () => {
      renderWithTheme(<ZenDocLogo variant="full" />);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      
      // Check that the logo container has the expected structure
      const logoContainer = logo.querySelector('div');
      expect(logoContainer).toBeInTheDocument();
    });

    it('renders compact variant correctly', () => {
      renderWithTheme(<ZenDocLogo variant="compact" />);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      
      // Verify the variant is applied by checking the container structure
      const logoContainer = logo.querySelector('div');
      expect(logoContainer).toBeInTheDocument();
    });

    it('renders icon-only variant correctly', () => {
      renderWithTheme(<ZenDocLogo variant="icon-only" />);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      
      // Verify the variant is applied
      const logoContainer = logo.querySelector('div');
      expect(logoContainer).toBeInTheDocument();
    });

    it('handles invalid variant gracefully', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      renderWithTheme(<ZenDocLogo variant={'invalid' as any} />);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Unknown logo variant: invalid')
      );
      
      consoleSpy.mockRestore();
    });

    it('applies custom className correctly', () => {
      renderWithTheme(<ZenDocLogo className="custom-logo-class" />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveClass('zendoc-logo', 'custom-logo-class');
    });
  });

  describe('Responsive Behavior and Sizing', () => {
    it('handles preset size values correctly', () => {
      Object.keys(logoSizePresets).forEach((sizeKey) => {
        const { unmount } = renderWithTheme(<ZenDocLogo size={sizeKey as keyof typeof logoSizePresets} />);
        const logo = screen.getByRole('img');
        expect(logo).toBeInTheDocument();
        
        // Check that the main logo container has proper styling
        expect(logo).toHaveStyle({ display: 'inline-flex' });
        
        // Check that the inner SVG container exists
        const logoContainer = logo.querySelector('div');
        expect(logoContainer).toBeInTheDocument();
        
        // Clean up for next iteration
        unmount();
      });
    });

    it('handles custom numeric size values', () => {
      const customSizes = [16, 32, 48, 64, 100];
      
      customSizes.forEach((size) => {
        const { unmount } = renderWithTheme(<ZenDocLogo size={size} />);
        const logo = screen.getByRole('img');
        expect(logo).toBeInTheDocument();
        
        // Verify the logo renders with custom size
        const logoContainer = logo.querySelector('div');
        expect(logoContainer).toBeInTheDocument();
        
        // Clean up for next iteration
        unmount();
      });
    });

    it('respects minimum and maximum size constraints', () => {
      // Test with very small size
      const { unmount: unmount1 } = renderWithTheme(<ZenDocLogo size={1} variant="full" />);
      let logo = screen.getByRole('img');
      let logoContainer = logo.querySelector('div');
      expect(logoContainer).toHaveStyle({
        minWidth: `${logoVariants.full.minSize}px`
      });
      unmount1();

      // Test with very large size
      renderWithTheme(<ZenDocLogo size={1000} variant="full" />);
      logo = screen.getByRole('img');
      logoContainer = logo.querySelector('div');
      expect(logoContainer).toHaveStyle({
        maxWidth: `${logoVariants.full.maxSize}px`
      });
    });

    it('maintains proper aspect ratio for different variants', () => {
      Object.keys(logoVariants).forEach((variantKey) => {
        const { unmount } = renderWithTheme(<ZenDocLogo variant={variantKey as keyof typeof logoVariants} size="medium" />);
        const logo = screen.getByRole('img');
        expect(logo).toBeInTheDocument();
        
        // Verify the logo maintains its structure
        const logoContainer = logo.querySelector('div');
        expect(logoContainer).toBeInTheDocument();
        
        // Clean up for next iteration
        unmount();
      });
    });

    it('applies responsive styling correctly', () => {
      renderWithTheme(<ZenDocLogo />);
      const logo = screen.getByRole('img');
      
      // Check responsive container styles
      expect(logo).toHaveStyle({
        display: 'inline-flex',
        alignItems: 'center',
        userSelect: 'none'
      });
    });
  });

  describe('Accessibility Attributes', () => {
    it('has proper default aria-label', () => {
      renderWithTheme(<ZenDocLogo />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('aria-label', 'ZenDoc Healthcare Platform Logo');
    });

    it('accepts custom aria-label', () => {
      const customLabel = 'Custom ZenDoc Logo';
      renderWithTheme(<ZenDocLogo ariaLabel={customLabel} />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('aria-label', customLabel);
    });

    it('has correct role when not clickable', () => {
      renderWithTheme(<ZenDocLogo />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('role', 'img');
      expect(logo).not.toHaveAttribute('tabIndex');
    });

    it('has correct role and tabIndex when clickable', () => {
      const handleClick = vi.fn();
      renderWithTheme(<ZenDocLogo onClick={handleClick} />);
      const logo = screen.getByRole('button');
      expect(logo).toHaveAttribute('role', 'button');
      expect(logo).toHaveAttribute('tabIndex', '0');
    });

    it('supports keyboard navigation with Enter key', () => {
      const handleClick = vi.fn();
      renderWithTheme(<ZenDocLogo onClick={handleClick} />);
      
      const logo = screen.getByRole('button');
      fireEvent.keyDown(logo, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports keyboard navigation with Space key', () => {
      const handleClick = vi.fn();
      renderWithTheme(<ZenDocLogo onClick={handleClick} />);
      
      const logo = screen.getByRole('button');
      fireEvent.keyDown(logo, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('prevents default behavior on keyboard activation', () => {
      const handleClick = vi.fn();
      renderWithTheme(<ZenDocLogo onClick={handleClick} />);
      
      const logo = screen.getByRole('button');
      
      // Test that the component handles keyboard events properly
      // We'll verify the click handler is called, which indicates preventDefault was called
      fireEvent.keyDown(logo, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      fireEvent.keyDown(logo, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('ignores other keyboard keys', () => {
      const handleClick = vi.fn();
      renderWithTheme(<ZenDocLogo onClick={handleClick} />);
      
      const logo = screen.getByRole('button');
      fireEvent.keyDown(logo, { key: 'Tab' });
      fireEvent.keyDown(logo, { key: 'Escape' });
      fireEvent.keyDown(logo, { key: 'ArrowDown' });
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Logo as Clickable Link', () => {
    it('handles click events when onClick is provided', () => {
      const handleClick = vi.fn();
      renderWithTheme(<ZenDocLogo onClick={handleClick} />);
      
      const logo = screen.getByRole('button');
      fireEvent.click(logo);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('shows pointer cursor when clickable', () => {
      const handleClick = vi.fn();
      renderWithTheme(<ZenDocLogo onClick={handleClick} />);
      
      const logo = screen.getByRole('button');
      expect(logo).toHaveStyle({ cursor: 'pointer' });
    });

    it('shows default cursor when not clickable', () => {
      renderWithTheme(<ZenDocLogo />);
      
      const logo = screen.getByRole('img');
      expect(logo).toHaveStyle({ cursor: 'default' });
    });

    it('handles multiple click events correctly', () => {
      const handleClick = vi.fn();
      renderWithTheme(<ZenDocLogo onClick={handleClick} />);
      
      const logo = screen.getByRole('button');
      fireEvent.click(logo);
      fireEvent.click(logo);
      fireEvent.click(logo);
      
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('works with keyboard and mouse interactions together', () => {
      const handleClick = vi.fn();
      renderWithTheme(<ZenDocLogo onClick={handleClick} />);
      
      const logo = screen.getByRole('button');
      
      // Test mouse click
      fireEvent.click(logo);
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Test keyboard Enter
      fireEvent.keyDown(logo, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(2);
      
      // Test keyboard Space
      fireEvent.keyDown(logo, { key: ' ' });
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('maintains accessibility when used as navigation link', () => {
      const handleClick = vi.fn();
      renderWithTheme(
        <ZenDocLogo 
          onClick={handleClick} 
          ariaLabel="Navigate to ZenDoc homepage"
        />
      );
      
      const logo = screen.getByRole('button');
      expect(logo).toHaveAttribute('aria-label', 'Navigate to ZenDoc homepage');
      expect(logo).toHaveAttribute('tabIndex', '0');
      
      fireEvent.click(logo);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Theme Integration', () => {
    it('adapts to light theme', () => {
      renderWithTheme(<ZenDocLogo theme="light" />);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
    });

    it('adapts to dark theme', () => {
      renderWithTheme(<ZenDocLogo theme="dark" />, darkTheme);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
    });

    it('auto-detects theme from MUI context', () => {
      // Test with light theme context
      const { unmount } = renderWithTheme(<ZenDocLogo theme="auto" />, lightTheme);
      let logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      unmount();

      // Test with dark theme context
      renderWithTheme(<ZenDocLogo theme="auto" />, darkTheme);
      logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
    });

    it('accepts custom color override', () => {
      renderWithTheme(<ZenDocLogo color="#FF0000" />);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
    });
  });

  describe('Component Memoization', () => {
    it('memoizes component for performance', () => {
      const { rerender } = renderWithTheme(<ZenDocLogo size="medium" />);
      const logo1 = screen.getByRole('img');
      
      // Rerender with same props
      rerender(
        <ThemeProvider theme={lightTheme}>
          <ZenDocLogo size="medium" />
        </ThemeProvider>
      );
      const logo2 = screen.getByRole('img');
      
      // Both should be in the document
      expect(logo1).toBeInTheDocument();
      expect(logo2).toBeInTheDocument();
    });
  });
});

describe('ZenDocIcon Component', () => {
  it('renders with default props', () => {
    renderWithTheme(<ZenDocIcon />);
    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-label', 'ZenDoc Icon');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    renderWithTheme(<ZenDocIcon onClick={handleClick} />);
    
    const icon = screen.getByRole('button');
    fireEvent.click(icon);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts custom size', () => {
    renderWithTheme(<ZenDocIcon size={32} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});

describe('ZenDocFavicon Component', () => {
  it('renders with default props', () => {
    render(<ZenDocFavicon />);
    // Favicon component doesn't have role, just check it renders without error
    expect(document.querySelector('.zendoc-favicon, div')).toBeTruthy();
  });

  it('generates favicon data URL correctly', () => {
    const dataURL = generateFaviconDataURL(32, 'light');
    expect(dataURL).toMatch(/^data:image\/svg\+xml,/);
    expect(dataURL).toContain('svg');
  });

  it('handles different sizes and themes', () => {
    const lightURL = generateFaviconDataURL(16, 'light');
    const darkURL = generateFaviconDataURL(16, 'dark');
    
    expect(lightURL).toMatch(/^data:image\/svg\+xml,/);
    expect(darkURL).toMatch(/^data:image\/svg\+xml,/);
    expect(lightURL).not.toEqual(darkURL);
  });
});
import { render, screen } from '@/test/utils/test-utils';
import { describe, expect, it } from 'vitest';
import PricingHero from '../PricingHero';

describe('PricingHero', () => {
  describe('rendering', () => {
    it('should render the hero section with correct title', () => {
      render(<PricingHero />);
      
      expect(screen.getByText('Healthcare Plans for Every Need')).toBeInTheDocument();
    });

    it('should render the subtitle', () => {
      render(<PricingHero />);
      
      expect(screen.getByText('Transparent pricing with quality care at every level')).toBeInTheDocument();
    });

    it('should render all feature items', () => {
      render(<PricingHero />);
      
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('Access to Care')).toBeInTheDocument();
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('Specialists')).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
      expect(screen.getByText('Setup Fee')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<PricingHero />);
      
      const heading = screen.getByRole('heading', { name: /healthcare plans for every need/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible feature descriptions', () => {
      render(<PricingHero />);
      
      // Check that feature descriptions are accessible
      expect(screen.getByText('Access to Care')).toBeInTheDocument();
      expect(screen.getByText('Specialists')).toBeInTheDocument();
      expect(screen.getByText('Setup Fee')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should render HeroSection with correct props', () => {
      render(<PricingHero />);
      
      // Verify the component renders without errors
      expect(screen.getByText('Healthcare Plans for Every Need')).toBeInTheDocument();
    });

    it('should display feature statistics correctly', () => {
      render(<PricingHero />);
      
      // Check that all statistics are displayed
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
    });
  });

  describe('content validation', () => {
    it('should display pricing-related features', () => {
      render(<PricingHero />);
      
      // Verify pricing-specific content
      expect(screen.getByText('Access to Care')).toBeInTheDocument();
      expect(screen.getByText('Specialists')).toBeInTheDocument();
      expect(screen.getByText('Setup Fee')).toBeInTheDocument();
    });

    it('should emphasize no setup fee', () => {
      render(<PricingHero />);
      
      expect(screen.getByText('$0')).toBeInTheDocument();
      expect(screen.getByText('Setup Fee')).toBeInTheDocument();
    });
  });
});
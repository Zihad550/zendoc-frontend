import { render, screen } from '@/test/utils/test-utils';
import { describe, expect, it } from 'vitest';
import FaqHero from '../FaqHero';

describe('FaqHero', () => {
  describe('rendering', () => {
    it('should render the hero section with correct title', () => {
      render(<FaqHero />);
      
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('should render the subtitle', () => {
      render(<FaqHero />);
      
      expect(screen.getByText('Find answers to common questions about our healthcare services')).toBeInTheDocument();
    });

    it('should render all feature items', () => {
      render(<FaqHero />);
      
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('Support Available')).toBeInTheDocument();
      expect(screen.getByText('200+')).toBeInTheDocument();
      expect(screen.getByText('Answered Questions')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('Clear Information')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<FaqHero />);
      
      const heading = screen.getByRole('heading', { name: /frequently asked questions/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible feature descriptions', () => {
      render(<FaqHero />);
      
      // Check that feature descriptions are accessible
      expect(screen.getByText('Support Available')).toBeInTheDocument();
      expect(screen.getByText('Answered Questions')).toBeInTheDocument();
      expect(screen.getByText('Clear Information')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should render HeroSection with correct props', () => {
      render(<FaqHero />);
      
      // Verify the component renders without errors
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('should display feature statistics correctly', () => {
      render(<FaqHero />);
      
      // Check that all statistics are displayed
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('200+')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  describe('content validation', () => {
    it('should display FAQ-related features', () => {
      render(<FaqHero />);
      
      // Verify FAQ-specific content
      expect(screen.getByText('Support Available')).toBeInTheDocument();
      expect(screen.getByText('Answered Questions')).toBeInTheDocument();
      expect(screen.getByText('Clear Information')).toBeInTheDocument();
    });

    it('should emphasize comprehensive support', () => {
      render(<FaqHero />);
      
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('Support Available')).toBeInTheDocument();
    });

    it('should highlight extensive question coverage', () => {
      render(<FaqHero />);
      
      expect(screen.getByText('200+')).toBeInTheDocument();
      expect(screen.getByText('Answered Questions')).toBeInTheDocument();
    });

    it('should emphasize information quality', () => {
      render(<FaqHero />);
      
      expect(screen.getByText('100%')).toBeInTheDocument();
      expect(screen.getByText('Clear Information')).toBeInTheDocument();
    });
  });

  describe('messaging consistency', () => {
    it('should convey helpful support message', () => {
      render(<FaqHero />);
      
      expect(screen.getByText('Find answers to common questions about our healthcare services')).toBeInTheDocument();
    });

    it('should focus on question answering', () => {
      render(<FaqHero />);
      
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });
  });
});
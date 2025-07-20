import { render, screen } from '@/test/utils/test-utils';
import { describe, expect, it } from 'vitest';
import HealthPlansHero from '../HealthPlansHero';

describe('HealthPlansHero', () => {
  describe('rendering', () => {
    it('should render the hero section with correct title', () => {
      render(<HealthPlansHero />);
      
      expect(screen.getByText('Discover Our Health Plans')).toBeInTheDocument();
    });

    it('should render the subtitle', () => {
      render(<HealthPlansHero />);
      
      expect(screen.getByText('Quality healthcare plans for every stage of life.')).toBeInTheDocument();
    });

    it('should render all feature items', () => {
      render(<HealthPlansHero />);
      
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('Customer Support')).toBeInTheDocument();
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('Health Services')).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
      expect(screen.getByText('Enroll Fee')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<HealthPlansHero />);
      
      const heading = screen.getByRole('heading', { name: /discover our health plans/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible feature descriptions', () => {
      render(<HealthPlansHero />);
      
      // Check that feature descriptions are accessible
      expect(screen.getByText('Customer Support')).toBeInTheDocument();
      expect(screen.getByText('Health Services')).toBeInTheDocument();
      expect(screen.getByText('Enroll Fee')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should render HeroSection with correct props', () => {
      render(<HealthPlansHero />);
      
      // Verify the component renders without errors
      expect(screen.getByText('Discover Our Health Plans')).toBeInTheDocument();
    });

    it('should display feature statistics correctly', () => {
      render(<HealthPlansHero />);
      
      // Check that all statistics are displayed
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('$0')).toBeInTheDocument();
    });
  });

  describe('content validation', () => {
    it('should display health plan related features', () => {
      render(<HealthPlansHero />);
      
      // Verify health plan specific content
      expect(screen.getByText('Customer Support')).toBeInTheDocument();
      expect(screen.getByText('Health Services')).toBeInTheDocument();
      expect(screen.getByText('Enroll Fee')).toBeInTheDocument();
    });

    it('should emphasize comprehensive service offering', () => {
      render(<HealthPlansHero />);
      
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('Health Services')).toBeInTheDocument();
    });

    it('should highlight no enrollment fee', () => {
      render(<HealthPlansHero />);
      
      expect(screen.getByText('$0')).toBeInTheDocument();
      expect(screen.getByText('Enroll Fee')).toBeInTheDocument();
    });
  });

  describe('messaging consistency', () => {
    it('should convey quality healthcare message', () => {
      render(<HealthPlansHero />);
      
      expect(screen.getByText('Quality healthcare plans for every stage of life.')).toBeInTheDocument();
    });

    it('should focus on discovery and exploration', () => {
      render(<HealthPlansHero />);
      
      expect(screen.getByText('Discover Our Health Plans')).toBeInTheDocument();
    });
  });
});
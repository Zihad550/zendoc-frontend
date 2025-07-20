import { render, screen } from '@/test/utils/test-utils';
import { describe, expect, it } from 'vitest';
import ConsultationHero from '../ConsultationHero';

describe('ConsultationHero', () => {
  describe('rendering', () => {
    it('should render the hero section with correct title', () => {
      render(<ConsultationHero />);
      
      expect(screen.getByText('Healthcare at Your Fingertips')).toBeInTheDocument();
    });

    it('should render the subtitle', () => {
      render(<ConsultationHero />);
      
      expect(screen.getByText('Connect with expert doctors for personalized care from the comfort of your home.')).toBeInTheDocument();
    });

    it('should render all feature items', () => {
      render(<ConsultationHero />);
      
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('Expert Doctors')).toBeInTheDocument();
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('Available Support')).toBeInTheDocument();
      expect(screen.getByText('5000+')).toBeInTheDocument();
      expect(screen.getByText('Happy Patients')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<ConsultationHero />);
      
      const heading = screen.getByRole('heading', { name: /healthcare at your fingertips/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible feature descriptions', () => {
      render(<ConsultationHero />);
      
      // Check that feature descriptions are accessible
      expect(screen.getByText('Expert Doctors')).toBeInTheDocument();
      expect(screen.getByText('Available Support')).toBeInTheDocument();
      expect(screen.getByText('Happy Patients')).toBeInTheDocument();
    });
  });

  describe('component structure', () => {
    it('should render HeroSection with correct props', () => {
      render(<ConsultationHero />);
      
      // Verify the component renders without errors
      expect(screen.getByText('Healthcare at Your Fingertips')).toBeInTheDocument();
    });

    it('should display feature statistics correctly', () => {
      render(<ConsultationHero />);
      
      // Check that all statistics are displayed
      expect(screen.getByText('100+')).toBeInTheDocument();
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('5000+')).toBeInTheDocument();
    });
  });
});
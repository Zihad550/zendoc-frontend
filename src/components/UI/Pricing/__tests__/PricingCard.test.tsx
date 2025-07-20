import { render, screen } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import PricingCard from '../PricingCard';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

describe('PricingCard', () => {
  const defaultProps = {
    title: 'Basic Plan',
    description: 'Perfect for individuals',
    price: 29,
    period: '/month',
    features: [
      'Online consultations',
      'Basic health monitoring',
      'Email support'
    ],
    cta: 'Get Started',
    isAnnual: false
  };

  describe('rendering', () => {
    it('should render the pricing card with basic information', () => {
      render(<PricingCard {...defaultProps} />);
      
      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
      expect(screen.getByText('Perfect for individuals')).toBeInTheDocument();
      expect(screen.getByText('$29')).toBeInTheDocument();
      expect(screen.getByText('/month')).toBeInTheDocument();
      expect(screen.getByText('Get Started')).toBeInTheDocument();
    });

    it('should render all features', () => {
      render(<PricingCard {...defaultProps} />);
      
      expect(screen.getByText('Online consultations')).toBeInTheDocument();
      expect(screen.getByText('Basic health monitoring')).toBeInTheDocument();
      expect(screen.getByText('Email support')).toBeInTheDocument();
    });

    it('should render feature icons', () => {
      render(<PricingCard {...defaultProps} />);
      
      // Check for checkmark icons (should be 3 for 3 features)
      const checkIcons = screen.getAllByTestId('CheckCircleIcon');
      expect(checkIcons).toHaveLength(3);
    });
  });

  describe('popular plan variant', () => {
    it('should display popular badge when popular is true', () => {
      render(<PricingCard {...defaultProps} popular={true} />);
      
      expect(screen.getByText('Most Popular')).toBeInTheDocument();
    });

    it('should not display popular badge when popular is false', () => {
      render(<PricingCard {...defaultProps} popular={false} />);
      
      expect(screen.queryByText('Most Popular')).not.toBeInTheDocument();
    });
  });

  describe('color variants', () => {
    it('should render with primary color scheme', () => {
      render(<PricingCard {...defaultProps} color="primary" />);
      
      // Component should render without errors
      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
    });

    it('should render with secondary color scheme', () => {
      render(<PricingCard {...defaultProps} color="secondary" />);
      
      // Component should render without errors
      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
    });

    it('should render with default color scheme', () => {
      render(<PricingCard {...defaultProps} color="default" />);
      
      // Component should render without errors
      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
    });
  });

  describe('annual pricing', () => {
    it('should display save percentage for annual plans', () => {
      render(
        <PricingCard 
          {...defaultProps} 
          isAnnual={true} 
          savePercent={20} 
        />
      );
      
      expect(screen.getByText('Save 20%')).toBeInTheDocument();
    });

    it('should not display save percentage for monthly plans', () => {
      render(
        <PricingCard 
          {...defaultProps} 
          isAnnual={false} 
          savePercent={20} 
        />
      );
      
      expect(screen.queryByText('Save 20%')).not.toBeInTheDocument();
    });

    it('should not display save percentage when savePercent is 0', () => {
      render(
        <PricingCard 
          {...defaultProps} 
          isAnnual={true} 
          savePercent={0} 
        />
      );
      
      expect(screen.queryByText(/Save/)).not.toBeInTheDocument();
    });
  });

  describe('highlight variant', () => {
    it('should render highlighted card with contained button', () => {
      render(<PricingCard {...defaultProps} highlight={true} />);
      
      const button = screen.getByRole('link', { name: /get started/i });
      expect(button).toBeInTheDocument();
    });

    it('should render non-highlighted card with outlined button', () => {
      render(<PricingCard {...defaultProps} highlight={false} />);
      
      const button = screen.getByRole('link', { name: /get started/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<PricingCard {...defaultProps} />);
      
      const heading = screen.getByRole('heading', { name: /basic plan/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible button', () => {
      render(<PricingCard {...defaultProps} />);
      
      const button = screen.getByRole('link', { name: /get started/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', '/contact-us');
    });

    it('should have accessible feature list', () => {
      render(<PricingCard {...defaultProps} />);
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });

  describe('pricing display', () => {
    it('should format price correctly', () => {
      render(<PricingCard {...defaultProps} price={99} />);
      
      expect(screen.getByText('$99')).toBeInTheDocument();
    });

    it('should display period correctly', () => {
      render(<PricingCard {...defaultProps} period="/year" />);
      
      expect(screen.getByText('/year')).toBeInTheDocument();
    });

    it('should handle zero price', () => {
      render(<PricingCard {...defaultProps} price={0} />);
      
      expect(screen.getByText('$0')).toBeInTheDocument();
    });
  });

  describe('feature list', () => {
    it('should handle empty features array', () => {
      render(<PricingCard {...defaultProps} features={[]} />);
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems).toHaveLength(0);
    });

    it('should handle single feature', () => {
      render(<PricingCard {...defaultProps} features={['Single feature']} />);
      
      expect(screen.getByText('Single feature')).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(1);
    });

    it('should handle many features', () => {
      const manyFeatures = Array.from({ length: 10 }, (_, i) => `Feature ${i + 1}`);
      render(<PricingCard {...defaultProps} features={manyFeatures} />);
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(10);
    });
  });

  describe('interaction', () => {
    it('should have clickable CTA button', async () => {
      const user = userEvent.setup();
      render(<PricingCard {...defaultProps} />);
      
      const button = screen.getByRole('link', { name: /get started/i });
      expect(button).toHaveAttribute('href', '/contact-us');
    });
  });

  describe('responsive behavior', () => {
    it('should render without layout issues', () => {
      render(<PricingCard {...defaultProps} />);
      
      // Component should render all elements without errors
      expect(screen.getByText('Basic Plan')).toBeInTheDocument();
      expect(screen.getByText('Perfect for individuals')).toBeInTheDocument();
      expect(screen.getByText('$29')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
    });
  });
});
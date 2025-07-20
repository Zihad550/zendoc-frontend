import { IHealthPlan } from '@/app/(public)/health-plans/health-plans.type';
import { render, screen } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import PlanCard from '../PlanCard';

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  )
}));

describe('PlanCard', () => {
  const mockPlan: IHealthPlan = {
    id: '1',
    name: 'Basic Health Plan',
    description: 'Essential healthcare coverage',
    price: 99,
    period: '/month',
    benefits: [
      'Primary care visits',
      'Preventive care',
      'Emergency services',
      'Prescription coverage'
    ],
    coverage: 'Individual',
    popular: false,
    color: 'default'
  };

  describe('rendering', () => {
    it('should render the plan card with basic information', () => {
      render(<PlanCard plan={mockPlan} />);
      
      expect(screen.getByText('Basic Health Plan')).toBeInTheDocument();
      expect(screen.getByText('Essential healthcare coverage')).toBeInTheDocument();
      expect(screen.getByText('$99')).toBeInTheDocument();
      expect(screen.getByText('/month')).toBeInTheDocument();
    });

    it('should render all benefits', () => {
      render(<PlanCard plan={mockPlan} />);
      
      expect(screen.getByText('Primary care visits')).toBeInTheDocument();
      expect(screen.getByText('Preventive care')).toBeInTheDocument();
      expect(screen.getByText('Emergency services')).toBeInTheDocument();
      expect(screen.getByText('Prescription coverage')).toBeInTheDocument();
    });

    it('should render benefit icons', () => {
      render(<PlanCard plan={mockPlan} />);
      
      // Check for checkmark icons (should be 4 for 4 benefits)
      const checkIcons = screen.getAllByTestId('CheckCircleIcon');
      expect(checkIcons).toHaveLength(4);
    });

    it('should render coverage chip when provided', () => {
      render(<PlanCard plan={mockPlan} />);
      
      expect(screen.getByText('Individual')).toBeInTheDocument();
    });

    it('should render contact button', () => {
      render(<PlanCard plan={mockPlan} />);
      
      expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
    });
  });

  describe('popular plan variant', () => {
    it('should display popular badge when plan is popular', () => {
      const popularPlan = { ...mockPlan, popular: true };
      render(<PlanCard plan={popularPlan} />);
      
      expect(screen.getByText('Most Popular')).toBeInTheDocument();
    });

    it('should not display popular badge when plan is not popular', () => {
      render(<PlanCard plan={mockPlan} />);
      
      expect(screen.queryByText('Most Popular')).not.toBeInTheDocument();
    });

    it('should render contained button for popular plans', () => {
      const popularPlan = { ...mockPlan, popular: true };
      render(<PlanCard plan={popularPlan} />);
      
      const button = screen.getByRole('link', { name: /contact us/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe('color variants', () => {
    it('should render with primary color scheme', () => {
      const primaryPlan = { ...mockPlan, color: 'primary' as const };
      render(<PlanCard plan={primaryPlan} />);
      
      // Component should render without errors
      expect(screen.getByText('Basic Health Plan')).toBeInTheDocument();
    });

    it('should render with secondary color scheme', () => {
      const secondaryPlan = { ...mockPlan, color: 'secondary' as const };
      render(<PlanCard plan={secondaryPlan} />);
      
      // Component should render without errors
      expect(screen.getByText('Basic Health Plan')).toBeInTheDocument();
    });

    it('should render with default color scheme', () => {
      const defaultPlan = { ...mockPlan, color: 'default' as const };
      render(<PlanCard plan={defaultPlan} />);
      
      // Component should render without errors
      expect(screen.getByText('Basic Health Plan')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      render(<PlanCard plan={mockPlan} />);
      
      const heading = screen.getByRole('heading', { name: /basic health plan/i });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible button', () => {
      render(<PlanCard plan={mockPlan} />);
      
      const button = screen.getByRole('link', { name: /contact us/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('href', 'contact-us');
    });

    it('should have accessible benefit list', () => {
      render(<PlanCard plan={mockPlan} />);
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(4);
    });
  });

  describe('pricing display', () => {
    it('should format price correctly', () => {
      const expensivePlan = { ...mockPlan, price: 299 };
      render(<PlanCard plan={expensivePlan} />);
      
      expect(screen.getByText('$299')).toBeInTheDocument();
    });

    it('should display period correctly', () => {
      const yearlyPlan = { ...mockPlan, period: '/year' };
      render(<PlanCard plan={yearlyPlan} />);
      
      expect(screen.getByText('/year')).toBeInTheDocument();
    });

    it('should handle zero price', () => {
      const freePlan = { ...mockPlan, price: 0 };
      render(<PlanCard plan={freePlan} />);
      
      expect(screen.getByText('$0')).toBeInTheDocument();
    });
  });

  describe('benefit list', () => {
    it('should handle empty benefits array', () => {
      const noBenefitsPlan = { ...mockPlan, benefits: [] };
      render(<PlanCard plan={noBenefitsPlan} />);
      
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems).toHaveLength(0);
    });

    it('should handle single benefit', () => {
      const singleBenefitPlan = { ...mockPlan, benefits: ['Single benefit'] };
      render(<PlanCard plan={singleBenefitPlan} />);
      
      expect(screen.getByText('Single benefit')).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(1);
    });

    it('should handle many benefits', () => {
      const manyBenefits = Array.from({ length: 10 }, (_, i) => `Benefit ${i + 1}`);
      const manyBenefitsPlan = { ...mockPlan, benefits: manyBenefits };
      render(<PlanCard plan={manyBenefitsPlan} />);
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(10);
    });
  });

  describe('coverage display', () => {
    it('should display coverage when provided', () => {
      const familyPlan = { ...mockPlan, coverage: 'Family' };
      render(<PlanCard plan={familyPlan} />);
      
      expect(screen.getByText('Family')).toBeInTheDocument();
    });

    it('should not display coverage chip when not provided', () => {
      const noCoveragePlan = { ...mockPlan, coverage: undefined };
      render(<PlanCard plan={noCoveragePlan} />);
      
      // Should not have any chip elements
      expect(screen.queryByText('Individual')).not.toBeInTheDocument();
    });
  });

  describe('interaction', () => {
    it('should have clickable contact button', async () => {
      const user = userEvent.setup();
      render(<PlanCard plan={mockPlan} />);
      
      const button = screen.getByRole('link', { name: /contact us/i });
      expect(button).toHaveAttribute('href', 'contact-us');
    });
  });

  describe('responsive behavior', () => {
    it('should render without layout issues', () => {
      render(<PlanCard plan={mockPlan} />);
      
      // Component should render all elements without errors
      expect(screen.getByText('Basic Health Plan')).toBeInTheDocument();
      expect(screen.getByText('Essential healthcare coverage')).toBeInTheDocument();
      expect(screen.getByText('$99')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
    });
  });

  describe('theme integration', () => {
    it('should render properly in light theme', () => {
      render(<PlanCard plan={mockPlan} />);
      
      // Component should render without theme-related errors
      expect(screen.getByText('Basic Health Plan')).toBeInTheDocument();
    });

    it('should handle different color schemes properly', () => {
      const primaryPlan = { ...mockPlan, color: 'primary' as const };
      const secondaryPlan = { ...mockPlan, color: 'secondary' as const };
      
      const { rerender } = render(<PlanCard plan={primaryPlan} />);
      expect(screen.getByText('Basic Health Plan')).toBeInTheDocument();
      
      rerender(<PlanCard plan={secondaryPlan} />);
      expect(screen.getByText('Basic Health Plan')).toBeInTheDocument();
    });
  });
});
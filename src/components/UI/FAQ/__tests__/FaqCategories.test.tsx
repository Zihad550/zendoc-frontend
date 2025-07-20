import { render, screen } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import FaqCategories from '../FaqCategories';

describe('FaqCategories', () => {
  const mockCategories = [
    { id: 'general', label: 'General Questions' },
    { id: 'appointments', label: 'Appointments' },
    { id: 'consultations', label: 'Consultations' },
    { id: 'billing', label: 'Billing & Payment' },
    { id: 'prescriptions', label: 'Prescriptions' },
    { id: 'technical', label: 'Technical Support' }
  ];

  const mockOnCategoryChange = vi.fn();

  const defaultProps = {
    categories: mockCategories,
    selectedCategory: 'general',
    onCategoryChange: mockOnCategoryChange
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render all categories', () => {
      render(<FaqCategories {...defaultProps} />);
      
      expect(screen.getByText('General Questions')).toBeInTheDocument();
      expect(screen.getByText('Appointments')).toBeInTheDocument();
      expect(screen.getByText('Consultations')).toBeInTheDocument();
      expect(screen.getByText('Billing & Payment')).toBeInTheDocument();
      expect(screen.getByText('Prescriptions')).toBeInTheDocument();
      expect(screen.getByText('Technical Support')).toBeInTheDocument();
    });

    it('should render appropriate icons for each category', () => {
      render(<FaqCategories {...defaultProps} />);
      
      // Check for specific icons based on category IDs
      expect(screen.getByTestId('HelpOutlineIcon')).toBeInTheDocument(); // general
      expect(screen.getByTestId('CalendarTodayIcon')).toBeInTheDocument(); // appointments
      expect(screen.getByTestId('VideocamIcon')).toBeInTheDocument(); // consultations
      expect(screen.getByTestId('PaymentIcon')).toBeInTheDocument(); // billing
      expect(screen.getByTestId('MedicationIcon')).toBeInTheDocument(); // prescriptions
      expect(screen.getByTestId('SettingsSuggestIcon')).toBeInTheDocument(); // technical
    });

    it('should highlight the selected category', () => {
      render(<FaqCategories {...defaultProps} />);
      
      const selectedButton = screen.getByRole('button', { name: /general questions/i });
      expect(selectedButton).toHaveClass('Mui-selected');
    });

    it('should not highlight non-selected categories', () => {
      render(<FaqCategories {...defaultProps} />);
      
      const nonSelectedButton = screen.getByRole('button', { name: /appointments/i });
      expect(nonSelectedButton).not.toHaveClass('Mui-selected');
    });
  });

  describe('category selection', () => {
    it('should call onCategoryChange when a category is clicked', async () => {
      const user = userEvent.setup();
      render(<FaqCategories {...defaultProps} />);
      
      const appointmentsButton = screen.getByRole('button', { name: /appointments/i });
      await user.click(appointmentsButton);
      
      expect(mockOnCategoryChange).toHaveBeenCalledWith(
        expect.any(Object), // event object
        'appointments'
      );
    });

    it('should handle clicking different categories', async () => {
      const user = userEvent.setup();
      render(<FaqCategories {...defaultProps} />);
      
      const billingButton = screen.getByRole('button', { name: /billing & payment/i });
      await user.click(billingButton);
      
      expect(mockOnCategoryChange).toHaveBeenCalledWith(
        expect.any(Object),
        'billing'
      );
    });

    it('should handle clicking the already selected category', async () => {
      const user = userEvent.setup();
      render(<FaqCategories {...defaultProps} />);
      
      const selectedButton = screen.getByRole('button', { name: /general questions/i });
      await user.click(selectedButton);
      
      expect(mockOnCategoryChange).toHaveBeenCalledWith(
        expect.any(Object),
        'general'
      );
    });
  });

  describe('accessibility', () => {
    it('should have proper navigation structure', () => {
      render(<FaqCategories {...defaultProps} />);
      
      const nav = screen.getByRole('navigation', { name: /faq categories/i });
      expect(nav).toBeInTheDocument();
    });

    it('should have accessible list structure', () => {
      render(<FaqCategories {...defaultProps} />);
      
      const nav = screen.getByRole('navigation', { name: /faq categories/i });
      expect(nav).toBeInTheDocument();
      
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(6);
    });

    it('should have accessible buttons with proper names', () => {
      render(<FaqCategories {...defaultProps} />);
      
      expect(screen.getByRole('button', { name: /general questions/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /appointments/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /consultations/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /billing & payment/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /prescriptions/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /technical support/i })).toBeInTheDocument();
    });

    it('should have proper selection state attributes', () => {
      render(<FaqCategories {...defaultProps} />);
      
      const selectedButton = screen.getByRole('button', { name: /general questions/i });
      const unselectedButton = screen.getByRole('button', { name: /appointments/i });
      
      expect(selectedButton).toHaveClass('Mui-selected');
      expect(unselectedButton).not.toHaveClass('Mui-selected');
    });
  });

  describe('icon mapping', () => {
    it('should use default icon for unknown category', () => {
      const unknownCategories = [
        { id: 'unknown', label: 'Unknown Category' }
      ];
      
      render(
        <FaqCategories
          categories={unknownCategories}
          selectedCategory="unknown"
          onCategoryChange={mockOnCategoryChange}
        />
      );
      
      // Should default to HelpOutlineIcon
      expect(screen.getByTestId('HelpOutlineIcon')).toBeInTheDocument();
    });

    it('should handle empty category ID', () => {
      const emptyCategoryId = [
        { id: '', label: 'Empty ID Category' }
      ];
      
      render(
        <FaqCategories
          categories={emptyCategoryId}
          selectedCategory=""
          onCategoryChange={mockOnCategoryChange}
        />
      );
      
      // Should default to HelpOutlineIcon
      expect(screen.getByTestId('HelpOutlineIcon')).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('should handle empty categories array', () => {
      render(
        <FaqCategories
          categories={[]}
          selectedCategory=""
          onCategoryChange={mockOnCategoryChange}
        />
      );
      
      const nav = screen.getByRole('navigation', { name: /faq categories/i });
      expect(nav).toBeInTheDocument();
      
      const listItems = screen.queryAllByRole('listitem');
      expect(listItems).toHaveLength(0);
    });
  });

  describe('keyboard navigation', () => {
    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      render(<FaqCategories {...defaultProps} />);
      
      const firstButton = screen.getByRole('button', { name: /general questions/i });
      
      // Focus and activate with keyboard
      firstButton.focus();
      await user.keyboard('{Enter}');
      
      expect(mockOnCategoryChange).toHaveBeenCalledWith(
        expect.any(Object),
        'general'
      );
    });

    it('should support tab navigation between categories', async () => {
      const user = userEvent.setup();
      render(<FaqCategories {...defaultProps} />);
      
      const firstButton = screen.getByRole('button', { name: /general questions/i });
      const secondButton = screen.getByRole('button', { name: /appointments/i });
      
      firstButton.focus();
      await user.keyboard('{Tab}');
      
      expect(secondButton).toHaveFocus();
    });
  });

  describe('visual feedback', () => {
    it('should apply different styles to selected category', () => {
      render(<FaqCategories {...defaultProps} />);
      
      const selectedButton = screen.getByRole('button', { name: /general questions/i });
      expect(selectedButton).toHaveClass('Mui-selected');
    });

    it('should handle category selection changes', () => {
      const { rerender } = render(<FaqCategories {...defaultProps} />);
      
      // Initially general is selected
      expect(screen.getByRole('button', { name: /general questions/i })).toHaveClass('Mui-selected');
      expect(screen.getByRole('button', { name: /appointments/i })).not.toHaveClass('Mui-selected');
      
      // Change selection to appointments
      rerender(
        <FaqCategories
          {...defaultProps}
          selectedCategory="appointments"
        />
      );
      
      expect(screen.getByRole('button', { name: /general questions/i })).not.toHaveClass('Mui-selected');
      expect(screen.getByRole('button', { name: /appointments/i })).toHaveClass('Mui-selected');
    });
  });

  describe('category labels', () => {
    it('should handle long category labels', () => {
      const longLabelCategories = [
        { id: 'long', label: 'This is a very long category label that might wrap to multiple lines' }
      ];
      
      render(
        <FaqCategories
          categories={longLabelCategories}
          selectedCategory="long"
          onCategoryChange={mockOnCategoryChange}
        />
      );
      
      expect(screen.getByText(/this is a very long category label/i)).toBeInTheDocument();
    });

    it('should handle special characters in labels', () => {
      const specialCharCategories = [
        { id: 'special', label: 'Billing & Payment (24/7)' }
      ];
      
      render(
        <FaqCategories
          categories={specialCharCategories}
          selectedCategory="special"
          onCategoryChange={mockOnCategoryChange}
        />
      );
      
      expect(screen.getByText('Billing & Payment (24/7)')).toBeInTheDocument();
    });
  });
});
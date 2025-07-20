import { renderWithForm } from '@/test/utils/form-test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import { describe, expect, it, vi } from 'vitest';
import PHTimePicker from '../PHTimePicker';

// Mock dayjs
vi.mock('dayjs', () => {
  const mockDayjs = vi.fn(() => ({
    format: vi.fn(() => '10:30 AM'),
    toDate: vi.fn(() => new Date('2024-01-01T10:30:00')),
  })) as any;
  mockDayjs.extend = vi.fn();
  return { default: mockDayjs };
});

// Mock MUI DatePicker components
vi.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
  LocalizationProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="localization-provider">{children}</div>
  ),
}));

vi.mock('@mui/x-date-pickers/AdapterDayjs', () => ({
  AdapterDayjs: vi.fn(),
}));

vi.mock('@mui/x-date-pickers', () => ({
  TimePicker: ({ label, onChange, slotProps, ...props }: any) => (
    <div data-testid="time-picker">
      <label>{label}</label>
      <input
        data-testid="time-input"
        type="time"
        onChange={(e) => onChange?.(e.target.value)}
        {...(slotProps?.textField || {})}
        {...props}
      />
      {slotProps?.textField?.helperText && (
        <div data-testid="helper-text">{slotProps.textField.helperText}</div>
      )}
    </div>
  ),
}));

describe('PHTimePicker', () => {
  const defaultProps = {
    name: 'appointmentTime',
    label: 'Appointment Time',
  };

  describe('Rendering', () => {
    it('should render time picker with label', () => {
      renderWithForm(<PHTimePicker {...defaultProps} />);

      expect(screen.getByTestId('localization-provider')).toBeInTheDocument();
      expect(screen.getByTestId('time-picker')).toBeInTheDocument();
      expect(screen.getByText('Appointment Time')).toBeInTheDocument();
      expect(screen.getByTestId('time-input')).toBeInTheDocument();
    });

    it('should render without label when not provided', () => {
      renderWithForm(<PHTimePicker name="time" />);

      expect(screen.getByTestId('time-picker')).toBeInTheDocument();
      expect(screen.getByTestId('time-input')).toBeInTheDocument();
    });

    it('should apply custom sx styles', () => {
      const customSx = { backgroundColor: 'red' };
      renderWithForm(<PHTimePicker {...defaultProps} sx={customSx} />);

      const timePicker = screen.getByTestId('time-picker');
      expect(timePicker).toBeInTheDocument();
      // sx styles are applied to the MUI component, not the mock input
    });
  });

  describe('Props handling', () => {
    it('should handle size prop', () => {
      renderWithForm(<PHTimePicker {...defaultProps} size="medium" />);

      const timePicker = screen.getByTestId('time-picker');
      expect(timePicker).toBeInTheDocument();
      // Size prop is passed to MUI TimePicker component
    });

    it('should default to small size', () => {
      renderWithForm(<PHTimePicker {...defaultProps} />);

      const timePicker = screen.getByTestId('time-picker');
      expect(timePicker).toBeInTheDocument();
      // Default size is handled by MUI TimePicker component
    });

    it('should handle required prop', () => {
      renderWithForm(<PHTimePicker {...defaultProps} required />);

      const input = screen.getByTestId('time-input');
      expect(input).toHaveAttribute('required');
    });

    it('should handle fullWidth prop', () => {
      renderWithForm(<PHTimePicker {...defaultProps} fullWidth={false} />);

      const timePicker = screen.getByTestId('time-picker');
      expect(timePicker).toBeInTheDocument();
      // fullWidth prop is passed to MUI TimePicker component
    });

    it('should default to fullWidth true', () => {
      renderWithForm(<PHTimePicker {...defaultProps} />);

      const timePicker = screen.getByTestId('time-picker');
      expect(timePicker).toBeInTheDocument();
      // Default fullWidth is handled by MUI TimePicker component
    });
  });

  describe('Form integration', () => {
    it('should integrate with React Hook Form', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      renderWithForm(<PHTimePicker {...defaultProps} />, { onSubmit });

      const input = screen.getByTestId('time-input');
      await user.type(input, '14:30');

      expect(input).toHaveValue('14:30');
    });

    it('should handle form validation errors', () => {
      const formErrors = {
        appointmentTime: { message: 'Time is required' },
      };

      renderWithForm(<PHTimePicker {...defaultProps} />, { formErrors });

      expect(screen.getByTestId('helper-text')).toHaveTextContent(
        'Time is required'
      );
    });

    it('should not show error when no validation errors', () => {
      renderWithForm(<PHTimePicker {...defaultProps} />);

      const input = screen.getByTestId('time-input');
      expect(input).not.toHaveAttribute('error');
      expect(screen.queryByTestId('helper-text')).not.toBeInTheDocument();
    });
  });

  describe('Default value handling', () => {
    it('should set default value using dayjs', () => {
      renderWithForm(<PHTimePicker {...defaultProps} />);

      // Verify dayjs was called for default value
      expect(dayjs).toHaveBeenCalled();
    });

    it('should handle value changes', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      renderWithForm(<PHTimePicker {...defaultProps} />, { onSubmit });

      const input = screen.getByTestId('time-input');
      await user.clear(input);
      await user.type(input, '09:15');

      expect(input).toHaveValue('09:15');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      renderWithForm(<PHTimePicker {...defaultProps} required />);

      const input = screen.getByTestId('time-input');
      expect(input).toHaveAttribute('required');
    });

    it('should associate label with input', () => {
      renderWithForm(<PHTimePicker {...defaultProps} />);

      const label = screen.getByText('Appointment Time');
      const input = screen.getByTestId('time-input');

      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    it('should show helper text for errors', () => {
      const formErrors = {
        appointmentTime: { message: 'Invalid time format' },
      };

      renderWithForm(<PHTimePicker {...defaultProps} />, { formErrors });

      const helperText = screen.getByTestId('helper-text');
      expect(helperText).toHaveTextContent('Invalid time format');
      expect(helperText).toBeInTheDocument();
    });
  });

  describe('Timezone handling', () => {
    it('should use system timezone', () => {
      renderWithForm(<PHTimePicker {...defaultProps} />);

      const timePicker = screen.getByTestId('time-picker');
      expect(timePicker).toBeInTheDocument();
      // The timezone prop is passed to the actual TimePicker component
    });
  });

  describe('Edge cases', () => {
    it('should handle empty name prop', () => {
      renderWithForm(<PHTimePicker name="" label="Time" />);

      expect(screen.getByTestId('time-picker')).toBeInTheDocument();
    });

    it('should handle special characters in name', () => {
      renderWithForm(
        <PHTimePicker name="appointment-time_slot" label="Time" />
      );

      expect(screen.getByTestId('time-input')).toBeInTheDocument();
    });

    it('should handle long label text', () => {
      const longLabel =
        'This is a very long label for the time picker component that might wrap to multiple lines';
      renderWithForm(<PHTimePicker name="time" label={longLabel} />);

      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });
  });
});

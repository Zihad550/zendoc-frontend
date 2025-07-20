import { render, screen } from '@/test/utils/test-utils';
import { describe, expect, it, vi } from 'vitest';
import PHDatePicker from '../PHDatePicker';

// Mock react-hook-form
vi.mock('react-hook-form', () => ({
  useFormContext: () => ({
    control: {},
    formState: { errors: {} },
  }),
  Controller: ({ render: renderProp }: any) =>
    renderProp({
      field: {
        onChange: vi.fn(),
        onBlur: vi.fn(),
        value: null,
        name: 'test',
      },
      fieldState: { error: null },
    }),
}));

// Mock MUI DatePicker
vi.mock('@mui/x-date-pickers/DatePicker', () => ({
  DatePicker: ({ label, ...props }: any) => (
    <input aria-label={label} placeholder={label} {...props} />
  ),
}));

describe('PHDatePicker', () => {
  it('should render date picker with label', () => {
    render(<PHDatePicker name="birthDate" label="Birth Date" />);

    expect(screen.getByLabelText(/birth date/i)).toBeInTheDocument();
  });

  it('should handle required field', () => {
    render(<PHDatePicker name="birthDate" label="Birth Date" required />);

    const datePicker = screen.getByLabelText(/birth date/i);
    expect(datePicker).toBeInTheDocument();
  });

  it('should handle disabled state', () => {
    render(<PHDatePicker name="birthDate" label="Birth Date" disabled />);

    const datePicker = screen.getByLabelText(/birth date/i);
    expect(datePicker).toBeDisabled();
  });

  it('should render with helper text', () => {
    render(
      <PHDatePicker
        name="birthDate"
        label="Birth Date"
        helperText="Select your date of birth"
      />
    );

    expect(screen.getByText(/select your date of birth/i)).toBeInTheDocument();
  });

  it('should apply custom size', () => {
    render(<PHDatePicker name="birthDate" label="Birth Date" size="small" />);

    const datePicker = screen.getByLabelText(/birth date/i);
    expect(datePicker).toBeInTheDocument();
  });

  it('should handle different date formats', () => {
    render(
      <PHDatePicker
        name="appointmentDate"
        label="Appointment Date"
        format="MM/dd/yyyy"
      />
    );

    const datePicker = screen.getByLabelText(/appointment date/i);
    expect(datePicker).toBeInTheDocument();
  });

  it('should handle min and max dates', () => {
    const minDate = new Date('2023-01-01');
    const maxDate = new Date('2023-12-31');

    render(
      <PHDatePicker
        name="eventDate"
        label="Event Date"
        minDate={minDate}
        maxDate={maxDate}
      />
    );

    const datePicker = screen.getByLabelText(/event date/i);
    expect(datePicker).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(<PHDatePicker name="birthDate" label="Birth Date" />);

    const datePicker = screen.getByLabelText(/birth date/i);
    expect(datePicker).toBeInTheDocument();
    expect(datePicker).toHaveAccessibleName('Birth Date');
  });

  it('should handle readonly state', () => {
    render(<PHDatePicker name="birthDate" label="Birth Date" readOnly />);

    const datePicker = screen.getByLabelText(/birth date/i);
    expect(datePicker).toBeInTheDocument();
  });
});

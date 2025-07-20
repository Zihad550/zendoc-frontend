import { render, screen } from '@/test/utils/test-utils';
import { describe, expect, it, vi } from 'vitest';
import PHInput from '../PHInput';

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
        value: '',
        name: 'test',
      },
      fieldState: { error: null },
    }),
}));

describe('PHInput', () => {
  it('should render input with label', () => {
    render(<PHInput name="email" label="Email Address" />);

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(
      <PHInput name="email" label="Email" placeholder="Enter your email" />
    );

    expect(
      screen.getByPlaceholderText(/enter your email/i)
    ).toBeInTheDocument();
  });

  it('should render different input types', () => {
    const { rerender } = render(
      <PHInput name="password" label="Password" type="password" />
    );

    expect(screen.getByLabelText(/password/i)).toHaveAttribute(
      'type',
      'password'
    );

    rerender(<PHInput name="email" label="Email" type="email" />);
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
  });

  it('should handle required field', () => {
    render(<PHInput name="name" label="Name" required />);

    const input = screen.getByLabelText(/name/i);
    expect(input).toBeRequired();
  });

  it('should handle disabled state', () => {
    render(<PHInput name="name" label="Name" disabled />);

    const input = screen.getByLabelText(/name/i);
    expect(input).toBeDisabled();
  });

  it('should render with helper text', () => {
    render(
      <PHInput
        name="password"
        label="Password"
        helperText="Password must be at least 8 characters"
      />
    );

    expect(
      screen.getByText(/password must be at least 8 characters/i)
    ).toBeInTheDocument();
  });

  it('should handle multiline input', () => {
    render(
      <PHInput name="description" label="Description" multiline rows={4} />
    );

    const textarea = screen.getByLabelText(/description/i);
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('should apply custom size', () => {
    render(<PHInput name="name" label="Name" size="small" />);

    const input = screen.getByLabelText(/name/i);
    expect(input).toBeInTheDocument();
  });

  it('should handle input with adornments', () => {
    render(
      <PHInput
        name="amount"
        label="Amount"
        startAdornment="$"
        endAdornment="USD"
      />
    );

    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(<PHInput name="email" label="Email Address" />);

    const input = screen.getByLabelText(/email address/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAccessibleName('Email Address');
  });
});

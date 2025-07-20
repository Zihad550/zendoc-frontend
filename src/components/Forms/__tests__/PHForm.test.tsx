import { render, screen, waitFor } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import PHForm from '../PHForm';
import PHInput from '../PHInput';

// Mock react-hook-form
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useForm: () => ({
      control: {},
      handleSubmit: (fn: any) => (e: any) => {
        e.preventDefault();
        fn({ name: 'test', email: 'test@example.com' });
      },
      formState: { errors: {}, isSubmitting: false },
      reset: vi.fn(),
    }),
  };
});

const testSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

describe('PHForm', () => {
  it('should render form with children', () => {
    const onSubmit = vi.fn();

    render(
      <PHForm onSubmit={onSubmit} schema={testSchema}>
        <PHInput name="name" label="Name" />
        <PHInput name="email" label="Email" type="email" />
        <button type="submit">Submit</button>
      </PHForm>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <PHForm onSubmit={onSubmit} schema={testSchema}>
        <PHInput name="name" label="Name" />
        <PHInput name="email" label="Email" type="email" />
        <button type="submit">Submit</button>
      </PHForm>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        name: 'test',
        email: 'test@example.com',
      });
    });
  });

  it('should render with default values', () => {
    const onSubmit = vi.fn();
    const defaultValues = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    render(
      <PHForm
        onSubmit={onSubmit}
        schema={testSchema}
        defaultValues={defaultValues}
      >
        <PHInput name="name" label="Name" />
        <PHInput name="email" label="Email" type="email" />
        <button type="submit">Submit</button>
      </PHForm>
    );

    // Form should render without errors
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const onSubmit = vi.fn();

    const { container } = render(
      <PHForm onSubmit={onSubmit} schema={testSchema} className="custom-form">
        <PHInput name="name" label="Name" />
      </PHForm>
    );

    const form = container.querySelector('form');
    expect(form).toHaveClass('custom-form');
  });

  it('should handle form without schema', () => {
    const onSubmit = vi.fn();

    render(
      <PHForm onSubmit={onSubmit}>
        <PHInput name="name" label="Name" />
        <button type="submit">Submit</button>
      </PHForm>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});

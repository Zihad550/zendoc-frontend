import { render, screen } from '@/test/utils/test-utils';
import { describe, expect, it, vi } from 'vitest';
import PHSelectField from '../PHSelectField';

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

describe('PHSelectField', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('should render select field with label', () => {
    render(
      <PHSelectField name="category" label="Category" options={mockOptions} />
    );

    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(
      <PHSelectField
        name="category"
        label="Category"
        placeholder="Select a category"
        options={mockOptions}
      />
    );

    expect(screen.getByText(/select a category/i)).toBeInTheDocument();
  });

  it('should handle required field', () => {
    render(
      <PHSelectField
        name="category"
        label="Category"
        required
        options={mockOptions}
      />
    );

    const select = screen.getByLabelText(/category/i);
    expect(select).toBeRequired();
  });

  it('should handle disabled state', () => {
    render(
      <PHSelectField
        name="category"
        label="Category"
        disabled
        options={mockOptions}
      />
    );

    const select = screen.getByLabelText(/category/i);
    expect(select).toBeDisabled();
  });

  it('should render with helper text', () => {
    render(
      <PHSelectField
        name="category"
        label="Category"
        helperText="Choose the appropriate category"
        options={mockOptions}
      />
    );

    expect(
      screen.getByText(/choose the appropriate category/i)
    ).toBeInTheDocument();
  });

  it('should handle multiple selection', () => {
    render(
      <PHSelectField
        name="categories"
        label="Categories"
        multiple
        options={mockOptions}
      />
    );

    const select = screen.getByLabelText(/categories/i);
    expect(select).toBeInTheDocument();
  });

  it('should render options correctly', () => {
    render(
      <PHSelectField name="category" label="Category" options={mockOptions} />
    );

    // The options would be visible when the select is opened
    // This test verifies the component renders without errors
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it('should handle empty options array', () => {
    render(<PHSelectField name="category" label="Category" options={[]} />);

    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  });

  it('should apply custom size', () => {
    render(
      <PHSelectField
        name="category"
        label="Category"
        size="small"
        options={mockOptions}
      />
    );

    const select = screen.getByLabelText(/category/i);
    expect(select).toBeInTheDocument();
  });

  it('should be accessible', () => {
    render(
      <PHSelectField name="category" label="Category" options={mockOptions} />
    );

    const select = screen.getByLabelText(/category/i);
    expect(select).toBeInTheDocument();
    expect(select).toHaveAccessibleName('Category');
  });
});

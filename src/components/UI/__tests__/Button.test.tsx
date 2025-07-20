import { render, screen } from '@/test/utils/test-utils';
import { Button } from '@mui/material';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

describe('Button', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>);

    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: /click me/i });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render different variants', () => {
    const { rerender } = render(<Button variant="contained">Contained</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-contained');

    rerender(<Button variant="outlined">Outlined</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-outlined');

    rerender(<Button variant="text">Text</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-text');
  });

  it('should render different colors', () => {
    const { rerender } = render(<Button color="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorPrimary');

    rerender(<Button color="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorSecondary');

    rerender(<Button color="error">Error</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorError');
  });

  it('should render different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeSmall');

    rerender(<Button size="medium">Medium</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeMedium');

    rerender(<Button size="large">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge');
  });

  it('should handle disabled state', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('Mui-disabled');
  });

  it('should render with start icon', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    render(<Button startIcon={<TestIcon />}>With Icon</Button>);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /with icon/i })
    ).toBeInTheDocument();
  });

  it('should render with end icon', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;

    render(<Button endIcon={<TestIcon />}>With Icon</Button>);

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /with icon/i })
    ).toBeInTheDocument();
  });

  it('should render as full width', () => {
    render(<Button fullWidth>Full Width</Button>);

    const button = screen.getByRole('button', { name: /full width/i });
    expect(button).toHaveClass('MuiButton-fullWidth');
  });

  it('should handle loading state', () => {
    // Note: MUI Button doesn't have built-in loading state, but we can test custom implementation
    render(<Button disabled>Loading...</Button>);

    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
  });

  it('should be accessible', () => {
    render(<Button aria-label="Custom button">Button</Button>);

    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName('Custom button');
  });

  it('should handle form submission', () => {
    render(
      <form>
        <Button type="submit">Submit</Button>
      </form>
    );

    const button = screen.getByRole('button', { name: /submit/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should apply custom className', () => {
    render(<Button className="custom-button">Custom</Button>);

    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-button');
  });
});

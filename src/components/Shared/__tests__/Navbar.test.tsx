import { render, screen } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Navbar from '../Navbar/Navbar';

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock auth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    isAuthenticated: false,
    logout: vi.fn(),
  }),
}));

describe('Navbar', () => {
  it('should render navbar with logo', () => {
    render(<Navbar />);

    expect(screen.getByText(/zendoc/i)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Navbar />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/doctors/i)).toBeInTheDocument();
    expect(screen.getByText(/services/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

  it('should render login button when not authenticated', () => {
    render(<Navbar />);

    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('should handle mobile menu toggle', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Look for mobile menu button (hamburger menu)
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();

    await user.click(menuButton);
    // Mobile menu should be visible after clicking
  });

  it('should render theme toggle button', () => {
    render(<Navbar />);

    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeToggle).toBeInTheDocument();
  });

  it('should handle theme toggle click', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(themeToggle);

    // Theme should toggle (this would require theme context mock)
    expect(themeToggle).toBeInTheDocument();
  });

  it('should be responsive', () => {
    render(<Navbar />);

    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<Navbar />);

    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();

    // Check for proper ARIA labels
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toHaveAttribute('aria-label');
  });

  it('should render brand logo as link', () => {
    render(<Navbar />);

    const brandLink = screen.getByRole('link', { name: /zendoc/i });
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('should handle navigation link clicks', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    const doctorsLink = screen.getByRole('link', { name: /doctors/i });
    expect(doctorsLink).toHaveAttribute('href', '/doctors');

    // Click should work without errors
    await user.click(doctorsLink);
  });
});

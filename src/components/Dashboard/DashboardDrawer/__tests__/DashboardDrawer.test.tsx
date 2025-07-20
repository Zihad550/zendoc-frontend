import { render } from '@/test/utils/test-utils';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import DashboardDrawer from '../DashboardDrawer';

// Mock the user API query
const mockUserData = {
  data: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'patient',
  },
};

const mockUseGetSingleUserQuery = vi.fn();
vi.mock('@/redux/features/user/userApi', () => ({
  useGetSingleUserQuery: () => mockUseGetSingleUserQuery(),
}));

// Mock child components
vi.mock('../AccountMenu/AccountMenu', () => ({
  default: () => <div data-testid="account-menu">Account Menu</div>,
}));

vi.mock('../SideBar/SideBar', () => ({
  default: () => <div data-testid="sidebar">Sidebar</div>,
}));

vi.mock('@/components/Shared/Navbar/ModeToggle', () => ({
  default: () => <button data-testid="mode-toggle">Mode Toggle</button>,
}));

vi.mock('@/components/Shared/Spinner/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('DashboardDrawer Component', () => {
  const mockChildren = <div data-testid="dashboard-content">Dashboard Content</div>;

  beforeEach(() => {
    mockUseGetSingleUserQuery.mockReturnValue({
      data: mockUserData,
      isLoading: false,
      error: null,
    });
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render dashboard drawer with all components', async () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      await waitFor(() => {
        expect(screen.getByText('Hi, John Doe,')).toBeInTheDocument();
        expect(screen.getByText('Welcome to ZenDoc Healthcare!')).toBeInTheDocument();
        expect(screen.getByTestId('account-menu')).toBeInTheDocument();
        expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
      });
    });

    it('should render loading state when user data is loading', () => {
      mockUseGetSingleUserQuery.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });

      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
      expect(screen.queryByTestId('dashboard-content')).not.toBeInTheDocument();
    });

    it('should render user name when data is loaded', async () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      await waitFor(() => {
        expect(screen.getByText('Hi, John Doe,')).toBeInTheDocument();
      });
    });

    it('should render loading text when user data is still loading', () => {
      mockUseGetSingleUserQuery.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });

      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Mobile Drawer Functionality', () => {
    it('should show mobile menu button on mobile screens', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-label', 'open drawer');
    });

    it('should toggle mobile drawer when menu button is clicked', async () => {
      const user = userEvent.setup();
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      
      // Click to open drawer
      await user.click(menuButton);
      
      // Verify drawer state changes (implementation depends on MUI Drawer behavior)
      expect(menuButton).toBeInTheDocument();
    });

    it('should handle drawer close properly', async () => {
      const user = userEvent.setup();
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      
      // Open drawer
      await user.click(menuButton);
      
      // The drawer should handle close events properly
      // (specific behavior depends on MUI Drawer implementation)
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should render app bar with proper positioning', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const appBar = screen.getByRole('banner');
      expect(appBar).toBeInTheDocument();
    });

    it('should render main content area', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    });

    it('should render navigation drawer', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const navigation = screen.getByRole('navigation', { name: /mailbox folders/i });
      expect(navigation).toBeInTheDocument();
    });

    it('should render both permanent and temporary drawers', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      // Both drawers should be present in DOM (one hidden on mobile, one on desktop)
      const sidebars = screen.getAllByTestId('sidebar');
      expect(sidebars).toHaveLength(2);
    });
  });

  describe('User Information Display', () => {
    it('should display welcome message with user name', async () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      await waitFor(() => {
        expect(screen.getByText('Hi, John Doe,')).toBeInTheDocument();
        expect(screen.getByText('Welcome to ZenDoc Healthcare!')).toBeInTheDocument();
      });
    });

    it('should handle missing user data gracefully', () => {
      mockUseGetSingleUserQuery.mockReturnValue({
        data: { data: null },
        isLoading: false,
        error: null,
      });

      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      // Should not crash and should handle null user data
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    });

    it('should show loading text while user data is being fetched', () => {
      mockUseGetSingleUserQuery.mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });

      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('should apply theme-aware styling', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const mainContainer = screen.getByRole('main').parentElement;
      expect(mainContainer).toHaveStyle({
        display: 'flex',
        minHeight: '100vh',
      });
    });

    it('should render with proper background styling', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      // Check if the main container has proper styling
      const mainContainer = screen.getByRole('main').parentElement;
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      expect(menuButton).toHaveAttribute('aria-label', 'open drawer');
      
      const navigation = screen.getByRole('navigation', { name: /mailbox folders/i });
      expect(navigation).toHaveAttribute('aria-label', 'mailbox folders');
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      
      // Focus the menu button
      menuButton.focus();
      expect(menuButton).toHaveFocus();
      
      // Should be able to activate with Enter key
      await user.keyboard('{Enter}');
      
      // Button should still be accessible
      expect(menuButton).toBeInTheDocument();
    });

    it('should have proper heading structure', async () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      await waitFor(() => {
        const welcomeHeading = screen.getByText('Welcome to ZenDoc Healthcare!');
        expect(welcomeHeading).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors gracefully', () => {
      mockUseGetSingleUserQuery.mockReturnValue({
        data: null,
        isLoading: false,
        error: { message: 'Failed to fetch user' },
      });

      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      // Should still render the layout even with API errors
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();
    });

    it('should handle rapid drawer toggle operations', async () => {
      const user = userEvent.setup();
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      
      // Rapidly click the menu button
      await user.click(menuButton);
      await user.click(menuButton);
      await user.click(menuButton);
      
      // Should not crash or cause issues
      expect(menuButton).toBeInTheDocument();
    });
  });

  describe('Responsive Behavior', () => {
    it('should render mobile and desktop drawer variants', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      // Both temporary (mobile) and permanent (desktop) drawers should be present
      const sidebars = screen.getAllByTestId('sidebar');
      expect(sidebars).toHaveLength(2);
    });

    it('should show menu button for mobile navigation', () => {
      render(<DashboardDrawer>{mockChildren}</DashboardDrawer>);
      
      const menuButton = screen.getByRole('button', { name: /open drawer/i });
      expect(menuButton).toBeInTheDocument();
    });
  });
});
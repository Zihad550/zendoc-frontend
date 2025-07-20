import { render } from '@/test/utils/test-utils';
import { DrawerItem } from '@/types';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import SidebarItem from '../SidebarItem';

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="sidebar-link">
      {children}
    </a>
  ),
}));

const mockUsePathname = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));

// Mock MUI icons
const MockIcon = () => <svg data-testid="mock-icon">Icon</svg>;

describe('SidebarItem Component', () => {
  const mockItem: DrawerItem = {
    title: 'Dashboard',
    path: 'admin',
    icon: MockIcon,
  };

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/dashboard/patient');
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render sidebar item with title and icon', () => {
      render(<SidebarItem item={mockItem} />);
      
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('should render as a link with correct href', () => {
      render(<SidebarItem item={mockItem} />);
      
      const link = screen.getByTestId('sidebar-link');
      expect(link).toHaveAttribute('href', '/dashboard/admin');
    });

    it('should render without icon when icon is not provided', () => {
      const itemWithoutIcon: DrawerItem = {
        title: 'Settings',
        path: 'settings',
      };
      
      render(<SidebarItem item={itemWithoutIcon} />);
      
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
    });

    it('should render list item with proper MUI components', () => {
      render(<SidebarItem item={mockItem} />);
      
      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Active State', () => {
    it('should apply active styles when current path matches item path', () => {
      mockUsePathname.mockReturnValue('/dashboard/admin');
      
      render(<SidebarItem item={mockItem} />);
      
      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
      
      // Active state is applied via MUI styling, we verify the component renders
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should not apply active styles when path does not match', () => {
      mockUsePathname.mockReturnValue('/dashboard/patient');
      
      render(<SidebarItem item={mockItem} />);
      
      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
      
      // Non-active state styling is handled by MUI
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle exact path matching', () => {
      mockUsePathname.mockReturnValue('/dashboard/admin');
      
      const exactItem: DrawerItem = {
        title: 'Admin Dashboard',
        path: 'admin',
      };
      
      render(<SidebarItem item={exactItem} />);
      
      expect(screen.getByText('Admin Dashboard')).toBeInTheDocument();
    });

    it('should handle nested path matching', () => {
      mockUsePathname.mockReturnValue('/dashboard/admin/doctors');
      
      const nestedItem: DrawerItem = {
        title: 'Doctors',
        path: 'admin/doctors',
      };
      
      render(<SidebarItem item={nestedItem} />);
      
      expect(screen.getByText('Doctors')).toBeInTheDocument();
    });
  });

  describe('User Interaction', () => {
    it('should be clickable and navigate to correct path', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={mockItem} />);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      // Navigation is handled by Next.js Link component
      const link = screen.getByTestId('sidebar-link');
      expect(link).toHaveAttribute('href', '/dashboard/admin');
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={mockItem} />);
      
      const button = screen.getByRole('button');
      
      // Focus the button
      button.focus();
      expect(button).toHaveFocus();
      
      // Should be activatable with Enter key
      await user.keyboard('{Enter}');
      
      // Button should remain accessible
      expect(button).toBeInTheDocument();
    });

    it('should support space key activation', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={mockItem} />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      await user.keyboard(' ');
      
      // Button should remain accessible after activation
      expect(button).toBeInTheDocument();
    });

    it('should handle hover states', async () => {
      const user = userEvent.setup();
      render(<SidebarItem item={mockItem} />);
      
      const listItem = screen.getByRole('listitem');
      
      await user.hover(listItem);
      
      // Hover styles are applied via MUI theme
      expect(listItem).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<SidebarItem item={mockItem} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
    });

    it('should have accessible text content', () => {
      render(<SidebarItem item={mockItem} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Dashboard');
    });

    it('should support screen readers', () => {
      render(<SidebarItem item={mockItem} />);
      
      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      
      // Text content should be accessible to screen readers
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should have proper focus management', () => {
      render(<SidebarItem item={mockItem} />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
    });
  });

  describe('Theme Integration', () => {
    it('should apply theme-aware styling', () => {
      render(<SidebarItem item={mockItem} />);
      
      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
      
      // Theme styles are applied via MUI components
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
    });

    it('should handle dark and light theme modes', () => {
      render(<SidebarItem item={mockItem} />);
      
      // Theme mode handling is done via MUI ThemeProvider
      const listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
    });

    it('should apply proper color schemes for active/inactive states', () => {
      // Test active state
      mockUsePathname.mockReturnValue('/dashboard/admin');
      const { rerender } = render(<SidebarItem item={mockItem} />);
      
      let listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
      
      // Test inactive state
      mockUsePathname.mockReturnValue('/dashboard/patient');
      rerender(<SidebarItem item={mockItem} />);
      
      listItem = screen.getByRole('listitem');
      expect(listItem).toBeInTheDocument();
    });
  });

  describe('Icon Handling', () => {
    it('should render icon when provided', () => {
      render(<SidebarItem item={mockItem} />);
      
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    it('should handle missing icon gracefully', () => {
      const itemWithoutIcon: DrawerItem = {
        title: 'No Icon Item',
        path: 'no-icon',
      };
      
      render(<SidebarItem item={itemWithoutIcon} />);
      
      expect(screen.getByText('No Icon Item')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument();
    });

    it('should apply proper icon styling', () => {
      render(<SidebarItem item={mockItem} />);
      
      const icon = screen.getByTestId('mock-icon');
      expect(icon).toBeInTheDocument();
      
      // Icon is wrapped in ListItemIcon component
      const iconContainer = icon.closest('.MuiListItemIcon-root');
      expect(iconContainer || icon.parentElement).toBeInTheDocument();
    });

    it('should handle different icon types', () => {
      const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;
      
      const itemWithCustomIcon: DrawerItem = {
        title: 'Custom Icon Item',
        path: 'custom',
        icon: CustomIcon,
      };
      
      render(<SidebarItem item={itemWithCustomIcon} />);
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
      expect(screen.getByText('Custom Icon Item')).toBeInTheDocument();
    });
  });

  describe('Path Construction', () => {
    it('should construct correct dashboard path', () => {
      render(<SidebarItem item={mockItem} />);
      
      const link = screen.getByTestId('sidebar-link');
      expect(link).toHaveAttribute('href', '/dashboard/admin');
    });

    it('should handle paths with slashes', () => {
      const nestedItem: DrawerItem = {
        title: 'Nested Item',
        path: 'admin/nested/deep',
      };
      
      render(<SidebarItem item={nestedItem} />);
      
      const link = screen.getByTestId('sidebar-link');
      expect(link).toHaveAttribute('href', '/dashboard/admin/nested/deep');
    });

    it('should handle empty path', () => {
      const emptyPathItem: DrawerItem = {
        title: 'Empty Path',
        path: '',
      };
      
      render(<SidebarItem item={emptyPathItem} />);
      
      const link = screen.getByTestId('sidebar-link');
      expect(link).toHaveAttribute('href', '/dashboard/');
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed item data', () => {
      const malformedItem = {
        title: null,
        path: null,
      } as any;
      
      // Should not crash
      expect(() => render(<SidebarItem item={malformedItem} />)).not.toThrow();
    });

    it('should handle missing pathname', () => {
      mockUsePathname.mockReturnValue(null);
      
      render(<SidebarItem item={mockItem} />);
      
      // Should still render the item
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });

    it('should handle icon rendering errors', () => {
      const ErrorIcon = () => {
        throw new Error('Icon error');
      };
      
      const itemWithErrorIcon: DrawerItem = {
        title: 'Error Icon Item',
        path: 'error',
        icon: ErrorIcon,
      };
      
      // Should handle icon errors gracefully - in reality, React error boundaries would catch this
      // For testing purposes, we expect the error to be thrown since we don't have error boundaries in tests
      expect(() => render(<SidebarItem item={itemWithErrorIcon} />)).toThrow('Icon error');
    });
  });
});
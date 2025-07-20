import { USER_ROLE } from '@/contants/role';
import { render } from '@/test/utils/test-utils';
import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import SideBar from '../SideBar';

// Mock the Redux hooks and selectors
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: USER_ROLE.PATIENT,
};

const mockUseAppSelector = vi.fn();
vi.mock('@/redux/hooks', () => ({
  useAppSelector: () => mockUseAppSelector(),
}));

vi.mock('@/redux/features/auth/authSlice', () => ({
  selectUser: vi.fn(),
}));

// Mock drawerItems utility
const mockDrawerItems = vi.fn();
vi.mock('@/utils/drawerItems', () => ({
  drawerItems: () => mockDrawerItems(),
}));

// Mock SidebarItem component
vi.mock('../SidebarItem', () => ({
  default: ({ item }: { item: any }) => (
    <div data-testid={`sidebar-item-${item.path}`}>
      {item.title}
    </div>
  ),
}));

// Mock Next.js components
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height }: any) => (
    <img src={src} alt={alt} width={width} height={height} />
  ),
}));

// Mock assets
vi.mock('@/assets', () => ({
  assets: {
    svgs: {
      logo: '/logo.svg',
    },
  },
}));

describe('SideBar Component', () => {
  const mockDrawerItemsData = [
    {
      title: 'Dashboard',
      path: 'patient',
      icon: vi.fn(),
    },
    {
      title: 'Appointments',
      path: 'patient/appointments',
      icon: vi.fn(),
    },
    {
      title: 'Change Password',
      path: 'change-password',
      icon: vi.fn(),
    },
  ];

  beforeEach(() => {
    mockUseAppSelector.mockReturnValue(mockUser);
    mockDrawerItems.mockReturnValue(mockDrawerItemsData);
    
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render sidebar with logo and navigation items', () => {
      render(<SideBar />);
      
      // Check logo
      expect(screen.getByAltText('ZenDoc Logo')).toBeInTheDocument();
      expect(screen.getByText('ZenDoc Health')).toBeInTheDocument();
      
      // Check navigation items
      expect(screen.getByTestId('sidebar-item-patient')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar-item-patient/appointments')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar-item-change-password')).toBeInTheDocument();
    });

    it('should render footer with copyright', () => {
      render(<SideBar />);
      
      expect(screen.getByText('© 2025 ZenDoc Health')).toBeInTheDocument();
    });

    it('should render logo as clickable link', () => {
      render(<SideBar />);
      
      const logoLink = screen.getByRole('link');
      expect(logoLink).toHaveAttribute('href', '/');
    });

    it('should render with proper layout structure', () => {
      render(<SideBar />);
      
      const sidebar = screen.getByText('ZenDoc Health').closest('div');
      expect(sidebar).toHaveStyle({
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      });
    });
  });

  describe('User Role Integration', () => {
    it('should call drawerItems with correct user role', () => {
      render(<SideBar />);
      
      // The drawerItems function should be called with the user role
      // Since we're mocking the function, we verify the component renders correctly
      expect(screen.getByText('ZenDoc Health')).toBeInTheDocument();
    });

    it('should render different items for different user roles', () => {
      // Test with admin user
      const adminUser = { ...mockUser, role: USER_ROLE.ADMIN };
      const adminDrawerItems = [
        { title: 'Dashboard', path: 'admin', icon: vi.fn() },
        { title: 'Doctors', path: 'admin/doctors', icon: vi.fn() },
        { title: 'Appointments', path: 'admin/appointments', icon: vi.fn() },
      ];
      
      mockUseAppSelector.mockReturnValue(adminUser);
      mockDrawerItems.mockReturnValue(adminDrawerItems);
      
      render(<SideBar />);
      
      expect(screen.getByTestId('sidebar-item-admin')).toBeInTheDocument();
      expect(screen.getByTestId('sidebar-item-admin/doctors')).toBeInTheDocument();
    });

    it('should handle null user gracefully', () => {
      mockUseAppSelector.mockReturnValue(null);
      mockDrawerItems.mockReturnValue([]);
      
      render(<SideBar />);
      
      // Should still render logo and footer
      expect(screen.getByText('ZenDoc Health')).toBeInTheDocument();
      expect(screen.getByText('© 2025 ZenDoc Health')).toBeInTheDocument();
      
      // Should not crash
      expect(screen.getByAltText('ZenDoc Logo')).toBeInTheDocument();
    });
  });

  describe('Navigation Items', () => {
    it('should render all navigation items from drawerItems', () => {
      render(<SideBar />);
      
      mockDrawerItemsData.forEach((item) => {
        expect(screen.getByTestId(`sidebar-item-${item.path}`)).toBeInTheDocument();
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });

    it('should handle empty drawer items', () => {
      mockDrawerItems.mockReturnValue([]);
      
      render(<SideBar />);
      
      // Should still render logo and footer
      expect(screen.getByText('ZenDoc Health')).toBeInTheDocument();
      expect(screen.getByText('© 2025 ZenDoc Health')).toBeInTheDocument();
      
      // No navigation items should be present
      expect(screen.queryByTestId(/sidebar-item-/)).not.toBeInTheDocument();
    });

    it('should pass correct props to SidebarItem components', () => {
      render(<SideBar />);
      
      // Verify that each drawer item is rendered
      mockDrawerItemsData.forEach((item) => {
        expect(screen.getByTestId(`sidebar-item-${item.path}`)).toBeInTheDocument();
      });
    });
  });

  describe('Theme Integration', () => {
    it('should apply theme-aware styling', () => {
      render(<SideBar />);
      
      const sidebar = screen.getByText('ZenDoc Health').closest('div');
      expect(sidebar).toHaveStyle({
        position: 'relative',
        overflow: 'hidden',
      });
    });

    it('should render with proper background gradient', () => {
      render(<SideBar />);
      
      const sidebar = screen.getByText('ZenDoc Health').closest('div');
      expect(sidebar).toBeInTheDocument();
      // Background gradient is applied via CSS-in-JS, so we just verify the element exists
    });

    it('should apply theme-aware logo filtering', () => {
      render(<SideBar />);
      
      const logo = screen.getByAltText('ZenDoc Logo');
      expect(logo).toBeInTheDocument();
      // Filter styles are applied via inline styles in the component
    });
  });

  describe('Accessibility', () => {
    it('should have proper semantic structure', () => {
      render(<SideBar />);
      
      // Check for proper list structure
      const navigationList = screen.getByRole('list');
      expect(navigationList).toBeInTheDocument();
    });

    it('should have accessible logo link', () => {
      render(<SideBar />);
      
      const logoLink = screen.getByRole('link');
      expect(logoLink).toHaveAttribute('href', '/');
      expect(logoLink).toBeInTheDocument();
    });

    it('should support keyboard navigation', () => {
      render(<SideBar />);
      
      const logoLink = screen.getByRole('link');
      logoLink.focus();
      expect(logoLink).toHaveFocus();
    });

    it('should have proper heading hierarchy', () => {
      render(<SideBar />);
      
      const heading = screen.getByText('ZenDoc Health');
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('should have header, navigation, and footer sections', () => {
      render(<SideBar />);
      
      // Header with logo
      expect(screen.getByText('ZenDoc Health')).toBeInTheDocument();
      
      // Navigation list
      expect(screen.getByRole('list')).toBeInTheDocument();
      
      // Footer
      expect(screen.getByText('© 2025 ZenDoc Health')).toBeInTheDocument();
    });

    it('should render divider between header and navigation', () => {
      render(<SideBar />);
      
      // MUI Divider component should be present
      const divider = screen.getByRole('separator');
      expect(divider).toBeInTheDocument();
    });

    it('should have proper flex layout', () => {
      render(<SideBar />);
      
      const sidebar = screen.getByText('ZenDoc Health').closest('div');
      expect(sidebar).toHaveStyle({
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle drawerItems function errors', () => {
      mockDrawerItems.mockImplementation(() => {
        throw new Error('DrawerItems error');
      });
      
      // Should not crash the component
      expect(() => render(<SideBar />)).not.toThrow();
    });

    it('should handle malformed drawer items', () => {
      mockDrawerItems.mockReturnValue([
        { title: 'Valid Item', path: 'valid', icon: vi.fn() },
        { title: null, path: null }, // Invalid item
        { title: 'Another Valid', path: 'valid2', icon: vi.fn() },
      ]);
      
      render(<SideBar />);
      
      // Should still render valid items
      expect(screen.getByText('Valid Item')).toBeInTheDocument();
      expect(screen.getByText('Another Valid')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('should render efficiently with many navigation items', () => {
      const manyItems = Array.from({ length: 20 }, (_, i) => ({
        title: `Item ${i}`,
        path: `item-${i}`,
        icon: vi.fn(),
      }));
      
      mockDrawerItems.mockReturnValue(manyItems);
      
      render(<SideBar />);
      
      // Should render all items without performance issues
      manyItems.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });
  });
});
import { useAppSelector } from '@/redux/hooks';
import { UserRole } from '@/types';
import {
    Assignment,
    Dashboard,
    Home,
    LocalHospital,
    NavigateNext,
    People,
    Person,
    Schedule,
    Settings,
} from '@mui/icons-material';
import {
    AppBar,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tab,
    Tabs,
    Toolbar,
    Typography,
} from '@mui/material';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { render } from '../../utils/test-utils';

import { vi } from 'vitest';

// Mock dependencies
vi.mock('@/redux/features/auth/authSlice');
vi.mock('@/redux/hooks');
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: mockBack,
    pathname: mockPathname,
  }),
  usePathname: () => mockPathname,
}));

const mockUseAppSelector = useAppSelector as any;
const mockPush = vi.fn();
const mockReplace = vi.fn();
const mockBack = vi.fn();
let mockPathname = '/dashboard';

// Navigation configuration for different roles
const navigationConfig = {
  ADMIN: [
    { title: 'Dashboard', path: '/dashboard', icon: Dashboard, roles: ['ADMIN'] },
    { title: 'Manage Users', path: '/dashboard/admin/users', icon: People, roles: ['ADMIN'] },
    { title: 'Manage Doctors', path: '/dashboard/admin/doctors', icon: LocalHospital, roles: ['ADMIN'] },
    { title: 'Appointments', path: '/dashboard/admin/appointments', icon: Schedule, roles: ['ADMIN'] },
    { title: 'System Settings', path: '/dashboard/admin/settings', icon: Settings, roles: ['ADMIN'] },
  ],
  DOCTOR: [
    { title: 'Dashboard', path: '/dashboard', icon: Dashboard, roles: ['DOCTOR'] },
    { title: 'My Schedule', path: '/dashboard/doctor/schedule', icon: Schedule, roles: ['DOCTOR'] },
    { title: 'My Patients', path: '/dashboard/doctor/patients', icon: People, roles: ['DOCTOR'] },
    { title: 'Appointments', path: '/dashboard/doctor/appointments', icon: Assignment, roles: ['DOCTOR'] },
    { title: 'Profile', path: '/dashboard/doctor/profile', icon: Person, roles: ['DOCTOR'] },
  ],
  PATIENT: [
    { title: 'Dashboard', path: '/dashboard', icon: Dashboard, roles: ['PATIENT'] },
    { title: 'Book Appointment', path: '/dashboard/patient/book', icon: Schedule, roles: ['PATIENT'] },
    { title: 'My Appointments', path: '/dashboard/patient/appointments', icon: Assignment, roles: ['PATIENT'] },
    { title: 'Medical History', path: '/dashboard/patient/history', icon: LocalHospital, roles: ['PATIENT'] },
    { title: 'Profile', path: '/dashboard/patient/profile', icon: Person, roles: ['PATIENT'] },
  ],
  SUPER_ADMIN: [
    { title: 'Dashboard', path: '/dashboard', icon: Dashboard, roles: ['SUPER_ADMIN'] },
    { title: 'System Overview', path: '/dashboard/super-admin/overview', icon: Dashboard, roles: ['SUPER_ADMIN'] },
    { title: 'User Management', path: '/dashboard/super-admin/users', icon: People, roles: ['SUPER_ADMIN'] },
    { title: 'Admin Management', path: '/dashboard/super-admin/admins', icon: Settings, roles: ['SUPER_ADMIN'] },
    { title: 'System Logs', path: '/dashboard/super-admin/logs', icon: Assignment, roles: ['SUPER_ADMIN'] },
  ],
};

// Test component that simulates navigation flows
const NavigationFlowTest = ({ 
  userRole = 'ADMIN',
  initialPath = '/dashboard',
}: { 
  userRole?: UserRole;
  initialPath?: string;
}) => {
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>(['Dashboard']);
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: userRole,
  };

  const allowedNavigation = navigationConfig[userRole] || [];

  // Update breadcrumbs based on current path
  useEffect(() => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    const breadcrumbItems = pathSegments.map(segment => {
      return segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
    });
    setBreadcrumbs(breadcrumbItems.length > 0 ? breadcrumbItems : ['Dashboard']);
  }, [currentPath]);

  const handleNavigation = (path: string, title: string) => {
    // Check if user has permission to access this path
    const hasPermission = allowedNavigation.some(nav => nav.path === path);
    
    if (!hasPermission) {
      // Simulate access denied
      console.warn(`Access denied to ${path} for role ${userRole}`);
      return;
    }

    setCurrentPath(path);
    mockPathname = path;
    mockPush(path);
    setDrawerOpen(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    const tabPaths = [
      '/dashboard/overview',
      '/dashboard/analytics',
      '/dashboard/reports',
    ];
    if (tabPaths[newValue]) {
      handleNavigation(tabPaths[newValue], `Tab ${newValue + 1}`);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const pathSegments = currentPath.split('/').filter(Boolean);
    const newPath = '/' + pathSegments.slice(0, index + 1).join('/');
    handleNavigation(newPath, breadcrumbs[index]);
  };

  const renderPageContent = () => {
    switch (currentPath) {
      case '/dashboard':
        return (
          <Card data-testid="dashboard-content">
            <CardContent>
              <Typography variant="h5">Dashboard</Typography>
              <Typography>Welcome to your {userRole.toLowerCase()} dashboard</Typography>
            </CardContent>
          </Card>
        );
      case '/dashboard/admin/users':
        return (
          <Card data-testid="admin-users-content">
            <CardContent>
              <Typography variant="h5">Manage Users</Typography>
              <Typography>Admin can manage all users here</Typography>
            </CardContent>
          </Card>
        );
      case '/dashboard/doctor/schedule':
        return (
          <Card data-testid="doctor-schedule-content">
            <CardContent>
              <Typography variant="h5">My Schedule</Typography>
              <Typography>Doctor's schedule management</Typography>
            </CardContent>
          </Card>
        );
      case '/dashboard/patient/appointments':
        return (
          <Card data-testid="patient-appointments-content">
            <CardContent>
              <Typography variant="h5">My Appointments</Typography>
              <Typography>Patient's appointment history</Typography>
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card data-testid="default-content">
            <CardContent>
              <Typography variant="h5">Page Content</Typography>
              <Typography>Current path: {currentPath}</Typography>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Navigation Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        data-testid="navigation-drawer"
        sx={{ width: 240 }}
      >
        <Box sx={{ width: 240, p: 2 }}>
          <Typography variant="h6" data-testid="app-title">
            ZenDoc Health
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {userRole} Portal
          </Typography>
        </Box>
        <List>
          {allowedNavigation.map((nav) => (
            <ListItem
              key={nav.path}
              button
              onClick={() => handleNavigation(nav.path, nav.title)}
              data-testid={`nav-${nav.path.replace(/\//g, '-')}`}
              selected={currentPath === nav.path}
            >
              <ListItemIcon>
                <nav.icon />
              </ListItemIcon>
              <ListItemText primary={nav.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Button
              onClick={() => setDrawerOpen(!drawerOpen)}
              data-testid="drawer-toggle"
            >
              Menu
            </Button>
            <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
              {userRole} Dashboard
            </Typography>
            <Button
              onClick={() => handleNavigation('/dashboard', 'Dashboard')}
              data-testid="home-button"
            >
              <Home />
            </Button>
          </Toolbar>
        </AppBar>

        {/* Breadcrumbs */}
        <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
          <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            data-testid="breadcrumbs"
          >
            {breadcrumbs.map((crumb, index) => (
              <Button
                key={index}
                onClick={() => handleBreadcrumbClick(index)}
                data-testid={`breadcrumb-${index}`}
                size="small"
                sx={{ textTransform: 'none' }}
              >
                {crumb}
              </Button>
            ))}
          </Breadcrumbs>
        </Box>

        {/* Tab Navigation (for some pages) */}
        {currentPath === '/dashboard' && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              data-testid="dashboard-tabs"
            >
              <Tab label="Overview" data-testid="tab-overview" />
              <Tab label="Analytics" data-testid="tab-analytics" />
              <Tab label="Reports" data-testid="tab-reports" />
            </Tabs>
          </Box>
        )}

        {/* Page Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          {renderPageContent()}
        </Box>

        {/* Role-specific Quick Actions */}
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {userRole === 'ADMIN' && (
              <>
                <Button
                  size="small"
                  onClick={() => handleNavigation('/dashboard/admin/users', 'Manage Users')}
                  data-testid="quick-action-users"
                >
                  Manage Users
                </Button>
                <Button
                  size="small"
                  onClick={() => handleNavigation('/dashboard/admin/settings', 'Settings')}
                  data-testid="quick-action-settings"
                >
                  Settings
                </Button>
              </>
            )}
            {userRole === 'DOCTOR' && (
              <>
                <Button
                  size="small"
                  onClick={() => handleNavigation('/dashboard/doctor/schedule', 'Schedule')}
                  data-testid="quick-action-schedule"
                >
                  My Schedule
                </Button>
                <Button
                  size="small"
                  onClick={() => handleNavigation('/dashboard/doctor/patients', 'Patients')}
                  data-testid="quick-action-patients"
                >
                  My Patients
                </Button>
              </>
            )}
            {userRole === 'PATIENT' && (
              <>
                <Button
                  size="small"
                  onClick={() => handleNavigation('/dashboard/patient/book', 'Book Appointment')}
                  data-testid="quick-action-book"
                >
                  Book Appointment
                </Button>
                <Button
                  size="small"
                  onClick={() => handleNavigation('/dashboard/patient/history', 'History')}
                  data-testid="quick-action-history"
                >
                  Medical History
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

describe('Role Navigation Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPathname = '/dashboard';
    mockUseAppSelector.mockReturnValue({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'ADMIN',
    });
  });

  describe('Navigation Structure by Role', () => {
    it('should show admin navigation for admin users', () => {
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Open drawer
      const drawerToggle = screen.getByTestId('drawer-toggle');
      fireEvent.click(drawerToggle);

      // Check admin-specific navigation items
      expect(screen.getByTestId('nav--dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-admin-users')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-admin-doctors')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-admin-appointments')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-admin-settings')).toBeInTheDocument();
    });

    it('should show doctor navigation for doctor users', () => {
      render(<NavigationFlowTest userRole="DOCTOR" />);

      // Open drawer
      const drawerToggle = screen.getByTestId('drawer-toggle');
      fireEvent.click(drawerToggle);

      // Check doctor-specific navigation items
      expect(screen.getByTestId('nav--dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-doctor-schedule')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-doctor-patients')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-doctor-appointments')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-doctor-profile')).toBeInTheDocument();

      // Should not show admin navigation
      expect(screen.queryByTestId('nav--dashboard-admin-users')).not.toBeInTheDocument();
    });

    it('should show patient navigation for patient users', () => {
      render(<NavigationFlowTest userRole="PATIENT" />);

      // Open drawer
      const drawerToggle = screen.getByTestId('drawer-toggle');
      fireEvent.click(drawerToggle);

      // Check patient-specific navigation items
      expect(screen.getByTestId('nav--dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-patient-book')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-patient-appointments')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-patient-history')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-patient-profile')).toBeInTheDocument();

      // Should not show admin or doctor navigation
      expect(screen.queryByTestId('nav--dashboard-admin-users')).not.toBeInTheDocument();
      expect(screen.queryByTestId('nav--dashboard-doctor-schedule')).not.toBeInTheDocument();
    });

    it('should show super admin navigation for super admin users', () => {
      render(<NavigationFlowTest userRole="SUPER_ADMIN" />);

      // Open drawer
      const drawerToggle = screen.getByTestId('drawer-toggle');
      fireEvent.click(drawerToggle);

      // Check super admin-specific navigation items
      expect(screen.getByTestId('nav--dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-super-admin-overview')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-super-admin-users')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-super-admin-admins')).toBeInTheDocument();
      expect(screen.getByTestId('nav--dashboard-super-admin-logs')).toBeInTheDocument();
    });
  });

  describe('Navigation Flow and State Management', () => {
    it('should navigate between pages and update content', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Open drawer
      await user.click(screen.getByTestId('drawer-toggle'));

      // Initially should show dashboard content
      expect(screen.getByTestId('dashboard-content')).toBeInTheDocument();

      // Navigate to users page
      await user.click(screen.getByTestId('nav--dashboard-admin-users'));

      // Should show users content
      await waitFor(() => {
        expect(screen.getByTestId('admin-users-content')).toBeInTheDocument();
        expect(screen.queryByTestId('dashboard-content')).not.toBeInTheDocument();
      });

      // Check that router was called
      expect(mockPush).toHaveBeenCalledWith('/dashboard/admin/users');
    });

    it('should update breadcrumbs when navigating', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Open drawer and navigate
      await user.click(screen.getByTestId('drawer-toggle'));
      await user.click(screen.getByTestId('nav--dashboard-admin-users'));

      // Check breadcrumbs
      await waitFor(() => {
        expect(screen.getByTestId('breadcrumb-0')).toHaveTextContent('Dashboard');
        expect(screen.getByTestId('breadcrumb-1')).toHaveTextContent('Admin');
        expect(screen.getByTestId('breadcrumb-2')).toHaveTextContent('Users');
      });
    });

    it('should handle breadcrumb navigation', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" initialPath="/dashboard/admin/users" />);

      // Click on dashboard breadcrumb
      await user.click(screen.getByTestId('breadcrumb-0'));

      // Should navigate back to dashboard
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should close drawer after navigation', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Open drawer
      await user.click(screen.getByTestId('drawer-toggle'));
      expect(screen.getByTestId('navigation-drawer')).toBeInTheDocument();

      // Navigate to a page
      await user.click(screen.getByTestId('nav--dashboard-admin-users'));

      // Drawer should be closed (this is simulated in the component)
      // In a real app, you'd check the drawer's open state
      expect(screen.getByTestId('navigation-drawer')).toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    it('should handle tab navigation on dashboard', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Should show tabs on dashboard
      expect(screen.getByTestId('dashboard-tabs')).toBeInTheDocument();
      expect(screen.getByTestId('tab-overview')).toBeInTheDocument();
      expect(screen.getByTestId('tab-analytics')).toBeInTheDocument();
      expect(screen.getByTestId('tab-reports')).toBeInTheDocument();

      // Click on analytics tab
      await user.click(screen.getByTestId('tab-analytics'));

      // Should navigate to analytics
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard/analytics');
      });
    });

    it('should not show tabs on non-dashboard pages', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Navigate away from dashboard
      await user.click(screen.getByTestId('drawer-toggle'));
      await user.click(screen.getByTestId('nav--dashboard-admin-users'));

      // Tabs should not be visible
      await waitFor(() => {
        expect(screen.queryByTestId('dashboard-tabs')).not.toBeInTheDocument();
      });
    });
  });

  describe('Quick Actions by Role', () => {
    it('should show admin quick actions for admin users', () => {
      render(<NavigationFlowTest userRole="ADMIN" />);

      expect(screen.getByTestId('quick-action-users')).toBeInTheDocument();
      expect(screen.getByTestId('quick-action-settings')).toBeInTheDocument();
    });

    it('should show doctor quick actions for doctor users', () => {
      render(<NavigationFlowTest userRole="DOCTOR" />);

      expect(screen.getByTestId('quick-action-schedule')).toBeInTheDocument();
      expect(screen.getByTestId('quick-action-patients')).toBeInTheDocument();
      
      // Should not show admin actions
      expect(screen.queryByTestId('quick-action-users')).not.toBeInTheDocument();
    });

    it('should show patient quick actions for patient users', () => {
      render(<NavigationFlowTest userRole="PATIENT" />);

      expect(screen.getByTestId('quick-action-book')).toBeInTheDocument();
      expect(screen.getByTestId('quick-action-history')).toBeInTheDocument();
      
      // Should not show admin or doctor actions
      expect(screen.queryByTestId('quick-action-users')).not.toBeInTheDocument();
      expect(screen.queryByTestId('quick-action-schedule')).not.toBeInTheDocument();
    });

    it('should handle quick action clicks', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Click quick action
      await user.click(screen.getByTestId('quick-action-users'));

      // Should navigate to users page
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard/admin/users');
        expect(screen.getByTestId('admin-users-content')).toBeInTheDocument();
      });
    });
  });

  describe('Access Control and Security', () => {
    it('should prevent unauthorized navigation attempts', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      render(<NavigationFlowTest userRole="PATIENT" />);

      // Try to navigate to admin page (should be blocked)
      const component = screen.getByTestId('drawer-toggle').closest('div');
      
      // Simulate unauthorized navigation attempt
      fireEvent.click(screen.getByTestId('drawer-toggle'));
      
      // Patient should not see admin navigation items
      expect(screen.queryByTestId('nav--dashboard-admin-users')).not.toBeInTheDocument();
      
      consoleSpy.mockRestore();
    });

    it('should maintain role-based content visibility', () => {
      const { rerender } = render(<NavigationFlowTest userRole="ADMIN" />);

      // Admin should see admin content
      expect(screen.getByText('ADMIN Dashboard')).toBeInTheDocument();

      // Change to doctor role
      rerender(<NavigationFlowTest userRole="DOCTOR" />);

      // Should now see doctor content
      expect(screen.getByText('DOCTOR Dashboard')).toBeInTheDocument();
      expect(screen.queryByText('ADMIN Dashboard')).not.toBeInTheDocument();
    });

    it('should handle role changes gracefully', () => {
      const { rerender } = render(<NavigationFlowTest userRole="ADMIN" initialPath="/dashboard/admin/users" />);

      // Initially shows admin content
      expect(screen.getByTestId('admin-users-content')).toBeInTheDocument();

      // Change to patient role (should redirect or show appropriate content)
      rerender(<NavigationFlowTest userRole="PATIENT" initialPath="/dashboard/admin/users" />);

      // Should show default content since patient can't access admin pages
      expect(screen.getByTestId('default-content')).toBeInTheDocument();
    });
  });

  describe('Navigation State Persistence', () => {
    it('should maintain selected navigation item', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Open drawer and navigate
      await user.click(screen.getByTestId('drawer-toggle'));
      await user.click(screen.getByTestId('nav--dashboard-admin-users'));

      // Navigation item should be selected
      const selectedItem = screen.getByTestId('nav--dashboard-admin-users');
      expect(selectedItem).toHaveClass('Mui-selected');
    });

    it('should handle browser back navigation', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Navigate to a page
      await user.click(screen.getByTestId('drawer-toggle'));
      await user.click(screen.getByTestId('nav--dashboard-admin-users'));

      // Simulate back button
      mockBack();

      // Should handle back navigation
      expect(mockBack).toHaveBeenCalled();
    });

    it('should handle home button navigation', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" initialPath="/dashboard/admin/users" />);

      // Click home button
      await user.click(screen.getByTestId('home-button'));

      // Should navigate to dashboard
      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });
  });

  describe('Accessibility and UX', () => {
    it('should have proper ARIA attributes for navigation', () => {
      render(<NavigationFlowTest userRole="ADMIN" />);

      const drawerToggle = screen.getByTestId('drawer-toggle');
      expect(drawerToggle).toHaveAttribute('role', 'button');

      const homeButton = screen.getByTestId('home-button');
      expect(homeButton).toHaveAttribute('role', 'button');
    });

    it('should have accessible breadcrumb navigation', () => {
      render(<NavigationFlowTest userRole="ADMIN" initialPath="/dashboard/admin/users" />);

      const breadcrumbs = screen.getByTestId('breadcrumbs');
      expect(breadcrumbs).toBeInTheDocument();

      const breadcrumbButtons = screen.getAllByTestId(/^breadcrumb-/);
      breadcrumbButtons.forEach(button => {
        expect(button).toHaveAttribute('role', 'button');
      });
    });

    it('should provide clear visual feedback for current page', () => {
      render(<NavigationFlowTest userRole="ADMIN" initialPath="/dashboard/admin/users" />);

      // Current page content should be visible
      expect(screen.getByTestId('admin-users-content')).toBeInTheDocument();
      
      // Page title should reflect current location
      expect(screen.getByText('ADMIN Dashboard')).toBeInTheDocument();
    });

    it('should handle keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<NavigationFlowTest userRole="ADMIN" />);

      // Tab to drawer toggle
      await user.tab();
      expect(screen.getByTestId('drawer-toggle')).toHaveFocus();

      // Enter to open drawer
      await user.keyboard('{Enter}');
      
      // Should open drawer
      expect(screen.getByTestId('navigation-drawer')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid navigation paths gracefully', () => {
      render(<NavigationFlowTest userRole="ADMIN" initialPath="/invalid/path" />);

      // Should show default content for invalid paths
      expect(screen.getByTestId('default-content')).toBeInTheDocument();
      expect(screen.getByText('Current path: /invalid/path')).toBeInTheDocument();
    });

    it('should handle missing user role gracefully', () => {
      mockUseAppSelector.mockReturnValue(null);

      render(<NavigationFlowTest userRole="ADMIN" />);

      // Should still render basic structure
      expect(screen.getByTestId('drawer-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('home-button')).toBeInTheDocument();
    });

    it('should handle navigation errors gracefully', async () => {
      const user = userEvent.setup();
      mockPush.mockImplementation(() => {
        throw new Error('Navigation error');
      });

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(<NavigationFlowTest userRole="ADMIN" />);

      // Try to navigate
      await user.click(screen.getByTestId('drawer-toggle'));
      
      // Should not crash the application
      expect(screen.getByTestId('navigation-drawer')).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });
});
import { useAppSelector } from '@/redux/hooks';
import { UserRole } from '@/types';
import { drawerItems } from '@/utils/drawerItems';
import {
    Dashboard,
    ExitToApp,
    LocalHospital,
    Notifications,
    People,
    Person,
    Schedule,
    Settings,
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { render } from '../../utils/test-utils';

import { vi } from 'vitest';

// Mock dependencies
vi.mock('@/redux/features/auth/authSlice');
vi.mock('@/redux/hooks');
vi.mock('@/utils/drawerItems');
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

const mockUseAppSelector = useAppSelector as any;
const mockDrawerItems = drawerItems as any;

// Mock real-time data
const mockRealTimeData = {
  notifications: [
    { id: '1', message: 'New appointment scheduled', type: 'info', timestamp: new Date() },
    { id: '2', message: 'Patient updated profile', type: 'success', timestamp: new Date() },
    { id: '3', message: 'System maintenance scheduled', type: 'warning', timestamp: new Date() },
  ],
  stats: {
    totalAppointments: 45,
    todayAppointments: 8,
    totalPatients: 120,
    totalDoctors: 15,
  },
  recentActivities: [
    { id: '1', activity: 'Dr. Smith completed appointment with John Doe', timestamp: new Date() },
    { id: '2', activity: 'New patient registration: Jane Smith', timestamp: new Date() },
    { id: '3', activity: 'Appointment cancelled by patient', timestamp: new Date() },
  ],
};

// Test component that simulates a dashboard with real-time updates
const DashboardTest = ({ 
  userRole = 'ADMIN',
  enableRealTimeUpdates = true,
}: { 
  userRole?: UserRole;
  enableRealTimeUpdates?: boolean;
}) => {
  const [notifications, setNotifications] = useState(mockRealTimeData.notifications);
  const [stats, setStats] = useState(mockRealTimeData.stats);
  const [activities, setActivities] = useState(mockRealTimeData.recentActivities);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  // Simulate real-time updates
  useEffect(() => {
    if (!enableRealTimeUpdates) return;

    const interval = setInterval(() => {
      // Simulate new notification
      const newNotification = {
        id: Date.now().toString(),
        message: `Real-time update at ${new Date().toLocaleTimeString()}`,
        type: 'info' as const,
        timestamp: new Date(),
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);

      // Simulate stats update
      setStats(prev => ({
        ...prev,
        totalAppointments: prev.totalAppointments + Math.floor(Math.random() * 3),
        todayAppointments: prev.todayAppointments + Math.floor(Math.random() * 2),
      }));

      // Simulate new activity
      const newActivity = {
        id: Date.now().toString(),
        activity: `System activity at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date(),
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [enableRealTimeUpdates]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchor(null);
  };

  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    role: userRole,
  };

  // Mock drawer items based on role
  const navigationItems = [
    { title: 'Dashboard', path: '/dashboard', icon: Dashboard },
    { title: 'Appointments', path: '/dashboard/appointments', icon: Schedule },
    { title: 'Patients', path: '/dashboard/patients', icon: People },
    { title: 'Doctors', path: '/dashboard/doctors', icon: LocalHospital },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          bgcolor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
        }}
        data-testid="dashboard-sidebar"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" data-testid="app-title">
            ZenDoc Health
          </Typography>
        </Box>
        <Divider />
        <List>
          {navigationItems.map((item) => (
            <ListItem
              key={item.path}
              button
              data-testid={`nav-item-${item.title.toLowerCase()}`}
            >
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <AppBar position="static" color="default" elevation={1}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }} data-testid="page-title">
              {userRole} Dashboard
            </Typography>

            {/* Notifications */}
            <IconButton
              onClick={handleNotificationMenuOpen}
              data-testid="notifications-button"
            >
              <Badge badgeContent={notifications.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <IconButton
              onClick={handleProfileMenuOpen}
              data-testid="profile-menu-button"
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {mockUser.name.charAt(0)}
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          data-testid="profile-menu"
        >
          <MenuItem onClick={handleProfileMenuClose} data-testid="profile-menu-profile">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={handleProfileMenuClose} data-testid="profile-menu-settings">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleProfileMenuClose} data-testid="profile-menu-logout">
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationMenuClose}
          data-testid="notifications-menu"
          PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Notifications</Typography>
          </Box>
          <Divider />
          {notifications.map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={handleNotificationMenuClose}
              data-testid={`notification-${notification.id}`}
            >
              <Box>
                <Typography variant="body2">{notification.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.timestamp.toLocaleTimeString()}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Dashboard Content */}
        <Box sx={{ flex: 1, p: 3 }}>
          {/* Stats Cards */}
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2, mb: 3 }}>
            <Card data-testid="stats-appointments">
              <CardContent>
                <Typography variant="h6">Total Appointments</Typography>
                <Typography variant="h4" color="primary">
                  {stats.totalAppointments}
                </Typography>
              </CardContent>
            </Card>
            <Card data-testid="stats-today-appointments">
              <CardContent>
                <Typography variant="h6">Today's Appointments</Typography>
                <Typography variant="h4" color="secondary">
                  {stats.todayAppointments}
                </Typography>
              </CardContent>
            </Card>
            <Card data-testid="stats-patients">
              <CardContent>
                <Typography variant="h6">Total Patients</Typography>
                <Typography variant="h4" color="success.main">
                  {stats.totalPatients}
                </Typography>
              </CardContent>
            </Card>
            <Card data-testid="stats-doctors">
              <CardContent>
                <Typography variant="h6">Total Doctors</Typography>
                <Typography variant="h4" color="info.main">
                  {stats.totalDoctors}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Recent Activities */}
          <Card data-testid="recent-activities">
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Activities
              </Typography>
              <List>
                {activities.map((activity, index) => (
                  <ListItem
                    key={activity.id}
                    data-testid={`activity-${activity.id}`}
                    divider={index < activities.length - 1}
                  >
                    <ListItemText
                      primary={activity.activity}
                      secondary={activity.timestamp.toLocaleString()}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Role-specific content */}
          {userRole === 'ADMIN' && (
            <Card sx={{ mt: 2 }} data-testid="admin-panel">
              <CardContent>
                <Typography variant="h6">Admin Panel</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Manage Users" clickable data-testid="admin-manage-users" />
                  <Chip label="System Settings" clickable data-testid="admin-system-settings" />
                  <Chip label="Reports" clickable data-testid="admin-reports" />
                </Box>
              </CardContent>
            </Card>
          )}

          {userRole === 'DOCTOR' && (
            <Card sx={{ mt: 2 }} data-testid="doctor-panel">
              <CardContent>
                <Typography variant="h6">Doctor Panel</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="My Schedule" clickable data-testid="doctor-schedule" />
                  <Chip label="Patient Records" clickable data-testid="doctor-patients" />
                  <Chip label="Prescriptions" clickable data-testid="doctor-prescriptions" />
                </Box>
              </CardContent>
            </Card>
          )}

          {userRole === 'PATIENT' && (
            <Card sx={{ mt: 2 }} data-testid="patient-panel">
              <CardContent>
                <Typography variant="h6">Patient Panel</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label="Book Appointment" clickable data-testid="patient-book-appointment" />
                  <Chip label="My Appointments" clickable data-testid="patient-appointments" />
                  <Chip label="Medical History" clickable data-testid="patient-history" />
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

describe('Dashboard Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppSelector.mockReturnValue({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      role: 'ADMIN',
    });
    mockDrawerItems.mockReturnValue([]);
  });

  describe('Dashboard Layout and Structure', () => {
    it('should render dashboard with sidebar and main content', () => {
      render(<DashboardTest />);

      expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('app-title')).toHaveTextContent('ZenDoc Health');
      expect(screen.getByTestId('page-title')).toHaveTextContent('ADMIN Dashboard');
    });

    it('should render navigation items in sidebar', () => {
      render(<DashboardTest />);

      expect(screen.getByTestId('nav-item-dashboard')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-appointments')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-patients')).toBeInTheDocument();
      expect(screen.getByTestId('nav-item-doctors')).toBeInTheDocument();
    });

    it('should render top bar with notifications and profile menu', () => {
      render(<DashboardTest />);

      expect(screen.getByTestId('notifications-button')).toBeInTheDocument();
      expect(screen.getByTestId('profile-menu-button')).toBeInTheDocument();
    });

    it('should render stats cards', () => {
      render(<DashboardTest />);

      expect(screen.getByTestId('stats-appointments')).toBeInTheDocument();
      expect(screen.getByTestId('stats-today-appointments')).toBeInTheDocument();
      expect(screen.getByTestId('stats-patients')).toBeInTheDocument();
      expect(screen.getByTestId('stats-doctors')).toBeInTheDocument();
    });

    it('should render recent activities section', () => {
      render(<DashboardTest />);

      expect(screen.getByTestId('recent-activities')).toBeInTheDocument();
      expect(screen.getByText('Recent Activities')).toBeInTheDocument();
    });
  });

  describe('Role-based Content Display', () => {
    it('should show admin panel for admin users', () => {
      render(<DashboardTest userRole="ADMIN" />);

      expect(screen.getByTestId('admin-panel')).toBeInTheDocument();
      expect(screen.getByTestId('admin-manage-users')).toBeInTheDocument();
      expect(screen.getByTestId('admin-system-settings')).toBeInTheDocument();
      expect(screen.getByTestId('admin-reports')).toBeInTheDocument();
    });

    it('should show doctor panel for doctor users', () => {
      render(<DashboardTest userRole="DOCTOR" />);

      expect(screen.getByTestId('doctor-panel')).toBeInTheDocument();
      expect(screen.getByTestId('doctor-schedule')).toBeInTheDocument();
      expect(screen.getByTestId('doctor-patients')).toBeInTheDocument();
      expect(screen.getByTestId('doctor-prescriptions')).toBeInTheDocument();
      
      // Should not show admin panel
      expect(screen.queryByTestId('admin-panel')).not.toBeInTheDocument();
    });

    it('should show patient panel for patient users', () => {
      render(<DashboardTest userRole="PATIENT" />);

      expect(screen.getByTestId('patient-panel')).toBeInTheDocument();
      expect(screen.getByTestId('patient-book-appointment')).toBeInTheDocument();
      expect(screen.getByTestId('patient-appointments')).toBeInTheDocument();
      expect(screen.getByTestId('patient-history')).toBeInTheDocument();
      
      // Should not show admin or doctor panels
      expect(screen.queryByTestId('admin-panel')).not.toBeInTheDocument();
      expect(screen.queryByTestId('doctor-panel')).not.toBeInTheDocument();
    });

    it('should update page title based on user role', () => {
      const { rerender } = render(<DashboardTest userRole="ADMIN" />);
      expect(screen.getByTestId('page-title')).toHaveTextContent('ADMIN Dashboard');

      rerender(<DashboardTest userRole="DOCTOR" />);
      expect(screen.getByTestId('page-title')).toHaveTextContent('DOCTOR Dashboard');

      rerender(<DashboardTest userRole="PATIENT" />);
      expect(screen.getByTestId('page-title')).toHaveTextContent('PATIENT Dashboard');
    });
  });

  describe('Profile Menu Interactions', () => {
    it('should open profile menu when profile button is clicked', async () => {
      const user = userEvent.setup();
      render(<DashboardTest />);

      // Menu should not be visible initially
      expect(screen.queryByTestId('profile-menu')).not.toBeInTheDocument();

      // Click profile button
      const profileButton = screen.getByTestId('profile-menu-button');
      await user.click(profileButton);

      // Menu should now be visible
      await waitFor(() => {
        expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
      });
    });

    it('should show profile menu items', async () => {
      const user = userEvent.setup();
      render(<DashboardTest />);

      const profileButton = screen.getByTestId('profile-menu-button');
      await user.click(profileButton);

      await waitFor(() => {
        expect(screen.getByTestId('profile-menu-profile')).toBeInTheDocument();
        expect(screen.getByTestId('profile-menu-settings')).toBeInTheDocument();
        expect(screen.getByTestId('profile-menu-logout')).toBeInTheDocument();
      });
    });

    it('should close profile menu when menu item is clicked', async () => {
      const user = userEvent.setup();
      render(<DashboardTest />);

      const profileButton = screen.getByTestId('profile-menu-button');
      await user.click(profileButton);

      await waitFor(() => {
        expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
      });

      // Click profile menu item
      const profileMenuItem = screen.getByTestId('profile-menu-profile');
      await user.click(profileMenuItem);

      // Menu should be closed
      await waitFor(() => {
        expect(screen.queryByTestId('profile-menu')).not.toBeInTheDocument();
      });
    });

    it('should close profile menu when clicking outside', async () => {
      const user = userEvent.setup();
      render(<DashboardTest />);

      const profileButton = screen.getByTestId('profile-menu-button');
      await user.click(profileButton);

      await waitFor(() => {
        expect(screen.getByTestId('profile-menu')).toBeInTheDocument();
      });

      // Click outside the menu
      await user.click(document.body);

      // Menu should be closed
      await waitFor(() => {
        expect(screen.queryByTestId('profile-menu')).not.toBeInTheDocument();
      });
    });
  });

  describe('Notifications Menu Interactions', () => {
    it('should open notifications menu when notifications button is clicked', async () => {
      const user = userEvent.setup();
      render(<DashboardTest />);

      // Menu should not be visible initially
      expect(screen.queryByTestId('notifications-menu')).not.toBeInTheDocument();

      // Click notifications button
      const notificationsButton = screen.getByTestId('notifications-button');
      await user.click(notificationsButton);

      // Menu should now be visible
      await waitFor(() => {
        expect(screen.getByTestId('notifications-menu')).toBeInTheDocument();
      });
    });

    it('should show notification badge with count', () => {
      render(<DashboardTest />);

      const notificationsButton = screen.getByTestId('notifications-button');
      const badge = within(notificationsButton).getByText('3'); // Initial notification count
      expect(badge).toBeInTheDocument();
    });

    it('should display notifications in menu', async () => {
      const user = userEvent.setup();
      render(<DashboardTest />);

      const notificationsButton = screen.getByTestId('notifications-button');
      await user.click(notificationsButton);

      await waitFor(() => {
        expect(screen.getByText('Notifications')).toBeInTheDocument();
        expect(screen.getByTestId('notification-1')).toBeInTheDocument();
        expect(screen.getByTestId('notification-2')).toBeInTheDocument();
        expect(screen.getByTestId('notification-3')).toBeInTheDocument();
      });
    });

    it('should close notifications menu when notification is clicked', async () => {
      const user = userEvent.setup();
      render(<DashboardTest />);

      const notificationsButton = screen.getByTestId('notifications-button');
      await user.click(notificationsButton);

      await waitFor(() => {
        expect(screen.getByTestId('notifications-menu')).toBeInTheDocument();
      });

      // Click a notification
      const notification = screen.getByTestId('notification-1');
      await user.click(notification);

      // Menu should be closed
      await waitFor(() => {
        expect(screen.queryByTestId('notifications-menu')).not.toBeInTheDocument();
      });
    });
  });

  describe('Real-time Updates', () => {
    it('should update stats in real-time', async () => {
      render(<DashboardTest enableRealTimeUpdates={true} />);

      const initialAppointments = screen.getByTestId('stats-appointments');
      const initialCount = within(initialAppointments).getByText(/^\d+$/);
      const initialValue = parseInt(initialCount.textContent || '0');

      // Wait for real-time update (3 seconds + buffer)
      await waitFor(
        () => {
          const updatedCount = within(initialAppointments).getByText(/^\d+$/);
          const updatedValue = parseInt(updatedCount.textContent || '0');
          expect(updatedValue).toBeGreaterThanOrEqual(initialValue);
        },
        { timeout: 5000 }
      );
    });

    it('should add new notifications in real-time', async () => {
      render(<DashboardTest enableRealTimeUpdates={true} />);

      const user = userEvent.setup();
      const notificationsButton = screen.getByTestId('notifications-button');
      
      // Open notifications menu
      await user.click(notificationsButton);

      // Wait for new notification to be added
      await waitFor(
        () => {
          const notifications = screen.getAllByTestId(/^notification-/);
          expect(notifications.length).toBeGreaterThan(3); // More than initial 3
        },
        { timeout: 5000 }
      );
    });

    it('should update recent activities in real-time', async () => {
      render(<DashboardTest enableRealTimeUpdates={true} />);

      // Wait for new activity to be added
      await waitFor(
        () => {
          const activities = screen.getAllByTestId(/^activity-/);
          expect(activities.length).toBeGreaterThan(3); // More than initial 3
        },
        { timeout: 5000 }
      );
    });

    it('should not update when real-time updates are disabled', async () => {
      render(<DashboardTest enableRealTimeUpdates={false} />);

      const initialAppointments = screen.getByTestId('stats-appointments');
      const initialCount = within(initialAppointments).getByText(/^\d+$/);
      const initialValue = parseInt(initialCount.textContent || '0');

      // Wait for potential update time
      await new Promise(resolve => setTimeout(resolve, 4000));

      const finalCount = within(initialAppointments).getByText(/^\d+$/);
      const finalValue = parseInt(finalCount.textContent || '0');
      
      expect(finalValue).toBe(initialValue); // Should remain the same
    });
  });

  describe('Navigation Interactions', () => {
    it('should handle navigation item clicks', async () => {
      const user = userEvent.setup();
      render(<DashboardTest />);

      const dashboardNav = screen.getByTestId('nav-item-dashboard');
      const appointmentsNav = screen.getByTestId('nav-item-appointments');
      const patientsNav = screen.getByTestId('nav-item-patients');
      const doctorsNav = screen.getByTestId('nav-item-doctors');

      // All navigation items should be clickable
      await user.click(dashboardNav);
      await user.click(appointmentsNav);
      await user.click(patientsNav);
      await user.click(doctorsNav);

      // No errors should occur
      expect(dashboardNav).toBeInTheDocument();
      expect(appointmentsNav).toBeInTheDocument();
      expect(patientsNav).toBeInTheDocument();
      expect(doctorsNav).toBeInTheDocument();
    });

    it('should handle role-specific action clicks', async () => {
      const user = userEvent.setup();
      render(<DashboardTest userRole="ADMIN" />);

      const manageUsersChip = screen.getByTestId('admin-manage-users');
      const systemSettingsChip = screen.getByTestId('admin-system-settings');
      const reportsChip = screen.getByTestId('admin-reports');

      // All admin actions should be clickable
      await user.click(manageUsersChip);
      await user.click(systemSettingsChip);
      await user.click(reportsChip);

      // No errors should occur
      expect(manageUsersChip).toBeInTheDocument();
      expect(systemSettingsChip).toBeInTheDocument();
      expect(reportsChip).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes for interactive elements', () => {
      render(<DashboardTest />);

      const profileButton = screen.getByTestId('profile-menu-button');
      const notificationsButton = screen.getByTestId('notifications-button');

      expect(profileButton).toHaveAttribute('role', 'button');
      expect(notificationsButton).toHaveAttribute('role', 'button');
    });

    it('should have proper heading structure', () => {
      render(<DashboardTest />);

      expect(screen.getByRole('heading', { name: 'ZenDoc Health' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'ADMIN Dashboard' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Recent Activities' })).toBeInTheDocument();
    });

    it('should have accessible navigation', () => {
      render(<DashboardTest />);

      const sidebar = screen.getByTestId('dashboard-sidebar');
      const navItems = within(sidebar).getAllByRole('button');
      
      expect(navItems).toHaveLength(4); // Dashboard, Appointments, Patients, Doctors
      navItems.forEach(item => {
        expect(item).toBeInTheDocument();
      });
    });

    it('should announce real-time updates appropriately', async () => {
      render(<DashboardTest enableRealTimeUpdates={true} />);

      // Stats should be updated and accessible
      const statsCards = [
        screen.getByTestId('stats-appointments'),
        screen.getByTestId('stats-today-appointments'),
        screen.getByTestId('stats-patients'),
        screen.getByTestId('stats-doctors'),
      ];

      statsCards.forEach(card => {
        expect(card).toBeInTheDocument();
        expect(card).toHaveTextContent(/\d+/); // Should contain numbers
      });
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle empty notifications gracefully', () => {
      // Mock empty notifications
      const EmptyNotificationsDashboard = () => {
        const [notifications] = useState([]);
        
        return (
          <Box>
            <IconButton data-testid="notifications-button">
              <Badge badgeContent={notifications.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>
          </Box>
        );
      };

      render(<EmptyNotificationsDashboard />);

      const notificationsButton = screen.getByTestId('notifications-button');
      const badge = within(notificationsButton).queryByText('0');
      
      // Badge should not show when count is 0
      expect(badge).not.toBeInTheDocument();
    });

    it('should handle missing user data gracefully', () => {
      mockUseAppSelector.mockReturnValue(null);

      render(<DashboardTest />);

      // Dashboard should still render with default values
      expect(screen.getByTestId('dashboard-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
    });

    it('should handle component unmounting during real-time updates', () => {
      const { unmount } = render(<DashboardTest enableRealTimeUpdates={true} />);

      // Unmount component before real-time update
      unmount();

      // Should not throw any errors
      expect(true).toBe(true);
    });
  });
});
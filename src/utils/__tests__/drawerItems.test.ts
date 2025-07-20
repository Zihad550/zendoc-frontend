import { USER_ROLE } from '@/contants/role';
import { describe, expect, it, vi } from 'vitest';
import { drawerItems } from '../drawerItems';

// Mock MUI icons
vi.mock('@mui/icons-material/BookOnline', () => ({
  default: 'BookOnlineIcon',
}));
vi.mock('@mui/icons-material/CalendarMonth', () => ({
  default: 'CalendarMonthIcon',
}));
vi.mock('@mui/icons-material/Dashboard', () => ({
  default: 'DashboardIcon',
}));
vi.mock('@mui/icons-material/Group', () => ({
  default: 'GroupIcon',
}));
vi.mock('@mui/icons-material/Key', () => ({
  default: 'KeyIcon',
}));
vi.mock('@mui/icons-material/MedicalInformation', () => ({
  default: 'MedicalInformationIcon',
}));
vi.mock('@mui/icons-material/Person', () => ({
  default: 'PersonIcon',
}));
vi.mock('@mui/icons-material/Try', () => ({
  default: 'TryIcon',
}));

describe('drawerItems', () => {
  describe('SUPER_ADMIN role', () => {
    it('should return correct menu items for super admin', () => {
      const items = drawerItems(USER_ROLE.SUPER_ADMIN as any);

      expect(items).toHaveLength(2);
      expect(items[0]).toEqual({
        title: 'Dashboard',
        path: 'super_admin',
        icon: 'DashboardIcon',
      });
      expect(items[1]).toEqual({
        title: 'Manage Users',
        path: 'super_admin/manage-users',
        icon: 'GroupIcon',
      });
    });
  });

  describe('ADMIN role', () => {
    it('should return correct menu items for admin', () => {
      const items = drawerItems(USER_ROLE.ADMIN as any);

      expect(items).toHaveLength(6);
      expect(items[0]).toEqual({
        title: 'Dashboard',
        path: 'admin',
        icon: 'DashboardIcon',
      });
      expect(items[1]).toEqual({
        title: 'Specialties',
        path: 'admin/specialties',
        icon: 'TryIcon',
      });
      expect(items[2]).toEqual({
        title: 'Doctors',
        path: 'admin/doctors',
        icon: 'MedicalInformationIcon',
      });
      expect(items[3]).toEqual({
        title: 'Schedules',
        path: 'admin/schedules',
        icon: 'CalendarMonthIcon',
      });
      expect(items[4]).toEqual({
        title: 'Appointments',
        path: 'admin/appointments',
        icon: 'BookOnlineIcon',
      });
      expect(items[5]).toEqual({
        title: 'Change Password',
        path: 'change-password',
        icon: 'KeyIcon',
      });
    });
  });

  describe('DOCTOR role', () => {
    it('should return correct menu items for doctor', () => {
      const items = drawerItems(USER_ROLE.DOCTOR as any);

      expect(items).toHaveLength(5);
      expect(items[0]).toEqual({
        title: 'Dashboard',
        path: 'doctor',
        icon: 'DashboardIcon',
      });
      expect(items[1]).toEqual({
        title: 'Profile',
        path: 'doctor/profile',
        icon: 'PersonIcon',
      });
      expect(items[2]).toEqual({
        title: 'Schedules',
        path: 'doctor/schedules',
        icon: 'CalendarMonthIcon',
      });
      expect(items[3]).toEqual({
        title: 'Appointments',
        path: 'doctor/appointment',
        icon: 'BookOnlineIcon',
      });
      expect(items[4]).toEqual({
        title: 'Change Password',
        path: 'change-password',
        icon: 'KeyIcon',
      });
    });
  });

  describe('PATIENT role', () => {
    it('should return correct menu items for patient', () => {
      const items = drawerItems(USER_ROLE.PATIENT as any);

      expect(items).toHaveLength(2);
      expect(items[0]).toEqual({
        title: 'Appointments',
        path: 'patient/appointments',
        icon: 'BookOnlineIcon',
      });
      expect(items[1]).toEqual({
        title: 'Change Password',
        path: 'change-password',
        icon: 'KeyIcon',
      });
    });
  });

  describe('Unknown role', () => {
    it('should return empty array for unknown role', () => {
      const items = drawerItems('unknown_role' as any);

      expect(items).toHaveLength(0);
      expect(items).toEqual([]);
    });
  });

  describe('Role-specific path generation', () => {
    it('should generate correct paths with role prefix', () => {
      const adminItems = drawerItems(USER_ROLE.ADMIN as any);
      const doctorItems = drawerItems(USER_ROLE.DOCTOR as any);

      // Check that paths include role prefix
      expect(adminItems[0].path).toBe('admin');
      expect(adminItems[1].path).toBe('admin/specialties');

      expect(doctorItems[0].path).toBe('doctor');
      expect(doctorItems[1].path).toBe('doctor/profile');
    });

    it('should handle change-password path without role prefix', () => {
      const adminItems = drawerItems(USER_ROLE.ADMIN as any);
      const doctorItems = drawerItems(USER_ROLE.DOCTOR as any);
      const patientItems = drawerItems(USER_ROLE.PATIENT as any);

      const changePasswordAdmin = adminItems.find(
        (item) => item.title === 'Change Password'
      );
      const changePasswordDoctor = doctorItems.find(
        (item) => item.title === 'Change Password'
      );
      const changePasswordPatient = patientItems.find(
        (item) => item.title === 'Change Password'
      );

      expect(changePasswordAdmin?.path).toBe('change-password');
      expect(changePasswordDoctor?.path).toBe('change-password');
      expect(changePasswordPatient?.path).toBe('change-password');
    });
  });

  describe('Menu item structure', () => {
    it('should have consistent structure for all menu items', () => {
      const allRoles = [
        USER_ROLE.SUPER_ADMIN,
        USER_ROLE.ADMIN,
        USER_ROLE.DOCTOR,
        USER_ROLE.PATIENT,
      ];

      allRoles.forEach((role) => {
        const items = drawerItems(role as any);

        items.forEach((item) => {
          expect(item).toHaveProperty('title');
          expect(item).toHaveProperty('path');
          expect(item).toHaveProperty('icon');
          expect(typeof item.title).toBe('string');
          expect(typeof item.path).toBe('string');
          expect(item.title.length).toBeGreaterThan(0);
          expect(item.path.length).toBeGreaterThan(0);
        });
      });
    });
  });
});

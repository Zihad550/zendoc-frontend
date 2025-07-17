import { IAdmin } from '../admin';
import { UserRole } from '../common';
import { Doctor } from '../doctor';
import { IPatient } from '../patient';

export interface IUser {
  id: string;
  email: string;
  role: UserRole;
  needPasswordChange: boolean;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  admin?: IAdmin;
  doctor?: Doctor;
  patient?: IPatient;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  DELETED = 'DELETED',
}

// Extended user interface for manage users feature
export interface ExtendedUser extends IUser {
  displayName: string;
  lastLoginAt: Date | null;
  appointmentCount?: number;
  profileCompleteness: number;
}

// API request/response interfaces for getAllUsers
export interface GetAllUsersParams extends Record<string, unknown> {
  page?: number;
  limit?: number;
  searchTerm?: string;
  roles?: UserRole[];
  status?: UserStatus[];
  sortBy?: 'name' | 'email' | 'createdAt' | 'lastLogin';
  sortOrder?: 'asc' | 'desc';
  dateFrom?: string;
  dateTo?: string;
  lastLoginFrom?: string;
  lastLoginTo?: string;
}

export interface GetAllUsersResponse {
  users: ExtendedUser[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// User statistics interfaces
export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
  usersByRole: {
    [key in UserRole]: number;
  };
  growthRate: number;
}

// User management mutation interfaces
export interface UpdateUserData {
  email?: string;
  status?: UserStatus;
  role?: UserRole;
  needPasswordChange?: boolean;
  patient?: Partial<IPatient>;
  doctor?: Partial<Doctor>;
  admin?: Partial<IAdmin>;
}

export interface BulkUserOperation {
  userIds: string[];
  operation: 'suspend' | 'activate' | 'delete' | 'changeRole';
  newRole?: UserRole;
}

export interface BulkOperationResult {
  successful: string[];
  failed: Array<{
    userId: string;
    error: string;
  }>;
}

export interface ExportUsersParams {
  format: 'csv' | 'excel';
  fields?: string[];
  filters?: GetAllUsersParams;
}

// User creation interfaces
export interface CreateUserData {
  email: string;
  role: UserRole;
  basicInfo: {
    name: string;
    contactNumber?: string;
    address?: string;
  };
  roleSpecificInfo?: DoctorSpecificInfo | AdminSpecificInfo;
  sendWelcomeEmail: boolean;
  generatePassword?: boolean;
  customPassword?: string;
}

export interface DoctorSpecificInfo {
  specialties: string[];
  qualification: string;
  experience: number;
  appointmentFee: number;
  registrationNumber: string;
  currentWorkingPlace?: string;
  designation?: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
}

export interface AdminSpecificInfo {
  // Add admin-specific fields if needed
  department?: string;
  permissions?: string[];
}

// Export audit and security interfaces
export interface ExportHistoryEntry {
  id: string;
  timestamp: Date;
  userId: string;
  userName: string;
  format: 'csv' | 'excel';
  recordCount: number;
  fieldsExported: string[];
  hasSensitiveData: boolean;
  downloadUrl?: string;
  expiresAt?: Date;
  status: 'completed' | 'failed' | 'expired';
  ipAddress?: string;
  userAgent?: string;
}

export interface ExportAuditLog {
  action:
    | 'export_initiated'
    | 'export_completed'
    | 'export_failed'
    | 'export_downloaded';
  userId: string;
  exportId?: string;
  format?: 'csv' | 'excel';
  recordCount?: number;
  fieldsExported?: string[];
  hasSensitiveData?: boolean;
  securityVerified?: boolean;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export interface SecurityAcknowledgment {
  dataHandling: boolean;
  complianceAwareness: boolean;
  authorizedAccess: boolean;
  auditTrail: boolean;
}

export interface SecurityVerification {
  password: string;
  acknowledgments: SecurityAcknowledgment;
}

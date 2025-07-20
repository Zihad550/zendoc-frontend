'use client';

import PHModal from '@/components/Shared/PHModal/PHModal';
import { ExtendedUser, GetAllUsersParams } from '@/types/user';
import {
    CheckCircle as CheckIcon,
    CloudDownload as DownloadIcon,
    Error as ErrorIcon,
    FileDownload as ExportIcon,
    History as HistoryIcon,
    Visibility as PreviewIcon,
    Security as SecurityIcon,
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    FormControlLabel,
    FormGroup,
    FormLabel,
    LinearProgress,
    Paper,
    Radio,
    RadioGroup,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import ExportHistoryModal from './ExportHistoryModal';
import ExportSecurityModal from './ExportSecurityModal';

export interface ExportConfig {
  format: 'csv' | 'excel';
  fields: string[];
  includeFilters: boolean;
  maskSensitiveData: boolean;
}

interface UserExportModalProps {
  open: boolean;
  onClose: () => void;
  selectedUsers: string[];
  users: ExtendedUser[];
  currentFilters?: GetAllUsersParams;
  onExport: (
    config: ExportConfig,
    securityVerification?: SecurityVerification
  ) => Promise<void>;
  isExporting?: boolean;
  exportProgress?: number;
  exportError?: string | null;
  exportHistory?: ExportHistoryEntry[];
  onViewHistory?: () => void;
}

interface SecurityVerification {
  password: string;
  acknowledgments: SecurityAcknowledgment;
}

interface SecurityAcknowledgment {
  dataHandling: boolean;
  complianceAwareness: boolean;
  authorizedAccess: boolean;
  auditTrail: boolean;
}

interface ExportHistoryEntry {
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

interface ExportField {
  key: string;
  label: string;
  sensitive?: boolean;
  category: 'basic' | 'profile' | 'activity' | 'system';
}

const EXPORT_FIELDS: ExportField[] = [
  // Basic Information
  { key: 'id', label: 'User ID', category: 'basic' },
  { key: 'email', label: 'Email Address', sensitive: true, category: 'basic' },
  { key: 'role', label: 'User Role', category: 'basic' },
  { key: 'status', label: 'Account Status', category: 'basic' },
  { key: 'displayName', label: 'Full Name', category: 'basic' },

  // Profile Information
  {
    key: 'contactNumber',
    label: 'Contact Number',
    sensitive: true,
    category: 'profile',
  },
  { key: 'address', label: 'Address', sensitive: true, category: 'profile' },
  { key: 'gender', label: 'Gender', category: 'profile' },
  {
    key: 'dateOfBirth',
    label: 'Date of Birth',
    sensitive: true,
    category: 'profile',
  },

  // Doctor-specific fields
  { key: 'specialties', label: 'Medical Specialties', category: 'profile' },
  { key: 'qualification', label: 'Qualification', category: 'profile' },
  { key: 'experience', label: 'Years of Experience', category: 'profile' },
  { key: 'appointmentFee', label: 'Appointment Fee', category: 'profile' },
  {
    key: 'registrationNumber',
    label: 'Medical Registration Number',
    sensitive: true,
    category: 'profile',
  },

  // Activity Information
  { key: 'lastLoginAt', label: 'Last Login Date', category: 'activity' },
  {
    key: 'appointmentCount',
    label: 'Total Appointments',
    category: 'activity',
  },
  {
    key: 'profileCompleteness',
    label: 'Profile Completeness %',
    category: 'activity',
  },

  // System Information
  { key: 'createdAt', label: 'Registration Date', category: 'system' },
  { key: 'updatedAt', label: 'Last Updated', category: 'system' },
  {
    key: 'needPasswordChange',
    label: 'Needs Password Change',
    category: 'system',
  },
];

const DEFAULT_FIELDS = [
  'id',
  'displayName',
  'email',
  'role',
  'status',
  'createdAt',
  'lastLoginAt',
];

const UserExportModal = ({
  open,
  onClose,
  selectedUsers,
  users,
  currentFilters,
  onExport,
  isExporting = false,
  exportProgress = 0,
  exportError = null,
  exportHistory = [],
  onViewHistory,
}: UserExportModalProps) => {
  const [exportConfig, setExportConfig] = useState<ExportConfig>({
    format: 'csv',
    fields: DEFAULT_FIELDS,
    includeFilters: true,
    maskSensitiveData: true,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isVerifyingPassword, setIsVerifyingPassword] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(
    null
  );

  // Get selected user objects for preview
  const selectedUserObjects = users.filter((user) =>
    selectedUsers.includes(user.id)
  );

  // Helper function to get display name
  const getDisplayName = (user: ExtendedUser): string => {
    if (user.admin?.name) return user.admin.name;
    if (user.doctor?.name) return user.doctor.name;
    if (user.patient?.name) return user.patient.name;
    return user.email.split('@')[0];
  };

  // Handle field selection change
  const handleFieldChange = (fieldKey: string, checked: boolean) => {
    setExportConfig((prev) => ({
      ...prev,
      fields: checked
        ? [...prev.fields, fieldKey]
        : prev.fields.filter((f) => f !== fieldKey),
    }));
  };

  // Handle select all fields in category
  const handleCategorySelect = (category: string, checked: boolean) => {
    const categoryFields = EXPORT_FIELDS.filter(
      (f) => f.category === category
    ).map((f) => f.key);

    setExportConfig((prev) => ({
      ...prev,
      fields: checked
        ? [...new Set([...prev.fields, ...categoryFields])]
        : prev.fields.filter((f) => !categoryFields.includes(f)),
    }));
  };

  // Check if all fields in category are selected
  const isCategorySelected = (category: string) => {
    const categoryFields = EXPORT_FIELDS.filter(
      (f) => f.category === category
    ).map((f) => f.key);
    return categoryFields.every((field) => exportConfig.fields.includes(field));
  };

  // Check if export contains sensitive data
  const hasSensitiveData = () => {
    return exportConfig.fields.some((fieldKey) => {
      const field = EXPORT_FIELDS.find((f) => f.key === fieldKey);
      return field?.sensitive && !exportConfig.maskSensitiveData;
    });
  };

  // Handle export initiation
  const handleExport = async () => {
    if (exportConfig.fields.length === 0) {
      return;
    }

    // Check if sensitive data is included and security verification is needed
    if (
      hasSensitiveData() ||
      exportConfig.fields.some(
        (f) => EXPORT_FIELDS.find((field) => field.key === f)?.sensitive
      )
    ) {
      setShowSecurityModal(true);
      return;
    }

    // Proceed with export without additional security
    try {
      await onExport(exportConfig);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  // Handle security verification
  const handleSecurityVerification = async (
    password: string,
    acknowledgments: SecurityAcknowledgment
  ) => {
    setIsVerifyingPassword(true);
    setVerificationError(null);

    try {
      // Simulate password verification (in real app, this would be an API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Proceed with export after security verification
      await onExport(exportConfig, { password, acknowledgments });
      setShowSecurityModal(false);
    } catch (error: any) {
      setVerificationError(error.message || 'Security verification failed');
    } finally {
      setIsVerifyingPassword(false);
    }
  };

  // Handle view history
  const handleViewHistory = () => {
    if (onViewHistory) {
      onViewHistory();
    } else {
      setShowHistoryModal(true);
    }
  };

  // Handle close
  const handleClose = () => {
    if (!isExporting) {
      onClose();
    }
  };

  // Get preview data
  const getPreviewData = () => {
    const previewUsers = selectedUserObjects.slice(0, 5); // Show first 5 users
    return previewUsers.map((user) => {
      const rowData: Record<string, any> = {};

      exportConfig.fields.forEach((fieldKey) => {
        const field = EXPORT_FIELDS.find((f) => f.key === fieldKey);
        if (!field) return;

        let value: any = '';

        switch (fieldKey) {
          case 'id':
            value = user.id;
            break;
          case 'email':
            value = exportConfig.maskSensitiveData ? '***@***.com' : user.email;
            break;
          case 'role':
            value = user.role;
            break;
          case 'status':
            value = user.status;
            break;
          case 'displayName':
            value = getDisplayName(user);
            break;
          case 'contactNumber':
            const contactNumber =
              user.admin?.contactNumber ||
              user.doctor?.contactNumber ||
              user.patient?.contactNumber;
            value =
              exportConfig.maskSensitiveData && contactNumber
                ? '***-***-****'
                : contactNumber || '';
            break;
          case 'address':
            const address =
              user.admin?.address ||
              user.doctor?.address ||
              user.patient?.address;
            value =
              exportConfig.maskSensitiveData && address
                ? '*** *** ***'
                : address || '';
            break;
          case 'gender':
            value = user.doctor?.gender || user.patient?.patientHealthData?.gender || '';
            break;
          case 'dateOfBirth':
            const dob = user.patient?.patientHealthData?.dateOfBirth;
            value =
              exportConfig.maskSensitiveData && dob ? '****-**-**' : dob || '';
            break;
          case 'specialties':
            value =
              user.doctor?.doctorSpecialties
                ?.map((s: any) => s.specialties?.title)
                .join(', ') || '';
            break;
          case 'qualification':
            value = user.doctor?.qualification || '';
            break;
          case 'experience':
            value = user.doctor?.experience || '';
            break;
          case 'appointmentFee':
            value = user.doctor?.apointmentFee || '';
            break;
          case 'registrationNumber':
            value =
              exportConfig.maskSensitiveData && user.doctor?.registrationNumber
                ? '***-***-***'
                : user.doctor?.registrationNumber || '';
            break;
          case 'lastLoginAt':
            value = user.lastLoginAt
              ? new Date(user.lastLoginAt).toLocaleDateString()
              : 'Never';
            break;
          case 'appointmentCount':
            value = user.appointmentCount || 0;
            break;
          case 'profileCompleteness':
            value = `${user.profileCompleteness || 0}%`;
            break;
          case 'createdAt':
            value = new Date(user.createdAt).toLocaleDateString();
            break;
          case 'updatedAt':
            value = new Date(user.updatedAt).toLocaleDateString();
            break;
          case 'needPasswordChange':
            value = user.needPasswordChange ? 'Yes' : 'No';
            break;
          default:
            value = '';
        }

        rowData[field.label] = value;
      });

      return rowData;
    });
  };

  // Group fields by category
  const fieldsByCategory = EXPORT_FIELDS.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, ExportField[]>);

  const categoryLabels = {
    basic: 'Basic Information',
    profile: 'Profile Information',
    activity: 'Activity & Usage',
    system: 'System Information',
  };

  return (
    <PHModal
      open={open}
      setOpen={handleClose}
      title="Export User Data"
      maxWidth="md"
      fullWidth
    >
      <Box sx={{ p: 3 }}>
        {/* Export Summary */}
        <Paper variant="outlined" sx={{ p: 2, mb: 3, bgcolor: 'grey.50' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <ExportIcon color="primary" />
            <Box>
              <Typography variant="h6">
                Export {selectedUsers.length} User
                {selectedUsers.length !== 1 ? 's' : ''}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {exportConfig.includeFilters && currentFilters
                  ? 'Current filters will be applied to the export'
                  : 'Exporting selected users only'}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Export Configuration */}
        <Stack spacing={3}>
          {/* Format Selection */}
          <Box>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
              Export Format
            </FormLabel>
            <RadioGroup
              row
              value={exportConfig.format}
              onChange={(e) =>
                setExportConfig((prev) => ({
                  ...prev,
                  format: e.target.value as 'csv' | 'excel',
                }))
              }
            >
              <FormControlLabel
                value="csv"
                control={<Radio />}
                label="CSV (.csv)"
                disabled={isExporting}
              />
              <FormControlLabel
                value="excel"
                control={<Radio />}
                label="Excel (.xlsx)"
                disabled={isExporting}
              />
            </RadioGroup>
          </Box>

          <Divider />

          {/* Field Selection */}
          <Box>
            <FormLabel component="legend" sx={{ mb: 2, fontWeight: 'bold' }}>
              Select Fields to Export
            </FormLabel>

            {Object.entries(fieldsByCategory).map(([category, fields]) => (
              <Box key={category} sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCategorySelected(category)}
                      indeterminate={
                        fields.some((f) =>
                          exportConfig.fields.includes(f.key)
                        ) && !isCategorySelected(category)
                      }
                      onChange={(e) =>
                        handleCategorySelect(category, e.target.checked)
                      }
                      disabled={isExporting}
                    />
                  }
                  label={
                    <Typography variant="subtitle2" fontWeight="bold">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </Typography>
                  }
                />

                <FormGroup sx={{ ml: 3 }}>
                  {fields.map((field) => (
                    <FormControlLabel
                      key={field.key}
                      control={
                        <Checkbox
                          checked={exportConfig.fields.includes(field.key)}
                          onChange={(e) =>
                            handleFieldChange(field.key, e.target.checked)
                          }
                          disabled={isExporting}
                        />
                      }
                      label={
                        <Box display="flex" alignItems="center" gap={1}>
                          <span>{field.label}</span>
                          {field.sensitive && (
                            <Chip
                              label="Sensitive"
                              size="small"
                              color="warning"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                    />
                  ))}
                </FormGroup>
              </Box>
            ))}
          </Box>

          <Divider />

          {/* Export Options */}
          <Box>
            <FormLabel component="legend" sx={{ mb: 1, fontWeight: 'bold' }}>
              Export Options
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportConfig.includeFilters}
                    onChange={(e) =>
                      setExportConfig((prev) => ({
                        ...prev,
                        includeFilters: e.target.checked,
                      }))
                    }
                    disabled={isExporting}
                  />
                }
                label="Apply current search and filter criteria"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={exportConfig.maskSensitiveData}
                    onChange={(e) =>
                      setExportConfig((prev) => ({
                        ...prev,
                        maskSensitiveData: e.target.checked,
                      }))
                    }
                    disabled={isExporting}
                  />
                }
                label="Mask sensitive data (recommended for security)"
              />
            </FormGroup>
          </Box>

          {/* Preview Section */}
          {exportConfig.fields.length > 0 && (
            <Box>
              <Button
                startIcon={<PreviewIcon />}
                onClick={() => setShowPreview(!showPreview)}
                disabled={isExporting}
                sx={{ mb: 2 }}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </Button>

              {showPreview && (
                <TableContainer
                  component={Paper}
                  variant="outlined"
                  sx={{ maxHeight: 300 }}
                >
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        {exportConfig.fields.map((fieldKey) => {
                          const field = EXPORT_FIELDS.find(
                            (f) => f.key === fieldKey
                          );
                          return (
                            <TableCell key={fieldKey}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {field?.label || fieldKey}
                              </Typography>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {getPreviewData().map((row, index) => (
                        <TableRow key={index}>
                          {exportConfig.fields.map((fieldKey) => {
                            const field = EXPORT_FIELDS.find(
                              (f) => f.key === fieldKey
                            );
                            const value = row[field?.label || fieldKey];
                            return (
                              <TableCell key={fieldKey}>
                                <Typography variant="body2">
                                  {value || '-'}
                                </Typography>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                      {selectedUserObjects.length > 5 && (
                        <TableRow>
                          <TableCell colSpan={exportConfig.fields.length}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              align="center"
                            >
                              ... and {selectedUserObjects.length - 5} more
                              users
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          )}

          {/* Export Progress */}
          {isExporting && (
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Preparing export... This may take a few moments for large
                datasets.
              </Typography>
              <LinearProgress
                variant={exportProgress > 0 ? 'determinate' : 'indeterminate'}
                value={exportProgress}
                sx={{ mb: 1 }}
              />
              {exportProgress > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {Math.round(exportProgress)}% complete
                </Typography>
              )}
            </Box>
          )}

          {/* Export Error */}
          {exportError && (
            <Alert severity="error" icon={<ErrorIcon />}>
              <Typography variant="body2">
                Export failed: {exportError}
              </Typography>
            </Alert>
          )}
        </Stack>

        {/* Security and Audit Information */}
        {hasSensitiveData() && (
          <Alert severity="warning" icon={<SecurityIcon />} sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Security Notice:</strong> This export contains sensitive
              data and will require additional security verification. All export
              activities are logged for audit purposes.
            </Typography>
          </Alert>
        )}

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}
        >
          {/* History Button */}
          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            onClick={handleViewHistory}
            disabled={isExporting}
          >
            Export History
          </Button>

          {/* Export Actions */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Cancel'}
            </Button>
            <Button
              variant="contained"
              startIcon={isExporting ? <CheckIcon /> : <DownloadIcon />}
              onClick={handleExport}
              disabled={isExporting || exportConfig.fields.length === 0}
              color={hasSensitiveData() ? 'warning' : 'primary'}
            >
              {isExporting
                ? 'Exporting...'
                : `Export ${exportConfig.format.toUpperCase()}`}
            </Button>
          </Stack>
        </Stack>
      </Box>

      {/* Security Verification Modal */}
      <ExportSecurityModal
        open={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
        onConfirm={handleSecurityVerification}
        hasSensitiveData={hasSensitiveData()}
        isVerifying={isVerifyingPassword}
        verificationError={verificationError}
      />

      {/* Export History Modal */}
      <ExportHistoryModal
        open={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        exportHistory={exportHistory}
        onDownload={(entry) => {
          // Handle download from history
          if (entry.downloadUrl) {
            window.open(entry.downloadUrl, '_blank');
          }
        }}
      />
    </PHModal>
  );
};

export default UserExportModal;

'use client';

import PHModal from '@/components/Shared/PHModal/PHModal';
import { BulkOperationResult, ExtendedUser } from '@/types/user';
import {
  Download as DownloadIcon,
  Error as ErrorIcon,
  Refresh as RetryIcon,
  CheckCircle as SuccessIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export type BulkOperation =
  | 'suspend'
  | 'activate'
  | 'delete'
  | 'changeRole'
  | 'export';

interface BulkOperationResultsModalProps {
  open: boolean;
  onClose: () => void;
  operation: BulkOperation | null;
  results: BulkOperationResult | null;
  users: ExtendedUser[];
  onRetryFailed?: (failedUserIds: string[]) => Promise<BulkOperationResult>;
  onDownloadReport?: () => void;
  isRetrying?: boolean;
}

interface AuditLogEntry {
  id: string;
  operation: BulkOperation;
  userIds: string[];
  successful: string[];
  failed: Array<{ userId: string; error: string }>;
  timestamp: Date;
  performedBy: string;
}

const BulkOperationResultsModal = ({
  open,
  onClose,
  operation,
  results,
  users,
  onRetryFailed,
  onDownloadReport,
  isRetrying = false,
}: BulkOperationResultsModalProps) => {
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);

  // Helper function to get display name
  const getDisplayName = (user: ExtendedUser): string => {
    if (user.admin?.name) return user.admin.name;
    if (user.doctor?.name) return user.doctor.name;
    if (user.patient?.name) return user.patient.name;
    return user.email.split('@')[0];
  };

  // Helper function to get user by ID
  const getUserById = (userId: string): ExtendedUser | undefined => {
    return users.find((user) => user.id === userId);
  };

  // Helper function to get operation display name
  const getOperationDisplayName = (op: BulkOperation): string => {
    switch (op) {
      case 'suspend':
        return 'Suspend Users';
      case 'activate':
        return 'Activate Users';
      case 'delete':
        return 'Delete Users';
      case 'changeRole':
        return 'Change User Roles';
      case 'export':
        return 'Export Users';
      default:
        return 'Bulk Operation';
    }
  };

  // Handle retry failed operations
  const handleRetryFailed = async () => {
    if (!results || !onRetryFailed) return;

    const failedUserIds = results.failed.map((f) => f.userId);

    try {
      const retryResult = await onRetryFailed(failedUserIds);

      // Log the retry operation for audit
      const auditEntry: AuditLogEntry = {
        id: `retry-${Date.now()}`,
        operation: operation!,
        userIds: failedUserIds,
        successful: retryResult.successful,
        failed: retryResult.failed,
        timestamp: new Date(),
        performedBy: 'current-user', // This should come from auth context
      };

      setAuditLog((prev) => [auditEntry, ...prev]);
    } catch (error) {
      console.error('Retry operation failed:', error);
    }
  };

  // Handle close modal
  const handleClose = () => {
    // Log the operation for audit if results exist
    if (results && operation) {
      const auditEntry: AuditLogEntry = {
        id: `${operation}-${Date.now()}`,
        operation,
        userIds: [
          ...results.successful,
          ...results.failed.map((f) => f.userId),
        ],
        successful: results.successful,
        failed: results.failed,
        timestamp: new Date(),
        performedBy: 'current-user', // This should come from auth context
      };

      setAuditLog((prev) => [auditEntry, ...prev]);
    }

    onClose();
  };

  // Calculate success rate
  const getSuccessRate = (): number => {
    if (!results) return 0;
    const total = results.successful.length + results.failed.length;
    return total > 0 ? (results.successful.length / total) * 100 : 0;
  };

  // Group errors by type for better reporting
  const getGroupedErrors = () => {
    if (!results) return {};

    const errorGroups: Record<
      string,
      Array<{ userId: string; error: string }>
    > = {};

    results.failed.forEach((failure) => {
      const errorType = failure.error.split(':')[0] || 'Unknown Error';
      if (!errorGroups[errorType]) {
        errorGroups[errorType] = [];
      }
      errorGroups[errorType].push(failure);
    });

    return errorGroups;
  };

  if (!open || !operation || !results) {
    return null;
  }

  const successRate = getSuccessRate();
  const groupedErrors = getGroupedErrors();
  const hasFailures = results.failed.length > 0;
  const hasSuccesses = results.successful.length > 0;

  return (
    <PHModal
      open={open}
      setOpen={() => {}}
      title={`${getOperationDisplayName(operation)} - Results`}
      maxWidth="md"
    >
      <DialogContent>
        <Stack spacing={3}>
          {/* Operation Summary */}
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Operation Summary
            </Typography>
            <Stack direction="row" spacing={4} alignItems="center">
              <Box textAlign="center">
                <Typography variant="h4" color="success.main">
                  {results.successful.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Successful
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" color="error.main">
                  {results.failed.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Failed
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" color="primary.main">
                  {Math.round(successRate)}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Success Rate
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Success Alert */}
          {hasSuccesses && (
            <Alert severity="success" icon={<SuccessIcon />}>
              <Typography variant="subtitle2">
                Successfully{' '}
                {operation === 'delete'
                  ? 'deleted'
                  : operation === 'suspend'
                  ? 'suspended'
                  : operation === 'activate'
                  ? 'activated'
                  : operation === 'changeRole'
                  ? 'updated roles for'
                  : 'processed'}{' '}
                {results.successful.length} user(s)
              </Typography>
            </Alert>
          )}

          {/* Error Alert */}
          {hasFailures && (
            <Alert severity="error" icon={<ErrorIcon />}>
              <Typography variant="subtitle2">
                Failed to process {results.failed.length} user(s)
              </Typography>
            </Alert>
          )}

          {/* Successful Operations Details */}
          {hasSuccesses && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Successfully Processed Users ({results.successful.length})
              </Typography>
              <Paper
                variant="outlined"
                sx={{ maxHeight: 200, overflow: 'auto' }}
              >
                <List dense>
                  {results.successful.map((userId) => {
                    const user = getUserById(userId);
                    return (
                      <ListItem key={userId}>
                        <ListItemIcon>
                          <SuccessIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={user ? getDisplayName(user) : userId}
                          secondary={
                            user
                              ? `${user.email} - ${user.role}`
                              : 'User not found'
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Box>
          )}

          {/* Failed Operations Details */}
          {hasFailures && (
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Failed Operations ({results.failed.length})
              </Typography>

              {/* Grouped Error Summary */}
              <Box mb={2}>
                <Typography variant="subtitle2" gutterBottom>
                  Error Summary:
                </Typography>
                <Stack spacing={1}>
                  {Object.entries(groupedErrors).map(
                    ([errorType, failures]) => (
                      <Alert
                        key={errorType}
                        severity="warning"
                        sx={{ py: 0.5 }}
                      >
                        <Typography variant="body2">
                          <strong>{errorType}:</strong> {failures.length}{' '}
                          user(s)
                        </Typography>
                      </Alert>
                    )
                  )}
                </Stack>
              </Box>

              {/* Detailed Error List */}
              <Paper
                variant="outlined"
                sx={{ maxHeight: 300, overflow: 'auto' }}
              >
                <List dense>
                  {results.failed.map((failure, index) => {
                    const user = getUserById(failure.userId);
                    return (
                      <ListItem key={index} divider>
                        <ListItemIcon>
                          <ErrorIcon color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={user ? getDisplayName(user) : failure.userId}
                          secondary={
                            <Box>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {user
                                  ? `${user.email} - ${user.role}`
                                  : 'User not found'}
                              </Typography>
                              <Typography variant="body2" color="error.main">
                                Error: {failure.error}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Box>
          )}

          {/* Audit Log Section */}
          {auditLog.length > 0 && (
            <Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" gutterBottom>
                Operation History
              </Typography>
              <Paper
                variant="outlined"
                sx={{ maxHeight: 200, overflow: 'auto' }}
              >
                <List dense>
                  {auditLog.map((entry) => (
                    <ListItem key={entry.id} divider>
                      <ListItemText
                        primary={`${getOperationDisplayName(
                          entry.operation
                        )} - ${entry.timestamp.toLocaleString()}`}
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Performed by: {entry.performedBy}
                            </Typography>
                            <Typography variant="body2" color="success.main">
                              Success: {entry.successful.length} users
                            </Typography>
                            <Typography variant="body2" color="error.main">
                              Failed: {entry.failed.length} users
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Stack direction="row" spacing={1} alignItems="center">
          {/* Download Report Button */}
          {onDownloadReport && (
            <Button
              startIcon={<DownloadIcon />}
              onClick={onDownloadReport}
              variant="outlined"
              color="info"
            >
              Download Report
            </Button>
          )}

          {/* Retry Failed Button */}
          {hasFailures && onRetryFailed && (
            <Button
              startIcon={
                isRetrying ? <CircularProgress size={16} /> : <RetryIcon />
              }
              onClick={handleRetryFailed}
              disabled={isRetrying}
              variant="outlined"
              color="warning"
            >
              {isRetrying ? 'Retrying...' : 'Retry Failed'}
            </Button>
          )}

          {/* Close Button */}
          <Button onClick={handleClose} variant="contained" color="primary">
            Close
          </Button>
        </Stack>
      </DialogActions>
    </PHModal>
  );
};

export default BulkOperationResultsModal;

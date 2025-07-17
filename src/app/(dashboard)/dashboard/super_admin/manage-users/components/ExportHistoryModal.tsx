'use client';

import PHModal from '@/components/Shared/PHModal/PHModal';
import {
  CloudDownload as DownloadIcon,
  Info as InfoIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
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

interface ExportHistoryModalProps {
  open: boolean;
  onClose: () => void;
  exportHistory: ExportHistoryEntry[];
  onDownload?: (entry: ExportHistoryEntry) => void;
  isLoading?: boolean;
}

const ExportHistoryModal = ({
  open,
  onClose,
  exportHistory,
  onDownload,
  isLoading = false,
}: ExportHistoryModalProps) => {
  const [selectedEntry, setSelectedEntry] = useState<ExportHistoryEntry | null>(
    null
  );

  // Format date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  // Get status color
  const getStatusColor = (status: ExportHistoryEntry['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'failed':
        return 'error';
      case 'expired':
        return 'warning';
      default:
        return 'default';
    }
  };

  // Check if download is available
  const isDownloadAvailable = (entry: ExportHistoryEntry) => {
    return (
      entry.status === 'completed' &&
      entry.downloadUrl &&
      entry.expiresAt &&
      new Date() < entry.expiresAt
    );
  };

  // Handle download
  const handleDownload = (entry: ExportHistoryEntry) => {
    if (onDownload && isDownloadAvailable(entry)) {
      onDownload(entry);
    }
  };

  return (
    <PHModal
      open={open}
      setOpen={onClose}
      title="Export History & Audit Trail"
      maxWidth="lg"
      fullWidth
    >
      <Box sx={{ p: 3 }}>
        {/* Information Alert */}
        <Alert severity="info" icon={<InfoIcon />} sx={{ mb: 3 }}>
          <Typography variant="body2">
            This audit trail shows all user data export activities. Downloads
            are available for 24 hours after export. All export activities are
            logged for compliance and security monitoring.
          </Typography>
        </Alert>

        {/* Export History Table */}
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Format</TableCell>
                <TableCell>Records</TableCell>
                <TableCell>Sensitive Data</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exportHistory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body2" color="text.secondary">
                      No export history found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                exportHistory.map((entry) => (
                  <TableRow
                    key={entry.id}
                    hover
                    onClick={() => setSelectedEntry(entry)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(entry.timestamp)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {entry.userName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {entry.userId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={entry.format.toUpperCase()}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {entry.recordCount.toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {entry.hasSensitiveData ? (
                        <Chip
                          icon={<SecurityIcon />}
                          label="Yes"
                          size="small"
                          color="warning"
                          variant="outlined"
                        />
                      ) : (
                        <Chip
                          label="No"
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={
                          entry.status.charAt(0).toUpperCase() +
                          entry.status.slice(1)
                        }
                        size="small"
                        color={getStatusColor(entry.status)}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      {isDownloadAvailable(entry) ? (
                        <Button
                          size="small"
                          startIcon={<DownloadIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(entry);
                          }}
                          disabled={isLoading}
                        >
                          Download
                        </Button>
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          {entry.status === 'expired' ? 'Expired' : 'N/A'}
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Selected Entry Details */}
        {selectedEntry && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Export Details
            </Typography>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                {/* Basic Information */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Basic Information
                  </Typography>
                  <Stack direction="row" spacing={4}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Export ID
                      </Typography>
                      <Typography variant="body2">
                        {selectedEntry.id}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Timestamp
                      </Typography>
                      <Typography variant="body2">
                        {formatDate(selectedEntry.timestamp)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Status
                      </Typography>
                      <Typography variant="body2">
                        <Chip
                          label={
                            selectedEntry.status.charAt(0).toUpperCase() +
                            selectedEntry.status.slice(1)
                          }
                          size="small"
                          color={getStatusColor(selectedEntry.status)}
                          variant="outlined"
                        />
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* Export Details */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Export Configuration
                  </Typography>
                  <Stack direction="row" spacing={4}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Format
                      </Typography>
                      <Typography variant="body2">
                        {selectedEntry.format.toUpperCase()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Record Count
                      </Typography>
                      <Typography variant="body2">
                        {selectedEntry.recordCount.toLocaleString()}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Sensitive Data
                      </Typography>
                      <Typography variant="body2">
                        {selectedEntry.hasSensitiveData ? 'Yes' : 'No'}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                {/* Fields Exported */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Fields Exported ({selectedEntry.fieldsExported.length})
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selectedEntry.fieldsExported.map((field) => (
                      <Chip
                        key={field}
                        label={field}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>

                {/* Security Information */}
                {(selectedEntry.ipAddress || selectedEntry.userAgent) && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Security Information
                    </Typography>
                    <Stack spacing={1}>
                      {selectedEntry.ipAddress && (
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            IP Address
                          </Typography>
                          <Typography variant="body2">
                            {selectedEntry.ipAddress}
                          </Typography>
                        </Box>
                      )}
                      {selectedEntry.userAgent && (
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            User Agent
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ wordBreak: 'break-all' }}
                          >
                            {selectedEntry.userAgent}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                )}

                {/* Download Information */}
                {selectedEntry.downloadUrl && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Download Information
                    </Typography>
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Download Available
                        </Typography>
                        <Typography variant="body2">
                          {isDownloadAvailable(selectedEntry)
                            ? 'Yes'
                            : 'No (Expired)'}
                        </Typography>
                      </Box>
                      {selectedEntry.expiresAt && (
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Expires At
                          </Typography>
                          <Typography variant="body2">
                            {formatDate(selectedEntry.expiresAt)}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Box>
                )}
              </Stack>
            </Paper>
          </Box>
        )}

        {/* Compliance Notice */}
        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>Compliance Notice:</strong> This audit trail is maintained
            for regulatory compliance. Export activities may be reviewed by
            compliance officers and auditors. Ensure all data handling follows
            organizational policies and applicable regulations.
          </Typography>
        </Alert>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}
        >
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Stack>
      </Box>
    </PHModal>
  );
};

export default ExportHistoryModal;

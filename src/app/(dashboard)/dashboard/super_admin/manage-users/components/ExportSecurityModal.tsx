'use client';

import PHModal from '@/components/Shared/PHModal/PHModal';
import {
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface ExportSecurityModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (
    password: string,
    acknowledgments: SecurityAcknowledgment
  ) => void;
  hasSensitiveData: boolean;
  isVerifying?: boolean;
  verificationError?: string | null;
}

interface SecurityAcknowledgment {
  dataHandling: boolean;
  complianceAwareness: boolean;
  authorizedAccess: boolean;
  auditTrail: boolean;
}

const ExportSecurityModal = ({
  open,
  onClose,
  onConfirm,
  hasSensitiveData,
  isVerifying = false,
  verificationError = null,
}: ExportSecurityModalProps) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acknowledgments, setAcknowledgments] =
    useState<SecurityAcknowledgment>({
      dataHandling: false,
      complianceAwareness: false,
      authorizedAccess: false,
      auditTrail: false,
    });

  // Handle acknowledgment change
  const handleAcknowledgmentChange = (key: keyof SecurityAcknowledgment) => {
    setAcknowledgments((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Check if all acknowledgments are checked
  const allAcknowledged = Object.values(acknowledgments).every(Boolean);

  // Handle confirm
  const handleConfirm = () => {
    if (password.trim() && allAcknowledged) {
      onConfirm(password, acknowledgments);
    }
  };

  // Handle close
  const handleClose = () => {
    if (!isVerifying) {
      setPassword('');
      setAcknowledgments({
        dataHandling: false,
        complianceAwareness: false,
        authorizedAccess: false,
        auditTrail: false,
      });
      onClose();
    }
  };

  return (
    <PHModal
      open={open}
      setOpen={handleClose}
      title="Export Security Verification"
      maxWidth="sm"
      fullWidth
    >
      <Box sx={{ p: 3 }}>
        {/* Security Warning */}
        <Alert severity="warning" icon={<WarningIcon />} sx={{ mb: 3 }}>
          <Typography variant="body2">
            You are about to export user data that may contain sensitive
            information. Additional security verification is required.
          </Typography>
        </Alert>

        {/* Sensitive Data Notice */}
        {hasSensitiveData && (
          <Alert severity="error" icon={<SecurityIcon />} sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight="bold">
              This export contains sensitive data including:
            </Typography>
            <Typography variant="body2" component="ul" sx={{ mt: 1, mb: 0 }}>
              <li>Email addresses and contact information</li>
              <li>Personal addresses and dates of birth</li>
              <li>Medical registration numbers</li>
              <li>Other personally identifiable information (PII)</li>
            </Typography>
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Password Verification */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Password Verification
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Please enter your current password to verify your identity.
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Current Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isVerifying}
              error={!!verificationError}
              helperText={verificationError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isVerifying}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Security Acknowledgments */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Security Acknowledgments
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Please acknowledge the following security requirements:
            </Typography>

            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acknowledgments.dataHandling}
                    onChange={() => handleAcknowledgmentChange('dataHandling')}
                    disabled={isVerifying}
                  />
                }
                label={
                  <Typography variant="body2">
                    I understand that exported data must be handled according to
                    data protection policies and will be stored securely with
                    appropriate access controls.
                  </Typography>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={acknowledgments.complianceAwareness}
                    onChange={() =>
                      handleAcknowledgmentChange('complianceAwareness')
                    }
                    disabled={isVerifying}
                  />
                }
                label={
                  <Typography variant="body2">
                    I am aware of compliance requirements (GDPR, HIPAA, etc.)
                    and will ensure exported data is used only for authorized
                    purposes.
                  </Typography>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={acknowledgments.authorizedAccess}
                    onChange={() =>
                      handleAcknowledgmentChange('authorizedAccess')
                    }
                    disabled={isVerifying}
                  />
                }
                label={
                  <Typography variant="body2">
                    I confirm that I have proper authorization to export this
                    data and will not share it with unauthorized personnel.
                  </Typography>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={acknowledgments.auditTrail}
                    onChange={() => handleAcknowledgmentChange('auditTrail')}
                    disabled={isVerifying}
                  />
                }
                label={
                  <Typography variant="body2">
                    I understand that this export action will be logged for
                    audit purposes and may be reviewed for compliance
                    monitoring.
                  </Typography>
                }
              />
            </Stack>
          </Box>

          {/* Export Information */}
          <Alert severity="info">
            <Typography variant="body2">
              <strong>Export Information:</strong>
            </Typography>
            <Typography variant="body2" component="ul" sx={{ mt: 1, mb: 0 }}>
              <li>Export timestamp and user details will be logged</li>
              <li>Downloaded files should be deleted after use</li>
              <li>Report any data breaches immediately</li>
              <li>This action may be subject to audit review</li>
            </Typography>
          </Alert>
        </Stack>

        {/* Action Buttons */}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          sx={{ mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}
        >
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={isVerifying}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={!password.trim() || !allAcknowledged || isVerifying}
            color={hasSensitiveData ? 'warning' : 'primary'}
          >
            {isVerifying ? 'Verifying...' : 'Confirm Export'}
          </Button>
        </Stack>
      </Box>
    </PHModal>
  );
};

export default ExportSecurityModal;

'use client';

import {
  Error as ErrorIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import {
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
  severity?: 'error' | 'warning';
}

interface ValidationErrorDisplayProps {
  errors: ValidationError[];
  title?: string;
  showFieldNames?: boolean;
  compact?: boolean;
  maxErrors?: number;
}

const ValidationErrorDisplay = ({
  errors,
  title = 'Please correct the following errors:',
  showFieldNames = true,
  compact = false,
  maxErrors = 10,
}: ValidationErrorDisplayProps) => {
  if (!errors || errors.length === 0) return null;

  const displayErrors = errors.slice(0, maxErrors);
  const hasMoreErrors = errors.length > maxErrors;

  const errorCount = errors.filter((e) => e.severity !== 'warning').length;
  const warningCount = errors.filter((e) => e.severity === 'warning').length;

  const getSeverity = (): 'error' | 'warning' => {
    return errorCount > 0 ? 'error' : 'warning';
  };

  const formatFieldName = (field: string): string => {
    // Convert camelCase or snake_case to readable format
    return field
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^\w/, (c) => c.toUpperCase())
      .trim();
  };

  if (compact) {
    return (
      <Alert
        severity={getSeverity()}
        role="alert"
        aria-live="polite"
        sx={{ mb: 2 }}
      >
        <Typography variant="body2">
          {errorCount > 0 && `${errorCount} error${errorCount > 1 ? 's' : ''}`}
          {errorCount > 0 && warningCount > 0 && ', '}
          {warningCount > 0 &&
            `${warningCount} warning${warningCount > 1 ? 's' : ''}`}{' '}
          found. Please review your input.
        </Typography>
      </Alert>
    );
  }

  return (
    <Alert
      severity={getSeverity()}
      role="alert"
      aria-live="polite"
      aria-labelledby="validation-errors-title"
      sx={{ mb: 2 }}
    >
      <Typography
        id="validation-errors-title"
        variant="subtitle2"
        component="div"
        sx={{ fontWeight: 600, mb: 1 }}
      >
        {title}
      </Typography>

      <List dense sx={{ py: 0 }}>
        {displayErrors.map((error, index) => (
          <ListItem
            key={`${error.field}-${index}`}
            sx={{ py: 0.5, px: 0 }}
            role="listitem"
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              {error.severity === 'warning' ? (
                <WarningIcon
                  fontSize="small"
                  color="warning"
                  aria-label="Warning"
                />
              ) : (
                <ErrorIcon fontSize="small" color="error" aria-label="Error" />
              )}
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body2" component="span">
                  {showFieldNames && (
                    <Typography
                      component="span"
                      sx={{ fontWeight: 500, mr: 1 }}
                    >
                      {formatFieldName(error.field)}:
                    </Typography>
                  )}
                  {error.message}
                </Typography>
              }
              sx={{ my: 0 }}
            />
          </ListItem>
        ))}
      </List>

      {hasMoreErrors && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}
        >
          ... and {errors.length - maxErrors} more error
          {errors.length - maxErrors > 1 ? 's' : ''}
        </Typography>
      )}
    </Alert>
  );
};

// Hook for form validation errors
export const useValidationErrors = () => {
  const formatApiErrors = (apiError: any): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (apiError?.data?.errors) {
      // Handle structured API errors
      if (Array.isArray(apiError.data.errors)) {
        apiError.data.errors.forEach((error: any) => {
          errors.push({
            field: error.field || 'general',
            message: error.message || 'Invalid input',
            code: error.code,
            severity: error.severity || 'error',
          });
        });
      } else if (typeof apiError.data.errors === 'object') {
        // Handle object-based errors (field: message format)
        Object.entries(apiError.data.errors).forEach(([field, message]) => {
          errors.push({
            field,
            message: Array.isArray(message) ? message[0] : String(message),
            severity: 'error',
          });
        });
      }
    } else if (apiError?.data?.message) {
      // Handle single error message
      errors.push({
        field: 'general',
        message: apiError.data.message,
        severity: 'error',
      });
    } else if (apiError?.message) {
      // Handle generic error message
      errors.push({
        field: 'general',
        message: apiError.message,
        severity: 'error',
      });
    }

    return errors;
  };

  const formatZodErrors = (zodError: any): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (zodError?.issues) {
      zodError.issues.forEach((issue: any) => {
        errors.push({
          field: issue.path?.join('.') || 'general',
          message: issue.message,
          code: issue.code,
          severity: 'error',
        });
      });
    }

    return errors;
  };

  return {
    formatApiErrors,
    formatZodErrors,
  };
};

export default ValidationErrorDisplay;

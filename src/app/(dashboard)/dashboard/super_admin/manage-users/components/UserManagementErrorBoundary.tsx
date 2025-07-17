'use client';

import { Box, Button, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <Box
      role="alert"
      aria-labelledby="error-title"
      aria-describedby="error-description"
      sx={{
        p: 3,
        textAlign: 'center',
        border: '1px solid',
        borderColor: 'error.main',
        borderRadius: 2,
        bgcolor: 'error.50',
        maxWidth: 600,
        mx: 'auto',
        my: 4,
      }}
    >
      <Typography
        id="error-title"
        variant="h5"
        component="h2"
        color="error.main"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Something went wrong
      </Typography>

      <Typography
        id="error-description"
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        We encountered an unexpected error while loading the user management
        interface. Please try refreshing the page or contact support if the
        problem persists.
      </Typography>

      {isDevelopment && (
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: 'grey.100',
            borderRadius: 1,
            textAlign: 'left',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: 'error.dark',
            overflow: 'auto',
            maxHeight: 200,
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Error Details (Development Only):
          </Typography>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {error.message}
            {error.stack && `\n\nStack Trace:\n${error.stack}`}
          </pre>
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={resetErrorBoundary}
        sx={{ mt: 2 }}
        aria-describedby="error-description"
      >
        Try Again
      </Button>
    </Box>
  );
};

interface UserManagementErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

const UserManagementErrorBoundary = ({
  children,
  onError,
}: UserManagementErrorBoundaryProps) => {
  const handleError = (error: Error, errorInfo: any) => {
    // Log error for monitoring
    console.error(
      'User Management Error Boundary caught an error:',
      error,
      errorInfo
    );

    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={() => {
        // Clear any cached data that might be causing the error
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default UserManagementErrorBoundary;

'use client';

import { Refresh as RefreshIcon, Wifi as WifiIcon } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface NetworkError {
  message: string;
  status?: number;
  isNetworkError?: boolean;
  isTimeoutError?: boolean;
}

interface NetworkErrorHandlerProps {
  error: NetworkError | null;
  onRetry: () => void;
  isRetrying?: boolean;
  maxRetries?: number;
  autoRetry?: boolean;
  autoRetryDelay?: number;
  showDetails?: boolean;
}

const NetworkErrorHandler = ({
  error,
  onRetry,
  isRetrying = false,
  maxRetries = 3,
  autoRetry = false,
  autoRetryDelay = 5000,
  showDetails = false,
}: NetworkErrorHandlerProps) => {
  const [retryCount, setRetryCount] = useState(0);
  const [autoRetryCountdown, setAutoRetryCountdown] = useState(0);

  // Auto retry logic
  useEffect(() => {
    if (error && autoRetry && retryCount < maxRetries && !isRetrying) {
      const countdown = Math.floor(autoRetryDelay / 1000);
      setAutoRetryCountdown(countdown);

      const countdownInterval = setInterval(() => {
        setAutoRetryCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            handleRetry();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [error, autoRetry, retryCount, maxRetries, isRetrying, autoRetryDelay]);

  // Reset retry count when error is cleared
  useEffect(() => {
    if (!error) {
      setRetryCount(0);
      setAutoRetryCountdown(0);
    }
  }, [error]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
    setAutoRetryCountdown(0);
    onRetry();
  };

  const getErrorSeverity = (): 'error' | 'warning' | 'info' => {
    if (!error) return 'info';

    if (error.isNetworkError || error.isTimeoutError) {
      return 'warning';
    }

    if (error.status && error.status >= 500) {
      return 'error';
    }

    return 'warning';
  };

  const getErrorTitle = (): string => {
    if (!error) return '';

    if (error.isNetworkError) {
      return 'Network Connection Error';
    }

    if (error.isTimeoutError) {
      return 'Request Timeout';
    }

    if (error.status) {
      switch (error.status) {
        case 400:
          return 'Bad Request';
        case 401:
          return 'Authentication Required';
        case 403:
          return 'Access Denied';
        case 404:
          return 'Not Found';
        case 429:
          return 'Too Many Requests';
        case 500:
          return 'Server Error';
        case 502:
          return 'Bad Gateway';
        case 503:
          return 'Service Unavailable';
        default:
          return `Error ${error.status}`;
      }
    }

    return 'Request Failed';
  };

  const getErrorMessage = (): string => {
    if (!error) return '';

    if (error.isNetworkError) {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }

    if (error.isTimeoutError) {
      return 'The request took too long to complete. Please try again.';
    }

    if (error.status) {
      switch (error.status) {
        case 400:
          return 'The request was invalid. Please check your input and try again.';
        case 401:
          return 'Your session has expired. Please log in again.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested resource was not found.';
        case 429:
          return 'Too many requests. Please wait a moment before trying again.';
        case 500:
          return 'An internal server error occurred. Please try again later.';
        case 502:
          return 'The server is temporarily unavailable. Please try again later.';
        case 503:
          return 'The service is temporarily unavailable. Please try again later.';
        default:
          return error.message || 'An unexpected error occurred.';
      }
    }

    return error.message || 'An unexpected error occurred.';
  };

  const getRetryButtonText = (): string => {
    if (isRetrying) {
      return 'Retrying...';
    }

    if (autoRetryCountdown > 0) {
      return `Auto retry in ${autoRetryCountdown}s`;
    }

    if (retryCount > 0) {
      return `Retry (${retryCount}/${maxRetries})`;
    }

    return 'Try Again';
  };

  const shouldShowRetryButton = (): boolean => {
    return retryCount < maxRetries && !autoRetryCountdown;
  };

  if (!error) return null;

  return (
    <Alert
      severity={getErrorSeverity()}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      sx={{
        mb: 2,
        '& .MuiAlert-message': {
          width: '100%',
        },
      }}
      icon={error.isNetworkError ? <WifiIcon /> : undefined}
      action={
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {autoRetryCountdown > 0 && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mr: 1 }}
              aria-live="polite"
            >
              Auto retry in {autoRetryCountdown}s
            </Typography>
          )}

          {shouldShowRetryButton() && (
            <Button
              color="inherit"
              size="small"
              onClick={handleRetry}
              disabled={isRetrying}
              startIcon={
                isRetrying ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <RefreshIcon />
                )
              }
              aria-describedby="error-message"
            >
              {getRetryButtonText()}
            </Button>
          )}
        </Box>
      }
    >
      <Box>
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ fontWeight: 600, mb: 0.5 }}
        >
          {getErrorTitle()}
        </Typography>

        <Typography
          id="error-message"
          variant="body2"
          component="div"
          sx={{ mb: showDetails ? 1 : 0 }}
        >
          {getErrorMessage()}
        </Typography>

        {showDetails && error.status && (
          <Typography
            variant="caption"
            color="text.secondary"
            component="div"
            sx={{ fontFamily: 'monospace' }}
          >
            Status: {error.status}
            {retryCount > 0 && ` | Attempts: ${retryCount}/${maxRetries}`}
          </Typography>
        )}

        {retryCount >= maxRetries && (
          <Typography
            variant="body2"
            color="error.main"
            sx={{ mt: 1, fontWeight: 500 }}
          >
            Maximum retry attempts reached. Please refresh the page or contact
            support.
          </Typography>
        )}
      </Box>
    </Alert>
  );
};

export default NetworkErrorHandler;

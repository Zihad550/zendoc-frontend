'use client';

import {
  Close as CloseIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CheckCircle as SuccessIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  UserManagementError,
  UserManagementErrorHandler,
} from '../utils/errorHandling';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

interface ErrorToastContextType {
  showToast: (message: Omit<ToastMessage, 'id'>) => void;
  showError: (error: UserManagementError | string, title?: string) => void;
  showSuccess: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
  hideToast: (id: string) => void;
  hideAllToasts: () => void;
}

const ErrorToastContext = createContext<ErrorToastContextType | undefined>(
  undefined
);

interface ErrorToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
  defaultDuration?: number;
}

export const ErrorToastProvider = ({
  children,
  maxToasts = 5,
  defaultDuration = 6000,
}: ErrorToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const showToast = useCallback(
    (message: Omit<ToastMessage, 'id'>) => {
      const id = generateId();
      const newToast: ToastMessage = {
        id,
        duration: defaultDuration,
        ...message,
      };

      setToasts((prev) => {
        const updated = [newToast, ...prev];
        // Limit the number of toasts
        return updated.slice(0, maxToasts);
      });

      // Auto-hide toast if not persistent
      if (!newToast.persistent && newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          hideToast(id);
        }, newToast.duration);
      }
    },
    [generateId, defaultDuration, maxToasts]
  );

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const hideAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const showError = useCallback(
    (error: UserManagementError | string, title?: string) => {
      let message: string;
      let errorTitle = title || 'Error';

      if (typeof error === 'string') {
        message = error;
      } else {
        message = UserManagementErrorHandler.getUserFriendlyMessage(error);

        // Set appropriate title based on error type
        if (!title) {
          switch (error.type) {
            case 'network':
              errorTitle = 'Connection Error';
              break;
            case 'permission':
              errorTitle = 'Access Denied';
              break;
            case 'validation':
              errorTitle = 'Validation Error';
              break;
            case 'server':
              errorTitle = 'Server Error';
              break;
            default:
              errorTitle = 'Error';
          }
        }
      }

      showToast({
        type: 'error',
        title: errorTitle,
        message,
        duration: 8000, // Longer duration for errors
        persistent: typeof error === 'object' && error.type === 'permission',
      });
    },
    [showToast]
  );

  const showSuccess = useCallback(
    (message: string, title?: string) => {
      showToast({
        type: 'success',
        title: title || 'Success',
        message,
        duration: 4000, // Shorter duration for success messages
      });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, title?: string) => {
      showToast({
        type: 'warning',
        title: title || 'Warning',
        message,
        duration: 6000,
      });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, title?: string) => {
      showToast({
        type: 'info',
        title: title || 'Information',
        message,
        duration: 5000,
      });
    },
    [showToast]
  );

  const getToastIcon = (type: ToastMessage['type']) => {
    switch (type) {
      case 'success':
        return <SuccessIcon />;
      case 'error':
        return <ErrorIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const contextValue: ErrorToastContextType = {
    showToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    hideToast,
    hideAllToasts,
  };

  return (
    <ErrorToastContext.Provider value={contextValue}>
      {children}

      {/* Toast Container */}
      <Box
        sx={{
          position: 'fixed',
          top: 80, // Below the app bar
          right: 16,
          zIndex: 9999,
          maxWidth: 400,
          width: '100%',
        }}
      >
        <Stack spacing={1}>
          {toasts.map((toast) => (
            <Snackbar
              key={toast.id}
              open={true}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              sx={{ position: 'relative', width: '100%' }}
            >
              <Alert
                severity={toast.type}
                icon={getToastIcon(toast.type)}
                action={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {toast.action && (
                      <IconButton
                        size="small"
                        color="inherit"
                        onClick={toast.action.onClick}
                        aria-label={toast.action.label}
                      >
                        <Typography
                          variant="button"
                          sx={{ fontSize: '0.75rem' }}
                        >
                          {toast.action.label}
                        </Typography>
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={() => hideToast(toast.id)}
                      aria-label="Close notification"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                }
                sx={{
                  width: '100%',
                  boxShadow: 3,
                  '& .MuiAlert-message': {
                    width: '100%',
                  },
                }}
                role="alert"
                aria-live="polite"
                aria-atomic="true"
              >
                {toast.title && (
                  <AlertTitle sx={{ mb: 0.5 }}>{toast.title}</AlertTitle>
                )}
                <Typography variant="body2">{toast.message}</Typography>
              </Alert>
            </Snackbar>
          ))}
        </Stack>
      </Box>
    </ErrorToastContext.Provider>
  );
};

export const useErrorToast = (): ErrorToastContextType => {
  const context = useContext(ErrorToastContext);
  if (!context) {
    throw new Error('useErrorToast must be used within an ErrorToastProvider');
  }
  return context;
};

// Convenience hooks for specific toast types
export const useErrorHandler = () => {
  const { showError } = useErrorToast();

  const handleError = useCallback(
    (error: any, operation?: string, context?: any) => {
      const parsedError = UserManagementErrorHandler.parseError(error, context);

      // Log the error
      UserManagementErrorHandler.logError(
        parsedError,
        operation
          ? UserManagementErrorHandler.createContext(operation, context)
          : undefined
      );

      // Show user-friendly error message
      showError(parsedError);

      return parsedError;
    },
    [showError]
  );

  return { handleError };
};

export const useSuccessHandler = () => {
  const { showSuccess } = useErrorToast();

  const handleSuccess = useCallback(
    (message: string, title?: string) => {
      showSuccess(message, title);
    },
    [showSuccess]
  );

  return { handleSuccess };
};

/**
 * Centralized error handling utilities for user management
 */

export interface UserManagementError {
  type: "network" | "validation" | "permission" | "server" | "unknown";
  message: string;
  status?: number;
  code?: string;
  field?: string;
  isRetryable?: boolean;
  isNetworkError?: boolean;
  isTimeoutError?: boolean;
  details?: any;
}

export interface ErrorContext {
  operation: string;
  userId?: string;
  userIds?: string[];
  timestamp: Date;
  userAgent?: string;
}

/**
 * Error classification and message mapping
 */
export class UserManagementErrorHandler {
  private static readonly ERROR_MESSAGES = {
    // Network errors
    NETWORK_ERROR:
      "Unable to connect to the server. Please check your internet connection.",
    TIMEOUT_ERROR: "The request took too long to complete. Please try again.",
    CONNECTION_REFUSED:
      "Connection to the server was refused. Please try again later.",

    // Authentication/Authorization errors
    UNAUTHORIZED: "Your session has expired. Please log in again.",
    FORBIDDEN: "You do not have permission to perform this action.",
    TOKEN_EXPIRED:
      "Your authentication token has expired. Please log in again.",

    // Validation errors
    VALIDATION_FAILED: "Please correct the highlighted fields and try again.",
    EMAIL_EXISTS: "A user with this email address already exists.",
    INVALID_EMAIL: "Please enter a valid email address.",
    INVALID_ROLE: "The selected role is not valid.",
    REQUIRED_FIELD: "This field is required.",

    // User operation errors
    USER_NOT_FOUND: "The requested user could not be found.",
    USER_ALREADY_SUSPENDED: "This user is already suspended.",
    USER_ALREADY_ACTIVE: "This user is already active.",
    CANNOT_DELETE_SELF: "You cannot delete your own account.",
    CANNOT_MODIFY_SUPER_ADMIN:
      "Super admin accounts cannot be modified by other users.",

    // Bulk operation errors
    BULK_OPERATION_FAILED: "Some operations failed. Please review the results.",
    BULK_OPERATION_PARTIAL: "The bulk operation completed with some failures.",
    TOO_MANY_USERS_SELECTED:
      "Too many users selected. Please select fewer users.",

    // Server errors
    INTERNAL_SERVER_ERROR:
      "An internal server error occurred. Please try again later.",
    SERVICE_UNAVAILABLE:
      "The service is temporarily unavailable. Please try again later.",
    BAD_GATEWAY:
      "The server is temporarily unavailable. Please try again later.",

    // Rate limiting
    RATE_LIMITED:
      "Too many requests. Please wait a moment before trying again.",

    // Export errors
    EXPORT_FAILED: "Failed to generate export. Please try again.",
    EXPORT_TOO_LARGE:
      "The export is too large. Please apply filters to reduce the data size.",
    EXPORT_PERMISSION_DENIED: "You do not have permission to export user data.",

    // Generic fallback
    UNKNOWN_ERROR:
      "An unexpected error occurred. Please try again or contact support.",
  };

  private static readonly RETRYABLE_ERRORS = [
    "NETWORK_ERROR",
    "TIMEOUT_ERROR",
    "CONNECTION_REFUSED",
    "INTERNAL_SERVER_ERROR",
    "SERVICE_UNAVAILABLE",
    "BAD_GATEWAY",
  ];

  /**
   * Parse and classify an error from various sources
   */
  static parseError(
    error: any,
    context?: Partial<ErrorContext>,
  ): UserManagementError {
    // Handle RTK Query errors
    if (error?.status !== undefined) {
      return this.parseRTKQueryError(error, context);
    }

    // Handle Axios errors
    if (error?.response) {
      return this.parseAxiosError(error, context);
    }

    // Handle fetch errors
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return this.parseNetworkError(error, context);
    }

    // Handle validation errors (Zod, etc.)
    if (error?.issues || error?.errors) {
      return this.parseValidationError(error, context);
    }

    // Handle custom application errors
    if (error?.type && error?.message) {
      return error as UserManagementError;
    }

    // Fallback for unknown errors
    return this.createUnknownError(error, context);
  }

  /**
   * Parse RTK Query errors
   */
  private static parseRTKQueryError(error: any, _context?: Partial<ErrorContext>): UserManagementError {
    const status = error.status;
    const data = error.data;

    // Handle specific status codes
    switch (status) {
      case 400:
        return {
          type: "validation",
          message: data?.message || this.ERROR_MESSAGES.VALIDATION_FAILED,
          status,
          isRetryable: false,
          details: data,
        };

      case 401:
        return {
          type: "permission",
          message: this.ERROR_MESSAGES.UNAUTHORIZED,
          status,
          isRetryable: false,
        };

      case 403:
        return {
          type: "permission",
          message: this.ERROR_MESSAGES.FORBIDDEN,
          status,
          isRetryable: false,
        };

      case 404:
        return {
          type: "validation",
          message: this.ERROR_MESSAGES.USER_NOT_FOUND,
          status,
          isRetryable: false,
        };

      case 409:
        return {
          type: "validation",
          message: data?.message || this.ERROR_MESSAGES.EMAIL_EXISTS,
          status,
          isRetryable: false,
        };

      case 429:
        return {
          type: "server",
          message: this.ERROR_MESSAGES.RATE_LIMITED,
          status,
          isRetryable: true,
        };

      case 500:
        return {
          type: "server",
          message: this.ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
          status,
          isRetryable: true,
        };

      case 502:
        return {
          type: "server",
          message: this.ERROR_MESSAGES.BAD_GATEWAY,
          status,
          isRetryable: true,
        };

      case 503:
        return {
          type: "server",
          message: this.ERROR_MESSAGES.SERVICE_UNAVAILABLE,
          status,
          isRetryable: true,
        };

      case "FETCH_ERROR":
        return {
          type: "network",
          message: this.ERROR_MESSAGES.NETWORK_ERROR,
          isNetworkError: true,
          isRetryable: true,
        };

      case "TIMEOUT_ERROR":
        return {
          type: "network",
          message: this.ERROR_MESSAGES.TIMEOUT_ERROR,
          isTimeoutError: true,
          isRetryable: true,
        };

      default:
        return {
          type: "unknown",
          message: data?.message || this.ERROR_MESSAGES.UNKNOWN_ERROR,
          status,
          isRetryable: false,
        };
    }
  }

  /**
   * Parse Axios errors
   */
  private static parseAxiosError(
    error: any,
    context?: Partial<ErrorContext>,
  ): UserManagementError {
    const response = error.response;
    const status = response?.status;
    const data = response?.data;

    if (error.code === "ECONNABORTED") {
      return {
        type: "network",
        message: this.ERROR_MESSAGES.TIMEOUT_ERROR,
        isTimeoutError: true,
        isRetryable: true,
      };
    }

    if (error.code === "ECONNREFUSED") {
      return {
        type: "network",
        message: this.ERROR_MESSAGES.CONNECTION_REFUSED,
        isNetworkError: true,
        isRetryable: true,
      };
    }

    // Use the same status code handling as RTK Query
    return this.parseRTKQueryError({ status, data }, context);
  }

  /**
   * Parse network errors
   */
  private static parseNetworkError(error: Error, _context?: Partial<ErrorContext>): UserManagementError {
    return {
      type: "network",
      message: this.ERROR_MESSAGES.NETWORK_ERROR,
      isNetworkError: true,
      isRetryable: true,
      details: error.message,
    };
  }

  /**
   * Parse validation errors
   */
  private static parseValidationError(error: any, _context?: Partial<ErrorContext>): UserManagementError {
    let message = this.ERROR_MESSAGES.VALIDATION_FAILED;
    let details = error;

    // Handle Zod errors
    if (error.issues) {
      const firstIssue = error.issues[0];
      message = firstIssue?.message || message;
      details = error.issues;
    }

    // Handle API validation errors
    if (error.errors && Array.isArray(error.errors)) {
      const firstError = error.errors[0];
      message = firstError?.message || message;
    }

    return {
      type: "validation",
      message,
      isRetryable: false,
      details,
    };
  }

  /**
   * Create unknown error
   */
  private static createUnknownError(error: any, _context?: Partial<ErrorContext>): UserManagementError {
    return {
      type: "unknown",
      message: error?.message || this.ERROR_MESSAGES.UNKNOWN_ERROR,
      isRetryable: false,
      details: error,
    };
  }

  /**
   * Check if an error is retryable
   */
  static isRetryable(error: UserManagementError): boolean {
    return error.isRetryable || false;
  }

  /**
   * Get user-friendly error message
   */
  static getUserFriendlyMessage(
    error: UserManagementError,
    context?: Partial<ErrorContext>,
  ): string {
    // Add context-specific messages
    if (context?.operation) {
      switch (context.operation) {
        case "createUser":
          if (error.type === "validation" && error.message.includes("email")) {
            return "Please enter a valid email address for the new user.";
          }
          break;
        case "bulkDelete":
          if (error.type === "permission") {
            return "You do not have permission to delete some of the selected users.";
          }
          break;
        case "export":
          if (error.type === "server") {
            return "Failed to generate the export file. Please try again or contact support.";
          }
          break;
      }
    }

    return error.message;
  }

  /**
   * Log error for monitoring and debugging
   */
  static logError(error: UserManagementError, context?: ErrorContext): void {
    const logData = {
      error: {
        type: error.type,
        message: error.message,
        status: error.status,
        code: error.code,
        field: error.field,
      },
      context: {
        operation: context?.operation,
        userId: context?.userId,
        userIds: context?.userIds,
        timestamp: context?.timestamp || new Date(),
        userAgent: context?.userAgent || navigator.userAgent,
      },
      details: error.details,
    };

    // In development, log to console
    if (process.env.NODE_ENV === "development") {
      console.error("User Management Error:", logData);
    }

    // In production, send to error reporting service
    if (process.env.NODE_ENV === "production") {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: logData });
    }
  }

  /**
   * Create error context for operations
   */
  static createContext(
    operation: string,
    additionalData?: Partial<ErrorContext>,
  ): ErrorContext {
    return {
      operation,
      timestamp: new Date(),
      userAgent: navigator.userAgent,
      ...additionalData,
    };
  }

  /**
   * Handle bulk operation errors
   */
  static handleBulkOperationError(
    error: any,
    operation: string,
    userIds: string[],
  ): UserManagementError {
    const context = this.createContext(operation, { userIds });
    const parsedError = this.parseError(error, context);

    // Add bulk operation specific handling
    if (parsedError.type === "validation" && userIds.length > 100) {
      return {
        ...parsedError,
        message: this.ERROR_MESSAGES.TOO_MANY_USERS_SELECTED,
      };
    }

    return parsedError;
  }

  /**
   * Handle export operation errors
   */
  static handleExportError(
    error: any,
    exportType: string,
  ): UserManagementError {
    const context = this.createContext(`export_${exportType}`);
    const parsedError = this.parseError(error, context);

    // Add export specific handling
    if (parsedError.status === 413) {
      return {
        ...parsedError,
        message: this.ERROR_MESSAGES.EXPORT_TOO_LARGE,
      };
    }

    if (parsedError.status === 403) {
      return {
        ...parsedError,
        message: this.ERROR_MESSAGES.EXPORT_PERMISSION_DENIED,
      };
    }

    return parsedError;
  }
}

/**
 * Hook for handling errors in user management components
 */
export const useUserManagementErrorHandler = () => {
  const handleError = (
    error: any,
    operation: string,
    additionalContext?: Partial<ErrorContext>,
  ) => {
    const context = UserManagementErrorHandler.createContext(
      operation,
      additionalContext,
    );
    const parsedError = UserManagementErrorHandler.parseError(error, context);

    // Log the error
    UserManagementErrorHandler.logError(parsedError, context);

    return parsedError;
  };

  const handleBulkError = (
    error: any,
    operation: string,
    userIds: string[],
  ) => {
    return UserManagementErrorHandler.handleBulkOperationError(
      error,
      operation,
      userIds,
    );
  };

  const handleExportError = (error: any, exportType: string) => {
    return UserManagementErrorHandler.handleExportError(error, exportType);
  };

  const getUserFriendlyMessage = (
    error: UserManagementError,
    context?: Partial<ErrorContext>,
  ) => {
    return UserManagementErrorHandler.getUserFriendlyMessage(error, context);
  };

  const isRetryable = (error: UserManagementError) => {
    return UserManagementErrorHandler.isRetryable(error);
  };

  return {
    handleError,
    handleBulkError,
    handleExportError,
    getUserFriendlyMessage,
    isRetryable,
  };
};

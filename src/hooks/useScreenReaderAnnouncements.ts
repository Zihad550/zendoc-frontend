import { useCallback, useRef } from 'react';

/**
 * Hook for making screen reader announcements
 * Provides accessible feedback for dynamic content changes
 */
export const useScreenReaderAnnouncements = () => {
  const announcementRef = useRef<HTMLDivElement | null>(null);

  /**
   * Create or get the announcement element
   */
  const getAnnouncementElement = useCallback(() => {
    if (!announcementRef.current) {
      // Create a live region for announcements
      const element = document.createElement('div');
      element.setAttribute('aria-live', 'polite');
      element.setAttribute('aria-atomic', 'true');
      element.setAttribute('role', 'status');
      element.style.position = 'absolute';
      element.style.left = '-10000px';
      element.style.width = '1px';
      element.style.height = '1px';
      element.style.overflow = 'hidden';
      element.id = 'user-management-announcements';

      document.body.appendChild(element);
      announcementRef.current = element;
    }
    return announcementRef.current;
  }, []);

  /**
   * Make a polite announcement (won't interrupt current speech)
   */
  const announcePolite = useCallback(
    (message: string) => {
      const element = getAnnouncementElement();
      element.setAttribute('aria-live', 'polite');
      element.textContent = message;

      // Clear after a delay to allow for repeated announcements
      setTimeout(() => {
        if (element.textContent === message) {
          element.textContent = '';
        }
      }, 1000);
    },
    [getAnnouncementElement]
  );

  /**
   * Make an assertive announcement (will interrupt current speech)
   */
  const announceAssertive = useCallback(
    (message: string) => {
      const element = getAnnouncementElement();
      element.setAttribute('aria-live', 'assertive');
      element.textContent = message;

      // Clear after a delay
      setTimeout(() => {
        if (element.textContent === message) {
          element.textContent = '';
        }
      }, 1000);
    },
    [getAnnouncementElement]
  );

  /**
   * Announce user management specific actions
   */
  const announceUserAction = useCallback(
    (action: string, userName: string, success: boolean) => {
      const message = success
        ? `Successfully ${action} user ${userName}`
        : `Failed to ${action} user ${userName}`;

      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Announce bulk operation results
   */
  const announceBulkOperation = useCallback(
    (
      operation: string,
      successCount: number,
      failureCount: number,
      totalCount: number
    ) => {
      let message = `Bulk ${operation} completed. `;

      if (failureCount === 0) {
        message += `Successfully processed all ${totalCount} users.`;
      } else if (successCount === 0) {
        message += `Failed to process all ${totalCount} users.`;
      } else {
        message += `Successfully processed ${successCount} users, ${failureCount} failed.`;
      }

      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Announce search/filter results
   */
  const announceSearchResults = useCallback(
    (resultCount: number, searchTerm?: string) => {
      let message = `Found ${resultCount} user${resultCount !== 1 ? 's' : ''}`;

      if (searchTerm) {
        message += ` matching "${searchTerm}"`;
      }

      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Announce loading states
   */
  const announceLoading = useCallback(
    (isLoading: boolean, context?: string) => {
      const message = isLoading
        ? `Loading${context ? ` ${context}` : ''}...`
        : `Finished loading${context ? ` ${context}` : ''}`;

      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Announce errors
   */
  const announceError = useCallback(
    (error: string, context?: string) => {
      const message = `Error${context ? ` ${context}` : ''}: ${error}`;
      announceAssertive(message);
    },
    [announceAssertive]
  );

  /**
   * Announce form validation errors
   */
  const announceValidationErrors = useCallback(
    (errorCount: number) => {
      const message = `Form has ${errorCount} validation error${
        errorCount !== 1 ? 's' : ''
      }. Please review and correct the highlighted fields.`;
      announceAssertive(message);
    },
    [announceAssertive]
  );

  /**
   * Announce pagination changes
   */
  const announcePagination = useCallback(
    (currentPage: number, totalPages: number, totalItems: number) => {
      const message = `Page ${currentPage} of ${totalPages}, showing ${totalItems} total users`;
      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Announce sort changes
   */
  const announceSortChange = useCallback(
    (sortField: string, sortOrder: 'asc' | 'desc') => {
      const orderText = sortOrder === 'asc' ? 'ascending' : 'descending';
      const message = `Users sorted by ${sortField} in ${orderText} order`;
      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Announce filter changes
   */
  const announceFilterChange = useCallback(
    (filterType: string, filterValue: string, isActive: boolean) => {
      const action = isActive ? 'applied' : 'removed';
      const message = `Filter ${action}: ${filterType} ${filterValue}`;
      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Announce export completion
   */
  const announceExportComplete = useCallback(
    (exportType: string, userCount: number) => {
      const message = `Export completed. ${exportType} file generated with ${userCount} users.`;
      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Announce modal state changes
   */
  const announceModalState = useCallback(
    (modalName: string, isOpen: boolean) => {
      const message = isOpen
        ? `${modalName} dialog opened`
        : `${modalName} dialog closed`;
      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Announce selection changes
   */
  const announceSelectionChange = useCallback(
    (selectedCount: number, totalCount: number) => {
      let message;

      if (selectedCount === 0) {
        message = 'No users selected';
      } else if (selectedCount === totalCount) {
        message = `All ${totalCount} users selected`;
      } else {
        message = `${selectedCount} of ${totalCount} users selected`;
      }

      announcePolite(message);
    },
    [announcePolite]
  );

  /**
   * Clean up announcement element
   */
  const cleanup = useCallback(() => {
    if (announcementRef.current) {
      document.body.removeChild(announcementRef.current);
      announcementRef.current = null;
    }
  }, []);

  return {
    announcePolite,
    announceAssertive,
    announceUserAction,
    announceBulkOperation,
    announceSearchResults,
    announceLoading,
    announceError,
    announceValidationErrors,
    announcePagination,
    announceSortChange,
    announceFilterChange,
    announceExportComplete,
    announceModalState,
    announceSelectionChange,
    cleanup,
  };
};

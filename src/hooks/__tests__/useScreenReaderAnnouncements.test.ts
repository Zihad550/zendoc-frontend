import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useScreenReaderAnnouncements } from '../useScreenReaderAnnouncements';

describe('useScreenReaderAnnouncements', () => {
  let mockElement: HTMLDivElement;

  beforeEach(() => {
    // Mock DOM methods
    mockElement = {
      setAttribute: vi.fn(),
      textContent: '',
      style: {} as CSSStyleDeclaration,
      id: '',
    } as unknown as HTMLDivElement;

    vi.spyOn(document, 'createElement').mockReturnValue(mockElement);
    vi.spyOn(document.body, 'appendChild').mockImplementation(
      () => mockElement
    );
    vi.spyOn(document.body, 'removeChild').mockImplementation(
      () => mockElement
    );

    // Mock setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('announcePolite', () => {
    it('should create announcement element and set polite message', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announcePolite('Test message');
      });

      expect(document.createElement).toHaveBeenCalledWith('div');
      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        'aria-live',
        'polite'
      );
      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        'aria-atomic',
        'true'
      );
      expect(mockElement.setAttribute).toHaveBeenCalledWith('role', 'status');
      expect(mockElement.textContent).toBe('Test message');
      expect(document.body.appendChild).toHaveBeenCalledWith(mockElement);
    });

    it('should clear message after timeout', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announcePolite('Test message');
      });

      expect(mockElement.textContent).toBe('Test message');

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(mockElement.textContent).toBe('');
    });

    it('should reuse existing announcement element', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announcePolite('First message');
      });

      act(() => {
        result.current.announcePolite('Second message');
      });

      expect(document.createElement).toHaveBeenCalledTimes(1);
      expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    });
  });

  describe('announceAssertive', () => {
    it('should set assertive aria-live attribute', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceAssertive('Urgent message');
      });

      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        'aria-live',
        'assertive'
      );
      expect(mockElement.textContent).toBe('Urgent message');
    });
  });

  describe('announceUserAction', () => {
    it('should announce successful user action', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceUserAction('delete', 'John Doe', true);
      });

      expect(mockElement.textContent).toBe('Successfully delete user John Doe');
    });

    it('should announce failed user action', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceUserAction('update', 'Jane Smith', false);
      });

      expect(mockElement.textContent).toBe('Failed to update user Jane Smith');
    });
  });

  describe('announceBulkOperation', () => {
    it('should announce successful bulk operation', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceBulkOperation('delete', 5, 0, 5);
      });

      expect(mockElement.textContent).toBe(
        'Bulk delete completed. Successfully processed all 5 users.'
      );
    });

    it('should announce failed bulk operation', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceBulkOperation('update', 0, 3, 3);
      });

      expect(mockElement.textContent).toBe(
        'Bulk update completed. Failed to process all 3 users.'
      );
    });

    it('should announce partial bulk operation', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceBulkOperation('delete', 3, 2, 5);
      });

      expect(mockElement.textContent).toBe(
        'Bulk delete completed. Successfully processed 3 users, 2 failed.'
      );
    });
  });

  describe('announceSearchResults', () => {
    it('should announce search results without search term', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceSearchResults(10);
      });

      expect(mockElement.textContent).toBe('Found 10 users');
    });

    it('should announce search results with search term', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceSearchResults(3, 'doctor');
      });

      expect(mockElement.textContent).toBe('Found 3 users matching "doctor"');
    });

    it('should handle singular result', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceSearchResults(1);
      });

      expect(mockElement.textContent).toBe('Found 1 user');
    });
  });

  describe('announceLoading', () => {
    it('should announce loading start', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceLoading(true, 'user data');
      });

      expect(mockElement.textContent).toBe('Loading user data...');
    });

    it('should announce loading end', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceLoading(false, 'user data');
      });

      expect(mockElement.textContent).toBe('Finished loading user data');
    });

    it('should handle loading without context', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceLoading(true);
      });

      expect(mockElement.textContent).toBe('Loading...');
    });
  });

  describe('announceError', () => {
    it('should announce error with context', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceError('Network timeout', 'fetching users');
      });

      expect(mockElement.setAttribute).toHaveBeenCalledWith(
        'aria-live',
        'assertive'
      );
      expect(mockElement.textContent).toBe(
        'Error fetching users: Network timeout'
      );
    });

    it('should announce error without context', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceError('Something went wrong');
      });

      expect(mockElement.textContent).toBe('Error: Something went wrong');
    });
  });

  describe('announceValidationErrors', () => {
    it('should announce single validation error', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceValidationErrors(1);
      });

      expect(mockElement.textContent).toBe(
        'Form has 1 validation error. Please review and correct the highlighted fields.'
      );
    });

    it('should announce multiple validation errors', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceValidationErrors(3);
      });

      expect(mockElement.textContent).toBe(
        'Form has 3 validation errors. Please review and correct the highlighted fields.'
      );
    });
  });

  describe('announcePagination', () => {
    it('should announce pagination information', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announcePagination(2, 5, 100);
      });

      expect(mockElement.textContent).toBe(
        'Page 2 of 5, showing 100 total users'
      );
    });
  });

  describe('announceSortChange', () => {
    it('should announce ascending sort', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceSortChange('name', 'asc');
      });

      expect(mockElement.textContent).toBe(
        'Users sorted by name in ascending order'
      );
    });

    it('should announce descending sort', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceSortChange('date', 'desc');
      });

      expect(mockElement.textContent).toBe(
        'Users sorted by date in descending order'
      );
    });
  });

  describe('announceFilterChange', () => {
    it('should announce filter applied', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceFilterChange('role', 'doctor', true);
      });

      expect(mockElement.textContent).toBe('Filter applied: role doctor');
    });

    it('should announce filter removed', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceFilterChange('status', 'active', false);
      });

      expect(mockElement.textContent).toBe('Filter removed: status active');
    });
  });

  describe('announceExportComplete', () => {
    it('should announce export completion', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceExportComplete('CSV', 50);
      });

      expect(mockElement.textContent).toBe(
        'Export completed. CSV file generated with 50 users.'
      );
    });
  });

  describe('announceModalState', () => {
    it('should announce modal opened', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceModalState('User Details', true);
      });

      expect(mockElement.textContent).toBe('User Details dialog opened');
    });

    it('should announce modal closed', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceModalState('User Details', false);
      });

      expect(mockElement.textContent).toBe('User Details dialog closed');
    });
  });

  describe('announceSelectionChange', () => {
    it('should announce no selection', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceSelectionChange(0, 10);
      });

      expect(mockElement.textContent).toBe('No users selected');
    });

    it('should announce all selected', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceSelectionChange(10, 10);
      });

      expect(mockElement.textContent).toBe('All 10 users selected');
    });

    it('should announce partial selection', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announceSelectionChange(3, 10);
      });

      expect(mockElement.textContent).toBe('3 of 10 users selected');
    });
  });

  describe('cleanup', () => {
    it('should remove announcement element from DOM', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      // First create the element
      act(() => {
        result.current.announcePolite('Test message');
      });

      expect(document.body.appendChild).toHaveBeenCalled();

      // Then cleanup
      act(() => {
        result.current.cleanup();
      });

      expect(document.body.removeChild).toHaveBeenCalledWith(mockElement);
    });

    it('should handle cleanup when element does not exist', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.cleanup();
      });

      expect(document.body.removeChild).not.toHaveBeenCalled();
    });
  });

  describe('element styling', () => {
    it('should apply correct accessibility styles to announcement element', () => {
      const { result } = renderHook(() => useScreenReaderAnnouncements());

      act(() => {
        result.current.announcePolite('Test message');
      });

      expect(mockElement.style.position).toBe('absolute');
      expect(mockElement.style.left).toBe('-10000px');
      expect(mockElement.style.width).toBe('1px');
      expect(mockElement.style.height).toBe('1px');
      expect(mockElement.style.overflow).toBe('hidden');
      expect(mockElement.id).toBe('user-management-announcements');
    });
  });
});

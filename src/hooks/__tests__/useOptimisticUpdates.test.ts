import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useOptimisticUpdates } from '../useOptimisticUpdates';

describe('useOptimisticUpdates', () => {
  it('should initialize with provided initial data', () => {
    const initialData = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    expect(result.current.data).toEqual(initialData);
    expect(result.current.isUpdating).toBe(false);
    expect(result.current.pendingUpdates).toEqual([]);
  });

  it('should handle optimistic create operation', async () => {
    const initialData = [{ id: '1', name: 'Item 1' }];
    const newItem = { id: '2', name: 'Item 2' };
    const mockApiCall = vi.fn().mockResolvedValue(newItem);

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    await act(async () => {
      await result.current.optimisticCreate(newItem, mockApiCall);
    });

    expect(result.current.data).toEqual([newItem, ...initialData]);
    expect(mockApiCall).toHaveBeenCalled();
    expect(result.current.isUpdating).toBe(false);
  });

  it('should handle optimistic update operation', async () => {
    const initialData = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    const updatedItem = { id: '1', name: 'Updated Item 1' };
    const mockApiCall = vi.fn().mockResolvedValue(updatedItem);

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    await act(async () => {
      await result.current.optimisticUpdate(updatedItem, mockApiCall);
    });

    expect(result.current.data[0]).toEqual(updatedItem);
    expect(result.current.data[1]).toEqual(initialData[1]);
    expect(mockApiCall).toHaveBeenCalled();
    expect(result.current.isUpdating).toBe(false);
  });

  it('should handle optimistic delete operation', async () => {
    const initialData = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    const mockApiCall = vi.fn().mockResolvedValue(undefined);

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    await act(async () => {
      await result.current.optimisticDelete('1', mockApiCall);
    });

    expect(result.current.data).toEqual([{ id: '2', name: 'Item 2' }]);
    expect(mockApiCall).toHaveBeenCalled();
    expect(result.current.isUpdating).toBe(false);
  });

  it('should handle rollback on API failure', async () => {
    const initialData = [{ id: '1', name: 'Item 1' }];
    const newItem = { id: '2', name: 'Item 2' };
    const mockApiCall = vi.fn().mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    await act(async () => {
      try {
        await result.current.optimisticCreate(newItem, mockApiCall);
      } catch (error) {
        // Expected to throw
      }
    });

    // Should rollback to original data
    expect(result.current.data).toEqual(initialData);
    expect(result.current.isUpdating).toBe(false);
  });

  it('should handle delete of non-existent item gracefully', async () => {
    const initialData = [{ id: '1', name: 'Item 1' }];
    const mockApiCall = vi.fn().mockResolvedValue(undefined);

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    await act(async () => {
      try {
        await result.current.optimisticDelete('999', mockApiCall);
      } catch (error) {
        expect((error as Error).message).toBe('Item not found');
      }
    });

    // Should not crash and data should remain unchanged
    expect(result.current.data).toEqual(initialData);
    expect(result.current.isUpdating).toBe(false);
  });

  it('should reset data correctly', () => {
    const initialData = [{ id: '1', name: 'Item 1' }];
    const newData = [{ id: '2', name: 'Item 2' }];

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    act(() => {
      result.current.resetData(newData);
    });

    expect(result.current.data).toEqual(newData);
    expect(result.current.pendingUpdates).toEqual([]);
    expect(result.current.isUpdating).toBe(false);
  });

  it('should check for pending updates correctly', async () => {
    const initialData = [{ id: '1', name: 'Item 1' }];
    const updatedItem = { id: '1', name: 'Updated Item 1' };
    const mockApiCall = vi.fn().mockImplementation(() => new Promise(() => {})); // Never resolves

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    act(() => {
      result.current.optimisticUpdate(updatedItem, mockApiCall);
    });

    expect(result.current.hasPendingUpdates('1')).toBe(true);
    expect(result.current.hasPendingUpdates('2')).toBe(false);
    expect(result.current.getPendingUpdatesForItem('1')).toHaveLength(1);
  });

  it('should handle bulk updates', async () => {
    const initialData = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    const mockApiCall = vi.fn().mockResolvedValue('success');

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    await act(async () => {
      await result.current.optimisticBulkUpdate(
        initialData,
        'update',
        (item) => ({ ...item, name: `Updated ${item.name}` }),
        mockApiCall
      );
    });

    expect(result.current.data[0].name).toBe('Updated Item 1');
    expect(result.current.data[1].name).toBe('Updated Item 2');
    expect(mockApiCall).toHaveBeenCalled();
    expect(result.current.isUpdating).toBe(false);
  });

  it('should handle bulk update failures', async () => {
    const initialData = [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
    ];
    const mockApiCall = vi.fn().mockRejectedValue(new Error('Bulk API Error'));

    const { result } = renderHook(() => useOptimisticUpdates(initialData));

    await act(async () => {
      try {
        await result.current.optimisticBulkUpdate(
          initialData,
          'update',
          (item) => ({ ...item, name: `Updated ${item.name}` }),
          mockApiCall
        );
      } catch (error) {
        // Expected to throw
      }
    });

    // Should rollback to original data
    expect(result.current.data).toEqual(initialData);
    expect(result.current.isUpdating).toBe(false);
  });

  it('should handle options callbacks', async () => {
    const initialData = [{ id: '1', name: 'Item 1' }];
    const newItem = { id: '2', name: 'Item 2' };
    const onSuccess = vi.fn();
    const onError = vi.fn();
    const onRollback = vi.fn();

    const { result } = renderHook(() =>
      useOptimisticUpdates(initialData, {
        onSuccess,
        onError,
        onRollback,
      })
    );

    // Test successful operation
    const mockApiCall = vi.fn().mockResolvedValue(newItem);
    await act(async () => {
      await result.current.optimisticCreate(newItem, mockApiCall);
    });

    expect(onSuccess).toHaveBeenCalled();

    // Test failed operation
    const failedApiCall = vi.fn().mockRejectedValue(new Error('API Error'));
    await act(async () => {
      try {
        await result.current.optimisticCreate(
          { id: '3', name: 'Item 3' },
          failedApiCall
        );
      } catch (error) {
        // Expected to throw
      }
    });

    expect(onError).toHaveBeenCalled();
    expect(onRollback).toHaveBeenCalled();
  });
});

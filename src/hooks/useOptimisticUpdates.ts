import { useCallback, useState } from 'react';

/**
 * Hook for managing optimistic updates with rollback capability
 */
export interface OptimisticUpdate<T> {
  id: string;
  type: 'create' | 'update' | 'delete';
  data: T;
  originalData?: T;
  timestamp: number;
}

export interface UseOptimisticUpdatesOptions<T> {
  onSuccess?: (update: OptimisticUpdate<T>) => void;
  onError?: (update: OptimisticUpdate<T>, error: any) => void;
  onRollback?: (update: OptimisticUpdate<T>) => void;
}

export const useOptimisticUpdates = <T extends { id: string }>(
  initialData: T[],
  options: UseOptimisticUpdatesOptions<T> = {}
) => {
  const [data, setData] = useState<T[]>(initialData);
  const [pendingUpdates, setPendingUpdates] = useState<OptimisticUpdate<T>[]>(
    []
  );
  const [isUpdating, setIsUpdating] = useState(false);

  const generateUpdateId = useCallback(() => {
    return `update-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * Apply an optimistic update
   */
  const applyOptimisticUpdate = useCallback(
    (
      type: OptimisticUpdate<T>['type'],
      newData: T,
      originalData?: T
    ): string => {
      const updateId = generateUpdateId();
      const update: OptimisticUpdate<T> = {
        id: updateId,
        type,
        data: newData,
        originalData,
        timestamp: Date.now(),
      };

      // Apply the update to the data
      setData((prevData) => {
        switch (type) {
          case 'create':
            return [newData, ...prevData];
          case 'update':
            return prevData.map((item) =>
              item.id === newData.id ? newData : item
            );
          case 'delete':
            return prevData.filter((item) => item.id !== newData.id);
          default:
            return prevData;
        }
      });

      // Track the pending update
      setPendingUpdates((prev) => [...prev, update]);

      return updateId;
    },
    [generateUpdateId]
  );

  /**
   * Confirm an optimistic update (remove from pending)
   */
  const confirmUpdate = useCallback(
    (updateId: string, finalData?: T) => {
      setPendingUpdates((prev) => {
        const update = prev.find((u) => u.id === updateId);
        if (update && finalData) {
          // Update with final data from server
          setData((prevData) =>
            prevData.map((item) =>
              item.id === update.data.id ? finalData : item
            )
          );

          options.onSuccess?.(update);
        }
        return prev.filter((u) => u.id !== updateId);
      });
    },
    [options]
  );

  /**
   * Rollback an optimistic update
   */
  const rollbackUpdate = useCallback(
    (updateId: string, error?: any) => {
      setPendingUpdates((prev) => {
        const update = prev.find((u) => u.id === updateId);
        if (update) {
          // Rollback the data change
          setData((prevData) => {
            switch (update.type) {
              case 'create':
                return prevData.filter((item) => item.id !== update.data.id);
              case 'update':
                return update.originalData
                  ? prevData.map((item) =>
                      item.id === update.data.id ? update.originalData! : item
                    )
                  : prevData;
              case 'delete':
                return update.originalData
                  ? [update.originalData, ...prevData]
                  : prevData;
              default:
                return prevData;
            }
          });

          options.onError?.(update, error);
          options.onRollback?.(update);
        }
        return prev.filter((u) => u.id !== updateId);
      });
    },
    [options]
  );

  /**
   * Rollback all pending updates
   */
  const rollbackAllUpdates = useCallback(() => {
    pendingUpdates.forEach((update) => {
      rollbackUpdate(update.id);
    });
  }, [pendingUpdates, rollbackUpdate]);

  /**
   * Create a new item optimistically
   */
  const optimisticCreate = useCallback(
    async (newItem: T, apiCall: () => Promise<T>): Promise<T> => {
      setIsUpdating(true);
      const updateId = applyOptimisticUpdate('create', newItem);

      try {
        const result = await apiCall();
        confirmUpdate(updateId, result);
        return result;
      } catch (error) {
        rollbackUpdate(updateId, error);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [applyOptimisticUpdate, confirmUpdate, rollbackUpdate]
  );

  /**
   * Update an item optimistically
   */
  const optimisticUpdate = useCallback(
    async (updatedItem: T, apiCall: () => Promise<T>): Promise<T> => {
      setIsUpdating(true);
      const originalItem = data.find((item) => item.id === updatedItem.id);
      const updateId = applyOptimisticUpdate(
        'update',
        updatedItem,
        originalItem
      );

      try {
        const result = await apiCall();
        confirmUpdate(updateId, result);
        return result;
      } catch (error) {
        rollbackUpdate(updateId, error);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [data, applyOptimisticUpdate, confirmUpdate, rollbackUpdate]
  );

  /**
   * Delete an item optimistically
   */
  const optimisticDelete = useCallback(
    async (itemId: string, apiCall: () => Promise<void>): Promise<void> => {
      setIsUpdating(true);
      const originalItem = data.find((item) => item.id === itemId);
      if (!originalItem) {
        setIsUpdating(false);
        throw new Error('Item not found');
      }

      const updateId = applyOptimisticUpdate(
        'delete',
        originalItem,
        originalItem
      );

      try {
        await apiCall();
        confirmUpdate(updateId);
      } catch (error) {
        rollbackUpdate(updateId, error);
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [data, applyOptimisticUpdate, confirmUpdate, rollbackUpdate]
  );

  /**
   * Bulk optimistic updates
   */
  const optimisticBulkUpdate = useCallback(
    async <R>(
      items: T[],
      updateType: OptimisticUpdate<T>['type'],
      getUpdatedItem: (item: T) => T,
      apiCall: () => Promise<R>
    ): Promise<R> => {
      setIsUpdating(true);
      const updateIds: string[] = [];

      // Apply all optimistic updates
      items.forEach((item) => {
        const updatedItem = getUpdatedItem(item);
        const updateId = applyOptimisticUpdate(updateType, updatedItem, item);
        updateIds.push(updateId);
      });

      try {
        const result = await apiCall();
        // Confirm all updates
        updateIds.forEach((updateId) => confirmUpdate(updateId));
        return result;
      } catch (error) {
        // Rollback all updates
        updateIds.forEach((updateId) => rollbackUpdate(updateId, error));
        throw error;
      } finally {
        setIsUpdating(false);
      }
    },
    [applyOptimisticUpdate, confirmUpdate, rollbackUpdate]
  );

  /**
   * Reset data to initial state
   */
  const resetData = useCallback((newData: T[]) => {
    setData(newData);
    setPendingUpdates([]);
    setIsUpdating(false);
  }, []);

  /**
   * Get pending updates for a specific item
   */
  const getPendingUpdatesForItem = useCallback(
    (itemId: string) => {
      return pendingUpdates.filter((update) => update.data.id === itemId);
    },
    [pendingUpdates]
  );

  /**
   * Check if an item has pending updates
   */
  const hasPendingUpdates = useCallback(
    (itemId: string) => {
      return pendingUpdates.some((update) => update.data.id === itemId);
    },
    [pendingUpdates]
  );

  return {
    data,
    pendingUpdates,
    isUpdating,
    optimisticCreate,
    optimisticUpdate,
    optimisticDelete,
    optimisticBulkUpdate,
    rollbackUpdate,
    rollbackAllUpdates,
    resetData,
    getPendingUpdatesForItem,
    hasPendingUpdates,
  };
};

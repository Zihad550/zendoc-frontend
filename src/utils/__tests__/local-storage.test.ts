import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock localStorage utility functions
const setItem = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

const getItem = <T>(key: string, defaultValue?: T): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue || null;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue || null;
  }
};

const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

const clear = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

const hasItem = (key: string): boolean => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    return false;
  }
};

const getKeys = (): string[] => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    return [];
  }
};

const getSize = (): number => {
  try {
    return Object.keys(localStorage).length;
  } catch (error) {
    return 0;
  }
};

const isSupported = (): boolean => {
  try {
    const testKey = '__localStorage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('LocalStorage Utility Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.length = 0;
  });

  describe('setItem', () => {
    it('should store string values', () => {
      setItem('testKey', 'testValue');

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        JSON.stringify('testValue')
      );
    });

    it('should store object values', () => {
      const testObject = { name: 'John', age: 30 };
      setItem('user', testObject);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(testObject)
      );
    });

    it('should store array values', () => {
      const testArray = [1, 2, 3, 'test'];
      setItem('numbers', testArray);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'numbers',
        JSON.stringify(testArray)
      );
    });

    it('should store boolean values', () => {
      setItem('isActive', true);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'isActive',
        JSON.stringify(true)
      );
    });

    it('should store null values', () => {
      setItem('nullValue', null);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'nullValue',
        JSON.stringify(null)
      );
    });

    it('should handle serialization errors gracefully', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const circularObject: any = {};
      circularObject.self = circularObject;

      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('Circular reference');
      });

      setItem('circular', circularObject);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error saving to localStorage:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('getItem', () => {
    it('should retrieve and parse stored values', () => {
      const testObject = { name: 'John', age: 30 };
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(testObject));

      const result = getItem('user');

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('user');
      expect(result).toEqual(testObject);
    });

    it('should return null for non-existent keys', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = getItem('nonExistent');

      expect(result).toBeNull();
    });

    it('should return default value for non-existent keys', () => {
      mockLocalStorage.getItem.mockReturnValue(null);
      const defaultValue = { default: true };

      const result = getItem('nonExistent', defaultValue);

      expect(result).toEqual(defaultValue);
    });

    it('should handle parsing errors gracefully', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockLocalStorage.getItem.mockReturnValue('invalid-json');

      const result = getItem('invalidJson');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading from localStorage:',
        expect.any(Error)
      );
      expect(result).toBeNull();

      consoleSpy.mockRestore();
    });

    it('should return default value on parsing error', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockLocalStorage.getItem.mockReturnValue('invalid-json');
      const defaultValue = { error: 'fallback' };

      const result = getItem('invalidJson', defaultValue);

      expect(result).toEqual(defaultValue);

      consoleSpy.mockRestore();
    });

    it('should handle different data types', () => {
      // String
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify('test'));
      expect(getItem('string')).toBe('test');

      // Number
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(42));
      expect(getItem('number')).toBe(42);

      // Boolean
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(true));
      expect(getItem('boolean')).toBe(true);

      // Array
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify([1, 2, 3]));
      expect(getItem('array')).toEqual([1, 2, 3]);
    });
  });

  describe('removeItem', () => {
    it('should remove item from localStorage', () => {
      removeItem('testKey');

      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('testKey');
    });

    it('should handle removal errors gracefully', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockLocalStorage.removeItem.mockImplementation(() => {
        throw new Error('Removal failed');
      });

      removeItem('testKey');

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error removing from localStorage:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('clear', () => {
    it('should clear all localStorage items', () => {
      clear();

      expect(mockLocalStorage.clear).toHaveBeenCalled();
    });

    it('should handle clear errors gracefully', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      mockLocalStorage.clear.mockImplementation(() => {
        throw new Error('Clear failed');
      });

      clear();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error clearing localStorage:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('hasItem', () => {
    it('should return true for existing items', () => {
      mockLocalStorage.getItem.mockReturnValue('some value');

      const result = hasItem('existingKey');

      expect(result).toBe(true);
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('existingKey');
    });

    it('should return false for non-existing items', () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      const result = hasItem('nonExistingKey');

      expect(result).toBe(false);
    });

    it('should return false on errors', () => {
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error('Access denied');
      });

      const result = hasItem('errorKey');

      expect(result).toBe(false);
    });
  });

  describe('getKeys', () => {
    it('should return all localStorage keys', () => {
      Object.defineProperty(mockLocalStorage, 'length', { value: 2 });
      mockLocalStorage.key.mockImplementation((index) => {
        const keys = ['key1', 'key2'];
        return keys[index] || null;
      });

      // Mock Object.keys for localStorage
      const originalObjectKeys = Object.keys;
      Object.keys = vi.fn().mockReturnValue(['key1', 'key2']);

      const result = getKeys();

      expect(result).toEqual(['key1', 'key2']);

      // Restore original Object.keys
      Object.keys = originalObjectKeys;
    });

    it('should return empty array on errors', () => {
      Object.keys = vi.fn().mockImplementation(() => {
        throw new Error('Access denied');
      });

      const result = getKeys();

      expect(result).toEqual([]);
    });
  });

  describe('getSize', () => {
    it('should return the number of items in localStorage', () => {
      const originalObjectKeys = Object.keys;
      Object.keys = vi.fn().mockReturnValue(['key1', 'key2', 'key3']);

      const result = getSize();

      expect(result).toBe(3);

      Object.keys = originalObjectKeys;
    });

    it('should return 0 on errors', () => {
      Object.keys = vi.fn().mockImplementation(() => {
        throw new Error('Access denied');
      });

      const result = getSize();

      expect(result).toBe(0);
    });
  });

  describe('isSupported', () => {
    it('should return true when localStorage is supported', () => {
      const result = isSupported();

      expect(result).toBe(true);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        '__localStorage_test__',
        'test'
      );
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith(
        '__localStorage_test__'
      );
    });

    it('should return false when localStorage is not supported', () => {
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error('localStorage not supported');
      });

      const result = isSupported();

      expect(result).toBe(false);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete workflow', () => {
      const userData = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        preferences: {
          theme: 'dark',
          notifications: true,
        },
      };

      // Store user data
      setItem('user', userData);
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify(userData)
      );

      // Retrieve user data
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(userData));
      const retrievedUser = getItem('user');
      expect(retrievedUser).toEqual(userData);

      // Check if user exists
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(userData));
      expect(hasItem('user')).toBe(true);

      // Remove user data
      removeItem('user');
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('user');
    });

    it('should handle multiple data types in one session', () => {
      const testData = {
        string: 'Hello World',
        number: 42,
        boolean: true,
        array: [1, 2, 3],
        object: { nested: 'value' },
        null: null,
      };

      Object.entries(testData).forEach(([key, value]) => {
        setItem(key, value);
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          key,
          JSON.stringify(value)
        );
      });
    });

    it('should handle edge cases gracefully', () => {
      const consoleSpy = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      // Test with undefined
      setItem('undefined', undefined);

      // Test with empty string
      setItem('empty', '');

      // Test with very long string
      const longString = 'a'.repeat(10000);
      setItem('long', longString);

      // Should not throw errors
      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});

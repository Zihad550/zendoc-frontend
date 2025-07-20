import { describe, expect, it } from 'vitest';

// Mock the generateUrlParams function since it doesn't exist yet
const generateUrlParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
};

describe('generateUrlParams', () => {
  it('should generate URL parameters from object', () => {
    const params = {
      page: 1,
      limit: 10,
      search: 'doctor',
    };

    const result = generateUrlParams(params);
    expect(result).toBe('page=1&limit=10&search=doctor');
  });

  it('should handle empty object', () => {
    const result = generateUrlParams({});
    expect(result).toBe('');
  });

  it('should skip undefined and null values', () => {
    const params = {
      page: 1,
      search: undefined,
      filter: null,
      category: 'health',
    };

    const result = generateUrlParams(params);
    expect(result).toBe('page=1&category=health');
  });

  it('should handle array values', () => {
    const params = {
      specialties: ['cardiology', 'neurology'],
      page: 1,
    };

    const result = generateUrlParams(params);
    expect(result).toBe('specialties=cardiology&specialties=neurology&page=1');
  });

  it('should handle boolean values', () => {
    const params = {
      isAvailable: true,
      isActive: false,
    };

    const result = generateUrlParams(params);
    expect(result).toBe('isAvailable=true&isActive=false');
  });

  it('should handle special characters', () => {
    const params = {
      search: 'Dr. Smith & Associates',
      location: 'New York, NY',
    };

    const result = generateUrlParams(params);
    expect(result).toBe(
      'search=Dr.+Smith+%26+Associates&location=New+York%2C+NY'
    );
  });
});

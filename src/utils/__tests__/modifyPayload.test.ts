import { describe, expect, it } from 'vitest';
import { modifyPayload } from '../modifyPayload';

describe('modifyPayload', () => {
  it('should create FormData with data and file', () => {
    const mockFile = new File(['test content'], 'test.txt', {
      type: 'text/plain',
    });
    const values = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
      file: mockFile,
    };

    const result = modifyPayload(values);

    expect(result).toBeInstanceOf(FormData);

    // Check if data is properly stringified and appended
    const dataString = result.get('data') as string;
    const parsedData = JSON.parse(dataString);

    expect(parsedData).toEqual({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
    });

    // Check if file is appended
    const appendedFile = result.get('file');
    expect(appendedFile).toBe(mockFile);
  });

  it('should handle values without file property', () => {
    const values = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'DOCTOR',
    };

    const result = modifyPayload(values);

    expect(result).toBeInstanceOf(FormData);

    const dataString = result.get('data') as string;
    const parsedData = JSON.parse(dataString);

    expect(parsedData).toEqual({
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'DOCTOR',
    });

    // File should be undefined when not provided
    const appendedFile = result.get('file');
    expect(appendedFile).toBe('undefined');
  });

  it('should handle empty values object', () => {
    const values = {
      file: new File([''], 'empty.txt'),
    };

    const result = modifyPayload(values);

    expect(result).toBeInstanceOf(FormData);

    const dataString = result.get('data') as string;
    const parsedData = JSON.parse(dataString);

    expect(parsedData).toEqual({});

    const appendedFile = result.get('file');
    expect(appendedFile).toBeInstanceOf(File);
  });

  it('should handle complex nested objects', () => {
    const mockFile = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });
    const values = {
      user: {
        name: 'Dr. Smith',
        specialties: ['Cardiology', 'Internal Medicine'],
      },
      appointment: {
        date: '2024-01-15',
        time: '10:00',
      },
      file: mockFile,
    };

    const result = modifyPayload(values);

    expect(result).toBeInstanceOf(FormData);

    const dataString = result.get('data') as string;
    const parsedData = JSON.parse(dataString);

    expect(parsedData).toEqual({
      user: {
        name: 'Dr. Smith',
        specialties: ['Cardiology', 'Internal Medicine'],
      },
      appointment: {
        date: '2024-01-15',
        time: '10:00',
      },
    });

    expect(result.get('file')).toBe(mockFile);
  });

  it('should handle null and undefined values', () => {
    const values = {
      name: 'Test User',
      nullValue: null,
      undefinedValue: undefined,
      file: new File([''], 'test.txt'),
    };

    const result = modifyPayload(values);

    const dataString = result.get('data') as string;
    const parsedData = JSON.parse(dataString);

    expect(parsedData).toEqual({
      name: 'Test User',
      nullValue: null,
      undefinedValue: undefined,
    });
  });
});

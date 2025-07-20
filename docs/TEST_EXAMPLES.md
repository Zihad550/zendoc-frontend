# ZenDoc Test Examples and Templates

## Overview

This document provides practical examples and reusable templates for common testing scenarios in the ZenDoc healthcare management platform. Use these examples as starting points for writing your own tests.

## Table of Contents

1. [Component Testing Examples](#component-testing-examples)
2. [Form Testing Templates](#form-testing-templates)
3. [Hook Testing Patterns](#hook-testing-patterns)
4. [Redux Testing Examples](#redux-testing-examples)
5. [API Integration Testing](#api-integration-testing)
6. [Accessibility Testing](#accessibility-testing)
7. [Error Handling Tests](#error-handling-tests)
8. [Performance Testing](#performance-testing)

## Component Testing Examples

### Basic Component Test Template

```typescript
import { render, screen } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  // Default props for consistent testing
  const defaultProps = {
    title: 'Test Title',
    onAction: vi.fn(),
    disabled: false,
  };

  // Reset mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with required props', () => {
      render(<ComponentName {...defaultProps} />);
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render with optional props', () => {
      render(<ComponentName {...defaultProps} subtitle="Test Subtitle" />);
      
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('should handle missing optional props gracefully', () => {
      render(<ComponentName title="Test" onAction={vi.fn()} />);
      
      expect(screen.getByText('Test')).toBeInTheDocument();
      expect(screen.queryByText('subtitle')).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should handle click events', async () => {
      const user = userEvent.setup();
      const mockAction = vi.fn();
      
      render(<ComponentName {...defaultProps} onAction={mockAction} />);
      
      await user.click(screen.getByRole('button'));
      
      expect(mockAction).toHaveBeenCalledTimes(1);
      expect(mockAction).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should not trigger actions when disabled', async () => {
      const user = userEvent.setup();
      const mockAction = vi.fn();
      
      render(<ComponentName {...defaultProps} onAction={mockAction} disabled />);
      
      await user.click(screen.getByRole('button'));
      
      expect(mockAction).not.toHaveBeenCalled();
    });
  });

  describe('State Management', () => {
    it('should update internal state correctly', async () => {
      const user = userEvent.setup();
      
      render(<ComponentName {...defaultProps} />);
      
      const toggleButton = screen.getByRole('button', { name: /toggle/i });
      await user.click(toggleButton);
      
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('should display error states', () => {
      render(<ComponentName {...defaultProps} error="Something went wrong" />);
      
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });
});
```

### MUI Component Test Template

```typescript
import { render, screen } from '@/test/utils/mui-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/lib/theme/theme';
import { MuiComponent } from '../MuiComponent';

describe('MuiComponent', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  it('should apply theme styles correctly', () => {
    renderWithTheme(<MuiComponent variant="primary" />);
    
    const element = screen.getByTestId('mui-component');
    expect(element).toHaveStyle({
      backgroundColor: theme.palette.primary.main,
    });
  });

  it('should handle different variants', () => {
    renderWithTheme(<MuiComponent variant="secondary" />);
    
    const element = screen.getByTestId('mui-component');
    expect(element).toHaveClass('MuiButton-containedSecondary');
  });

  it('should be responsive', () => {
    // Mock window.matchMedia for responsive testing
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query.includes('max-width: 600px'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    renderWithTheme(<MuiComponent responsive />);
    
    expect(screen.getByTestId('mui-component')).toHaveClass('responsive-class');
  });
});
```

## Form Testing Templates

### React Hook Form Component Test

```typescript
import { renderWithForm } from '@/test/utils/form-test-utils';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { PHInput } from '../PHInput';

const testSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

describe('PHInput Form Integration', () => {
  it('should validate required fields', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    
    renderWithForm(
      <>
        <PHInput name="email" label="Email" />
        <PHInput name="password" label="Password" type="password" />
        <button type="submit">Submit</button>
      </>,
      {
        onSubmit: mockSubmit,
        validationSchema: testSchema,
      }
    );

    // Try to submit without filling fields
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should validate field formats', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    
    renderWithForm(
      <>
        <PHInput name="email" label="Email" />
        <button type="submit">Submit</button>
      </>,
      {
        onSubmit: mockSubmit,
        validationSchema: testSchema,
      }
    );

    const emailInput = screen.getByLabelText('Email');
    await user.type(emailInput, 'invalid-email');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should submit valid form data', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    
    renderWithForm(
      <>
        <PHInput name="email" label="Email" />
        <PHInput name="password" label="Password" type="password" />
        <button type="submit">Submit</button>
      </>,
      {
        onSubmit: mockSubmit,
        validationSchema: testSchema,
      }
    );

    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('should handle form reset', async () => {
    const user = userEvent.setup();
    
    renderWithForm(
      <>
        <PHInput name="email" label="Email" />
        <button type="reset">Reset</button>
      </>,
      {
        defaultValues: { email: 'default@example.com' },
      }
    );

    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    
    // Change the value
    await user.clear(emailInput);
    await user.type(emailInput, 'changed@example.com');
    expect(emailInput.value).toBe('changed@example.com');

    // Reset the form
    await user.click(screen.getByRole('button', { name: /reset/i }));
    expect(emailInput.value).toBe('default@example.com');
  });
});
```

### File Upload Component Test

```typescript
import { renderWithForm } from '@/test/utils/form-test-utils';
import userEvent from '@testing-library/user-event';
import { PHFileUploader } from '../PHFileUploader';

describe('PHFileUploader', () => {
  it('should handle file selection', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    
    renderWithForm(
      <>
        <PHFileUploader name="document" label="Upload Document" />
        <button type="submit">Submit</button>
      </>,
      { onSubmit: mockSubmit }
    );

    const file = new File(['test content'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText('Upload Document');
    
    await user.upload(fileInput, file);
    
    expect(screen.getByText('test.pdf')).toBeInTheDocument();
  });

  it('should validate file types', async () => {
    const user = userEvent.setup();
    
    renderWithForm(
      <PHFileUploader 
        name="image" 
        label="Upload Image" 
        accept="image/*"
      />
    );

    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText('Upload Image');
    
    await user.upload(fileInput, invalidFile);
    
    expect(screen.getByText(/invalid file type/i)).toBeInTheDocument();
  });

  it('should handle file size limits', async () => {
    const user = userEvent.setup();
    
    renderWithForm(
      <PHFileUploader 
        name="document" 
        label="Upload Document" 
        maxSize={1024} // 1KB limit
      />
    );

    // Create a file larger than 1KB
    const largeFile = new File(['x'.repeat(2048)], 'large.txt', { type: 'text/plain' });
    const fileInput = screen.getByLabelText('Upload Document');
    
    await user.upload(fileInput, largeFile);
    
    expect(screen.getByText(/file too large/i)).toBeInTheDocument();
  });
});
```

## Hook Testing Patterns

### Custom Hook Test Template

```typescript
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCustomHook } from '../useCustomHook';

describe('useCustomHook', () => {
  it('should return initial values', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle state updates', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.updateData('new data');
    });
    
    expect(result.current.data).toBe('new data');
  });

  it('should handle async operations', async () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.fetchData();
    });
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeDefined();
  });

  it('should handle errors', async () => {
    const { result } = renderHook(() => useCustomHook());
    
    // Mock a failing operation
    const originalFetch = global.fetch;
    global.fetch = vi.fn().mockRejectedValue(new Error('API Error'));
    
    act(() => {
      result.current.fetchData();
    });
    
    await waitFor(() => {
      expect(result.current.error).toBe('API Error');
    });
    
    global.fetch = originalFetch;
  });

  it('should cleanup on unmount', () => {
    const cleanup = vi.fn();
    const { unmount } = renderHook(() => {
      useEffect(() => cleanup, []);
      return useCustomHook();
    });
    
    unmount();
    
    expect(cleanup).toHaveBeenCalled();
  });
});
```

### Hook with Dependencies Test

```typescript
import { renderHook } from '@testing-library/react';
import { useEffect } from 'react';
import { useDependentHook } from '../useDependentHook';

describe('useDependentHook', () => {
  it('should re-run when dependencies change', () => {
    const callback = vi.fn();
    let dependency = 'initial';
    
    const { rerender } = renderHook(() => useDependentHook(dependency, callback));
    
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('initial');
    
    dependency = 'updated';
    rerender();
    
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith('updated');
  });

  it('should not re-run when dependencies are the same', () => {
    const callback = vi.fn();
    const dependency = 'constant';
    
    const { rerender } = renderHook(() => useDependentHook(dependency, callback));
    
    expect(callback).toHaveBeenCalledTimes(1);
    
    rerender();
    
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

## Redux Testing Examples

### API Slice Test Template

```typescript
import { setupApiStore } from '@/test/utils/redux-test-utils';
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';
import { doctorApi } from '../doctorApi';

describe('doctorApi', () => {
  let storeRef: ReturnType<typeof setupApiStore>;

  beforeEach(() => {
    storeRef = setupApiStore(doctorApi);
  });

  describe('getDoctors', () => {
    it('should fetch doctors successfully', async () => {
      const result = await storeRef.store.dispatch(
        doctorApi.endpoints.getDoctors.initiate({})
      );
      
      expect(result.data).toEqual({
        success: true,
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            specialties: expect.any(Array),
          })
        ])
      });
    });

    it('should handle API errors', async () => {
      server.use(
        http.get('/api/doctor', () => {
          return HttpResponse.json(
            { message: 'Server error' },
            { status: 500 }
          );
        })
      );

      const result = await storeRef.store.dispatch(
        doctorApi.endpoints.getDoctors.initiate({})
      );
      
      expect(result.error).toBeDefined();
      expect(result.error.status).toBe(500);
    });

    it('should cache successful responses', async () => {
      // First request
      const result1 = await storeRef.store.dispatch(
        doctorApi.endpoints.getDoctors.initiate({})
      );
      
      // Second request should use cache
      const result2 = await storeRef.store.dispatch(
        doctorApi.endpoints.getDoctors.initiate({})
      );
      
      expect(result1.data).toEqual(result2.data);
    });
  });

  describe('createDoctor', () => {
    it('should create doctor successfully', async () => {
      const doctorData = {
        name: 'Dr. Smith',
        email: 'smith@example.com',
        specialties: ['Cardiology'],
      };

      const result = await storeRef.store.dispatch(
        doctorApi.endpoints.createDoctor.initiate(doctorData)
      );
      
      expect(result.data).toEqual({
        success: true,
        data: expect.objectContaining({
          id: expect.any(String),
          ...doctorData,
        })
      });
    });

    it('should handle validation errors', async () => {
      server.use(
        http.post('/api/user/create-doctor', () => {
          return HttpResponse.json(
            { 
              success: false,
              message: 'Validation failed',
              errors: { email: 'Email already exists' }
            },
            { status: 400 }
          );
        })
      );

      const result = await storeRef.store.dispatch(
        doctorApi.endpoints.createDoctor.initiate({
          name: 'Dr. Smith',
          email: 'existing@example.com',
        })
      );
      
      expect(result.error).toBeDefined();
      expect(result.error.status).toBe(400);
    });
  });
});
```

### Redux Slice Test Template

```typescript
import { configureStore } from '@reduxjs/toolkit';
import authSlice, { login, logout, setUser } from '../authSlice';

describe('authSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authSlice,
      },
    });
  });

  it('should handle initial state', () => {
    const state = store.getState().auth;
    
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should handle login action', () => {
    const userData = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'patient',
    };
    const token = 'jwt-token';

    store.dispatch(login({ user: userData, token }));
    
    const state = store.getState().auth;
    expect(state.user).toEqual(userData);
    expect(state.token).toBe(token);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle logout action', () => {
    // First login
    store.dispatch(login({ 
      user: { id: '1', name: 'John', email: 'john@example.com', role: 'patient' }, 
      token: 'token' 
    }));
    
    // Then logout
    store.dispatch(logout());
    
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should handle setUser action', () => {
    const updatedUser = {
      id: '1',
      name: 'John Updated',
      email: 'john.updated@example.com',
      role: 'patient',
    };

    store.dispatch(setUser(updatedUser));
    
    const state = store.getState().auth;
    expect(state.user).toEqual(updatedUser);
  });
});
```

## API Integration Testing

### MSW Handler Test Template

```typescript
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

describe('API Integration', () => {
  it('should handle authentication flow', async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();
    
    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.data.token).toBeDefined();
    expect(result.data.user).toEqual(
      expect.objectContaining({
        email: loginData.email,
      })
    );
  });

  it('should handle authentication errors', async () => {
    server.use(
      http.post('/api/auth/login', () => {
        return HttpResponse.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        );
      })
    );

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      }),
    });

    const result = await response.json();
    
    expect(response.status).toBe(401);
    expect(result.success).toBe(false);
    expect(result.message).toBe('Invalid credentials');
  });

  it('should handle network timeouts', async () => {
    server.use(
      http.get('/api/doctors', () => {
        return new Promise(() => {}); // Never resolves (timeout)
      })
    );

    const controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);

    await expect(
      fetch('/api/doctors', { signal: controller.signal })
    ).rejects.toThrow('aborted');
  });
});
```

## Accessibility Testing

### Accessibility Test Template

```typescript
import { render, screen } from '@/test/utils/test-utils';
import { axe, toHaveNoViolations } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { AccessibleComponent } from '../AccessibleComponent';

expect.extend(toHaveNoViolations);

describe('AccessibleComponent Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<AccessibleComponent />);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels', () => {
    render(<AccessibleComponent />);
    
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit form' })).toBeInTheDocument();
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<AccessibleComponent />);
    
    // Tab through interactive elements
    await user.tab();
    expect(screen.getByRole('button', { name: 'First button' })).toHaveFocus();
    
    await user.tab();
    expect(screen.getByRole('button', { name: 'Second button' })).toHaveFocus();
    
    // Test Enter key activation
    await user.keyboard('{Enter}');
    expect(screen.getByText('Button activated')).toBeInTheDocument();
  });

  it('should announce changes to screen readers', async () => {
    const user = userEvent.setup();
    render(<AccessibleComponent />);
    
    await user.click(screen.getByRole('button', { name: 'Update status' }));
    
    // Check for aria-live region updates
    expect(screen.getByRole('status')).toHaveTextContent('Status updated');
  });

  it('should have proper heading hierarchy', () => {
    render(<AccessibleComponent />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings[0]).toHaveAttribute('aria-level', '1');
    expect(headings[1]).toHaveAttribute('aria-level', '2');
  });

  it('should provide alternative text for images', () => {
    render(<AccessibleComponent />);
    
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', expect.stringMatching(/.+/));
  });
});
```

## Error Handling Tests

### Error Boundary Test Template

```typescript
import { render, screen } from '@/test/utils/test-utils';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorComponent } from '../ErrorComponent';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('Error Handling', () => {
  it('should catch and display errors', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary fallback={<ErrorComponent />}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('should recover from errors', async () => {
    const user = userEvent.setup();
    let shouldThrow = true;
    
    const { rerender } = render(
      <ErrorBoundary 
        fallback={<ErrorComponent onRetry={() => { shouldThrow = false; }} />}
        resetKeys={[shouldThrow]}
      >
        <ThrowError shouldThrow={shouldThrow} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    
    rerender(
      <ErrorBoundary 
        fallback={<ErrorComponent onRetry={() => { shouldThrow = false; }} />}
        resetKeys={[shouldThrow]}
      >
        <ThrowError shouldThrow={shouldThrow} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('No error')).toBeInTheDocument();
  });
});
```

## Performance Testing

### Performance Test Template

```typescript
import { render } from '@/test/utils/test-utils';
import { performance } from 'perf_hooks';
import { ExpensiveComponent } from '../ExpensiveComponent';

describe('Performance Tests', () => {
  it('should render within acceptable time', () => {
    const largeDataSet = Array.from({ length: 1000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      value: Math.random(),
    }));

    const start = performance.now();
    
    render(<ExpensiveComponent data={largeDataSet} />);
    
    const end = performance.now();
    const renderTime = end - start;
    
    expect(renderTime).toBeLessThan(100); // 100ms threshold
  });

  it('should handle large datasets efficiently', () => {
    const veryLargeDataSet = Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
    }));

    expect(() => {
      render(<ExpensiveComponent data={veryLargeDataSet} />);
    }).not.toThrow();
  });

  it('should not cause memory leaks', () => {
    const { unmount } = render(<ExpensiveComponent />);
    
    // Simulate component lifecycle
    unmount();
    
    // Check that cleanup was performed
    // This would typically involve checking that event listeners,
    // timers, or subscriptions were cleaned up
    expect(true).toBe(true); // Placeholder assertion
  });
});
```

## Test Data Factories

### Test Data Factory Examples

```typescript
// src/test/utils/test-data-factories.ts

export const createTestUser = (overrides: Partial<User> = {}): User => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'patient',
  contactNumber: '+1234567890',
  address: '123 Main St',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const createTestDoctor = (overrides: Partial<Doctor> = {}): Doctor => ({
  ...createTestUser({ role: 'doctor' }),
  specialties: ['General Medicine'],
  qualification: 'MD',
  experience: 5,
  consultationFee: 100,
  rating: 4.5,
  ...overrides,
});

export const createTestAppointment = (overrides: Partial<Appointment> = {}): Appointment => ({
  id: '1',
  patientId: '1',
  doctorId: '2',
  scheduleId: '1',
  appointmentDate: '2024-01-15',
  appointmentTime: '10:00',
  status: 'scheduled',
  paymentStatus: 'pending',
  createdAt: new Date().toISOString(),
  ...overrides,
});

// Usage in tests
describe('Component with test data', () => {
  it('should display user information', () => {
    const testUser = createTestUser({
      name: 'Jane Smith',
      role: 'doctor',
    });

    render(<UserProfile user={testUser} />);
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Doctor')).toBeInTheDocument();
  });
});
```

## Common Testing Utilities

### Custom Render Functions

```typescript
// src/test/utils/custom-renders.ts

export const renderWithProviders = (
  ui: React.ReactElement,
  options: {
    initialState?: Partial<RootState>;
    theme?: Theme;
    user?: User;
  } = {}
) => {
  const { initialState, theme = defaultTheme, user } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={createMockStore(initialState)}>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={user}>
          {children}
        </UserContext.Provider>
      </ThemeProvider>
    </Provider>
  );

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper }),
  };
};

// Usage
it('should render with all providers', () => {
  const testUser = createTestUser();
  
  renderWithProviders(<MyComponent />, {
    user: testUser,
    initialState: { auth: { user: testUser } },
  });
  
  expect(screen.getByText(testUser.name)).toBeInTheDocument();
});
```

This comprehensive collection of examples and templates provides a solid foundation for writing consistent, maintainable tests across the ZenDoc platform. Use these patterns as starting points and adapt them to your specific testing needs.
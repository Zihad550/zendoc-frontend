# ZenDoc Testing Guidelines

## Overview

This document provides comprehensive guidelines for writing, maintaining, and executing tests in the ZenDoc healthcare management platform. Our testing strategy emphasizes reliability, maintainability, and developer productivity.

## Testing Philosophy

### Core Principles

1. **User-Centric Testing**: Tests should reflect real user interactions and scenarios
2. **Test Pyramid**: Focus on unit tests (70%), integration tests (25%), and e2e tests (5%)
3. **Fast Feedback**: Tests should run quickly to support rapid development cycles
4. **Maintainable Tests**: Write tests that are easy to understand and modify
5. **Comprehensive Coverage**: Aim for high coverage while focusing on critical paths

### Testing Stack

- **Test Runner**: Vitest 3.2.4
- **Component Testing**: React Testing Library 16.3.0
- **DOM Environment**: jsdom 26.1.0
- **API Mocking**: MSW (Mock Service Worker) 2.10.4
- **User Interactions**: @testing-library/user-event 14.6.1
- **Assertions**: @testing-library/jest-dom 6.6.3

## Test Organization

### Directory Structure

```
src/
├── components/
│   └── ComponentName/
│       ├── ComponentName.tsx
│       └── __tests__/
│           └── ComponentName.test.tsx
├── hooks/
│   └── __tests__/
│       └── hookName.test.ts
├── utils/
│   └── __tests__/
│       └── utilityName.test.ts
├── redux/
│   └── __tests__/
│       └── sliceName.test.ts
└── test/
    ├── setup.ts
    ├── mocks/
    ├── utils/
    └── integration/
```

### File Naming Conventions

- Test files: `ComponentName.test.tsx` or `utilityName.test.ts`
- Integration tests: `feature.integration.test.tsx`
- Test utilities: `test-utils.tsx`, `form-test-utils.tsx`
- Mock files: `handlers.ts`, `server.ts`

## Writing Tests

### Component Testing

#### Basic Component Test Structure

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentName } from '../ComponentName';

describe('ComponentName', () => {
  const defaultProps = {
    // Define default props
  };

  it('should render with default props', () => {
    render(<ComponentName {...defaultProps} />);
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();
    
    render(<ComponentName {...defaultProps} onClick={mockHandler} />);
    
    await user.click(screen.getByRole('button'));
    
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});
```

#### Form Component Testing

```typescript
import { renderWithForm } from '@/test/utils/form-test-utils';
import { PHInput } from '../PHInput';

describe('PHInput', () => {
  it('should validate required fields', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    
    renderWithForm(
      <PHInput name="email" label="Email" required />,
      {
        onSubmit: mockSubmit,
        validationSchema: z.object({
          email: z.string().email().min(1, 'Email is required')
        })
      }
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
```

#### Modal Component Testing

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PHModal } from '../PHModal';

describe('PHModal', () => {
  it('should handle modal interactions', async () => {
    const user = userEvent.setup();
    const mockSetOpen = vi.fn();
    
    render(
      <PHModal open={true} setOpen={mockSetOpen} title="Test Modal">
        <p>Modal content</p>
      </PHModal>
    );

    // Test backdrop click
    const backdrop = screen.getByTestId('modal-backdrop');
    await user.click(backdrop);
    
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it('should handle escape key', async () => {
    const user = userEvent.setup();
    const mockSetOpen = vi.fn();
    
    render(
      <PHModal open={true} setOpen={mockSetOpen} title="Test Modal">
        <p>Modal content</p>
      </PHModal>
    );

    await user.keyboard('{Escape}');
    
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
```

### Hook Testing

#### Custom Hook Testing Pattern

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCustomHook } from '../useCustomHook';

describe('useCustomHook', () => {
  it('should return initial values', () => {
    const { result } = renderHook(() => useCustomHook());
    
    expect(result.current.value).toBe(initialValue);
    expect(result.current.loading).toBe(false);
  });

  it('should update state correctly', () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.updateValue('new value');
    });
    
    expect(result.current.value).toBe('new value');
  });

  it('should handle async operations', async () => {
    const { result } = renderHook(() => useCustomHook());
    
    act(() => {
      result.current.performAsyncOperation();
    });
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });
});
```

### Redux Testing

#### API Slice Testing

```typescript
import { setupApiStore } from '@/test/utils/redux-test-utils';
import { doctorApi } from '../doctorApi';

describe('doctorApi', () => {
  it('should fetch doctors successfully', async () => {
    const storeRef = setupApiStore(doctorApi);
    
    const result = await storeRef.store.dispatch(
      doctorApi.endpoints.getDoctors.initiate({})
    );
    
    expect(result.data).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        specialties: expect.any(Array)
      })
    ]));
  });

  it('should handle API errors', async () => {
    // Mock error response
    server.use(
      http.get('/doctor', () => {
        return HttpResponse.json(
          { message: 'Server error' },
          { status: 500 }
        );
      })
    );

    const storeRef = setupApiStore(doctorApi);
    
    const result = await storeRef.store.dispatch(
      doctorApi.endpoints.getDoctors.initiate({})
    );
    
    expect(result.error).toBeDefined();
    expect(result.error.status).toBe(500);
  });
});
```

### Utility Function Testing

#### Pure Function Testing

```typescript
import { formatDate, isValidEmail } from '../utilities';

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date, 'MM/dd/yyyy');
      
      expect(formatted).toBe('01/15/2024');
    });

    it('should handle invalid dates', () => {
      const invalidDate = new Date('invalid');
      const formatted = formatDate(invalidDate, 'MM/dd/yyyy');
      
      expect(formatted).toBe('Invalid Date');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.email+tag@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
      expect(isValidEmail('user@')).toBe(false);
    });
  });
});
```

## Test Utilities

### Using Test Utilities

#### Component Rendering Utilities

```typescript
// Basic rendering with providers
import { render } from '@/test/utils/test-utils';

render(<Component />);

// Rendering with Redux store
import { renderWithRedux } from '@/test/utils/redux-test-utils';

renderWithRedux(<Component />, {
  initialState: {
    auth: { user: mockUser }
  }
});

// Rendering with form context
import { renderWithForm } from '@/test/utils/form-test-utils';

renderWithForm(<FormComponent />, {
  defaultValues: { email: 'test@example.com' },
  validationSchema: emailSchema
});
```

#### Creating Test Data

```typescript
import { createTestUser, createTestAppointment } from '@/test/utils/test-data';

const mockUser = createTestUser({
  role: 'patient',
  email: 'patient@example.com'
});

const mockAppointment = createTestAppointment({
  patientId: mockUser.id,
  status: 'scheduled'
});
```

## API Mocking with MSW

### Setting Up Handlers

```typescript
// src/test/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/doctors', () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: '1',
          name: 'Dr. Smith',
          specialties: ['Cardiology']
        }
      ]
    });
  }),

  http.post('/api/appointments', async ({ request }) => {
    const body = await request.json();
    
    return HttpResponse.json({
      success: true,
      data: {
        id: '1',
        ...body,
        status: 'scheduled'
      }
    });
  })
];
```

### Overriding Handlers in Tests

```typescript
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

it('should handle API errors', async () => {
  server.use(
    http.get('/api/doctors', () => {
      return HttpResponse.json(
        { message: 'Server error' },
        { status: 500 }
      );
    })
  );

  // Test error handling
});
```

## Accessibility Testing

### Testing Accessibility Features

```typescript
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Component Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels', () => {
    render(<Button aria-label="Close dialog" />);
    
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<InteractiveComponent />);
    
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    
    await user.keyboard('{Enter}');
    // Assert expected behavior
  });
});
```

## Performance Testing

### Testing Component Performance

```typescript
import { render } from '@testing-library/react';
import { performance } from 'perf_hooks';

describe('Component Performance', () => {
  it('should render within acceptable time', () => {
    const start = performance.now();
    
    render(<ExpensiveComponent data={largeDataSet} />);
    
    const end = performance.now();
    const renderTime = end - start;
    
    expect(renderTime).toBeLessThan(100); // 100ms threshold
  });
});
```

## Best Practices

### Do's

1. **Write descriptive test names** that explain what is being tested
2. **Use data-testid sparingly** - prefer semantic queries (getByRole, getByLabelText)
3. **Test behavior, not implementation** - focus on what users see and do
4. **Mock external dependencies** to isolate units under test
5. **Use async/await** for asynchronous operations
6. **Clean up after tests** to prevent test interference
7. **Test error states** and edge cases
8. **Use meaningful assertions** that provide clear failure messages

### Don'ts

1. **Don't test implementation details** like internal state or private methods
2. **Don't use shallow rendering** - prefer full rendering with React Testing Library
3. **Don't test third-party libraries** - focus on your own code
4. **Don't write overly complex tests** - keep them simple and focused
5. **Don't ignore test warnings** - address them promptly
6. **Don't skip accessibility testing** - include it in your test suite
7. **Don't hardcode test data** - use factories and generators

## Common Patterns

### Testing Async Operations

```typescript
import { waitFor, screen } from '@testing-library/react';

it('should handle async data loading', async () => {
  render(<AsyncComponent />);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

### Testing Error Boundaries

```typescript
import { ErrorBoundary } from 'react-error-boundary';

const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

it('should catch and display errors', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
  render(
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <ThrowError shouldThrow={true} />
    </ErrorBoundary>
  );
  
  expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  
  consoleSpy.mockRestore();
});
```

### Testing Context Providers

```typescript
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/lib/theme/theme';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

it('should apply theme styles', () => {
  renderWithTheme(<ThemedComponent />);
  
  const element = screen.getByTestId('themed-element');
  expect(element).toHaveStyle({ color: theme.palette.primary.main });
});
```

## Debugging Tests

### Common Debugging Techniques

1. **Use screen.debug()** to see the current DOM state
2. **Add console.log** statements to understand test flow
3. **Use --reporter=verbose** flag for detailed test output
4. **Check test coverage** to identify untested code paths
5. **Use VS Code debugger** with breakpoints in tests

### Debugging Failed Tests

```typescript
it('should debug failing test', () => {
  render(<Component />);
  
  // Debug current DOM state
  screen.debug();
  
  // Debug specific element
  screen.debug(screen.getByRole('button'));
  
  // Log available queries
  console.log(screen.getAllByRole('button'));
});
```

## Running Tests

### Command Reference

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test --watch

# Run specific test file
pnpm test ComponentName.test.tsx

# Run tests with coverage
pnpm test --coverage

# Run tests in CI mode
pnpm test --run

# Run tests with specific reporter
pnpm test --reporter=verbose

# Run integration tests only
pnpm test:integration

# Run unit tests only
pnpm test:unit
```

### Test Configuration

Tests are configured in `vitest.config.mts` with the following key settings:

- **Environment**: jsdom for DOM simulation
- **Setup Files**: `src/test/setup.ts` for global test configuration
- **Coverage**: Istanbul provider with comprehensive thresholds
- **Globals**: Vitest globals enabled for describe/it/expect

## Advanced Testing Patterns

### Testing Complex User Workflows

```typescript
describe('Complete Appointment Booking Flow', () => {
  it('should handle end-to-end appointment booking', async () => {
    const { user } = renderWithRedux(<AppointmentBooking />, {
      initialState: {
        auth: { user: createTestPatient(), isAuthenticated: true },
      },
    });

    // Step 1: Select doctor
    await user.click(screen.getByText('Dr. Smith'));
    expect(screen.getByText('Selected: Dr. Smith')).toBeInTheDocument();

    // Step 2: Choose date and time
    await user.click(screen.getByLabelText('Select date'));
    await user.click(screen.getByText('15')); // 15th of month
    await user.click(screen.getByText('10:00 AM'));

    // Step 3: Fill patient details
    await user.type(screen.getByLabelText('Reason for visit'), 'Regular checkup');

    // Step 4: Confirm booking
    await user.click(screen.getByRole('button', { name: /book appointment/i }));

    // Step 5: Verify success
    await waitFor(() => {
      expect(screen.getByText('Appointment booked successfully')).toBeInTheDocument();
    });

    // Step 6: Verify API call
    expect(server.getHandlers()).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining('/appointment'),
        method: 'POST',
      })
    );
  });
});
```

### Testing Error Recovery

```typescript
describe('Error Recovery Patterns', () => {
  it('should recover from network errors', async () => {
    const { user } = render(<DataComponent />);

    // Simulate network error
    server.use(
      http.get('/api/data', () => HttpResponse.error())
    );

    await user.click(screen.getByRole('button', { name: /load data/i }));

    // Verify error state
    expect(screen.getByText('Failed to load data')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();

    // Restore normal handler
    server.resetHandlers();

    // Retry and verify success
    await user.click(screen.getByRole('button', { name: /retry/i }));

    await waitFor(() => {
      expect(screen.getByText('Data loaded successfully')).toBeInTheDocument();
    });
  });
});
```

### Testing Real-time Features

```typescript
describe('Real-time Updates', () => {
  it('should handle WebSocket updates', async () => {
    const mockWebSocket = {
      send: vi.fn(),
      close: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    // Mock WebSocket
    global.WebSocket = vi.fn(() => mockWebSocket) as any;

    render(<RealTimeComponent />);

    // Simulate incoming message
    const messageHandler = mockWebSocket.addEventListener.mock.calls
      .find(call => call[0] === 'message')[1];

    messageHandler({
      data: JSON.stringify({
        type: 'APPOINTMENT_UPDATE',
        payload: { id: '1', status: 'confirmed' },
      }),
    });

    expect(screen.getByText('Appointment confirmed')).toBeInTheDocument();
  });
});
```

### Testing with External Services

```typescript
describe('External Service Integration', () => {
  it('should handle payment processing', async () => {
    // Mock Stripe
    const mockStripe = {
      confirmPayment: vi.fn().mockResolvedValue({
        paymentIntent: { status: 'succeeded' },
      }),
    };

    vi.mocked(useStripe).mockReturnValue(mockStripe);

    const { user } = render(<PaymentForm />);

    await user.click(screen.getByRole('button', { name: /pay now/i }));

    await waitFor(() => {
      expect(mockStripe.confirmPayment).toHaveBeenCalled();
      expect(screen.getByText('Payment successful')).toBeInTheDocument();
    });
  });
});
```

## Test Organization Strategies

### Feature-Based Organization

```
src/
├── features/
│   ├── appointments/
│   │   ├── components/
│   │   │   └── __tests__/
│   │   ├── hooks/
│   │   │   └── __tests__/
│   │   ├── services/
│   │   │   └── __tests__/
│   │   └── __tests__/
│   │       └── appointments.integration.test.tsx
```

### Test Categories

```typescript
// Unit tests - Fast, isolated
describe('Unit: calculateAppointmentFee', () => {
  // Test pure functions
});

// Integration tests - Component + hooks + API
describe('Integration: AppointmentBooking', () => {
  // Test component interactions
});

// E2E tests - Full user workflows
describe('E2E: Complete Patient Journey', () => {
  // Test complete user scenarios
});
```

## Performance Testing Strategies

### Component Performance

```typescript
describe('Performance Tests', () => {
  it('should render large lists efficiently', () => {
    const largeDataSet = Array.from({ length: 1000 }, (_, i) => 
      createTestDoctor({ id: `doctor-${i}` })
    );

    const startTime = performance.now();
    
    render(<DoctorList doctors={largeDataSet} />);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;

    expect(renderTime).toBeLessThan(100); // 100ms threshold
  });

  it('should handle rapid state updates', async () => {
    const { user } = render(<SearchComponent />);
    const searchInput = screen.getByLabelText('Search');

    // Simulate rapid typing
    const searchTerm = 'cardiology';
    for (const char of searchTerm) {
      await user.type(searchInput, char);
    }

    // Should debounce and only make one API call
    await waitFor(() => {
      expect(screen.getByText('Search results')).toBeInTheDocument();
    });

    // Verify only one API call was made
    expect(server.getHandlers()).toHaveBeenCalledTimes(1);
  });
});
```

### Memory Leak Testing

```typescript
describe('Memory Management', () => {
  it('should cleanup subscriptions on unmount', () => {
    const cleanup = vi.fn();
    
    const TestComponent = () => {
      useEffect(() => {
        const subscription = subscribe();
        return () => {
          cleanup();
          subscription.unsubscribe();
        };
      }, []);
      
      return <div>Test</div>;
    };

    const { unmount } = render(<TestComponent />);
    
    unmount();
    
    expect(cleanup).toHaveBeenCalled();
  });
});
```

## Security Testing

### Input Sanitization

```typescript
describe('Security Tests', () => {
  it('should sanitize user input', async () => {
    const { user } = renderWithForm(<CommentForm />);
    
    const maliciousInput = '<script>alert("xss")</script>';
    
    await user.type(screen.getByLabelText('Comment'), maliciousInput);
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Verify input is sanitized
    expect(screen.queryByText(maliciousInput)).not.toBeInTheDocument();
    expect(screen.getByText('&lt;script&gt;alert("xss")&lt;/script&gt;')).toBeInTheDocument();
  });

  it('should validate file uploads', async () => {
    const { user } = render(<FileUploadComponent />);
    
    const maliciousFile = new File(['malicious content'], 'virus.exe', {
      type: 'application/x-msdownload',
    });

    const fileInput = screen.getByLabelText('Upload file');
    await user.upload(fileInput, maliciousFile);

    expect(screen.getByText('Invalid file type')).toBeInTheDocument();
  });
});
```

### Authentication Testing

```typescript
describe('Authentication Security', () => {
  it('should protect sensitive routes', () => {
    render(<ProtectedRoute />);
    
    expect(screen.getByText('Please log in')).toBeInTheDocument();
    expect(screen.queryByText('Sensitive content')).not.toBeInTheDocument();
  });

  it('should handle token expiration', async () => {
    // Mock expired token
    server.use(
      http.get('/api/protected', () => {
        return HttpResponse.json(
          { message: 'Token expired' },
          { status: 401 }
        );
      })
    );

    render(<ProtectedComponent />);

    await waitFor(() => {
      expect(screen.getByText('Session expired')).toBeInTheDocument();
    });
  });
});
```

## Continuous Integration Best Practices

### Test Parallelization

```javascript
// vitest.config.mts
export default defineConfig({
  test: {
    // Run tests in parallel
    pool: 'threads',
    poolOptions: {
      threads: {
        maxThreads: 4,
        minThreads: 2,
      },
    },
    
    // Separate test suites
    workspace: [
      'vitest.unit.config.mts',
      'vitest.integration.config.mts',
      'vitest.e2e.config.mts',
    ],
  },
});
```

### Test Reporting

```javascript
// Generate multiple report formats
export default defineConfig({
  test: {
    reporters: [
      'default',
      'junit',
      'html',
      ['json', { outputFile: 'test-results.json' }],
    ],
    
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
});
```

### Flaky Test Detection

```typescript
describe('Flaky Test Prevention', () => {
  // Use deterministic data
  it('should use consistent test data', () => {
    const fixedDate = new Date('2024-01-15T10:00:00Z');
    vi.setSystemTime(fixedDate);
    
    render(<DateComponent />);
    
    expect(screen.getByText('January 15, 2024')).toBeInTheDocument();
    
    vi.useRealTimers();
  });

  // Proper async handling
  it('should wait for async operations', async () => {
    render(<AsyncComponent />);
    
    // ❌ Flaky - might not be loaded yet
    // expect(screen.getByText('Loaded')).toBeInTheDocument();
    
    // ✅ Stable - waits for element
    await waitFor(() => {
      expect(screen.getByText('Loaded')).toBeInTheDocument();
    });
  });
});
```

## Test Maintenance

### Automated Test Health Monitoring

```typescript
// Test health metrics
describe('Test Health Checks', () => {
  it('should have reasonable test execution time', () => {
    const testStartTime = Date.now();
    
    // Run test logic
    render(<ComplexComponent />);
    
    const testEndTime = Date.now();
    const executionTime = testEndTime - testStartTime;
    
    // Warn if test is too slow
    if (executionTime > 1000) {
      console.warn(`Slow test detected: ${executionTime}ms`);
    }
    
    expect(executionTime).toBeLessThan(5000); // 5 second max
  });
});
```

### Test Code Quality

```typescript
// Test readability standards
describe('UserProfile Component', () => {
  // ✅ Good: Descriptive test name
  it('should display user name and email when user data is provided', () => {
    const userData = createTestUser({
      name: 'John Doe',
      email: 'john@example.com',
    });
    
    render(<UserProfile user={userData} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  // ❌ Bad: Vague test name
  it('should work', () => {
    // Unclear what this tests
  });
});
```

## Documentation and Knowledge Sharing

### Test Documentation Standards

```typescript
/**
 * Tests the appointment booking workflow
 * 
 * @description This test suite covers the complete appointment booking process
 * including doctor selection, date/time selection, and payment processing.
 * 
 * @requires MSW handlers for appointment and payment APIs
 * @requires Redux store with authenticated user
 * 
 * @example
 * // To run only these tests:
 * pnpm test AppointmentBooking
 */
describe('AppointmentBooking Workflow', () => {
  /**
   * Tests successful appointment booking
   * 
   * @scenario User selects doctor, chooses time slot, and completes booking
   * @expected Appointment is created and confirmation is shown
   */
  it('should complete appointment booking successfully', async () => {
    // Test implementation
  });
});
```

### Team Knowledge Sharing

```typescript
// Create reusable test patterns
export const testPatterns = {
  /**
   * Standard pattern for testing form components
   */
  formComponent: (Component: React.ComponentType, schema: ZodSchema) => {
    describe(`${Component.name} Form Tests`, () => {
      it('should validate required fields', async () => {
        // Standard validation test
      });
      
      it('should submit valid data', async () => {
        // Standard submission test
      });
    });
  },

  /**
   * Standard pattern for testing API components
   */
  apiComponent: (Component: React.ComponentType, apiEndpoint: string) => {
    describe(`${Component.name} API Tests`, () => {
      it('should handle loading states', async () => {
        // Standard loading test
      });
      
      it('should handle errors', async () => {
        // Standard error test
      });
    });
  },
};
```

## Conclusion

Following these comprehensive guidelines will help maintain a robust, reliable test suite that supports the ZenDoc platform's quality and development velocity. Remember that good tests are an investment in code quality and developer productivity.

### Key Takeaways

1. **Test user behavior, not implementation details**
2. **Use appropriate testing utilities for consistency**
3. **Write maintainable and readable tests**
4. **Focus on critical user paths and edge cases**
5. **Integrate testing into your development workflow**
6. **Monitor and maintain test health over time**

### Resources

- [Test Examples](./TEST_EXAMPLES.md) - Practical examples and templates
- [Training Guide](./TESTING_TRAINING_GUIDE.md) - Comprehensive learning path
- [Test Utilities Documentation](../src/test/TEST_UTILITIES_DOCUMENTATION.md) - Complete utility reference
- [Testing Best Practices](https://testing-library.com/docs/guiding-principles/) - Community guidelines

For questions or clarifications, refer to the test utilities documentation or reach out to the development team.
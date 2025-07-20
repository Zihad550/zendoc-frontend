# ZenDoc Testing Training Guide

## 🎯 Training Overview

This comprehensive training guide is designed to help ZenDoc developers master the testing practices and tools used in our healthcare management platform. Whether you're new to testing or looking to improve your skills, this guide will take you from basics to advanced testing techniques.

## 📚 Learning Path

### Beginner Level (Week 1-2)
1. [Testing Fundamentals](#testing-fundamentals)
2. [Setting Up Your Environment](#setting-up-your-environment)
3. [Writing Your First Tests](#writing-your-first-tests)
4. [Basic Component Testing](#basic-component-testing)

### Intermediate Level (Week 3-4)
5. [Form Testing with React Hook Form](#form-testing-with-react-hook-form)
6. [Redux and API Testing](#redux-and-api-testing)
7. [Custom Hook Testing](#custom-hook-testing)
8. [Accessibility Testing](#accessibility-testing)

### Advanced Level (Week 5-6)
9. [Integration Testing](#integration-testing)
10. [Performance Testing](#performance-testing)
11. [Test Maintenance and Debugging](#test-maintenance-and-debugging)
12. [CI/CD Integration](#cicd-integration)

## Testing Fundamentals

### What is Testing?

Testing is the process of verifying that your code works as expected. In the context of React applications, we focus on:

- **Unit Tests**: Testing individual components or functions in isolation
- **Integration Tests**: Testing how different parts work together
- **End-to-End Tests**: Testing complete user workflows

### The Testing Pyramid

```
    /\
   /E2E\     <- Few, expensive, slow
  /____\
 /      \
/Integration\ <- Some, moderate cost
\____________/
\            /
 \   Unit   /  <- Many, cheap, fast
  \________/
```

### Why Test?

1. **Catch bugs early** - Find issues before users do
2. **Refactoring confidence** - Change code without fear
3. **Documentation** - Tests show how code should work
4. **Better design** - Testable code is usually better code

### ZenDoc Testing Philosophy

We follow these principles:
- **User-centric testing** - Test what users see and do
- **Fast feedback** - Tests should run quickly
- **Maintainable** - Tests should be easy to understand and update
- **Comprehensive coverage** - Focus on critical paths

## Setting Up Your Environment

### Prerequisites

Ensure you have these tools installed:

```bash
# Node.js and pnpm
node --version  # Should be 18+
pnpm --version  # Should be 8+

# VS Code extensions (recommended)
# - Jest Runner
# - Test Explorer UI
# - Error Lens
```

### Running Tests

```bash
# Development - watch mode with hot reload
pnpm test

# Single run - for CI/CD
pnpm test:run

# With coverage report
pnpm test:coverage

# Specific test file
pnpm test ComponentName.test.tsx

# With UI interface
pnpm test:ui
```

### VS Code Setup

Add these settings to your VS Code workspace:

```json
{
  "jest.jestCommandLine": "pnpm test",
  "jest.autoRun": "watch",
  "jest.showCoverageOnLoad": true,
  "testing.automaticallyOpenPeekView": "never"
}
```

## Writing Your First Tests

### Test Structure

Every test follows the AAA pattern:

```typescript
describe('Component or Function Name', () => {
  it('should do something specific', () => {
    // Arrange - Set up test data and conditions
    const props = { title: 'Test Title' };
    
    // Act - Perform the action being tested
    render(<Component {...props} />);
    
    // Assert - Verify the expected outcome
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

### Your First Component Test

Let's test a simple Button component:

```typescript
// src/components/UI/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ children, onClick, disabled, variant = 'primary' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      data-testid="custom-button"
    >
      {children}
    </button>
  );
};
```

```typescript
// src/components/UI/__tests__/Button.test.tsx
import { render, screen } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

describe('Button', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>);
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('should handle click events', async () => {
    const user = userEvent.setup();
    const mockClick = vi.fn();
    
    render(<Button onClick={mockClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should apply correct variant class', () => {
    render(<Button variant="secondary">Click me</Button>);
    
    expect(screen.getByTestId('custom-button')).toHaveClass('btn-secondary');
  });
});
```

### Exercise 1: Write Your First Test

Create a test for this simple component:

```typescript
// src/components/UI/Badge.tsx
interface BadgeProps {
  text: string;
  color?: 'success' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'large';
}

export const Badge = ({ text, color = 'success', size = 'medium' }: BadgeProps) => {
  return (
    <span className={`badge badge-${color} badge-${size}`}>
      {text}
    </span>
  );
};
```

**Your task**: Write tests that verify:
1. Badge renders with text
2. Default color is 'success'
3. Default size is 'medium'
4. Custom color and size are applied correctly

<details>
<summary>Solution</summary>

```typescript
import { render, screen } from '@/test/utils/test-utils';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('should render with text', () => {
    render(<Badge text="Test Badge" />);
    
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('should apply default color and size', () => {
    render(<Badge text="Default" />);
    
    const badge = screen.getByText('Default');
    expect(badge).toHaveClass('badge-success');
    expect(badge).toHaveClass('badge-medium');
  });

  it('should apply custom color', () => {
    render(<Badge text="Warning" color="warning" />);
    
    expect(screen.getByText('Warning')).toHaveClass('badge-warning');
  });

  it('should apply custom size', () => {
    render(<Badge text="Large" size="large" />);
    
    expect(screen.getByText('Large')).toHaveClass('badge-large');
  });
});
```

</details>

## Basic Component Testing

### Testing Patterns

#### 1. Rendering Tests

```typescript
describe('Component Rendering', () => {
  it('should render with required props', () => {
    render(<Component title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render with optional props', () => {
    render(<Component title="Test" subtitle="Subtitle" />);
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('should handle missing optional props', () => {
    render(<Component title="Test" />);
    expect(screen.queryByText('subtitle')).not.toBeInTheDocument();
  });
});
```

#### 2. Interaction Tests

```typescript
describe('Component Interactions', () => {
  it('should handle user clicks', async () => {
    const user = userEvent.setup();
    const mockHandler = vi.fn();
    
    render(<Component onClick={mockHandler} />);
    
    await user.click(screen.getByRole('button'));
    
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it('should handle keyboard events', async () => {
    const user = userEvent.setup();
    
    render(<Component />);
    
    await user.keyboard('{Enter}');
    
    expect(screen.getByText('Enter pressed')).toBeInTheDocument();
  });
});
```

#### 3. State Tests

```typescript
describe('Component State', () => {
  it('should update state on interaction', async () => {
    const user = userEvent.setup();
    
    render(<ToggleComponent />);
    
    expect(screen.getByText('Off')).toBeInTheDocument();
    
    await user.click(screen.getByRole('button'));
    
    expect(screen.getByText('On')).toBeInTheDocument();
  });
});
```

### Common Testing Queries

```typescript
// By Role (preferred)
screen.getByRole('button')
screen.getByRole('textbox', { name: 'Email' })
screen.getByRole('heading', { level: 1 })

// By Label Text
screen.getByLabelText('Email Address')

// By Placeholder Text
screen.getByPlaceholderText('Enter your email')

// By Text Content
screen.getByText('Submit')
screen.getByText(/submit/i) // Case insensitive

// By Test ID (use sparingly)
screen.getByTestId('custom-element')

// Query variants
screen.getBy...()     // Throws error if not found
screen.queryBy...()   // Returns null if not found
screen.findBy...()    // Async, waits for element
```

### Exercise 2: Component Testing

Test this UserCard component:

```typescript
interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'patient' | 'doctor' | 'admin';
    avatar?: string;
  };
  onEdit?: () => void;
  onDelete?: () => void;
  showActions?: boolean;
}

export const UserCard = ({ user, onEdit, onDelete, showActions = true }: UserCardProps) => {
  return (
    <div className="user-card">
      <img src={user.avatar || '/default-avatar.png'} alt={`${user.name} avatar`} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <span className={`role role-${user.role}`}>{user.role}</span>
      
      {showActions && (
        <div className="actions">
          {onEdit && <button onClick={onEdit}>Edit</button>}
          {onDelete && <button onClick={onDelete}>Delete</button>}
        </div>
      )}
    </div>
  );
};
```

**Your task**: Write comprehensive tests covering all functionality.

## Form Testing with React Hook Form

### Basic Form Testing

```typescript
import { renderWithForm } from '@/test/utils/form-test-utils';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email required'),
  password: z.string().min(8, 'Password must be 8+ characters'),
});

describe('LoginForm', () => {
  it('should validate required fields', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    
    renderWithForm(
      <LoginForm />,
      {
        onSubmit: mockSubmit,
        validationSchema: loginSchema,
      }
    );

    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText('Email required')).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('should submit valid form', async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn();
    
    renderWithForm(
      <LoginForm />,
      {
        onSubmit: mockSubmit,
        validationSchema: loginSchema,
      }
    );

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /login/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});
```

### Testing Form Components

```typescript
describe('PHInput', () => {
  it('should display validation errors', async () => {
    const user = userEvent.setup();
    
    renderWithForm(
      <PHInput name="email" label="Email" />,
      {
        validationSchema: z.object({
          email: z.string().email('Invalid email format'),
        }),
      }
    );

    const input = screen.getByLabelText('Email');
    await user.type(input, 'invalid-email');
    await user.tab(); // Trigger validation

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });

  it('should clear errors on valid input', async () => {
    const user = userEvent.setup();
    
    renderWithForm(
      <PHInput name="email" label="Email" />,
      {
        validationSchema: z.object({
          email: z.string().email('Invalid email format'),
        }),
      }
    );

    const input = screen.getByLabelText('Email');
    
    // Enter invalid email
    await user.type(input, 'invalid');
    await user.tab();
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();

    // Fix the email
    await user.clear(input);
    await user.type(input, 'valid@example.com');
    await user.tab();
    
    expect(screen.queryByText('Invalid email format')).not.toBeInTheDocument();
  });
});
```

### Exercise 3: Form Testing

Create tests for this registration form:

```typescript
const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['patient', 'doctor']),
  terms: z.boolean().refine(val => val === true, 'You must accept terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const RegistrationForm = () => {
  return (
    <form>
      <PHInput name="name" label="Full Name" />
      <PHInput name="email" label="Email" type="email" />
      <PHInput name="password" label="Password" type="password" />
      <PHInput name="confirmPassword" label="Confirm Password" type="password" />
      <PHSelectField name="role" label="Role" options={[
        { value: 'patient', label: 'Patient' },
        { value: 'doctor', label: 'Doctor' },
      ]} />
      <PHCheckbox name="terms" label="I accept the terms and conditions" />
      <button type="submit">Register</button>
    </form>
  );
};
```

**Your task**: Write tests for validation, submission, and error handling.

## Redux and API Testing

### Testing API Slices

```typescript
import { setupApiStore } from '@/test/utils/redux-test-utils';
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

describe('userApi', () => {
  let storeRef: ReturnType<typeof setupApiStore>;

  beforeEach(() => {
    storeRef = setupApiStore(userApi);
  });

  it('should fetch users successfully', async () => {
    const result = await storeRef.store.dispatch(
      userApi.endpoints.getUsers.initiate()
    );

    expect(result.data).toEqual({
      success: true,
      data: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          email: expect.any(String),
        })
      ])
    });
  });

  it('should handle API errors', async () => {
    server.use(
      http.get('/api/users', () => {
        return HttpResponse.json(
          { message: 'Server error' },
          { status: 500 }
        );
      })
    );

    const result = await storeRef.store.dispatch(
      userApi.endpoints.getUsers.initiate()
    );

    expect(result.error).toBeDefined();
    expect(result.error.status).toBe(500);
  });
});
```

### Testing Redux Slices

```typescript
describe('authSlice', () => {
  it('should handle login', () => {
    const initialState = { user: null, token: null, isAuthenticated: false };
    const userData = { id: '1', name: 'John', email: 'john@example.com' };
    
    const action = login({ user: userData, token: 'jwt-token' });
    const newState = authSlice.reducer(initialState, action);

    expect(newState.user).toEqual(userData);
    expect(newState.token).toBe('jwt-token');
    expect(newState.isAuthenticated).toBe(true);
  });
});
```

### Exercise 4: API Testing

Test this appointment API:

```typescript
export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Appointment'],
  endpoints: (builder) => ({
    getAppointments: builder.query<ApiResponse<Appointment[]>, void>({
      query: () => '/appointment',
      providesTags: ['Appointment'],
    }),
    createAppointment: builder.mutation<ApiResponse<Appointment>, CreateAppointmentData>({
      query: (data) => ({
        url: '/appointment',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Appointment'],
    }),
    updateAppointmentStatus: builder.mutation<ApiResponse<Appointment>, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/appointment/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Appointment'],
    }),
  }),
});
```

**Your task**: Write comprehensive tests for all endpoints including success and error cases.

## Custom Hook Testing

### Basic Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { result } = renderHook(() => useCounter(10));
    
    expect(result.current.count).toBe(10);
  });

  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));
    
    act(() => {
      result.current.decrement();
    });
    
    expect(result.current.count).toBe(4);
  });
});
```

### Testing Async Hooks

```typescript
describe('useAsyncData', () => {
  it('should handle loading states', async () => {
    const { result } = renderHook(() => useAsyncData('/api/data'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.data).toBeDefined();
  });

  it('should handle errors', async () => {
    server.use(
      http.get('/api/data', () => {
        return HttpResponse.json(
          { message: 'Not found' },
          { status: 404 }
        );
      })
    );

    const { result } = renderHook(() => useAsyncData('/api/data'));
    
    await waitFor(() => {
      expect(result.current.error).toBeDefined();
    });
    
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
  });
});
```

## Accessibility Testing

### Basic Accessibility Tests

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Component Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels', () => {
    render(<Component />);
    
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });

  it('should support keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Component />);
    
    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
    
    await user.keyboard('{Enter}');
    // Assert expected behavior
  });
});
```

## Integration Testing

### Component Integration Tests

```typescript
describe('UserDashboard Integration', () => {
  it('should display user data and handle interactions', async () => {
    const user = userEvent.setup();
    const testUser = createTestUser({ role: 'patient' });
    
    renderWithRedux(<UserDashboard />, {
      initialState: {
        auth: { user: testUser, isAuthenticated: true },
      },
    });

    // Verify user data is displayed
    expect(screen.getByText(testUser.name)).toBeInTheDocument();
    
    // Test navigation
    await user.click(screen.getByRole('link', { name: /appointments/i }));
    
    // Verify navigation worked
    expect(screen.getByText('Your Appointments')).toBeInTheDocument();
  });
});
```

### API Integration Tests

```typescript
describe('Login Flow Integration', () => {
  it('should handle complete login flow', async () => {
    const user = userEvent.setup();
    
    render(<LoginPage />);
    
    // Fill in form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /login/i }));
    
    // Wait for redirect
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });
});
```

## Test Maintenance and Debugging

### Debugging Failed Tests

```typescript
describe('Debugging Example', () => {
  it('should debug failing test', () => {
    render(<Component />);
    
    // Debug current DOM state
    screen.debug();
    
    // Debug specific element
    screen.debug(screen.getByRole('button'));
    
    // Log available queries
    console.log('Available buttons:', screen.getAllByRole('button'));
  });
});
```

### Common Issues and Solutions

#### Issue: Element not found

```typescript
// ❌ Bad - element might not be rendered yet
expect(screen.getByText('Loading complete')).toBeInTheDocument();

// ✅ Good - wait for async element
await waitFor(() => {
  expect(screen.getByText('Loading complete')).toBeInTheDocument();
});
```

#### Issue: User events not working

```typescript
// ❌ Bad - missing await
user.click(button);
expect(mockHandler).toHaveBeenCalled();

// ✅ Good - await user interactions
await user.click(button);
expect(mockHandler).toHaveBeenCalled();
```

#### Issue: Tests interfering with each other

```typescript
describe('Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Reset MSW handlers
    server.resetHandlers();
  });
});
```

## Best Practices Checklist

### ✅ Do's

- [ ] Write descriptive test names
- [ ] Test user behavior, not implementation
- [ ] Use semantic queries (getByRole, getByLabelText)
- [ ] Mock external dependencies
- [ ] Test error states and edge cases
- [ ] Keep tests focused and simple
- [ ] Use async/await for user interactions
- [ ] Clean up after tests

### ❌ Don'ts

- [ ] Don't test implementation details
- [ ] Don't use shallow rendering
- [ ] Don't test third-party libraries
- [ ] Don't write overly complex tests
- [ ] Don't ignore test warnings
- [ ] Don't skip accessibility testing
- [ ] Don't hardcode test data

## Practical Exercises

### Final Project: Complete Component Test Suite

Create a comprehensive test suite for this DoctorCard component:

```typescript
interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialties: string[];
    rating: number;
    consultationFee: number;
    avatar?: string;
    isAvailable: boolean;
  };
  onBookAppointment: (doctorId: string) => void;
  onViewProfile: (doctorId: string) => void;
  showBookingButton?: boolean;
}

export const DoctorCard = ({ 
  doctor, 
  onBookAppointment, 
  onViewProfile, 
  showBookingButton = true 
}: DoctorCardProps) => {
  return (
    <div className="doctor-card">
      <img 
        src={doctor.avatar || '/default-doctor.png'} 
        alt={`Dr. ${doctor.name}`}
      />
      <h3>{doctor.name}</h3>
      <div className="specialties">
        {doctor.specialties.map(specialty => (
          <span key={specialty} className="specialty-tag">
            {specialty}
          </span>
        ))}
      </div>
      <div className="rating">
        Rating: {doctor.rating}/5
      </div>
      <div className="fee">
        ${doctor.consultationFee}
      </div>
      <div className={`availability ${doctor.isAvailable ? 'available' : 'unavailable'}`}>
        {doctor.isAvailable ? 'Available' : 'Unavailable'}
      </div>
      <div className="actions">
        <button onClick={() => onViewProfile(doctor.id)}>
          View Profile
        </button>
        {showBookingButton && doctor.isAvailable && (
          <button 
            onClick={() => onBookAppointment(doctor.id)}
            className="book-appointment"
          >
            Book Appointment
          </button>
        )}
      </div>
    </div>
  );
};
```

**Requirements**:
1. Test all rendering scenarios
2. Test user interactions
3. Test conditional rendering
4. Test accessibility
5. Test error states
6. Achieve 100% code coverage

## Resources and References

### Documentation
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [MSW Documentation](https://mswjs.io/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

### ZenDoc Specific
- [Testing Guidelines](./TESTING_GUIDELINES.md)
- [Test Examples](./TEST_EXAMPLES.md)
- [Test Utilities Documentation](../src/test/README.md)

### Community Resources
- [Testing JavaScript Course](https://testingjavascript.com/)
- [React Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Getting Help

### Internal Support
- **Slack Channel**: #testing-help
- **Code Reviews**: Tag @testing-team for review
- **Office Hours**: Tuesdays 2-3 PM for testing questions

### Troubleshooting
1. Check the [Testing Guidelines](./TESTING_GUIDELINES.md) first
2. Search existing tests for similar patterns
3. Use `screen.debug()` to understand DOM state
4. Check MSW handlers for API mocking issues
5. Ask in the team chat for help

Remember: Good tests are an investment in code quality and team productivity. Take time to write them well!
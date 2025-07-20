# ZenDoc Test Utilities Documentation

## Overview

This document provides comprehensive documentation for all test utilities and helper functions available in the ZenDoc testing framework. These utilities are designed to simplify test writing, ensure consistency, and provide powerful testing capabilities across the application.

## Table of Contents

1. [Core Test Utilities](#core-test-utilities)
2. [Form Test Utilities](#form-test-utilities)
3. [Redux Test Utilities](#redux-test-utilities)
4. [MUI Test Utilities](#mui-test-utilities)
5. [Test Data Factories](#test-data-factories)
6. [MSW Mock Handlers](#msw-mock-handlers)
7. [Custom Matchers](#custom-matchers)
8. [Testing Patterns](#testing-patterns)

## Core Test Utilities

### `render` - Enhanced Component Rendering

**Location**: `src/test/utils/test-utils.tsx`

Enhanced version of React Testing Library's render function with built-in providers and utilities.

```typescript
interface RenderOptions {
  initialState?: Partial<RootState>;
  store?: AppStore;
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;
  theme?: Theme;
  user?: User;
}

interface CustomRenderResult extends RenderResult {
  store: AppStore;
  user: UserEvent;
}

function render(
  ui: React.ReactElement,
  options?: RenderOptions
): CustomRenderResult
```

#### Usage Examples

```typescript
import { render, screen } from '@/test/utils/test-utils';

// Basic rendering with all providers
const { user } = render(<MyComponent />);

// With custom initial state
render(<MyComponent />, {
  initialState: {
    auth: { user: mockUser, isAuthenticated: true }
  }
});

// With custom store
const customStore = createMockStore();
render(<MyComponent />, { store: customStore });

// With custom theme
render(<MyComponent />, { theme: darkTheme });
```

#### Features

- **Automatic Provider Wrapping**: Redux Provider, Theme Provider, Router Provider
- **User Event Setup**: Pre-configured userEvent instance
- **Store Access**: Direct access to Redux store for assertions
- **Cleanup**: Automatic cleanup after each test
- **TypeScript Support**: Full type safety

### `waitForLoadingToFinish` - Loading State Helper

```typescript
async function waitForLoadingToFinish(): Promise<void>
```

Waits for all loading indicators to disappear from the DOM.

```typescript
import { waitForLoadingToFinish } from '@/test/utils/test-utils';

it('should load data', async () => {
  render(<AsyncComponent />);
  
  await waitForLoadingToFinish();
  
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});
```

### `createMockUser` - User Data Factory

```typescript
function createMockUser(overrides?: Partial<User>): User
```

Creates mock user data for testing.

```typescript
const mockPatient = createMockUser({ role: 'patient' });
const mockDoctor = createMockUser({ 
  role: 'doctor', 
  specialties: ['Cardiology'] 
});
```

## Form Test Utilities

### `renderWithForm` - Form Testing Helper

**Location**: `src/test/utils/form-test-utils.tsx`

Specialized render function for testing React Hook Form components.

```typescript
interface FormTestOptions {
  defaultValues?: Record<string, any>;
  validationSchema?: ZodSchema;
  onSubmit?: (data: any) => void;
  formErrors?: Record<string, { message: string }>;
  mode?: 'onChange' | 'onBlur' | 'onSubmit';
}

function renderWithForm(
  ui: React.ReactElement,
  options?: FormTestOptions
): CustomRenderResult
```

#### Usage Examples

```typescript
import { renderWithForm } from '@/test/utils/form-test-utils';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Too short'),
});

// Basic form testing
renderWithForm(<LoginForm />, {
  onSubmit: mockSubmit,
  validationSchema: schema,
});

// With default values
renderWithForm(<ProfileForm />, {
  defaultValues: {
    name: 'John Doe',
    email: 'john@example.com',
  },
});

// With pre-existing errors
renderWithForm(<FormComponent />, {
  formErrors: {
    email: { message: 'Email already exists' },
  },
});
```

#### Features

- **Automatic Form Setup**: React Hook Form provider with configuration
- **Validation Integration**: Zod schema validation support
- **Error Simulation**: Pre-populate form errors for testing
- **Submit Handling**: Mock submit handlers with data capture
- **Mode Configuration**: Control validation timing

### `fillForm` - Form Interaction Helper

```typescript
async function fillForm(
  formData: Record<string, any>,
  user: UserEvent
): Promise<void>
```

Automatically fills form fields with provided data.

```typescript
import { fillForm } from '@/test/utils/form-test-utils';

it('should submit form with data', async () => {
  const { user } = renderWithForm(<RegistrationForm />);
  
  await fillForm({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  }, user);
  
  await user.click(screen.getByRole('button', { name: /submit/i }));
});
```

### `expectFormErrors` - Error Assertion Helper

```typescript
function expectFormErrors(errors: Record<string, string>): void
```

Asserts that specific form errors are displayed.

```typescript
import { expectFormErrors } from '@/test/utils/form-test-utils';

it('should show validation errors', async () => {
  renderWithForm(<LoginForm />);
  
  await user.click(screen.getByRole('button', { name: /login/i }));
  
  expectFormErrors({
    email: 'Email is required',
    password: 'Password is required',
  });
});
```

## Redux Test Utilities

### `setupApiStore` - API Testing Store

**Location**: `src/test/utils/redux-test-utils.tsx`

Creates a Redux store specifically configured for testing API slices.

```typescript
function setupApiStore<T extends Api<any, any, any, any>>(
  api: T,
  extraReducers?: Record<string, Reducer>
): {
  store: EnhancedStore;
  api: T;
}
```

#### Usage Examples

```typescript
import { setupApiStore } from '@/test/utils/redux-test-utils';
import { doctorApi } from '@/redux/features/doctor/doctorApi';

describe('doctorApi', () => {
  let storeRef: ReturnType<typeof setupApiStore>;

  beforeEach(() => {
    storeRef = setupApiStore(doctorApi);
  });

  it('should fetch doctors', async () => {
    const result = await storeRef.store.dispatch(
      doctorApi.endpoints.getDoctors.initiate()
    );
    
    expect(result.data).toBeDefined();
  });
});
```

### `renderWithRedux` - Redux Component Testing

```typescript
interface ReduxRenderOptions {
  initialState?: Partial<RootState>;
  store?: AppStore;
  middleware?: Middleware[];
}

function renderWithRedux(
  ui: React.ReactElement,
  options?: ReduxRenderOptions
): CustomRenderResult
```

Renders components with Redux store integration.

```typescript
import { renderWithRedux } from '@/test/utils/redux-test-utils';

it('should display user data from store', () => {
  const mockUser = createMockUser();
  
  renderWithRedux(<UserProfile />, {
    initialState: {
      auth: { user: mockUser, isAuthenticated: true },
    },
  });
  
  expect(screen.getByText(mockUser.name)).toBeInTheDocument();
});
```

### `createMockStore` - Custom Store Factory

```typescript
function createMockStore(
  initialState?: Partial<RootState>,
  middleware?: Middleware[]
): AppStore
```

Creates a mock Redux store for testing.

```typescript
const store = createMockStore({
  auth: { user: mockUser, isAuthenticated: true },
});

// Use with custom render
render(<Component />, { store });
```

### `mockApiEndpoint` - API Endpoint Mocker

```typescript
function mockApiEndpoint<T>(
  api: any,
  endpointName: string,
  response: T,
  error?: any
): void
```

Mocks specific API endpoints for testing.

```typescript
import { mockApiEndpoint } from '@/test/utils/redux-test-utils';

it('should handle API errors', () => {
  mockApiEndpoint(
    doctorApi,
    'getDoctors',
    null,
    { status: 500, message: 'Server error' }
  );
  
  // Test error handling
});
```

## MUI Test Utilities

### `renderWithTheme` - Theme Provider Testing

**Location**: `src/test/utils/mui-test-utils.tsx`

Renders components with Material-UI theme provider.

```typescript
interface ThemeRenderOptions {
  theme?: Theme;
  mode?: 'light' | 'dark';
}

function renderWithTheme(
  ui: React.ReactElement,
  options?: ThemeRenderOptions
): CustomRenderResult
```

#### Usage Examples

```typescript
import { renderWithTheme } from '@/test/utils/mui-test-utils';
import { darkTheme } from '@/lib/theme/theme';

// With default theme
renderWithTheme(<MuiComponent />);

// With custom theme
renderWithTheme(<MuiComponent />, { theme: darkTheme });

// With dark mode
renderWithTheme(<MuiComponent />, { mode: 'dark' });
```

### `mockBreakpoint` - Responsive Testing Helper

```typescript
function mockBreakpoint(breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): void
```

Mocks Material-UI breakpoints for responsive testing.

```typescript
import { mockBreakpoint } from '@/test/utils/mui-test-utils';

it('should be responsive on mobile', () => {
  mockBreakpoint('xs');
  
  renderWithTheme(<ResponsiveComponent />);
  
  expect(screen.getByTestId('mobile-layout')).toBeInTheDocument();
});
```

### `expectMuiThemeStyles` - Theme Style Assertions

```typescript
function expectMuiThemeStyles(
  element: HTMLElement,
  expectedStyles: Record<string, string>
): void
```

Asserts that elements have correct theme-based styles.

```typescript
import { expectMuiThemeStyles } from '@/test/utils/mui-test-utils';

it('should apply theme colors', () => {
  renderWithTheme(<ThemedButton variant="primary" />);
  
  const button = screen.getByRole('button');
  expectMuiThemeStyles(button, {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  });
});
```

## Test Data Factories

### User Data Factories

```typescript
// Basic user factory
function createTestUser(overrides?: Partial<User>): User

// Role-specific factories
function createTestPatient(overrides?: Partial<User>): User
function createTestDoctor(overrides?: Partial<Doctor>): Doctor
function createTestAdmin(overrides?: Partial<User>): User
```

#### Usage Examples

```typescript
import { 
  createTestUser, 
  createTestDoctor, 
  createTestPatient 
} from '@/test/utils/test-data';

// Basic user
const user = createTestUser({
  name: 'Custom Name',
  email: 'custom@example.com',
});

// Doctor with specialties
const doctor = createTestDoctor({
  specialties: ['Cardiology', 'Internal Medicine'],
  consultationFee: 150,
});

// Patient with medical history
const patient = createTestPatient({
  medicalHistory: ['Diabetes', 'Hypertension'],
});
```

### Appointment Data Factories

```typescript
function createTestAppointment(overrides?: Partial<Appointment>): Appointment
function createTestSchedule(overrides?: Partial<Schedule>): Schedule
```

```typescript
const appointment = createTestAppointment({
  status: 'scheduled',
  appointmentDate: '2024-01-15',
  doctorId: doctor.id,
  patientId: patient.id,
});
```

### Form Data Factories

```typescript
function createValidFormData(formType: string): Record<string, any>
function createInvalidFormData(formType: string): Record<string, any>
function createFormDataWithErrors(formType: string): Record<string, any>
```

```typescript
// Valid login data
const validLogin = createValidFormData('login');
// { email: 'valid@example.com', password: 'validpassword123' }

// Invalid login data
const invalidLogin = createInvalidFormData('login');
// { email: 'invalid-email', password: '123' }
```

## MSW Mock Handlers

### Authentication Handlers

```typescript
// Login handler
http.post('/api/auth/login', loginHandler)

// Token refresh handler
http.post('/api/auth/refresh-token', refreshTokenHandler)

// Logout handler
http.post('/api/auth/logout', logoutHandler)
```

### API Handlers

```typescript
// Doctor endpoints
http.get('/api/doctor', getDoctorsHandler)
http.post('/api/user/create-doctor', createDoctorHandler)
http.get('/api/doctor/:id', getDoctorByIdHandler)

// Appointment endpoints
http.get('/api/appointment', getAppointmentsHandler)
http.post('/api/appointment', createAppointmentHandler)
http.patch('/api/appointment/:id/status', updateAppointmentStatusHandler)

// User endpoints
http.get('/api/user', getUsersHandler)
http.post('/api/user', createUserHandler)
```

### Custom Handler Creation

```typescript
import { http, HttpResponse } from 'msw';

// Create custom handler
const customHandler = http.get('/api/custom', ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  
  return HttpResponse.json({
    success: true,
    data: { query },
  });
});

// Use in tests
server.use(customHandler);
```

### Handler Override Patterns

```typescript
// Override for error testing
server.use(
  http.get('/api/doctors', () => {
    return HttpResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  })
);

// Override for specific response
server.use(
  http.post('/api/appointment', () => {
    return HttpResponse.json({
      success: true,
      data: createTestAppointment({ status: 'confirmed' }),
    });
  })
);
```

## Custom Matchers

### Form Validation Matchers

```typescript
// Check if form field has error
expect(screen.getByLabelText('Email')).toHaveFormError('Invalid email');

// Check if form is valid
expect(screen.getByRole('form')).toBeValidForm();

// Check if form has specific values
expect(screen.getByRole('form')).toHaveFormValues({
  email: 'test@example.com',
  password: 'password123',
});
```

### Redux State Matchers

```typescript
// Check Redux state
expect(store.getState()).toHaveAuthenticatedUser(mockUser);

// Check API loading state
expect(store.getState()).toHaveApiLoading('getDoctors', true);

// Check API error state
expect(store.getState()).toHaveApiError('getDoctors', 'Server error');
```

### Accessibility Matchers

```typescript
// Check accessibility
expect(screen.getByRole('button')).toBeAccessible();

// Check ARIA attributes
expect(screen.getByRole('dialog')).toHaveAriaLabel('User settings');

// Check keyboard navigation
expect(screen.getByRole('button')).toBeKeyboardNavigable();
```

## Testing Patterns

### Component Testing Pattern

```typescript
describe('ComponentName', () => {
  const defaultProps = {
    // Define default props
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with required props', () => {
      render(<ComponentName {...defaultProps} />);
      // Assertions
    });
  });

  describe('User Interactions', () => {
    it('should handle user actions', async () => {
      const { user } = render(<ComponentName {...defaultProps} />);
      // User interactions and assertions
    });
  });

  describe('Error Handling', () => {
    it('should handle error states', () => {
      render(<ComponentName {...defaultProps} error="Error message" />);
      // Error assertions
    });
  });
});
```

### API Testing Pattern

```typescript
describe('apiSlice', () => {
  let storeRef: ReturnType<typeof setupApiStore>;

  beforeEach(() => {
    storeRef = setupApiStore(apiSlice);
  });

  describe('Successful Requests', () => {
    it('should handle successful API calls', async () => {
      const result = await storeRef.store.dispatch(
        apiSlice.endpoints.getData.initiate()
      );
      // Success assertions
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors', async () => {
      server.use(/* error handler */);
      const result = await storeRef.store.dispatch(
        apiSlice.endpoints.getData.initiate()
      );
      // Error assertions
    });
  });
});
```

### Integration Testing Pattern

```typescript
describe('Feature Integration', () => {
  it('should handle complete user workflow', async () => {
    const { user } = render(<FeatureComponent />);
    
    // Step 1: Initial state
    expect(screen.getByText('Initial state')).toBeInTheDocument();
    
    // Step 2: User interaction
    await user.click(screen.getByRole('button', { name: /action/i }));
    
    // Step 3: Wait for async operation
    await waitFor(() => {
      expect(screen.getByText('Updated state')).toBeInTheDocument();
    });
    
    // Step 4: Verify final state
    expect(screen.queryByText('Initial state')).not.toBeInTheDocument();
  });
});
```

## Best Practices

### Utility Usage Guidelines

1. **Use Appropriate Utilities**: Choose the right utility for your testing needs
2. **Combine Utilities**: Mix and match utilities for comprehensive testing
3. **Custom Extensions**: Extend utilities for project-specific needs
4. **Performance**: Use utilities efficiently to maintain fast test execution

### Common Patterns

```typescript
// ✅ Good: Use utilities consistently
const { user } = render(<Component />);
await user.click(screen.getByRole('button'));

// ✅ Good: Combine utilities for complex scenarios
renderWithRedux(<Component />, {
  initialState: mockState,
});

// ✅ Good: Use data factories for consistent test data
const mockUser = createTestUser({ role: 'doctor' });

// ❌ Avoid: Manual setup when utilities exist
const store = configureStore(/* manual config */);
render(<Provider store={store}><Component /></Provider>);
```

### Error Handling

```typescript
// ✅ Good: Use utility error helpers
expectFormErrors({ email: 'Required field' });

// ✅ Good: Use MSW for API error testing
server.use(
  http.get('/api/data', () => HttpResponse.error())
);

// ❌ Avoid: Manual error simulation
const mockFetch = vi.fn().mockRejectedValue(new Error());
```

## Troubleshooting

### Common Issues

1. **Utility Not Found**: Ensure correct import path
2. **Type Errors**: Check TypeScript definitions
3. **Mock Issues**: Verify MSW handler setup
4. **State Issues**: Check Redux store configuration

### Debug Helpers

```typescript
// Debug rendered output
screen.debug();

// Debug specific element
screen.debug(screen.getByRole('button'));

// Debug store state
console.log('Store state:', store.getState());

// Debug form state
console.log('Form values:', getValues());
```

## Contributing

### Adding New Utilities

1. Create utility function with proper TypeScript types
2. Add comprehensive JSDoc documentation
3. Include usage examples
4. Add unit tests for the utility itself
5. Update this documentation

### Utility Standards

- **TypeScript**: All utilities must be fully typed
- **Documentation**: Include JSDoc comments
- **Testing**: Utilities should be tested
- **Consistency**: Follow existing patterns
- **Performance**: Optimize for test execution speed

This documentation serves as the complete reference for all testing utilities in the ZenDoc platform. Use these utilities to write consistent, maintainable, and comprehensive tests.
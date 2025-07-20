# Testing Guide for ZenDoc

## Overview

This project uses **Vitest** as the testing framework with **React Testing Library** for component testing and **MSW (Mock Service Worker)** for API mocking.

## Testing Stack

- **Vitest**: Fast unit test framework
- **React Testing Library**: Component testing utilities
- **MSW**: API mocking for integration tests
- **@testing-library/jest-dom**: Custom matchers for DOM testing
- **@testing-library/user-event**: User interaction simulation

## Project Structure

```
src/test/
├── setup.ts                 # Global test setup
├── mocks/
│   ├── handlers.ts          # MSW API handlers
│   └── server.ts            # MSW server setup
└── utils/
    ├── test-utils.tsx       # Main testing utilities
    ├── redux-test-utils.tsx # Redux-specific utilities
    ├── form-test-utils.tsx  # Form testing utilities
    └── mui-test-utils.tsx   # MUI component utilities
```

## Available Scripts

```bash
pnpm test              # Run tests in watch mode
pnpm test:run          # Run tests once
pnpm test:coverage     # Run tests with coverage report
pnpm test:ui           # Run tests with UI interface
```

## Testing Utilities

### Main Test Utils (`test-utils.tsx`)

- `render`: Enhanced render with all providers (Redux, MUI, etc.)
- `createTestStore`: Create mock Redux store for testing

### Redux Test Utils (`redux-test-utils.tsx`)

- `renderWithRedux`: Render components with Redux provider
- `createMockStore`: Create mock store with custom initial state

### Form Test Utils (`form-test-utils.tsx`)

- `renderWithForm`: Render form components with React Hook Form context
- `FormTestWrapper`: Wrapper component for form testing

### MUI Test Utils (`mui-test-utils.tsx`)

- `renderWithMui`: Render components with MUI theme provider
- `MuiTestWrapper`: Wrapper component for MUI testing

## Writing Tests

### Component Tests

```typescript
import { render, screen } from '@/test/utils/test-utils';
import { describe, expect, it } from 'vitest';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
```

### Form Component Tests

```typescript
import { renderWithForm } from '@/test/utils/form-test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import MyFormComponent from '../MyFormComponent';

describe('MyFormComponent', () => {
  it('handles form submission', async () => {
    const onSubmit = vi.fn();
    renderWithForm(<MyFormComponent onSubmit={onSubmit} />);

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(onSubmit).toHaveBeenCalled();
  });
});
```

### Redux Component Tests

```typescript
import { renderWithRedux } from '@/test/utils/redux-test-utils';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MyReduxComponent from '../MyReduxComponent';

describe('MyReduxComponent', () => {
  it('displays user data from store', () => {
    const initialState = {
      user: { name: 'John Doe' },
    };

    renderWithRedux(<MyReduxComponent />, { initialState });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
```

## API Mocking with MSW

API handlers are defined in `src/test/mocks/handlers.ts`. Add new handlers as needed:

```typescript
export const handlers = [
  http.get('/api/users', () => {
    return HttpResponse.json({
      success: true,
      data: [{ id: '1', name: 'John Doe' }],
    });
  }),
];
```

## Best Practices

1. **Use descriptive test names** that explain what is being tested
2. **Test user interactions** rather than implementation details
3. **Mock external dependencies** using MSW or vi.mock()
4. **Use appropriate test utilities** for different component types
5. **Keep tests focused** - one concept per test
6. **Use proper cleanup** - tests should not affect each other

## Common Patterns

### Testing User Interactions

```typescript
import userEvent from '@testing-library/user-event';

it('handles user input', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);

  await user.type(screen.getByLabelText('Email'), 'test@example.com');
  await user.click(screen.getByRole('button', { name: 'Submit' }));

  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

### Testing Async Operations

```typescript
import { waitFor } from '@testing-library/react';

it('loads data asynchronously', async () => {
  render(<MyComponent />);

  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument();
  });
});
```

### Mocking Hooks

```typescript
vi.mock('@/redux/hooks', () => ({
  useAppSelector: vi.fn(() => ({ user: null })),
  useAppDispatch: () => vi.fn(),
}));
```

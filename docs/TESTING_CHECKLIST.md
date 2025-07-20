# ZenDoc Testing Checklist & Quick Reference

## 📋 Pre-Development Testing Checklist

### Before Writing Code

- [ ] **Understand Requirements**: Review user stories and acceptance criteria
- [ ] **Plan Test Strategy**: Identify what needs testing (components, hooks, APIs)
- [ ] **Set Up Test Environment**: Ensure all testing tools are configured
- [ ] **Create Test Data**: Plan mock data and test scenarios

### Test Planning

- [ ] **Identify Test Cases**: List all scenarios to test
- [ ] **Determine Test Types**: Unit, integration, or E2E tests needed
- [ ] **Plan Mock Strategy**: What external dependencies need mocking
- [ ] **Consider Edge Cases**: Error states, boundary conditions, accessibility

## 🧪 Component Testing Checklist

### Basic Component Tests

- [ ] **Rendering Tests**
  - [ ] Renders with required props
  - [ ] Renders with optional props
  - [ ] Handles missing optional props gracefully
  - [ ] Applies correct CSS classes/styles

- [ ] **User Interaction Tests**
  - [ ] Click events work correctly
  - [ ] Keyboard navigation functions
  - [ ] Form submissions trigger properly
  - [ ] State updates on user actions

- [ ] **Props and State Tests**
  - [ ] Props are passed correctly to child components
  - [ ] State updates trigger re-renders
  - [ ] Conditional rendering works
  - [ ] Default props are applied

- [ ] **Error Handling Tests**
  - [ ] Error states display correctly
  - [ ] Error boundaries catch errors
  - [ ] Fallback UI renders on errors
  - [ ] Error recovery mechanisms work

### Form Component Specific

- [ ] **Validation Tests**
  - [ ] Required field validation
  - [ ] Format validation (email, phone, etc.)
  - [ ] Custom validation rules
  - [ ] Cross-field validation

- [ ] **Form Behavior Tests**
  - [ ] Form submission with valid data
  - [ ] Form submission blocked with invalid data
  - [ ] Form reset functionality
  - [ ] Field error clearing on valid input

- [ ] **Accessibility Tests**
  - [ ] Proper ARIA labels
  - [ ] Error announcements
  - [ ] Keyboard navigation
  - [ ] Focus management

## 🔗 Hook Testing Checklist

### Custom Hook Tests

- [ ] **Initial State Tests**
  - [ ] Returns correct initial values
  - [ ] Handles initial props correctly
  - [ ] Sets up side effects properly

- [ ] **State Update Tests**
  - [ ] State updates work correctly
  - [ ] Multiple state updates are handled
  - [ ] State updates trigger re-renders

- [ ] **Side Effect Tests**
  - [ ] Effects run on mount
  - [ ] Effects run on dependency changes
  - [ ] Cleanup functions execute on unmount
  - [ ] Async operations are handled

- [ ] **Error Handling Tests**
  - [ ] Errors are caught and handled
  - [ ] Error states are set correctly
  - [ ] Recovery from errors works

## 🏪 Redux Testing Checklist

### API Slice Tests

- [ ] **Endpoint Configuration**
  - [ ] Endpoints are configured correctly
  - [ ] Query parameters are handled
  - [ ] Request bodies are formatted properly
  - [ ] Response parsing works

- [ ] **Success Scenarios**
  - [ ] Successful API calls return expected data
  - [ ] Data is cached correctly
  - [ ] Cache invalidation works
  - [ ] Optimistic updates function

- [ ] **Error Scenarios**
  - [ ] Network errors are handled
  - [ ] Server errors (4xx, 5xx) are handled
  - [ ] Timeout errors are managed
  - [ ] Error messages are displayed

- [ ] **Authentication**
  - [ ] Auth headers are included
  - [ ] Token refresh works
  - [ ] Logout on auth failure

### Redux Slice Tests

- [ ] **Initial State**
  - [ ] Correct initial state values
  - [ ] State structure is proper

- [ ] **Action Handling**
  - [ ] Actions update state correctly
  - [ ] Reducers are pure functions
  - [ ] State immutability is maintained

- [ ] **Selectors**
  - [ ] Selectors return correct data
  - [ ] Memoization works properly

## 🔧 Utility Function Testing Checklist

### Pure Function Tests

- [ ] **Input/Output Tests**
  - [ ] Correct output for valid inputs
  - [ ] Handles edge cases properly
  - [ ] Returns expected data types

- [ ] **Error Handling**
  - [ ] Invalid inputs are handled
  - [ ] Error messages are appropriate
  - [ ] Graceful degradation

- [ ] **Performance**
  - [ ] Functions execute efficiently
  - [ ] No memory leaks
  - [ ] Handles large datasets

## 🎯 Integration Testing Checklist

### Component Integration

- [ ] **Component Interaction**
  - [ ] Parent-child communication works
  - [ ] Props are passed correctly
  - [ ] Events bubble properly

- [ ] **State Management Integration**
  - [ ] Redux state updates components
  - [ ] Component actions update Redux
  - [ ] Context providers work

- [ ] **API Integration**
  - [ ] Components handle loading states
  - [ ] Error states are displayed
  - [ ] Success states update UI

### User Workflow Tests

- [ ] **Complete User Journeys**
  - [ ] Multi-step processes work
  - [ ] Navigation between pages
  - [ ] Data persistence across steps

- [ ] **Error Recovery**
  - [ ] Users can recover from errors
  - [ ] Retry mechanisms work
  - [ ] Fallback options available

## ♿ Accessibility Testing Checklist

### ARIA and Semantics

- [ ] **ARIA Labels**
  - [ ] All interactive elements have labels
  - [ ] Labels are descriptive
  - [ ] ARIA roles are correct

- [ ] **Keyboard Navigation**
  - [ ] All functionality accessible via keyboard
  - [ ] Tab order is logical
  - [ ] Focus indicators are visible

- [ ] **Screen Reader Support**
  - [ ] Content is announced properly
  - [ ] State changes are announced
  - [ ] Error messages are announced

### Automated Accessibility

- [ ] **Axe Testing**
  - [ ] No accessibility violations
  - [ ] Color contrast meets standards
  - [ ] Heading hierarchy is correct

## 🚀 Performance Testing Checklist

### Component Performance

- [ ] **Render Performance**
  - [ ] Components render within time limits
  - [ ] Large datasets are handled efficiently
  - [ ] Re-renders are minimized

- [ ] **Memory Management**
  - [ ] No memory leaks
  - [ ] Event listeners are cleaned up
  - [ ] Subscriptions are unsubscribed

### API Performance

- [ ] **Request Optimization**
  - [ ] Unnecessary requests are avoided
  - [ ] Caching is implemented
  - [ ] Request debouncing works

## 🔒 Security Testing Checklist

### Input Validation

- [ ] **XSS Prevention**
  - [ ] User input is sanitized
  - [ ] HTML injection is prevented
  - [ ] Script injection is blocked

- [ ] **File Upload Security**
  - [ ] File types are validated
  - [ ] File sizes are limited
  - [ ] Malicious files are rejected

### Authentication Security

- [ ] **Route Protection**
  - [ ] Protected routes require auth
  - [ ] Unauthorized access is blocked
  - [ ] Token expiration is handled

## 📊 Test Quality Checklist

### Test Code Quality

- [ ] **Test Structure**
  - [ ] Tests are well-organized
  - [ ] Descriptive test names
  - [ ] Clear arrange-act-assert pattern

- [ ] **Test Maintainability**
  - [ ] Tests are easy to understand
  - [ ] Minimal code duplication
  - [ ] Good use of test utilities

- [ ] **Test Coverage**
  - [ ] Critical paths are covered
  - [ ] Edge cases are tested
  - [ ] Error scenarios are included

### Test Reliability

- [ ] **Stable Tests**
  - [ ] Tests pass consistently
  - [ ] No flaky tests
  - [ ] Proper async handling

- [ ] **Isolated Tests**
  - [ ] Tests don't depend on each other
  - [ ] Proper cleanup after tests
  - [ ] Mocks are reset between tests

## 🛠️ Quick Reference Commands

### Running Tests

```bash
# Development testing
pnpm test                    # Watch mode
pnpm test:run               # Single run
pnpm test:coverage          # With coverage
pnpm test:ui                # UI interface

# Specific test types
pnpm test:unit              # Unit tests only
pnpm test:integration       # Integration tests only
pnpm test ComponentName     # Specific component

# CI/CD testing
pnpm test:ci                # CI optimized
pnpm test:silent            # Minimal output
```

### Debugging Tests

```bash
# Verbose output
pnpm test --reporter=verbose

# Debug specific test
pnpm test --reporter=verbose ComponentName.test.tsx

# Run with debugger
node --inspect-brk ./node_modules/.bin/vitest run
```

## 🎨 Common Test Patterns

### Component Test Template

```typescript
describe('ComponentName', () => {
  const defaultProps = { /* props */ };
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with default props', () => {
      render(<ComponentName {...defaultProps} />);
      // assertions
    });
  });

  describe('User Interactions', () => {
    it('should handle user actions', async () => {
      const { user } = render(<ComponentName {...defaultProps} />);
      // interactions and assertions
    });
  });

  describe('Error Handling', () => {
    it('should handle error states', () => {
      render(<ComponentName {...defaultProps} error="Error" />);
      // error assertions
    });
  });
});
```

### API Test Template

```typescript
describe('apiSlice', () => {
  let storeRef: ReturnType<typeof setupApiStore>;

  beforeEach(() => {
    storeRef = setupApiStore(apiSlice);
  });

  it('should handle successful requests', async () => {
    const result = await storeRef.store.dispatch(
      apiSlice.endpoints.getData.initiate()
    );
    // success assertions
  });

  it('should handle errors', async () => {
    server.use(/* error handler */);
    const result = await storeRef.store.dispatch(
      apiSlice.endpoints.getData.initiate()
    );
    // error assertions
  });
});
```

### Form Test Template

```typescript
describe('FormComponent', () => {
  it('should validate and submit', async () => {
    const { user } = renderWithForm(<FormComponent />, {
      onSubmit: mockSubmit,
      validationSchema: schema,
    });

    // Fill form
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    
    // Submit
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Assert
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
    });
  });
});
```

## 🚨 Common Testing Mistakes

### ❌ What NOT to Do

```typescript
// Don't test implementation details
expect(component.state.count).toBe(1);

// Don't use shallow rendering
shallow(<Component />);

// Don't forget to await user interactions
user.click(button);
expect(handler).toHaveBeenCalled(); // ❌ Missing await

// Don't hardcode test data
expect(screen.getByText('John Doe')).toBeInTheDocument();

// Don't ignore cleanup
// Missing vi.clearAllMocks() or server.resetHandlers()
```

### ✅ What TO Do

```typescript
// Test user-visible behavior
expect(screen.getByText('Count: 1')).toBeInTheDocument();

// Use full rendering
render(<Component />);

// Await user interactions
await user.click(button);
expect(handler).toHaveBeenCalled();

// Use test data factories
const testUser = createTestUser();
expect(screen.getByText(testUser.name)).toBeInTheDocument();

// Clean up properly
beforeEach(() => {
  vi.clearAllMocks();
  server.resetHandlers();
});
```

## 📈 Test Metrics to Track

### Coverage Metrics

- [ ] **Line Coverage**: > 85%
- [ ] **Branch Coverage**: > 80%
- [ ] **Function Coverage**: > 85%
- [ ] **Statement Coverage**: > 85%

### Quality Metrics

- [ ] **Test Execution Time**: < 30 seconds for full suite
- [ ] **Flaky Test Rate**: < 1%
- [ ] **Test Maintenance Effort**: Minimal updates needed for code changes

### Team Metrics

- [ ] **Test Writing Speed**: Tests written alongside code
- [ ] **Bug Detection Rate**: Tests catch bugs before production
- [ ] **Developer Confidence**: Team feels confident making changes

## 🎯 Testing Goals

### Short-term Goals (Sprint)

- [ ] All new features have tests
- [ ] Critical bugs have regression tests
- [ ] Test coverage doesn't decrease

### Medium-term Goals (Quarter)

- [ ] Achieve target coverage thresholds
- [ ] Eliminate flaky tests
- [ ] Improve test execution speed

### Long-term Goals (Year)

- [ ] Comprehensive E2E test coverage
- [ ] Automated accessibility testing
- [ ] Performance regression testing

## 📚 Resources Quick Links

- [Testing Guidelines](./TESTING_GUIDELINES.md)
- [Test Examples](./TEST_EXAMPLES.md)
- [Training Guide](./TESTING_TRAINING_GUIDE.md)
- [Test Utilities Documentation](../src/test/TEST_UTILITIES_DOCUMENTATION.md)

## 🆘 Getting Help

### When You're Stuck

1. **Check Documentation**: Review guidelines and examples
2. **Search Existing Tests**: Look for similar patterns
3. **Use Debug Tools**: `screen.debug()`, console logs
4. **Ask Team**: Slack #testing-help channel
5. **Pair Programming**: Work with experienced team member

### Common Issues

| Issue | Solution |
|-------|----------|
| Element not found | Use `waitFor()` for async elements |
| User events not working | Add `await` before user interactions |
| Tests interfering | Add proper cleanup in `beforeEach` |
| MSW not working | Check handler setup and server configuration |
| Redux tests failing | Use `setupApiStore` utility |

Remember: Good tests are an investment in code quality and team productivity! 🚀
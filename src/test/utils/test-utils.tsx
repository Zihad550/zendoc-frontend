import { theme } from '@/lib/theme/theme';
import { baseApi } from '@/redux/api/baseApi';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

// Create a test store
const createTestStore = (preloadedState?: any) => {
  return configureStore({
    reducer: {
      api: baseApi.reducer,
    } as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
    preloadedState,
  });
};

interface AllTheProvidersProps {
  children: React.ReactNode;
  store?: ReturnType<typeof createTestStore>;
}

const AllTheProviders = ({ children, store }: AllTheProvidersProps) => {
  const testStore = store || createTestStore();

  return (
    <Provider store={testStore}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & {
    store?: ReturnType<typeof createTestStore>;
  }
) => {
  const { store, ...renderOptions } = options || {};

  return render(ui, {
    wrapper: (props) => <AllTheProviders {...props} store={store} />,
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { createTestStore, customRender as render };

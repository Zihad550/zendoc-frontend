import { baseApi } from '@/redux/api/baseApi';
import { configureStore } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

// Mock Redux state for testing
export const createMockStore = (initialState?: any) => {
  return configureStore({
    reducer: {
      api: baseApi.reducer,
    } as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(baseApi.middleware),
    preloadedState: initialState,
  });
};

// Render component with Redux provider
export const renderWithRedux = (
  ui: ReactElement,
  {
    initialState,
    store = createMockStore(initialState),
    ...renderOptions
  }: {
    initialState?: any;
    store?: ReturnType<typeof createMockStore>;
  } & Omit<RenderOptions, 'wrapper'> = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};

import { theme } from '@/lib/theme/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';

// Wrapper for testing MUI components
export const MuiTestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

// Render component with MUI theme
export const renderWithMui = (
  ui: ReactElement,
  renderOptions?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(ui, {
    wrapper: MuiTestWrapper,
    ...renderOptions,
  });
};

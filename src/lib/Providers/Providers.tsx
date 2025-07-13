"use client";

import { store } from "@/redux/store";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { theme } from "../theme/theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children} <CssBaseline />
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;

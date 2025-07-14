"use client";

import { store } from "@/redux/store";
import {
  CssBaseline,
  ThemeProvider,
  useColorScheme,
  useMediaQuery,
} from "@mui/material";
import { Provider } from "react-redux";
import { theme } from "../theme/theme";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { setMode } = useColorScheme();
  if (prefersDarkMode) setMode("dark");
  else setMode("light");

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {children} <CssBaseline />
      </ThemeProvider>
    </Provider>
  );
};

export default Providers;

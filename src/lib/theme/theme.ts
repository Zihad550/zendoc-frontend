import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  colorSchemes: {
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#2196F3",
          light: "#64B5F6",
          dark: "#1976D2",
        },
        secondary: {
          main: "#90CAF9",
          light: "#BBDEFB",
          dark: "#1976D2",
        },
        background: {
          default: "#0A0E27",
          paper: "#1A1D36",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0BEC5",
        },
        divider: "rgba(255, 255, 255, 0.12)",
        action: {
          hover: "rgba(255, 255, 255, 0.08)",
          selected: "rgba(255, 255, 255, 0.16)",
        },
      },
    },
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#1586FD",
        },
        secondary: {
          main: "#666f73",
          light: "#f8f8f8",
        },
        background: {
          default: "#FFFFFF",
          paper: "#FFFFFF",
        },
        text: {
          primary: "#0B1134CC",
          secondary: "#666f73",
        },
      },
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "8px 24px",
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: "lg",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...(theme.palette.mode === "dark" && {
            backgroundColor: "#1E2139",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          }),
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          ...(theme.palette.mode === "dark" && {
            color: theme.palette.text.primary,
          }),
        }),
      },
    },
  },
  typography: {
    body1: {
      color: "inherit",
    },
  },
});

theme.shadows[1] = "0px 5px 22px lightgray";

"use client";

import AutoModeIcon from "@mui/icons-material/AutoMode";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import {
  Box,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
  alpha,
  useTheme,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useRef, useState } from "react";

type ThemeMode = "system" | "light" | "dark";

interface ThemeOption {
  mode: ThemeMode;
  icon: React.ReactNode;
  label: string;
  description: string;
  color: string;
}

const ModeToggle = () => {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  if (!mode) {
    return null;
  }

  const themeOptions: ThemeOption[] = [
    {
      mode: "light",
      icon: <WbSunnyIcon sx={{ fontSize: 18 }} />,
      label: "Light",
      description: "Bright and clear interface",
      color: "#FFA726",
    },
    {
      mode: "dark",
      icon: <Brightness2Icon sx={{ fontSize: 18 }} />,
      label: "Dark",
      description: "Easy on the eyes",
      color: "#5C6BC0",
    },
    {
      mode: "system",
      icon: <AutoModeIcon sx={{ fontSize: 18 }} />,
      label: "System",
      description: "Follow device settings",
      color: "#26A69A",
    },
  ];

  const currentOption =
    themeOptions.find((option) => option.mode === mode) || themeOptions[0];

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModeChange = (newMode: ThemeMode) => {
    setMode(newMode);
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Change theme" placement="bottom">
        <Box
          ref={anchorRef}
          component="button"
          onClick={handleToggle}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            px: 2,
            py: 1,
            border: "2px solid",
            borderColor: alpha(currentOption.color, 0.3),
            borderRadius: "24px",
            bgcolor: alpha(currentOption.color, 0.08),
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            outline: "none",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              borderColor: alpha(currentOption.color, 0.5),
              bgcolor: alpha(currentOption.color, 0.12),
              transform: "translateY(-2px)",
              boxShadow: `0 8px 25px ${alpha(currentOption.color, 0.25)}`,
            },
            "&:active": {
              transform: "translateY(0px)",
            },
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: "-100%",
              width: "100%",
              height: "100%",
              background: `linear-gradient(90deg, transparent, ${alpha(currentOption.color, 0.4)}, transparent)`,
              transition: "left 0.8s ease",
            },
            "&:hover::before": {
              left: "100%",
            },
          }}
        >
          {/* Icon with rotation animation */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 28,
              height: 28,
              borderRadius: "50%",
              bgcolor: alpha(currentOption.color, 0.15),
              color: currentOption.color,
              transition: "all 0.3s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {currentOption.icon}
          </Box>

          {/* Theme label */}
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: "text.primary",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              fontSize: "0.75rem",
            }}
          >
            {currentOption.label}
          </Typography>

          {/* Dropdown arrow */}
          <ExpandMoreIcon
            sx={{
              fontSize: 16,
              color: "text.secondary",
              transition: "transform 0.3s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </Box>
      </Tooltip>

      {/* Dropdown Menu */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        sx={{ zIndex: 1300 }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={300}>
            <Paper
              elevation={16}
              sx={{
                mt: 1,
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                backdropFilter: "blur(20px)",
                minWidth: "220px",
                boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}`,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box sx={{ py: 1 }}>
                  {themeOptions.map((option) => {
                    const isActive = mode === option.mode;

                    return (
                      <Box
                        key={option.mode}
                        onClick={() => handleModeChange(option.mode)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          px: 3,
                          py: 2,
                          cursor: "pointer",
                          position: "relative",
                          transition: "all 0.2s ease",
                          bgcolor: isActive
                            ? alpha(option.color, 0.1)
                            : "transparent",
                          borderLeft: isActive
                            ? `4px solid ${option.color}`
                            : "4px solid transparent",
                          "&:hover": {
                            bgcolor: alpha(option.color, 0.08),
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        {/* Option Icon */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 36,
                            height: 36,
                            borderRadius: "12px",
                            bgcolor: alpha(
                              option.color,
                              isActive ? 0.15 : 0.08,
                            ),
                            color: option.color,
                            transition: "all 0.2s ease",
                          }}
                        >
                          {option.icon}
                        </Box>

                        {/* Option Details */}
                        <Stack spacing={0.25} sx={{ flex: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight={isActive ? 600 : 500}
                            sx={{
                              color: isActive ? option.color : "text.primary",
                              transition: "color 0.2s ease",
                            }}
                          >
                            {option.label}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "text.secondary",
                              fontSize: "0.7rem",
                            }}
                          >
                            {option.description}
                          </Typography>
                        </Stack>

                        {/* Active Indicator */}
                        {isActive && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              bgcolor: option.color,
                              boxShadow: `0 0 12px ${alpha(option.color, 0.6)}`,
                              animation: "pulse 2s infinite",
                              "@keyframes pulse": {
                                "0%": { transform: "scale(1)", opacity: 1 },
                                "50%": {
                                  transform: "scale(1.2)",
                                  opacity: 0.7,
                                },
                                "100%": { transform: "scale(1)", opacity: 1 },
                              },
                            }}
                          />
                        )}
                      </Box>
                    );
                  })}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default ModeToggle;

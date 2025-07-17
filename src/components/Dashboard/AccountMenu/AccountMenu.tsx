import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import { useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";

export default function AccountMenu() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const menuStyles = {
    paper: {
      elevation: 0,
      overflow: "visible",
      filter:
        theme.palette.mode === "dark"
          ? "drop-shadow(0px 4px 16px rgba(0,0,0,0.5))"
          : "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
      mt: 1.5,
      bgcolor:
        theme.palette.mode === "dark"
          ? "rgba(26, 29, 54, 0.95)"
          : "background.paper",
      backdropFilter: theme.palette.mode === "dark" ? "blur(10px)" : "none",
      border:
        theme.palette.mode === "dark"
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "none",
      "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1,
      },
      "&:before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: 0,
        right: 14,
        width: 10,
        height: 10,
        bgcolor:
          theme.palette.mode === "dark"
            ? "rgba(26, 29, 54, 0.95)"
            : "background.paper",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
        border:
          theme.palette.mode === "dark"
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "none",
      },
    },
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(logout());
    // router.replace("/");
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip
          title="Account settings"
          componentsProps={{
            tooltip: {
              sx: {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "rgba(26, 29, 54, 0.9)"
                    : "#cdd1da5c",
                color:
                  theme.palette.mode === "dark" ? "#64b5f6" : "primary.main",
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "none",
              },
            },
          }}
        >
          <IconButton
            onClick={handleClick}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "#ffffff",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "none",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                  : "none",
              "& svg": {
                color:
                  theme.palette.mode === "dark" ? "#64b5f6" : "primary.main",
              },
              "&:hover": {
                background:
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.12)"
                    : "rgba(21, 134, 253, 0.04)",
              },
            }}
          >
            <KeyboardArrowDownIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          ...menuStyles,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* <MenuItem
          onClick={handleClose}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.9)"
                : "inherit",
            "&:hover": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(100, 181, 246, 0.1)"
                  : "rgba(21, 134, 253, 0.04)",
            },
          }}
        >
          <Avatar
            sx={{
              background: "transparent",
              color: theme.palette.mode === "dark" ? "#64b5f6" : "primary.main",
            }}
          />
          Profile
        </MenuItem> */}

        {/* <Divider
          sx={{
            borderColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "inherit",
          }}
        /> */}

        <MenuItem
          onClick={handleLogout}
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.9)"
                : "inherit",
            "&:hover": {
              bgcolor:
                theme.palette.mode === "dark"
                  ? "rgba(244, 67, 54, 0.1)"
                  : "rgba(244, 67, 54, 0.04)",
            },
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

"use client";
import ModeToggle from "@/components/Shared/Navbar/ModeToggle";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { useGetSingleUserQuery } from "@/redux/features/user/userApi";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import AccountMenu from "../AccountMenu/AccountMenu";
import SideBar from "../SideBar/SideBar";

const drawerWidth = 280;

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();

  // if (!userInfo) router.push("/");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const { data, isLoading } = useGetSingleUserQuery({});
  if (isLoading) return <Spinner />;
  const user = data?.data;

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: theme.palette.mode === "dark" ? "#0A0E27" : "#f5f7fb",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(circle at 20% 30%, rgba(33, 150, 243, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(144, 202, 249, 0.02) 0%, transparent 50%)"
              : "none",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background:
            theme.palette.mode === "dark" ? "rgba(26, 29, 54, 0.95)" : "#fff",
          backdropFilter: theme.palette.mode === "dark" ? "blur(10px)" : "none",
          borderBottom:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "none",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(0, 0, 0, 0.15)"
              : "0px 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon
              sx={{
                color:
                  theme.palette.mode === "dark" ? "#64b5f6" : "primary.main",
              }}
            />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography
                variant="body2"
                noWrap
                component="div"
                sx={{
                  color:
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.7)"
                      : "rgba(11, 17, 52, 0.6)",
                }}
              >
                Hi, {isLoading ? "Loading..." : user?.name},
              </Typography>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  color:
                    theme.palette.mode === "dark" ? "#64b5f6" : "primary.main",
                  fontWeight: 700,
                  textShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 8px rgba(100, 181, 246, 0.3)"
                      : "none",
                }}
              >
                Welcome to ZenDoc Healthcare!
              </Typography>
            </Box>
            <Stack direction="row" gap={2} sx={{ alignItems: "center" }}>
              <ModeToggle />
              {/* <Badge badgeContent={4} color="error">
                <IconButton
                  sx={{
                    bgcolor:
                      theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "background.paper",
                    border:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.1)"
                        : "none",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 4px 12px rgba(0, 0, 0, 0.15)"
                        : 1,
                    "&:hover": {
                      bgcolor:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.12)"
                          : "grey.100",
                    },
                  }}
                >
                  <NotificationsNoneIcon
                    sx={{
                      color:
                        theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.8)"
                          : "action",
                    }}
                  />
                </IconButton>
              </Badge> */}
              {/* <Avatar alt={user?.name} src={user?.profilePhoto} /> */}
              <AccountMenu />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: drawerWidth,
              bgcolor: theme.palette.mode === "dark" ? "#1A1D36" : "white",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "3px 0 16px rgba(0, 0, 0, 0.3)"
                  : "3px 0 8px rgba(0, 0, 0, 0.1)",
              borderRight:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid #e6eaee",
            },
          }}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <SideBar />
        </Drawer>
        <Drawer
          variant="permanent"
          PaperProps={{
            sx: {
              width: drawerWidth,
              bgcolor: theme.palette.mode === "dark" ? "#1A1D36" : "white",
              boxShadow:
                theme.palette.mode === "dark"
                  ? "2px 0 12px rgba(0, 0, 0, 0.2)"
                  : "2px 0 5px rgba(0, 0, 0, 0.05)",
              borderRight:
                theme.palette.mode === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.1)"
                  : "1px solid #e6eaee",
              zIndex: (theme) => theme.zIndex.appBar - 1,
            },
          }}
          sx={{ display: { xs: "none", sm: "block" } }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "auto",
          bgcolor: theme.palette.mode === "dark" ? "transparent" : "#f5f7fb",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

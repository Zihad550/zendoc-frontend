"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CallIcon from "@mui/icons-material/Call";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import LogoutIcon from "@mui/icons-material/Logout";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import MenuIcon from "@mui/icons-material/Menu";
import PaidIcon from "@mui/icons-material/Paid";
import PersonIcon from "@mui/icons-material/Person";
import {
  alpha,
  AppBar,
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Container,
  Divider,
  Drawer,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MouseEvent, useEffect, useState } from "react";

const Navbar = () => {
  const userInfo = useUserInfo();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Dropdown states
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [servicesAnchorEl, setServicesAnchorEl] = useState<null | HTMLElement>(
    null,
  );

  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [aboutAnchorEl, setAboutAnchorEl] = useState<null | HTMLElement>(null);

  // Monitor scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleLogOut = () => {
    logoutUser(router);
    handleCloseUserMenu();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  // Handle dropdown menu toggling for services
  const handleServicesMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setServicesAnchorEl(event.currentTarget);
    setServicesMenuOpen(true);
  };

  const handleServicesMenuClose = () => {
    setServicesAnchorEl(null);
    setServicesMenuOpen(false);
  };

  // Handle dropdown menu toggling for about
  const handleAboutMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAboutAnchorEl(event.currentTarget);
    setAboutMenuOpen(true);
  };

  const handleAboutMenuClose = () => {
    setAboutAnchorEl(null);
    setAboutMenuOpen(false);
  };

  // Primary navigation items
  const primaryLinks = [
    {
      label: "Doctors",
      href: "/doctors",
      icon: <PersonIcon fontSize="small" />,
    },
    {
      label: "Consultation",
      href: "/consultation",
      icon: <MedicalServicesIcon fontSize="small" />,
    },
  ];

  // Services dropdown items
  const servicesLinks = [
    {
      label: "Services",
      href: "/services",
      icon: <HealthAndSafetyIcon fontSize="small" />,
    },
    {
      label: "Health Plans",
      href: "/health-plans",
      icon: <LocalHospitalIcon fontSize="small" />,
    },
    {
      label: "Pricing",
      href: "/pricing",
      icon: <PaidIcon fontSize="small" />,
    },
  ];

  // About dropdown items
  const aboutLinks = [
    {
      label: "About Us",
      href: "/about-us",
      icon: <InfoIcon fontSize="small" />,
    },
    {
      label: "Contact Us",
      href: "/contact-us",
      icon: <CallIcon fontSize="small" />,
    },
    {
      label: "History",
      href: "/history",
      icon: <HistoryIcon fontSize="small" />,
    },
  ];

  // For mobile view - all links combined
  const allLinks = [...primaryLinks, ...servicesLinks, ...aboutLinks];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (hrefs: string[]) =>
    hrefs.some((href) => pathname === href);

  return (
    <AppBar
      elevation={scrolled ? 4 : 0}
      position="sticky"
      sx={{
        bgcolor: scrolled ? "background.paper" : "background.paper",
        borderBottom: scrolled
          ? 0
          : `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        backdropFilter: "blur(20px)",
        transition: "all 0.3s ease",
        py: scrolled ? 0.5 : 1,
        boxShadow: scrolled ? "0 4px 20px 0 rgba(0, 0, 0, 0.05)" : "none",
      }}
    >
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Logo */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 48,
                height: 48,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #1586FD 0%, #0A5CB8 100%)",
                boxShadow: "0 8px 16px rgba(21, 134, 253, 0.25)",
                overflow: "hidden",
                "&::before": {
                  content: "''",
                  position: "absolute",
                  width: "150%",
                  height: "150%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                  top: "-25%",
                  left: "-25%",
                },
              }}
            >
              <LocalHospitalIcon
                sx={{
                  fontSize: 28,
                  color: "#fff",
                  filter: "drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))",
                  zIndex: 1,
                }}
              />
            </Box>
            <Typography
              variant="h4"
              component={Link}
              href="/"
              fontWeight={700}
              sx={{
                textDecoration: "none",
                letterSpacing: "-0.5px",
                display: "flex",
                alignItems: "center",
                transition: "all 0.3s ease",
                fontSize: { xs: "1.75rem", md: "2rem" },
                background: "linear-gradient(135deg, #1586FD 0%, #0A5CB8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
                px: 0.5,
              }}
            >
              ZenDoc
            </Typography>
          </Stack>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ mx: 2, flex: 1, justifyContent: "center" }}
            >
              {/* Primary Links */}
              {primaryLinks.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  href={link.href}
                  variant="text"
                  color="primary"
                  sx={{
                    position: "relative",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: "8px",
                    color: isActive(link.href) ? "#fff" : "text.primary",
                    bgcolor: isActive(link.href)
                      ? "primary.main"
                      : "transparent",
                    boxShadow: isActive(link.href)
                      ? "0 4px 10px rgba(21, 134, 253, 0.25)"
                      : "none",
                    opacity: isActive(link.href) ? 1 : 0.85,
                    "&:hover": {
                      bgcolor: isActive(link.href)
                        ? "primary.main"
                        : alpha(theme.palette.primary.main, 0.08),
                      opacity: 1,
                      color: isActive(link.href) ? "#fff" : "primary.main",
                      transform: "translateY(-2px)",
                      boxShadow: isActive(link.href)
                        ? "0 6px 12px rgba(21, 134, 253, 0.3)"
                        : "0 4px 8px rgba(21, 134, 253, 0.15)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  {link.label}
                </Button>
              ))}

              {/* Services Dropdown */}
              <Box sx={{ position: "relative" }}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleServicesMenuOpen}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    position: "relative",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: "8px",
                    color: isGroupActive(servicesLinks.map((l) => l.href))
                      ? "#fff"
                      : "text.primary",
                    bgcolor: isGroupActive(servicesLinks.map((l) => l.href))
                      ? "primary.main"
                      : "transparent",
                    boxShadow: isGroupActive(servicesLinks.map((l) => l.href))
                      ? "0 4px 10px rgba(21, 134, 253, 0.25)"
                      : "none",
                    opacity: isGroupActive(servicesLinks.map((l) => l.href))
                      ? 1
                      : 0.85,
                    "&:hover": {
                      bgcolor: isGroupActive(servicesLinks.map((l) => l.href))
                        ? "primary.main"
                        : alpha(theme.palette.primary.main, 0.08),
                      opacity: 1,
                      color: isGroupActive(servicesLinks.map((l) => l.href))
                        ? "#fff"
                        : "primary.main",
                      transform: "translateY(-2px)",
                      boxShadow: isGroupActive(servicesLinks.map((l) => l.href))
                        ? "0 6px 12px rgba(21, 134, 253, 0.3)"
                        : "0 4px 8px rgba(21, 134, 253, 0.15)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  Services
                </Button>
                <Popper
                  open={servicesMenuOpen}
                  anchorEl={servicesAnchorEl}
                  placement="bottom-start"
                  transition
                  disablePortal
                  sx={{ zIndex: 1200 }}
                >
                  {({ TransitionProps }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: "top center" }}
                    >
                      <Paper
                        elevation={4}
                        sx={{
                          mt: 1,
                          borderRadius: "12px",
                          overflow: "hidden",
                          width: 240,
                          boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
                          border: "1px solid rgba(21, 134, 253, 0.1)",
                        }}
                      >
                        <ClickAwayListener
                          onClickAway={handleServicesMenuClose}
                        >
                          <MenuList autoFocusItem={servicesMenuOpen}>
                            {servicesLinks.map((item) => (
                              <MenuItem
                                key={item.label}
                                component={Link}
                                href={item.href}
                                onClick={handleServicesMenuClose}
                                sx={{
                                  color: isActive(item.href)
                                    ? "primary.main"
                                    : "text.primary",
                                  fontWeight: isActive(item.href) ? 600 : 400,
                                  py: 1.2,
                                  px: 2,
                                  borderRadius: "8px",
                                  mx: 1,
                                  my: 0.5,
                                  "&:hover": {
                                    bgcolor: alpha(
                                      theme.palette.primary.main,
                                      0.12,
                                    ),
                                    transform: "translateX(4px)",
                                  },
                                  bgcolor: isActive(item.href)
                                    ? alpha(theme.palette.primary.main, 0.12)
                                    : "transparent",
                                  transition: "all 0.15s ease",
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: 36,
                                    color: isActive(item.href)
                                      ? "primary.main"
                                      : "text.secondary",
                                  }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>

              {/* About Dropdown */}
              <Box sx={{ position: "relative" }}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={handleAboutMenuOpen}
                  endIcon={<ArrowDropDownIcon />}
                  sx={{
                    position: "relative",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    px: 1.5,
                    py: 0.75,
                    borderRadius: "8px",
                    color: isGroupActive(aboutLinks.map((l) => l.href))
                      ? "#fff"
                      : "text.primary",
                    bgcolor: isGroupActive(aboutLinks.map((l) => l.href))
                      ? "primary.main"
                      : "transparent",
                    boxShadow: isGroupActive(aboutLinks.map((l) => l.href))
                      ? "0 4px 10px rgba(21, 134, 253, 0.25)"
                      : "none",
                    opacity: isGroupActive(aboutLinks.map((l) => l.href))
                      ? 1
                      : 0.85,
                    "&:hover": {
                      bgcolor: isGroupActive(aboutLinks.map((l) => l.href))
                        ? "primary.main"
                        : alpha(theme.palette.primary.main, 0.08),
                      opacity: 1,
                      color: isGroupActive(aboutLinks.map((l) => l.href))
                        ? "#fff"
                        : "primary.main",
                      transform: "translateY(-2px)",
                      boxShadow: isGroupActive(aboutLinks.map((l) => l.href))
                        ? "0 6px 12px rgba(21, 134, 253, 0.3)"
                        : "0 4px 8px rgba(21, 134, 253, 0.15)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  About
                </Button>
                <Popper
                  open={aboutMenuOpen}
                  anchorEl={aboutAnchorEl}
                  placement="bottom-start"
                  transition
                  disablePortal
                  sx={{ zIndex: 1200 }}
                >
                  {({ TransitionProps }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: "top center" }}
                    >
                      <Paper
                        elevation={4}
                        sx={{
                          mt: 1,
                          borderRadius: "12px",
                          overflow: "hidden",
                          width: 240,
                          boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
                          border: "1px solid rgba(21, 134, 253, 0.1)",
                        }}
                      >
                        <ClickAwayListener onClickAway={handleAboutMenuClose}>
                          <MenuList autoFocusItem={aboutMenuOpen}>
                            {aboutLinks.map((item) => (
                              <MenuItem
                                key={item.label}
                                component={Link}
                                href={item.href}
                                onClick={handleAboutMenuClose}
                                sx={{
                                  color: isActive(item.href)
                                    ? "primary.main"
                                    : "text.primary",
                                  fontWeight: isActive(item.href) ? 600 : 400,
                                  py: 1.2,
                                  px: 2,
                                  borderRadius: "8px",
                                  mx: 1,
                                  my: 0.5,
                                  "&:hover": {
                                    bgcolor: alpha(
                                      theme.palette.primary.main,
                                      0.12,
                                    ),
                                    transform: "translateX(4px)",
                                  },
                                  bgcolor: isActive(item.href)
                                    ? alpha(theme.palette.primary.main, 0.12)
                                    : "transparent",
                                  transition: "all 0.15s ease",
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    minWidth: 36,
                                    color: isActive(item.href)
                                      ? "primary.main"
                                      : "text.secondary",
                                  }}
                                >
                                  {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                              </MenuItem>
                            ))}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
            </Stack>
          )}

          {/* User Actions */}
          <Stack direction="row" alignItems="center" spacing={2}>
            {userInfo?.email ? (
              <Box>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{
                      p: 0.5,
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.15),
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: "primary.main",
                        background:
                          "linear-gradient(135deg, #1586FD 0%, #0A5CB8 100%)",
                        width: 38,
                        height: 38,
                        boxShadow: "0 4px 8px rgba(21, 134, 253, 0.25)",
                      }}
                    >
                      {userInfo.email.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{
                    mt: "45px",
                    "& .MuiPaper-root": {
                      borderRadius: "12px",
                      boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(21, 134, 253, 0.1)",
                      overflow: "hidden",
                      width: 200,
                    },
                  }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push("/dashboard");
                    }}
                    sx={{
                      py: 1.2,
                      px: 2,
                      mx: 1,
                      my: 0.5,
                      borderRadius: "8px",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                      },
                      transition: "all 0.15s ease",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
                      <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push("/profile");
                    }}
                    sx={{
                      py: 1.2,
                      px: 2,
                      mx: 1,
                      my: 0.5,
                      borderRadius: "8px",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.primary.main, 0.12),
                      },
                      transition: "all 0.15s ease",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
                      <AccountCircleIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <Divider sx={{ my: 1 }} />
                  <MenuItem
                    onClick={handleLogOut}
                    sx={{
                      py: 1.2,
                      px: 2,
                      mx: 1,
                      my: 0.5,
                      borderRadius: "8px",
                      "&:hover": {
                        bgcolor: alpha(theme.palette.error.main, 0.08),
                      },
                      transition: "all 0.15s ease",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: "error.main" }}>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Logout"
                      sx={{ color: "error.main" }}
                    />
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                component={Link}
                href="/login"
                variant="contained"
                sx={{
                  borderRadius: "12px",
                  py: 1.2,
                  px: 3.5,
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #1586FD 0%, #0A5CB8 100%)",
                  boxShadow: "0 4px 14px 0 rgba(21, 134, 253, 0.39)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(21, 134, 253, 0.45)",
                    background:
                      "linear-gradient(135deg, #1586FD 10%, #0A5CB8 90%)",
                  },
                }}
              >
                Login
              </Button>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                edge="start"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{
                  ml: 1,
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  color: "primary.main",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Container>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "75%",
            maxWidth: "320px",
            boxSizing: "border-box",
            borderRadius: "0 0 0 24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            border: "none",
          },
        }}
      >
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(135deg, #1586FD 0%, #0A5CB8 100%)",
            color: "white",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                bgcolor: "rgba(255,255,255,0.2)",
              }}
            >
              <MedicalServicesIcon fontSize="small" />
            </Box>
            <Typography variant="h6" fontWeight={600}>
              ZenDoc Menu
            </Typography>
          </Stack>
          <IconButton
            color="inherit"
            onClick={toggleDrawer}
            sx={{
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {userInfo?.email && (
            <>
              <ListItem sx={{ pt: 2, pb: 2 }}>
                <Box sx={{ width: "100%" }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.light",
                        width: 36,
                        height: 36,
                      }}
                    >
                      {userInfo.email.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {userInfo.email}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Logged in
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              </ListItem>
              <Divider />
            </>
          )}

          {allLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={toggleDrawer}
                sx={{
                  py: 1.5,
                  pl: 3,
                  pr: 2,
                  mx: 1.5,
                  my: 0.5,
                  borderRadius: "10px",
                  bgcolor: isActive(link.href)
                    ? alpha(theme.palette.primary.main, 0.12)
                    : "transparent",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    transform: "translateX(4px)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(link.href) ? 600 : 400,
                    color: isActive(link.href)
                      ? "primary.main"
                      : "text.primary",
                  }}
                />
                <ChevronRightIcon
                  fontSize="small"
                  color={isActive(link.href) ? "primary" : "action"}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {userInfo?.email && (
            <>
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href="/dashboard"
                  onClick={toggleDrawer}
                  sx={{
                    py: 1.5,
                    pl: 3,
                    pr: 2,
                    mx: 1.5,
                    my: 0.5,
                    borderRadius: "10px",
                    bgcolor: isActive("/dashboard")
                      ? alpha(theme.palette.primary.main, 0.12)
                      : "transparent",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.08),
                      transform: "translateX(4px)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemText
                    primary="Dashboard"
                    primaryTypographyProps={{
                      fontWeight: isActive("/dashboard") ? 600 : 400,
                      color: isActive("/dashboard")
                        ? "primary.main"
                        : "text.primary",
                    }}
                  />
                  <ChevronRightIcon
                    fontSize="small"
                    color={isActive("/dashboard") ? "primary" : "action"}
                  />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>

        <Box sx={{ p: 3, mt: "auto", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          {userInfo?.email ? (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogOut}
              sx={{
                borderRadius: "12px",
                py: 1.5,
                fontWeight: 600,
                borderWidth: "2px",
                "&:hover": {
                  borderWidth: "2px",
                  bgcolor: alpha(theme.palette.error.main, 0.08),
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(211, 47, 47, 0.2)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Logout
            </Button>
          ) : (
            <Stack spacing={2}>
              <Button
                fullWidth
                component={Link}
                href="/login"
                variant="contained"
                onClick={toggleDrawer}
                sx={{
                  borderRadius: "12px",
                  py: 1.5,
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #1586FD 0%, #0A5CB8 100%)",
                  boxShadow: "0 4px 14px 0 rgba(21, 134, 253, 0.39)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(21, 134, 253, 0.45)",
                    background:
                      "linear-gradient(135deg, #1586FD 10%, #0A5CB8 90%)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Login
              </Button>
              <Button
                fullWidth
                component={Link}
                href="/register"
                variant="outlined"
                onClick={toggleDrawer}
                sx={{
                  borderRadius: "12px",
                  py: 1.5,
                  fontWeight: 600,
                  borderColor: "primary.main",
                  borderWidth: "2px",
                  color: "primary.main",
                  "&:hover": {
                    borderWidth: "2px",
                    borderColor: "primary.main",
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(21, 134, 253, 0.2)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                Register
              </Button>
            </Stack>
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;

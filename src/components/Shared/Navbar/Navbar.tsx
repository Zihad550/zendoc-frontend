"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CallIcon from "@mui/icons-material/Call";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import HistoryIcon from "@mui/icons-material/History";
import InfoIcon from "@mui/icons-material/Info";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
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
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        py: scrolled ? 0.5 : 1,
      }}
    >
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Logo */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <LocalHospitalIcon
              color="primary"
              sx={{
                fontSize: 36,
                filter: "drop-shadow(0px 2px 4px rgba(21, 134, 253, 0.3))",
              }}
            />
            <Typography
              variant="h4"
              component={Link}
              href="/"
              fontWeight={700}
              color="primary.main"
              sx={{
                textDecoration: "none",
                letterSpacing: "-0.5px",
                display: "flex",
                alignItems: "center",
                transition: "all 0.3s ease",
                fontSize: { xs: "1.75rem", md: "2rem" },
                textShadow: "0px 2px 4px rgba(21, 134, 253, 0.2)",
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
              spacing={1}
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
                    fontWeight: 500,
                    px: 1.5,
                    color: isActive(link.href)
                      ? "primary.main"
                      : "text.primary",
                    opacity: isActive(link.href) ? 1 : 0.85,
                    "&:hover": {
                      bgcolor: "transparent",
                      opacity: 1,
                      color: "primary.main",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: isActive(link.href) ? "80%" : "0%",
                      height: "3px",
                      bottom: "-3px",
                      left: "10%",
                      backgroundColor: "primary.main",
                      borderRadius: "8px",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "80%",
                    },
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
                    fontWeight: 500,
                    px: 1.5,
                    color: isGroupActive(servicesLinks.map((l) => l.href))
                      ? "primary.main"
                      : "text.primary",
                    opacity: isGroupActive(servicesLinks.map((l) => l.href))
                      ? 1
                      : 0.85,
                    "&:hover": {
                      bgcolor: "transparent",
                      opacity: 1,
                      color: "primary.main",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: isGroupActive(servicesLinks.map((l) => l.href))
                        ? "80%"
                        : "0%",
                      height: "3px",
                      bottom: "-3px",
                      left: "10%",
                      backgroundColor: "primary.main",
                      borderRadius: "8px",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "80%",
                    },
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
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: 220,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
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
                                  "&:hover": {
                                    bgcolor: alpha(
                                      theme.palette.primary.main,
                                      0.08,
                                    ),
                                  },
                                  bgcolor: isActive(item.href)
                                    ? alpha(theme.palette.primary.main, 0.08)
                                    : "transparent",
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
                    fontWeight: 500,
                    px: 1.5,
                    color: isGroupActive(aboutLinks.map((l) => l.href))
                      ? "primary.main"
                      : "text.primary",
                    opacity: isGroupActive(aboutLinks.map((l) => l.href))
                      ? 1
                      : 0.85,
                    "&:hover": {
                      bgcolor: "transparent",
                      opacity: 1,
                      color: "primary.main",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: isGroupActive(aboutLinks.map((l) => l.href))
                        ? "80%"
                        : "0%",
                      height: "3px",
                      bottom: "-3px",
                      left: "10%",
                      backgroundColor: "primary.main",
                      borderRadius: "8px",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "80%",
                    },
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
                          borderRadius: "8px",
                          overflow: "hidden",
                          width: 220,
                          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
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
                                  "&:hover": {
                                    bgcolor: alpha(
                                      theme.palette.primary.main,
                                      0.08,
                                    ),
                                  },
                                  bgcolor: isActive(item.href)
                                    ? alpha(theme.palette.primary.main, 0.08)
                                    : "transparent",
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
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        bgcolor: "primary.light",
                        border: "2px solid",
                        borderColor: "primary.main",
                        width: 40,
                        height: 40,
                      }}
                    >
                      {userInfo.email.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
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
                  >
                    <ListItemText primary="Dashboard" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleCloseUserMenu();
                      router.push("/profile");
                    }}
                  >
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogOut}>
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
                  borderRadius: "50px",
                  py: 1,
                  px: 3,
                  fontWeight: 600,
                  boxShadow: "0 4px 14px 0 rgba(21, 134, 253, 0.39)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(21, 134, 253, 0.45)",
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
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ ml: 1 }}
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
            borderRadius: "0 0 0 16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            bgcolor: "primary.main",
            color: "white",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <MedicalServicesIcon />
            <Typography variant="h6" fontWeight={600}>
              ZenDoc Menu
            </Typography>
          </Stack>
          <IconButton color="inherit" onClick={toggleDrawer}>
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
                  borderLeft: isActive(link.href)
                    ? "4px solid"
                    : "4px solid transparent",
                  borderColor: isActive(link.href)
                    ? "primary.main"
                    : "transparent",
                  bgcolor: isActive(link.href)
                    ? alpha(theme.palette.primary.main, 0.08)
                    : "transparent",
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
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
                    borderLeft: isActive("/dashboard")
                      ? "4px solid"
                      : "4px solid transparent",
                    borderColor: isActive("/dashboard")
                      ? "primary.main"
                      : "transparent",
                    bgcolor: isActive("/dashboard")
                      ? alpha(theme.palette.primary.main, 0.08)
                      : "transparent",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                    },
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

        <Box sx={{ p: 3, mt: "auto" }}>
          {userInfo?.email ? (
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleLogOut}
              sx={{
                borderRadius: "8px",
                py: 1.2,
                fontWeight: 600,
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
                  borderRadius: "8px",
                  py: 1.2,
                  fontWeight: 600,
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
                  borderRadius: "8px",
                  py: 1.2,
                  fontWeight: 600,
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

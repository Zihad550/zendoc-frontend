"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  ClickAwayListener,
  Container,
  Divider,
  Drawer,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Popper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ModeToggle from "./ModeToggle";

const Navbar = () => {
  const userInfo = useUserInfo();

  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [servicesAnchor, setServicesAnchor] = useState<null | HTMLElement>(
    null,
  );
  const [aboutAnchor, setAboutAnchor] = useState<null | HTMLElement>(null);

  const navigationLinks = [
    { label: "Doctors", href: "/doctors" },
    { label: "Consultation", href: "/consultation" },
  ];

  const servicesLinks = [
    { label: "All Services", href: "/services" },
    { label: "Health Plans", href: "/health-plans" },
    { label: "Pricing", href: "/pricing" },
  ];

  const aboutLinks = [
    { label: "About Us", href: "/about-us" },
    { label: "Our History", href: "/history" },
    { label: "Contact", href: "/contact-us" },
  ];

  const allMobileLinks = [...navigationLinks, ...servicesLinks, ...aboutLinks];

  const isActive = (href: string) => pathname === href;
  const isGroupActive = (links: { href: string }[]) =>
    links.some((link) => pathname === link.href);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleServicesOpen = (event: React.MouseEvent<HTMLElement>) => {
    setServicesAnchor(event.currentTarget);
  };

  const handleServicesClose = () => {
    setServicesAnchor(null);
  };

  const handleAboutOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAboutAnchor(event.currentTarget);
  };

  const handleAboutClose = () => {
    setAboutAnchor(null);
  };

  const handleLogout = () => {
    logoutUser(router);
    handleUserMenuClose();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ minHeight: 64 }}
          >
            {/* Logo */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "8px",
                  bgcolor: "primary.main",
                  color: "white",
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 24 }} />
              </Box>
              <Typography
                component={Link}
                href="/"
                variant="h5"
                fontWeight={700}
                sx={{
                  textDecoration: "none",
                  color: "text.primary",
                  letterSpacing: "-0.5px",
                }}
              >
                ZenDoc
              </Typography>
            </Stack>
            {/* Desktop Navigation */}
            {!isMobile && (
              <Stack direction="row" alignItems="center" spacing={4}>
                {/* Direct Links */}
                {navigationLinks.map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    href={link.href}
                    variant="body1"
                    fontWeight={500}
                    sx={{
                      textDecoration: "none",
                      color: isActive(link.href)
                        ? "primary.main"
                        : "text.primary",
                      position: "relative",
                      py: 1,
                      transition: "color 0.2s ease",
                      "&:hover": {
                        color: "primary.main",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: isActive(link.href) ? "100%" : "0%",
                        height: "2px",
                        bgcolor: "primary.main",
                        transition: "width 0.2s ease",
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}

                {/* Services Dropdown */}
                <Box sx={{ position: "relative" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    onClick={handleServicesOpen}
                    sx={{
                      cursor: "pointer",
                      py: 1,
                      color: isGroupActive(servicesLinks)
                        ? "primary.main"
                        : "text.primary",
                      transition: "color 0.2s ease",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      Services
                    </Typography>
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: 20,
                        transform: Boolean(servicesAnchor)
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </Stack>

                  <Popper
                    open={Boolean(servicesAnchor)}
                    anchorEl={servicesAnchor}
                    placement="bottom-start"
                    transition
                    sx={{ zIndex: 1300 }}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={200}>
                        <Paper
                          elevation={8}
                          sx={{
                            mt: 1,
                            minWidth: 200,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          <ClickAwayListener onClickAway={handleServicesClose}>
                            <Box>
                              {servicesLinks.map((item) => (
                                <MenuItem
                                  key={item.label}
                                  component={Link}
                                  href={item.href}
                                  onClick={handleServicesClose}
                                  sx={{
                                    py: 1.5,
                                    px: 2,
                                    color: isActive(item.href)
                                      ? "primary.main"
                                      : "text.primary",
                                    fontWeight: isActive(item.href) ? 600 : 400,
                                    "&:hover": {
                                      bgcolor: "action.hover",
                                      color: "primary.main",
                                    },
                                  }}
                                >
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Box>
                          </ClickAwayListener>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </Box>

                {/* About Dropdown */}
                <Box sx={{ position: "relative" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={0.5}
                    onClick={handleAboutOpen}
                    sx={{
                      cursor: "pointer",
                      py: 1,
                      color: isGroupActive(aboutLinks)
                        ? "primary.main"
                        : "text.primary",
                      transition: "color 0.2s ease",
                      "&:hover": {
                        color: "primary.main",
                      },
                    }}
                  >
                    <Typography variant="body1" fontWeight={500}>
                      About
                    </Typography>
                    <KeyboardArrowDownIcon
                      sx={{
                        fontSize: 20,
                        transform: Boolean(aboutAnchor)
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </Stack>

                  <Popper
                    open={Boolean(aboutAnchor)}
                    anchorEl={aboutAnchor}
                    placement="bottom-start"
                    transition
                    sx={{ zIndex: 1300 }}
                  >
                    {({ TransitionProps }) => (
                      <Fade {...TransitionProps} timeout={200}>
                        <Paper
                          elevation={8}
                          sx={{
                            mt: 1,
                            minWidth: 200,
                            borderRadius: 2,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                          }}
                        >
                          <ClickAwayListener onClickAway={handleAboutClose}>
                            <Box>
                              {aboutLinks.map((item) => (
                                <MenuItem
                                  key={item.label}
                                  component={Link}
                                  href={item.href}
                                  onClick={handleAboutClose}
                                  sx={{
                                    py: 1.5,
                                    px: 2,
                                    color: isActive(item.href)
                                      ? "primary.main"
                                      : "text.primary",
                                    fontWeight: isActive(item.href) ? 600 : 400,
                                    "&:hover": {
                                      bgcolor: "action.hover",
                                      color: "primary.main",
                                    },
                                  }}
                                >
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Box>
                          </ClickAwayListener>
                        </Paper>
                      </Fade>
                    )}
                  </Popper>
                </Box>
              </Stack>
            )}
            <ModeToggle />
            hello
            {/* User Actions */}
            <Stack direction="row" alignItems="center" spacing={2}>
              {userInfo?.email ? (
                <Box>
                  <IconButton onClick={handleUserMenuOpen} sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: "primary.main",
                        fontSize: "1rem",
                        fontWeight: 600,
                      }}
                    >
                      {userInfo.email.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    sx={{
                      mt: 1,
                      "& .MuiPaper-root": {
                        borderRadius: 2,
                        minWidth: 180,
                        border: "1px solid",
                        borderColor: "divider",
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        router.push("/dashboard");
                        handleUserMenuClose();
                      }}
                    >
                      Dashboard
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        router.push("/profile");
                        handleUserMenuClose();
                      }}
                    >
                      Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={handleLogout}
                      sx={{ color: "error.main" }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </Box>
              ) : (
                <Typography
                  component={Link}
                  href="/login"
                  variant="body1"
                  fontWeight={600}
                  sx={{
                    textDecoration: "none",
                    color: "text.primary",
                    px: 2,
                    py: 1,
                    borderRadius: 1,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  Login
                </Typography>
              )}

              {/* Mobile Menu Toggle */}
              {isMobile && (
                <IconButton
                  onClick={toggleDrawer}
                  sx={{
                    ml: 1,
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "280px",
            bgcolor: "background.paper",
          },
        }}
      >
        {/* Drawer Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Menu
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* User Info (Mobile) */}
        {userInfo?.email && (
          <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {userInfo.email.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {userInfo.email.split("@")[0]}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userInfo.email}
                </Typography>
              </Box>
            </Stack>
          </Box>
        )}

        {/* Navigation Links */}
        <List sx={{ px: 1, py: 2 }}>
          {allMobileLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={Link}
                href={link.href}
                onClick={toggleDrawer}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  color: isActive(link.href) ? "primary.main" : "text.primary",
                  bgcolor: isActive(link.href)
                    ? "primary.light"
                    : "transparent",
                  "&:hover": {
                    bgcolor: isActive(link.href)
                      ? "primary.light"
                      : "action.hover",
                  },
                }}
              >
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{
                    fontWeight: isActive(link.href) ? 600 : 400,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          {userInfo?.email && (
            <>
              <Divider sx={{ my: 2 }} />
              <ListItem disablePadding>
                <ListItemButton
                  component={Link}
                  href="/dashboard"
                  onClick={toggleDrawer}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    color: isActive("/dashboard")
                      ? "primary.main"
                      : "text.primary",
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                  }}
                >
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>

        {/* Bottom Actions */}
        <Box
          sx={{
            mt: "auto",
            p: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          {userInfo?.email ? (
            <Box
              onClick={() => {
                handleLogout();
                toggleDrawer();
              }}
              sx={{
                textAlign: "center",
                py: 1.5,
                color: "error.main",
                cursor: "pointer",
                borderRadius: 1,
                transition: "background-color 0.2s ease",
                "&:hover": {
                  bgcolor: "error.light",
                  color: "error.dark",
                },
              }}
            >
              <Typography variant="body1" fontWeight={600}>
                Logout
              </Typography>
            </Box>
          ) : (
            <Stack spacing={1}>
              <Box
                component={Link}
                href="/login"
                onClick={toggleDrawer}
                sx={{
                  display: "block",
                  textAlign: "center",
                  py: 1.5,
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: 1,
                  textDecoration: "none",
                  transition: "background-color 0.2s ease",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  Login
                </Typography>
              </Box>
              <Box
                component={Link}
                href="/register"
                onClick={toggleDrawer}
                sx={{
                  display: "block",
                  textAlign: "center",
                  py: 1.5,
                  border: "1px solid",
                  borderColor: "primary.main",
                  color: "primary.main",
                  borderRadius: 1,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  Register
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;

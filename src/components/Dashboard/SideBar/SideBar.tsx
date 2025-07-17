"use client";
import assets from "@/assets";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { UserRole } from "@/types";
import { drawerItems } from "@/utils/drawerItems";
import {
  alpha,
  Box,
  Divider,
  List,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";

const SideBar = () => {
  const theme = useTheme();
  const user = useAppSelector(selectUser);

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: theme.palette.mode === "dark" ? "#1a202c" : "#ffffff",
        color: theme.palette.mode === "dark" ? "#ffffff" : "#1a202c",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            theme.palette.mode === "dark"
              ? "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)",
          zIndex: 0,
        },
      }}
    >
      {/* Header Section */}
      <Box sx={{ position: "relative", zIndex: 1, p: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          component={Link}
          href="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            p: 2,
            borderRadius: 2,
            transition: "all 0.2s ease",
            "&:hover": {
              bgcolor: alpha(
                theme.palette.mode === "dark" ? "#ffffff" : "#1a202c",
                0.1,
              ),
            },
          }}
        >
          <Image
            src={assets.svgs.logo}
            width={40}
            height={40}
            alt="ZenDoc Logo"
            style={{
              filter:
                theme.palette.mode === "dark"
                  ? "brightness(1.2)"
                  : "brightness(0.8)",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(135deg, #ffffff 0%, #cbd5e0 100%)"
                  : "linear-gradient(135deg, #1a202c 0%, #2d3748 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ZenDoc Health
          </Typography>
        </Stack>
      </Box>

      {/* Divider */}
      <Divider
        sx={{
          mx: 2,
          borderColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(26, 32, 44, 0.1)",
        }}
      />

      {/* Navigation List */}
      <Box sx={{ flex: 1, position: "relative", zIndex: 1, p: 2 }}>
        <List sx={{ pt: 2 }}>
          {drawerItems(user.role.toLowerCase() as UserRole).map(
            (item, index) => (
              <SidebarItem key={index} item={item} />
            ),
          )}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.6)"
                : "rgba(26, 32, 44, 0.6)",
            fontWeight: 500,
          }}
        >
          © 2025 ZenDoc Health
        </Typography>
      </Box>
    </Box>
  );
};

export default SideBar;

"use client";

import useUserInfo from "@/hooks/useUserInfo";
import { logoutUser } from "@/services/actions/logoutUser";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const userInfo = useUserInfo();
  console.log(userInfo);
  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        boxShadow: 1,
        position: "sticky",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container>
        <Stack
          py={2}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={700}
            color="primary.main"
            sx={{ textDecoration: "none" }}
          >
            ZenDoc
          </Typography>

          <Stack direction="row" alignItems="center" gap={4}>
            <Button
              component={Link}
              href="/consultation"
              variant="text"
              color="primary"
            >
              Consultation
            </Button>
            <Button
              component={Link}
              href="/doctors"
              variant="text"
              color="primary"
            >
              Doctors
            </Button>
            <Button
              component={Link}
              href="/pricing"
              variant="text"
              color="primary"
            >
              Pricing
            </Button>

            <Button
              component={Link}
              href="/health-plans"
              variant="text"
              color="primary"
            >
              Health Plans
            </Button>

            {userInfo?.email && (
              <Button
                component={Link}
                href="/dashboard"
                variant="text"
                color="primary"
              >
                Dashboard
              </Button>
            )}
          </Stack>

          {userInfo?.email ? (
            <Button color="error" variant="outlined" onClick={handleLogOut}>
              Logout
            </Button>
          ) : (
            <Button component={Link} href="/login" variant="contained">
              Login
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;

"use client";
import { getUserInfo } from "@/services/auth.services";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import Link from "next/link";

const ServiceCTARegisterButton = () => {
  const userInfo = getUserInfo();
  console.log(userInfo);
  return (
    <Button
      href="/register"
      component={Link}
      disabled={userInfo?.email}
      variant="contained"
      color="secondary"
      size="large"
      fullWidth
      endIcon={<ArrowForwardIcon />}
      type="button"
      sx={{
        py: 1.8,
        px: 4,
        backgroundColor: "white",
        color: "primary.main",
        fontWeight: 600,
        fontSize: "1rem",
        textTransform: "none",
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.9)",
        },
        minWidth: { xs: "100%", sm: 200 },
      }}
    >
      Create Account
    </Button>
  );
};

export default ServiceCTARegisterButton;

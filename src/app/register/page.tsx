"use client";
import assets from "@/assets";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { registerPatient } from "@/services/actions/registerPatient";
import { decodedToken } from "@/utils/jwt";
import { modifyPayload } from "@/utils/modifyPayload";
import { registerValidationSchema } from "@/validations/register.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  alpha,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { registerDefaultValues } from "./register";

const RegisterPage = () => {
  const router = useRouter();
  const theme = useTheme();

  const [login, { isLoading }] = useUserLoginMutation();
  const dispatch = useAppDispatch();

  const handleRegister = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerPatient(data);
      if (res?.data?.id) {
        const loginRes = await login({
          password: values.password,
          email: values.patient.email,
        }).unwrap();
        if (loginRes?.data?.accessToken) {
          const userInfo = loginRes.data;
          const passwordChangeRequired = userInfo.needPasswordChange;

          if (userInfo.accessToken) {
            const token = loginRes.data.accessToken;
            const user = decodedToken(token);
            dispatch(setUser({ user, token }));

            if (passwordChangeRequired)
              router.replace(`/dashboard/change-password`);
            else router.replace("/");

            toast.success(loginRes?.message);
          }
        }
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  if (isLoading) return <Spinner />;

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.dark,
                  0.1,
                )} 0%, ${alpha(theme.palette.secondary.dark, 0.1)} 100%)`
              : `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.light,
                  0.1,
                )} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
        }}
      >
        <Paper
          elevation={theme.palette.mode === "dark" ? 8 : 3}
          sx={{
            maxWidth: 600,
            width: "100%",
            borderRadius: 3,
            p: 4,
            textAlign: "center",
            background:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.9)
                : theme.palette.background.paper,
            backdropFilter: "blur(10px)",
            border:
              theme.palette.mode === "dark"
                ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                : "none",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Patient Register
              </Typography>
            </Box>
          </Stack>

          <Box>
            <PHForm
              onSubmit={handleRegister}
              resolver={zodResolver(registerValidationSchema)}
              defaultValues={registerDefaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid size={{ md: 12 }}>
                  <PHInput label="Name" fullWidth={true} name="patient.name" />
                </Grid>
                <Grid size={{ md: 12 }}>
                  <PHInput
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <PHInput
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <PHInput
                    label="Contact Number"
                    type="tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <PHInput
                    label="Address"
                    fullWidth={true}
                    name="patient.address"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                size="large"
                sx={{
                  margin: "16px 0px",
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  background:
                    theme.palette.mode === "dark"
                      ? `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`
                      : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`
                        : `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                    transform: "translateY(-1px)",
                    boxShadow: theme.shadows[8],
                  },
                  transition: "all 0.2s ease-in-out",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography
                component="p"
                fontWeight={300}
                sx={{ color: theme.palette.text.secondary }}
              >
                Do you already have an account?{" "}
                <Link href="/login">
                  <Typography
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      textDecoration: "underline",
                      "&:hover": {
                        color: theme.palette.primary.dark,
                      },
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                    Login
                  </Typography>
                </Link>
              </Typography>
            </PHForm>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

export default RegisterPage;

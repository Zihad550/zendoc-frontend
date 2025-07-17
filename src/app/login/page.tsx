'use client';
import assets from '@/assets';
import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import Spinner from '@/components/Shared/Spinner/Spinner';
import { useUserLoginMutation } from '@/redux/features/auth/authApi';
import { setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { decodedToken } from '@/utils/jwt';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  alpha,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { validationSchema } from './login';

const LoginPage = () => {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useUserLoginMutation();
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async (values: FieldValues) => {
    try {
      // const res = await userLogin(values);
      const res = await login(values).unwrap();
      if (res?.data?.accessToken) {
        const userInfo = res.data;
        const passwordChangeRequired = userInfo.needPasswordChange;

        if (userInfo.accessToken) {
          const token = res.data.accessToken;
          const user = decodedToken(token);
          dispatch(setUser({ user, token }));

          if (passwordChangeRequired)
            router.replace(`/dashboard/change-password`);
          else router.replace('/');

          toast.success(res?.message);
        }
      } else {
        setError(res.message);
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
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            theme.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.dark,
                  0.1
                )} 0%, ${alpha(theme.palette.secondary.dark, 0.1)} 100%)`
              : `linear-gradient(135deg, ${alpha(
                  theme.palette.primary.light,
                  0.1
                )} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
        }}
      >
        <Paper
          elevation={theme.palette.mode === 'dark' ? 8 : 3}
          sx={{
            maxWidth: 600,
            width: '100%',
            borderRadius: 3,
            p: 4,
            textAlign: 'center',
            background:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.9)
                : theme.palette.background.paper,
            backdropFilter: 'blur(10px)',
            border:
              theme.palette.mode === 'dark'
                ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                : 'none',
          }}
        >
          <Stack
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login ZenDoc
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Alert
              severity="error"
              sx={{
                mt: 2,
                mb: 2,
                borderRadius: 2,
                '& .MuiAlert-message': {
                  width: '100%',
                  textAlign: 'left',
                },
              }}
            >
              {error}
            </Alert>
          )}

          <Box>
            <PHForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{
                email: '',
                password: '',
              }}
            >
              <Grid container spacing={2} my={1}>
                <Grid size={{ md: 6 }}>
                  <PHInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <PHInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Link href={'/forgot-password'}>
                <Typography
                  mb={1}
                  textAlign="end"
                  component="p"
                  fontWeight={300}
                  sx={{
                    textDecoration: 'underline',
                    color: theme.palette.primary.main,
                    '&:hover': {
                      color: theme.palette.primary.dark,
                    },
                    transition: 'color 0.2s ease-in-out',
                  }}
                >
                  Forgot Password?
                </Typography>
              </Link>

              <Button
                variant="contained"
                size="large"
                sx={{
                  margin: '16px 0px',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background:
                    theme.palette.mode === 'dark'
                      ? `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`
                      : `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
                  '&:hover': {
                    background:
                      theme.palette.mode === 'dark'
                        ? `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`
                        : `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
                    transform: 'translateY(-1px)',
                    boxShadow: theme.shadows[8],
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography
                component="p"
                fontWeight={300}
                sx={{ color: theme.palette.text.secondary }}
              >
                Don&apos;t have an account?{' '}
                <Link href="/register">
                  <Typography
                    component="span"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                      textDecoration: 'underline',
                      '&:hover': {
                        color: theme.palette.primary.dark,
                      },
                      transition: 'color 0.2s ease-in-out',
                    }}
                  >
                    Create an account
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

export default LoginPage;

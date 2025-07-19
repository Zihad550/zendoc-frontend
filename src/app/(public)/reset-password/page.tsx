'use client';

import PHForm from '@/components/Forms/PHForm';
import PHInput from '@/components/Forms/PHInput';
import SectionTitle from '@/components/Shared/SectionTitle';
import { authKey } from '@/contants/authkey';
import { useResetPasswordMutation } from '@/redux/features/auth/authApi';
import { deleteCookies } from '@/services/actions/deleteCookies';
import { zodResolver } from '@hookform/resolvers/zod';
import KeyIcon from '@mui/icons-material/Key';
import { Box, Button, Grid, Stack } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod/v4';

const validationSchema = z.object({
  newPassword: z.string().min(6, 'Must be at least 6 characters long'),
});

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const token = searchParams.get('token');
  const router = useRouter();

  const [resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    if (!token) return;
    localStorage.setItem(authKey, token);
  }, [token]);

  const onSubmit = async (values: FieldValues) => {
    const updatedData = { ...values, id };

    try {
      const res = await resetPassword(updatedData);

      if ('data' in res && res.data.status === 200) {
        toast.success('Password Reset Successful');
        localStorage.removeItem(authKey);
        deleteCookies([authKey, 'refreshToken']);
        router.push('/login');
      } else {
        throw new Error('Something Went Wrong, Try Again');
      }
    } catch {
      toast.success('Something Went Wrong, Try Again');
    }
  };

  return (
    <Box
      sx={{
        px: 4,
        py: 2,
        maxWidth: 600,
        width: '100%',
        boxShadow: 1,
        borderRadius: 1,
        mx: 'auto',
        mt: { xs: 2, md: 10 },
      }}
    >
      <Stack alignItems="center" justifyContent="center">
        <Box
          sx={{
            '& svg': {
              width: 100,
              height: 100,
            },
          }}
        >
          <KeyIcon sx={{ color: 'primary.main' }} />
        </Box>
        <SectionTitle
          title="Reset Password"
          withDivider={false}
          size="medium"
          containerSx={{ mb: 2 }}
        />
      </Stack>
      <PHForm
        onSubmit={onSubmit}
        defaultValues={{ newPassword: '' }}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container>
          <Grid size={{ xs: 12, sm: 12, md: 6 }}>
            <PHInput
              name="newPassword"
              type="password"
              label="New Password"
              sx={{ mb: 2 }}
              fullWidth
            />
          </Grid>
        </Grid>

        <Button type="submit" sx={{ width: '100%', my: 2 }}>
          Reset Password
        </Button>
      </PHForm>
    </Box>
  );
};

const ResetPassword = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPassword;

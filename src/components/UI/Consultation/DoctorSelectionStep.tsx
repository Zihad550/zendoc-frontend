import Spinner from '@/components/Shared/Spinner/Spinner';
import { useGetAllDoctorsQuery } from '@/redux/features/doctor/doctorApi';
import { Doctor } from '@/types/doctor';
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  alpha,
} from '@mui/material';

interface DoctorSelectionStepProps {
  selectedDoctor: Doctor;
  setSelectedDoctor: (doctor: Doctor) => void;
}

export default function DoctorSelectionStep({
  selectedDoctor,
  setSelectedDoctor,
}: DoctorSelectionStepProps) {
  const { data, isLoading } = useGetAllDoctorsQuery(undefined);
  if (isLoading) return <Spinner />;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select a Doctor
      </Typography>
      <List
        sx={{
          // Enhanced list styling for dark theme
          '& .MuiListItemButton-root': {
            borderRadius: 2,
            mb: 1,
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.05)'
                : '1px solid rgba(0, 0, 0, 0.05)',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'rgba(0, 0, 0, 0.02)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.1)
                  : alpha(theme.palette.primary.main, 0.04),
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.3)
                  : alpha(theme.palette.primary.main, 0.2),
              transform: 'translateY(-1px)',
            },
            '&.Mui-selected': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primary.main, 0.2)
                  : alpha(theme.palette.primary.main, 0.08),
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? theme.palette.primary.main
                  : theme.palette.primary.main,
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.primary.main, 0.25)
                    : alpha(theme.palette.primary.main, 0.12),
              },
            },
          },
        }}
      >
        {data?.data?.map((doctor) => (
          <ListItemButton
            key={doctor.id}
            selected={selectedDoctor?.id === doctor.id}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <Avatar
              src={doctor.profilePhoto}
              alt={doctor.name}
              sx={{
                mr: 2,
                width: 48,
                height: 48,
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '2px solid rgba(255, 255, 255, 0.1)'
                    : '2px solid rgba(0, 0, 0, 0.1)',
              }}
            />
            <ListItemText
              primary={doctor.name}
              secondary={doctor.designation}
              primaryTypographyProps={{
                fontWeight: 600,
                color: 'text.primary',
              }}
              secondaryTypographyProps={{
                color: 'text.secondary',
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

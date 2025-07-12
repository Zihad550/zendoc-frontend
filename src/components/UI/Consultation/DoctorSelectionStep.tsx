import Spinner from "@/components/Shared/Spinner/Spinner";
import { useGetAllDoctorsQuery } from "@/redux/features/doctor/doctorApi";
import { Doctor } from "@/types/doctor";
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

interface DoctorSelectionStepProps {
  selectedDoctor: Doctor;
  setSelectedDoctor: (doctor: Doctor) => void;
}

export default function DoctorSelectionStep({
  selectedDoctor,
  setSelectedDoctor,
}: DoctorSelectionStepProps) {
  const { data, isLoading } = useGetAllDoctorsQuery(undefined);
  console.log(data);
  if (isLoading) return <Spinner />;
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Select a Doctor
      </Typography>
      <List>
        {data?.doctors.map((doctor) => (
          <ListItemButton
            key={doctor.id}
            selected={selectedDoctor?.id === doctor.id}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <Avatar src={doctor.profilePhoto} alt={doctor.name} />
            <ListItemText
              primary={doctor.name}
              secondary={doctor.designation}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

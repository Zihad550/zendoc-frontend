"use client";
import SectionTitle from "@/components/Shared/SectionTitle";
import Spinner from "@/components/Shared/Spinner/Spinner";
import DashedLine from "@/components/UI/Doctor/DashedLine";
import { useGetDoctorQuery } from "@/redux/features/doctor/doctorApi";
import {
  alpha,
  Box,
  Chip,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { use } from "react";
import { PageProps } from "../../../../../.next/types/app/(public)/doctors/[id]/page";
import DoctorScheduleSlots from "../components/DoctorScheduleSlots";

// type PropTypes = {
//   params: {
//     id: string;
//   };
// };

const DoctorsProfilePage = ({ params }: PageProps) => {
  const theme = useTheme();
  const { id } = use(params);
  const { data, isLoading } = useGetDoctorQuery(id);

  const InfoBoxStyles = {
    background:
      theme.palette.mode === "dark"
        ? `linear-gradient(to bottom, ${alpha(
            theme.palette.primary.main,
            0.2,
          )}, ${alpha(theme.palette.background.paper, 0.8)} 100%)`
        : "linear-gradient(to bottom, rgba(21,134,253,0.3), rgba(255,255,255,1) 100%)",
    width: "100%",
    p: 3,
    borderRadius: 2,
    border:
      theme.palette.mode === "dark"
        ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
        : "none",
    "& h6": {
      color: "primary.main",
    },
    "& p": {
      color:
        theme.palette.mode === "dark" ? "text.secondary" : "secondary.main",
    },
  };

  if (isLoading) {
    return <Spinner />;
  }

  const doctor = data?.data;

  if (!doctor) {
    return (
      <Container>
        <Box my={5} textAlign="center">
          <Typography>Doctor not found</Typography>
        </Box>
      </Container>
    );
  }

  const specialties =
    doctor.doctorSpecialties?.map((ds: any) => ds.specialties.title) || [];

  return (
    <Container>
      <Box my={5}>
        <SectionTitle
          title="Doctor's Profile Details"
          subtitle="Compassionate and dedicated doctor committed to delivering high-quality care. Proficient in diagnosis, treatment, and advocating for comprehensive well-being. Prioritizing patient-centered approaches for optimal health outcomes."
          size="large"
        />
      </Box>

      <Box>
        <Box
          sx={{
            my: 10,
            p: 3,
            bgcolor:
              theme.palette.mode === "dark"
                ? alpha(theme.palette.background.paper, 0.3)
                : "#f8f8f8",
            borderRadius: 2,
          }}
        >
          <Stack
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? theme.palette.background.paper
                  : "white",
              p: 3,
              borderRadius: 2,
              border:
                theme.palette.mode === "dark"
                  ? `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                  : "none",
            }}
          >
            <Stack direction="row" gap={3}>
              <Box
                sx={{
                  width: 281,
                  height: 281,
                  bgcolor:
                    theme.palette.mode === "dark"
                      ? alpha(theme.palette.primary.main, 0.1)
                      : "#808080",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={doctor?.profilePhoto}
                  alt="doctor image"
                  width={281}
                  height={281}
                  style={{
                    height: "281px",
                    objectFit: "cover",
                  }}
                />
              </Box>
              <Stack flex={1}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>
                    {doctor?.name}
                  </Typography>
                  <Typography sx={{ my: "2px", color: "secondary.main" }}>
                    {doctor?.designation}
                  </Typography>
                  <Stack direction="row" alignItems="center" gap={2} mt={1}>
                    <Typography
                      noWrap
                      sx={{
                        maxWidth: "45ch",
                      }}
                    >
                      Specialties in
                    </Typography>
                    <Box>
                      {specialties.map((sp: any) => (
                        <Chip
                          key={sp}
                          label={sp}
                          color="primary"
                          sx={{ mr: 1 }}
                        />
                      ))}
                    </Box>
                  </Stack>
                </Box>

                <DashedLine />
                <Box>
                  <Typography sx={{ my: "2px" }}>Working at</Typography>
                  <Typography>{doctor?.currentWorkingPlace}</Typography>
                </Box>
                <DashedLine />
                <Box>
                  <Stack direction="row">
                    <Typography
                      fontWeight={"bold"}
                      sx={{
                        color:
                          theme.palette.mode === "dark"
                            ? "text.primary"
                            : "#141414",
                      }}
                    >
                      Consultation Fee
                    </Typography>
                    <Stack
                      sx={{
                        ml: 2,
                      }}
                    >
                      <Typography>
                        Taka : {doctor?.apointmentFee} (incl. Vat)
                      </Typography>
                      <Typography>Per consultation</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              gap={3}
              justifyContent={"space-between"}
              sx={{
                my: 4,
              }}
            >
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Total Experience</Typography>
                <Typography>{doctor?.experience}+ Years</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Qualification</Typography>
                <Typography>{doctor?.qualification}</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Average Rating</Typography>
                <Typography>{doctor?.averageRating}</Typography>
              </Box>
              <Box sx={InfoBoxStyles}>
                <Typography variant="h6">Contact Number</Typography>
                <Typography>{doctor?.contactNumber}</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
      <DoctorScheduleSlots id={doctor.id} />
    </Container>
  );
};

export default DoctorsProfilePage;

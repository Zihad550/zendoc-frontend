import { Doctor } from "@/types/doctor";
import { Box, Button, Stack, Typography, alpha } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
  const placeholder =
    "https://static.vecteezy.com/system/resources/thumbnails/026/489/224/small_2x/muslim-malay-woman-doctor-in-hospital-with-copy-space-ai-generated-photo.jpg";

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      gap={2}
      sx={{ width: "100%" }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        flex={1}
        gap={{ xs: 2, sm: 3 }}
        sx={{
          minHeight: { xs: "auto", sm: 235 },
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#1E2139" : "white",
          p: { xs: 2, sm: 3 },
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: 150, md: 190 },
            height: { xs: 200, sm: 150, md: 190 },
            minWidth: { sm: 150, md: 190 },
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#2A2D4A" : "#808080",
            borderRadius: 2,
            overflow: "hidden",
            border: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(255, 255, 255, 0.1)"
                : "none",
            alignSelf: { xs: "center", sm: "flex-start" },
          }}
        >
          <Image
            src={doctor?.profilePhoto ? doctor.profilePhoto : placeholder}
            alt="doctor image"
            width={190}
            height={190}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        <Stack flex={1} justifyContent="space-between" sx={{ minWidth: 0 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                wordBreak: "break-word",
              }}
            >
              {doctor?.name}
            </Typography>
            <Typography
              sx={{
                my: "2px",
                color: "secondary.main",
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
            >
              {doctor?.designation}
            </Typography>
            <Typography
              sx={{
                color: "secondary.main",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              {doctor?.doctorSpecialties?.length
                ? "Specialties in" +
                  " " +
                  doctor?.doctorSpecialties?.map(
                    (specialty) => specialty?.specialties?.title,
                  )
                : ""}
            </Typography>
          </Box>
          <Box
            sx={{
              borderBottom: "2px dashed",
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? alpha(theme.palette.primary.main, 0.3)
                  : "secondary.light",
              my: { xs: 2, sm: 3 },
            }}
          />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            gap={{ xs: 2, sm: 0 }}
          >
            <Box>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                gap={{ xs: 0, sm: 1 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "primary.main",
                    fontWeight: "600",
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                  }}
                >
                  Taka : {doctor?.apointmentFee}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  (incl. Vat)
                </Typography>
              </Stack>
              <Typography variant="caption" color="secondary.main">
                Per consultation
              </Typography>
            </Box>
            <Box>
              <Link href={`/doctors/${doctor?.id}`}>
                <Button>Book Now</Button>
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        sx={{
          minHeight: { xs: "auto", lg: 235 },
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#1E2139" : "white",
          width: { xs: "100%", lg: "400px" },
          minWidth: { lg: "300px" },
          p: { xs: 2, sm: 3 },
          borderRadius: 1,
        }}
      >
        <Box flex={1}>
          <Typography
            color="secondary.main"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Working in
          </Typography>
          <Typography
            sx={{
              fontWeight: "600",
              mt: "3px",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              wordBreak: "break-word",
            }}
          >
            {doctor?.currentWorkingPlace}
          </Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "2px dashed",
            borderColor: (theme) =>
              theme.palette.mode === "dark"
                ? alpha(theme.palette.primary.main, 0.3)
                : "secondary.light",
            my: { xs: 2, sm: "22px" },
          }}
        />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={{ xs: 2, sm: 0 }}
        >
          <Box>
            <Typography
              color="secondary.main"
              sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
            >
              Total Experience
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "600",
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              {doctor?.experience}+ Years
            </Typography>
          </Box>
          <Box>
            <Button
              component={Link}
              href={`/doctors/${doctor.id}`}
              size="medium"
              fullWidth={false}
            >
              View Details
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DoctorCard;

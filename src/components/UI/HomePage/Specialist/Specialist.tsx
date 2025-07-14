"use client";
import SectionTitle from "@/components/Shared/SectionTitle";
import { useGetAllSpecialtiesQuery } from "@/redux/features/specialties/specialtiesApi";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Specialist = () => {
  const { data } = useGetAllSpecialtiesQuery(undefined);
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/specialties`,
  //   {
  //     next: {
  //       revalidate: 30,
  //     },
  //   },
  // );
  // const { data: specialties } = await res.json();

  return (
    <Container>
      <Box
        sx={{
          margin: "80px 0px",
          textAlign: "center",
        }}
      >
        <SectionTitle
          title="Explore Treatments Across Specialties"
          subtitle="Experienced Doctors Across All Specialties"
          align="left"
          containerSx={{ mb: 4 }}
        />
        <Stack direction="row" gap={4} mt={5}>
          {data?.data?.slice(0, 6).map((specialty: any) => (
            <Box
              key={specialty.id}
              sx={{
                flex: 1,
                width: "150px",
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "#1E2139"
                    : "rgba(245, 245, 245,1)",
                border: (theme) =>
                  theme.palette.mode === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(250, 250, 250, 1)",
                borderRadius: "10px",
                textAlign: "center",
                padding: "40px 10px",
                boxShadow: (theme) =>
                  theme.palette.mode === "dark"
                    ? "0 4px 20px rgba(0, 0, 0, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.1)",
                "& img": {
                  width: "50px",
                  height: "50px",
                  margin: "0 auto",
                },
                "&:hover": {
                  border: (theme) => `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.5s",
                  transform: "translateY(-4px)",
                  boxShadow: (theme) =>
                    theme.palette.mode === "dark"
                      ? "0 8px 32px rgba(0, 0, 0, 0.4)"
                      : "0 8px 24px rgba(0, 0, 0, 0.15)",
                },
              }}
              component={Link}
              href={`/doctors?specialties=${specialty.title}`}
            >
              <Image
                src={specialty.icon}
                width={100}
                height={100}
                alt="specialty icon"
              />
              <Box>
                <Typography component="p" fontWeight={600} fontSize={18} mt={2}>
                  {specialty.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
        <Button
          variant="outlined"
          sx={{
            marginTop: "20px",
          }}
        >
          View ALL
        </Button>
      </Box>
    </Container>
  );
};

export default Specialist;

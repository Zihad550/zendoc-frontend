import DashedLine from "@/components/UI/Doctor/DashedLine";
import SectionTitle from "@/components/Shared/SectionTitle";
import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import ScrollCategory from "@/components/UI/Doctor/ScrollCategory";
import { Doctor } from "@/types/doctor";
import { Box, Container } from "@mui/material";

interface PropType {
  searchParams: { specialties: string };
}

const Doctors = async ({ searchParams }: PropType) => {
  let res;

  if (searchParams.specialties) {
    res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor?specialties=${searchParams.specialties}`,
    );
  } else {
    res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/doctor`);
  }

  const { data } = await res.json();

  return (
    <Container>
      <SectionTitle
        title="Find Specialists"
        subtitle="Browse our network of qualified healthcare professionals"
        containerSx={{ mt: 4, mb: 2 }}
      />
      <DashedLine />

      <ScrollCategory specialties={searchParams.specialties} />

      <Box sx={{ mt: 2, p: 3, bgcolor: "secondary.light" }}>
        {data?.map((doctor: Doctor, index: number) => (
          <Box key={doctor.id}>
            <DoctorCard doctor={doctor} />

            {index === data.length - 1 ? null : <DashedLine />}
          </Box>
        ))}

        {data.length === 0 && <Box>No Doctor Found With This Specialty</Box>}
      </Box>
    </Container>
  );
};

export default Doctors;

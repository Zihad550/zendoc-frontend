"use client";

import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import Spinner from "@/components/Shared/Spinner/Spinner";
import {
  useGetDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/features/doctor/doctorApi";
import { Gender } from "@/types";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { use } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: TParams) => {
  const router = useRouter();

  // const id = params?.doctorId;
  const { doctorId: id } = use(params);

  const { data: doctorData, isLoading } = useGetDoctorQuery(id);
  const [updateDoctor] = useUpdateDoctorMutation();

  if (isLoading) return <Spinner />;
  const data = doctorData.data;

  const handleFormSubmit = async (values: FieldValues) => {
    values.experience = Number(values.experience);
    values.appointmentFee = Number(values.appointmentFee);
    values.id = id;

    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      if (res?.data?.id) {
        toast.success("Doctor Updated Successfully!!!");
        router.push("/dashboard/admin/doctors");
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    email: data?.email || "",
    name: data?.name || "",
    contactNumber: data?.contactNumber || "",
    address: data?.address || "",
    registrationNumber: data?.registrationNumber || "",
    gender: data?.gender || "",
    experience: data?.experience || 0,
    appointmentFee: data?.appointmentFee || 0,
    qualification: data?.qualification || "",
    currentWorkingPlace: data?.currentWorkingPlace || "",
    designation: data?.designation || "",
  };
  return (
    <Box>
      <Typography component="h5" variant="h5">
        Update Doctor Info
      </Typography>
      {isLoading ? (
        "Loading..."
      ) : (
        <PHForm
          onSubmit={handleFormSubmit}
          defaultValues={data && defaultValues}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="email"
                type="email"
                label="Email"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="contactNumber"
                label="Contract Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="address"
                label="Address"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="registrationNumber"
                label="Registration Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="experience"
                type="number"
                label="Experience"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHSelectField
                items={Gender}
                name="gender"
                label="Gender"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="appointmentFee"
                type="number"
                label="Appointment Fee"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="qualification"
                label="Qualification"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="currentWorkingPlace"
                label="Current Working Place"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <PHInput
                name="designation"
                label="Designation"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button type="submit">Update</Button>
        </PHForm>
      )}
    </Box>
  );
};

export default DoctorUpdatePage;

import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import PHFullScreenModal from "@/components/Shared/PHModal/PHFullScreenModal";
import { useCreateDoctorMutation } from "@/redux/features/doctor/doctorApi";
import { Gender } from "@/types/common";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const [createDoctor, { isLoading }] = useCreateDoctorMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    const tId = toast.loading("Creating doctor...");
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.appointmentFee = Number(values.doctor.appointmentFee);
    const data = modifyPayload(values);
    try {
      const res = await createDoctor(data).unwrap();
      if (res?.data?.id) {
        toast.success("Doctor created successfully!!!", { id: tId });
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || "Something went wrong",
        { id: tId },
      );
    }
  };

  const defaultValues = {
    doctor: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      gender: "",
      experience: 0,
      appointmentFee: 0,
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
      profilePhoto: "",
    },
    password: "",
  };

  return (
    <PHFullScreenModal open={open} setOpen={setOpen} title="Create New Doctor">
      <PHForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.name"
              label="Name"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.contactNumber"
              label="Contract Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.address"
              label="Address"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.registrationNumber"
              label="Registration Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.experience"
              type="number"
              label="Experience"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHSelectField
              items={Gender}
              name="doctor.gender"
              label="Gender"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.appointmentFee"
              type="number"
              label="ApointmentFee"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.qualification"
              label="Qualification"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 4 }}>
            <PHInput
              name="doctor.designation"
              label="Designation"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </PHForm>
    </PHFullScreenModal>
  );
};

export default DoctorModal;

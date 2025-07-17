"use client";

import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import Spinner from "@/components/Shared/Spinner/Spinner";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/features/profile/profile.api";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, Button, Container, Grid } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import DoctorInformation from "./components/DoctorInformations";
import ProfileUpdateModal from "./components/ProfileUpdateModal";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: doctorData, isLoading } = useGetMYProfileQuery(undefined);
  const [updateMYProfile, { isLoading: updating }] =
    useUpdateMYProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    updateMYProfile(formData);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const data = doctorData?.data;

  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              sx={{
                height: 300,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              {data?.profilePhoto && (
                <Image
                  height={300}
                  width={400}
                  src={data?.profilePhoto}
                  alt="User Photo"
                />
              )}
            </Box>
            <Box my={3}>
              {updating ? (
                <p>Uploading...</p>
              ) : (
                <AutoFileUploader
                  name="file"
                  label="Choose Your Profile Photo"
                  icon={<CloudUploadIcon />}
                  onFileUpload={fileUploadHandler}
                  variant="text"
                />
              )}
            </Box>

            <Button
              fullWidth
              endIcon={<ModeEditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <DoctorInformation data={data} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Profile;

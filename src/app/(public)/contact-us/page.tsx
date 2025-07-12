"use client";
import assets from "@/assets";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { FieldValues } from "react-hook-form";
import { validationSchema } from "./contact";

const ContactUsPage = () => {
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const theme = useTheme();

  const onSubmit = (values: FieldValues) => {
    // Logic to handle form submission
    console.log(values);
    alert("Thank you for reaching out! We'll get back to you soon.");
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Box
        sx={{
          width: "100%",
          boxShadow: theme.shadows[3],
          borderRadius: theme.shape.borderRadius,
          p: theme.spacing(4),
          textAlign: "center",
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack alignItems="center" spacing={3}>
          <Box>
            <Image src={assets.svgs.logo} width={60} height={60} alt="logo" />
          </Box>
          <Typography variant="h4" fontWeight="bold" color="primary.main">
            Get in Touch
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We would love to hear from you! Please fill out the form below and
            we{"'"}ll get back to you as soon as possible.
          </Typography>

          <PHForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(validationSchema)}
          >
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <PHInput name="name" label="Full Name" fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <PHInput name="email" label="Email Address" fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <PHInput name="phone" label="Phone Number" fullWidth />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <PHInput name="subject" label="Subject" fullWidth />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <PHInput name="message" label="Your Message" fullWidth />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                mt: 3,
                py: 1.5,
                px: 4,
                textTransform: "none",
                fontSize: "1rem",
              }}
              fullWidth
            >
              Send Message
            </Button>
          </PHForm>
        </Stack>
      </Box>
    </Container>
  );
};

export default ContactUsPage;

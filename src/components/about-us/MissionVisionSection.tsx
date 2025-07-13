"use client";
import assets from "@/assets";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const MissionVisionSection = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}
        >
          <Box
            sx={{
              width: "80%",
              height: 500,
              position: "relative",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: theme.shadows[5],
            }}
          >
            <Image
              src={assets.images.medicalConsultation}
              alt="Medical consultation"
              fill
              style={{ objectFit: "cover" }}
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              component="span"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              ABOUT ZENDOC
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                my: 2,
                fontSize: { xs: "2rem", md: "2.5rem" },
              }}
            >
              Redefining Healthcare Experience
            </Typography>
            <Divider
              sx={{
                width: 80,
                height: 4,
                backgroundColor: theme.palette.primary.main,
                mb: 3,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", mb: 4 }}>
            <Button
              onClick={() => setActiveTab("mission")}
              sx={{
                mr: 2,
                px: 3,
                color:
                  activeTab === "mission"
                    ? "white"
                    : theme.palette.text.primary,
                backgroundColor:
                  activeTab === "mission"
                    ? theme.palette.primary.main
                    : "transparent",
                "&:hover": {
                  backgroundColor:
                    activeTab === "mission"
                      ? theme.palette.primary.dark
                      : theme.palette.grey[100],
                },
              }}
            >
              Our Mission
            </Button>
            <Button
              onClick={() => setActiveTab("vision")}
              sx={{
                px: 3,
                color:
                  activeTab === "vision" ? "white" : theme.palette.text.primary,
                backgroundColor:
                  activeTab === "vision"
                    ? theme.palette.primary.main
                    : "transparent",
                "&:hover": {
                  backgroundColor:
                    activeTab === "vision"
                      ? theme.palette.primary.dark
                      : theme.palette.grey[100],
                },
              }}
            >
              Our Vision
            </Button>
          </Box>

          {activeTab === "mission" && (
            <Box>
              <Typography paragraph sx={{ fontSize: "1.1rem", mb: 3 }}>
                At ZenDoc, our mission is to provide high-quality,
                patient-centered healthcare services that are accessible to all.
                We believe that healthcare should be personalized, convenient,
                and focused on your unique needs.
              </Typography>
              <Typography paragraph sx={{ fontSize: "1.1rem" }}>
                Through innovation, compassion, and excellence in medical
                practice, we strive to improve the health and well-being of the
                communities we serve. Our team of dedicated healthcare
                professionals is committed to delivering exceptional care with
                integrity and respect.
              </Typography>
            </Box>
          )}

          {activeTab === "vision" && (
            <Box>
              <Typography paragraph sx={{ fontSize: "1.1rem", mb: 3 }}>
                Our vision is to become the leading healthcare provider,
                recognized for excellence in patient care, technological
                innovation, and community health improvement. We envision a
                future where quality healthcare is available to everyone,
                regardless of location or circumstances.
              </Typography>
              <Typography paragraph sx={{ fontSize: "1.1rem" }}>
                By integrating cutting-edge technology with compassionate care,
                we aim to create a healthcare ecosystem that addresses the
                evolving needs of our patients, while setting new standards in
                medical service delivery and patient experience.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default MissionVisionSection;

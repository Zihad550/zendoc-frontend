import SectionTitle from "@/components/Shared/SectionTitle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export default function FaqContact() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        py: 8,
        position: "relative",
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          background:
            "linear-gradient(180deg, rgba(21, 134, 253, 0.05) 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <SectionTitle
          title="Couldn't Find Your Answer?"
          subtitle="Get in touch with our support team for personalized assistance"
          containerSx={{ mb: 6 }}
        />

        <Grid container spacing={4}>
          {/* Contact Options */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Our Support Channels
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Choose the most convenient way to reach our support team. We
                {"'"}re here to help you 24/7.
              </Typography>
            </Box>

            {/* Contact Cards */}
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ChatIcon />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="600">
                      Live Chat
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Chat with our support team in real-time
                    </Typography>
                  </Box>
                  <IconButton color="primary" aria-label="Start chat">
                    <ArrowForwardIcon />
                  </IconButton>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "secondary.main",
                      color: "white",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <PhoneIcon />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="600">
                      Phone Support
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Call us at (800) 555-1234
                    </Typography>
                  </Box>
                  <IconButton color="secondary" aria-label="Call support">
                    <ArrowForwardIcon />
                  </IconButton>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "success.main",
                      color: "white",
                      borderRadius: "50%",
                      p: 1,
                      mr: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <EmailIcon />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight="600">
                      Email Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      support@zendoc.com
                    </Typography>
                  </Box>
                  <IconButton color="success" aria-label="Email support">
                    <ArrowForwardIcon />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0 10px 40px rgba(0,0,0,0.06)",
              }}
            >
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Send Us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Fill out the form below and we{"'"}ll get back to you as soon as
                possible.
              </Typography>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    placeholder="Your full name"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    placeholder="your.email@example.com"
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    select
                    defaultValue=""
                    SelectProps={{
                      native: true,
                    }}
                    sx={{ mb: 2 }}
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option value="account">Account Issues</option>
                    <option value="appointments">Appointments</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="technical">Technical Support</option>
                    <option value="other">Other</option>
                  </TextField>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Please describe your question or issue in detail"
                    sx={{ mb: 3 }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 2,
                    }}
                  >
                    Submit Question
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

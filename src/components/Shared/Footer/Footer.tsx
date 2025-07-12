import facebookIcon from "@/assets/landing_page/facebook.png";
import instagramIcon from "@/assets/landing_page/instagram.png";
import linkedIcon from "@/assets/landing_page/linkedin.png";
import twitterIcon from "@/assets/landing_page/twitter.png";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        py: 5,
        mt: 10,
        boxShadow: 2,
      }}
    >
      <Container>
        <Stack direction="row" gap={4} justifyContent="center" mb={3}>
          <Button component={Link} href="/consultation" variant="text">
            Consultation
          </Button>
          <Button variant="text">Health Plans</Button>
          <Button variant="text">Medicine</Button>
          <Button variant="text">Diagnostics</Button>
          <Button variant="text">NGOs</Button>
        </Stack>

        <Stack direction="row" gap={2} justifyContent="center" py={2}>
          <IconButton
            component="a"
            href="https://facebook.com"
            target="_blank"
            aria-label="facebook"
          >
            <Image src={facebookIcon} width={30} height={30} alt="facebook" />
          </IconButton>
          <IconButton
            component="a"
            href="https://instagram.com"
            target="_blank"
            aria-label="instagram"
          >
            <Image src={instagramIcon} width={30} height={30} alt="instagram" />
          </IconButton>
          <IconButton
            component="a"
            href="https://twitter.com"
            target="_blank"
            aria-label="twitter"
          >
            <Image src={twitterIcon} width={30} height={30} alt="twitter" />
          </IconButton>
          <IconButton
            component="a"
            href="https://linkedin.com"
            target="_blank"
            aria-label="linkedin"
          >
            <Image src={linkedIcon} width={30} height={30} alt="linkedin" />
          </IconButton>
        </Stack>
        <Box
          sx={{
            border: "1px dashed",
            borderColor: "grey.300",
          }}
        ></Box>

        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          pt={3}
        >
          <Typography component="p" color="text.secondary">
            &copy;2024 ZenDoc. All Rights Reserved.
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={700}
            color="primary.main"
            sx={{ textDecoration: "none" }}
          >
            ZenDoc
          </Typography>
          <Stack direction="row" gap={2}>
            <Button variant="text" component={Link} href="/privacy-policy">
              Privacy Policy
            </Button>
            <Button
              variant="text"
              component={Link}
              href="/terms-and-conditions"
            >
              Terms & Conditions
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

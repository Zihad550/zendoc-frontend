import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import Link from 'next/link';

const SitemapPage = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sitemap
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Explore all the sections of our website easily.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Doctors
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={<Link href="/doctors">View All Doctors</Link>}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Consultation
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={<Link href="/consultation">Consult Now</Link>}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Services
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={<Link href="/services">Our Services</Link>}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Link href="/health-plans">Health Plans</Link>}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={<Link href="/pricing">Pricing</Link>} />
            </ListItem>
          </List>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
          <List>
            <ListItem>
              <ListItemText primary={<Link href="/about-us">About Us</Link>} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Link href="/history">Our History</Link>}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Link href="/contact-us">Contact Us</Link>}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Typography variant="h6" gutterBottom>
            Legal
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary={<Link href="/privacy-policy">Privacy Policy</Link>}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={
                  <Link href="/terms-conditions">Terms & Conditions</Link>
                }
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SitemapPage;

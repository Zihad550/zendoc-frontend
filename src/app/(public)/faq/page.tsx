"use client";

import SectionTitle from "@/components/Shared/SectionTitle";
import FaqAccordion from "@/components/UI/FAQ/FaqAccordion";
import FaqCategories from "@/components/UI/FAQ/FaqCategories";
import FaqContact from "@/components/UI/FAQ/FaqContact";
import FaqHero from "@/components/UI/FAQ/FaqHero";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

// FAQ categories
const categories = [
  { id: "general", label: "General Questions" },
  { id: "appointments", label: "Appointments" },
  { id: "consultations", label: "Online Consultations" },
  { id: "billing", label: "Billing & Insurance" },
  { id: "prescriptions", label: "Prescriptions" },
  { id: "technical", label: "Technical Support" },
];

// FAQ data organized by category
const faqData = {
  general: [
    {
      question: "What services does ZenDoc provide?",
      answer:
        "ZenDoc offers a comprehensive range of healthcare services including in-person and virtual doctor consultations, specialist appointments, prescription management, health records management, and preventive healthcare services. Our platform connects patients with qualified healthcare professionals across various specialties to provide convenient and accessible healthcare solutions.",
    },
    {
      question: "How do I create an account on ZenDoc?",
      answer:
        'Creating an account on ZenDoc is simple. Click on the "Sign Up" button in the top right corner of our homepage, fill in your personal details, verify your email address, and complete your health profile. Once registered, you can immediately start booking appointments and accessing our services.',
    },
    {
      question: "Is my medical information secure?",
      answer:
        "Yes, we take your privacy and data security very seriously. ZenDoc is fully HIPAA compliant and uses advanced encryption technologies to protect your personal and medical information. We never share your data with third parties without your explicit consent, and our platform includes comprehensive access controls to ensure only authorized healthcare providers can view your medical records.",
    },
    {
      question: "Can I use ZenDoc for my entire family?",
      answer:
        "Absolutely! ZenDoc offers family accounts that allow you to manage healthcare for your entire family. You can add family members to your account, book appointments on their behalf, manage their medications, and access their health records all from a single dashboard, making family healthcare management simple and convenient.",
    },
    {
      question: "Which devices can I use to access ZenDoc?",
      answer:
        "ZenDoc is accessible across multiple platforms. You can use our service through our website on any desktop or laptop computer, or download our mobile app available for both iOS and Android devices. Our platform is fully responsive, ensuring a seamless experience regardless of the device you choose to use.",
    },
  ],
  appointments: [
    {
      question: "How do I schedule an appointment?",
      answer:
        'To schedule an appointment, log into your ZenDoc account, click on "Book Appointment" from the dashboard, select your preferred doctor or specialty, choose an available date and time slot, provide a brief reason for your visit, and confirm your booking. You\'ll receive an email confirmation and reminder notifications as your appointment approaches.',
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer:
        'Yes, you can cancel or reschedule your appointment through your ZenDoc account. Navigate to "My Appointments" in your dashboard, select the appointment you wish to modify, and click on "Reschedule" or "Cancel". Please note that cancellations made less than 24 hours before the scheduled appointment may incur a cancellation fee depending on the doctor\'s policy.',
    },
    {
      question: "How far in advance can I book an appointment?",
      answer:
        "Most healthcare providers on ZenDoc allow bookings up to 3 months in advance. However, this can vary depending on the specific doctor or specialist. Some doctors may have different scheduling windows, which will be clearly indicated when you're making your booking.",
    },
    {
      question:
        "What should I do if there are no available slots with my preferred doctor?",
      answer:
        'If your preferred doctor doesn\'t have available slots, you can join their waitlist to be notified of cancellations, look for other qualified doctors with similar specializations, or use our "Next Available" feature to find the earliest appointment with any qualified provider in your chosen specialty.',
    },
    {
      question: "Do I need to arrive early for my in-person appointment?",
      answer:
        "Yes, we recommend arriving 15 minutes before your scheduled appointment time for in-person visits. This allows time for check-in procedures, updating your information if needed, and completing any required paperwork. For first-time visits, consider arriving 20-30 minutes early to complete your new patient registration.",
    },
  ],
  consultations: [
    {
      question: "What equipment do I need for a video consultation?",
      answer:
        "For a video consultation, you'll need a device with a camera and microphone (smartphone, tablet, laptop, or desktop computer with webcam), a stable internet connection (minimum 1 Mbps upload/download speed), and a quiet, private space. We recommend testing your equipment before your appointment using our system check tool available in your account settings.",
    },
    {
      question: "How do I join my virtual consultation?",
      answer:
        'To join your virtual consultation, log into your ZenDoc account 5-10 minutes before your scheduled appointment time, go to "My Appointments," and click on the "Join Consultation" button that becomes active when your doctor is ready. Alternatively, you can click the link in your appointment reminder email or notification.',
    },
    {
      question: "Are virtual consultations as effective as in-person visits?",
      answer:
        "Virtual consultations are effective for many conditions and follow-up care. They allow doctors to evaluate symptoms, provide medical advice, prescribe medications, and refer to specialists if needed. However, some conditions may require physical examination or tests that can only be conducted in person. Your doctor will advise if an in-person visit becomes necessary.",
    },
    {
      question:
        "What happens if I experience technical issues during my video consultation?",
      answer:
        "If you experience technical difficulties during your consultation, our system will automatically attempt to reconnect you. If problems persist, the consultation can continue via phone call using the number registered in your account. Our technical support team is also available to assist in real-time through the chat feature on our platform or by calling our support line.",
    },
    {
      question: "Can I include family members in my virtual consultation?",
      answer:
        'Yes, you can include family members in your virtual consultation if they are physically present with you. If they are in a different location, you can use our "Add Participant" feature to include them in the video call, provided you have their consent and have added them to your family account beforehand.',
    },
  ],
  billing: [
    {
      question: "What payment methods does ZenDoc accept?",
      answer:
        "ZenDoc accepts various payment methods including major credit cards (Visa, MasterCard, American Express, Discover), debit cards, HSA/FSA cards, PayPal, and bank transfers for certain services. All payment information is securely encrypted and stored in compliance with PCI DSS standards.",
    },
    {
      question: "Does ZenDoc accept insurance?",
      answer:
        "Yes, ZenDoc works with many major insurance providers. You can verify your insurance coverage by entering your insurance details in your account settings. Our system will verify your eligibility and display your estimated copay before you book an appointment. For specific questions about your coverage, please contact your insurance provider or our billing department.",
    },
    {
      question: "How do I update my insurance information?",
      answer:
        'To update your insurance information, log into your ZenDoc account, go to "Settings," select "Insurance Information," click "Edit" or "Add New Insurance," and enter your updated insurance details. Be sure to include your policy number, group number, and a photo of both sides of your insurance card for verification purposes.',
    },
    {
      question: "When will I be charged for my appointment?",
      answer:
        "For most appointments, your payment method will be charged after your consultation is completed. However, some specialists may require a deposit at the time of booking, which will be clearly indicated during the scheduling process. Cancellation fees, if applicable, will be charged to your payment method on file according to the provider's cancellation policy.",
    },
    {
      question:
        "How can I get a receipt or superbill for insurance reimbursement?",
      answer:
        'After your appointment, you can download a detailed receipt or superbill from the "Billing History" section of your account. This document includes all the necessary information for insurance reimbursement, including service codes, diagnosis codes, and provider information. If you need additional documentation, you can request it through our billing support team.',
    },
  ],
  prescriptions: [
    {
      question: "How do I request a prescription refill?",
      answer:
        'To request a prescription refill, log into your ZenDoc account, go to "My Prescriptions," select the medication you need refilled, click "Request Refill," and confirm your pharmacy information. Your request will be sent to your healthcare provider for review, and you\'ll be notified once the refill has been approved and sent to your pharmacy.',
    },
    {
      question: "Can all medications be prescribed through telemedicine?",
      answer:
        "Most regular medications can be prescribed through telemedicine, including those for chronic conditions, minor infections, and non-controlled substances. However, certain controlled substances and medications requiring in-person evaluation may have restrictions based on federal and state regulations. Your healthcare provider will inform you if an in-person visit is required for specific prescriptions.",
    },
    {
      question:
        "How long does it take for a prescription to be ready at the pharmacy?",
      answer:
        "Once your doctor approves and sends your prescription, it typically takes 1-2 hours for your pharmacy to process it, though this can vary depending on the pharmacy's current workload. You'll receive a notification when your prescription has been sent to the pharmacy, and many pharmacies also provide their own notification when your medication is ready for pickup.",
    },
    {
      question:
        "Can I transfer my existing prescriptions to be managed through ZenDoc?",
      answer:
        'Yes, you can transfer your existing prescriptions to be managed through ZenDoc. In your account, navigate to "My Prescriptions," select "Add Existing Prescription," and provide details about your current medications and pharmacy. Alternatively, you can discuss this with your ZenDoc healthcare provider during your consultation, and they can help integrate your current medications into your ZenDoc health record.',
    },
    {
      question: "Does ZenDoc offer mail-order pharmacy services?",
      answer:
        "Yes, ZenDoc partners with several mail-order pharmacies to offer convenient delivery of prescription medications. When your doctor prescribes medication, you can select the mail-order option and provide your delivery address. Standard delivery is typically 3-5 business days, while expedited shipping options are available for urgent medications.",
    },
  ],
  technical: [
    {
      question: "What should I do if I forget my password?",
      answer:
        'If you forget your password, click on the "Forgot Password" link on the login page, enter your registered email address, and follow the instructions sent to your email to reset your password. For security reasons, password reset links expire after 24 hours. If you don\'t receive the email, check your spam folder or contact our support team for assistance.',
    },
    {
      question: "How do I update my personal information?",
      answer:
        'To update your personal information, log into your ZenDoc account, go to "Settings," select "Personal Information," make the necessary changes, and click "Save." Certain changes like name corrections may require verification documents, which you can upload directly through the platform.',
    },
    {
      question: "Why is my video not working during a consultation?",
      answer:
        "If your video isn't working during a consultation, check that you've allowed camera access in your browser or app permissions, ensure no other applications are using your camera, verify your internet connection is stable, and try refreshing the page or restarting the app. If problems persist, you can switch to phone consultation by clicking the \"Switch to Phone\" option in the consultation interface.",
    },
    {
      question: "How can I download my medical records?",
      answer:
        'To download your medical records, log into your ZenDoc account, navigate to "Health Records," select the records you wish to download, click "Export," choose your preferred format (PDF, CSV, or CCD), and confirm. You\'ll then be prompted to save the file to your device. For complete medical history, you may need to request this specifically through the "Record Request" feature.',
    },
    {
      question:
        "Is the ZenDoc platform accessible for users with disabilities?",
      answer:
        "Yes, ZenDoc is designed with accessibility in mind and follows WCAG 2.1 guidelines. Our platform supports screen readers, keyboard navigation, and has adjustable text sizes. We also offer alternative text for images, transcripts for video content, and closed captioning for live consultations. If you have specific accessibility needs, please contact our support team, and we'll be happy to assist you.",
    },
  ],
};

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [filteredFaqs, setFilteredFaqs] = useState(faqData.general);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Handle category change
  const handleCategoryChange = (
    event: React.SyntheticEvent,
    newValue: string,
  ) => {
    setSelectedCategory(newValue);
    setFilteredFaqs(faqData[newValue as keyof typeof faqData]);
    setSearchQuery("");
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      // If search is cleared, show selected category FAQs
      setFilteredFaqs(faqData[selectedCategory as keyof typeof faqData]);
    } else {
      // Search across all categories
      const results = Object.values(faqData)
        .flat()
        .filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query),
        );
      setFilteredFaqs(results);
    }
  };

  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      {/* Hero Section */}
      <FaqHero />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Search Bar */}
        <Box
          sx={{
            maxWidth: 700,
            mx: "auto",
            mb: 6,
            px: 2,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={handleSearchChange}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              sx: {
                borderRadius: 2,
                bgcolor: "background.paper",
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                "&:hover": {
                  boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
                },
                transition: "box-shadow 0.3s ease",
              },
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* Categories */}
          <Grid size={{ xs: 12, md: 3 }}>
            {isMobile ? (
              <Box sx={{ mb: 4 }}>
                <Tabs
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  allowScrollButtonsMobile
                  sx={{
                    mb: 2,
                    ".MuiTabs-scrollButtons": {
                      color: "primary.main",
                    },
                  }}
                >
                  {categories.map((category) => (
                    <Tab
                      key={category.id}
                      label={category.label}
                      value={category.id}
                      sx={{
                        fontWeight:
                          selectedCategory === category.id ? 700 : 400,
                      }}
                    />
                  ))}
                </Tabs>
              </Box>
            ) : (
              <Box sx={{ position: "sticky", top: 20 }}>
                <SectionTitle title="Categories" align="left" size="small" />
                <FaqCategories
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
                />
              </Box>
            )}
          </Grid>

          {/* FAQ Content */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Box>
              <SectionTitle
                title={
                  searchQuery
                    ? "Search Results"
                    : categories.find((c) => c.id === selectedCategory)
                        ?.label || "Frequently Asked Questions"
                }
                subtitle={
                  searchQuery
                    ? `Found ${filteredFaqs.length} results for "${searchQuery}"`
                    : "Find answers to common questions about our services"
                }
                align="left"
                containerSx={{ mb: 4 }}
              />

              {filteredFaqs.length > 0 ? (
                <FaqAccordion faqs={filteredFaqs} />
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    mt: 4,
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                  }}
                >
                  No results found for your search. Please try different
                  keywords or browse our categories.
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Contact Section */}
      <FaqContact />
    </Box>
  );
}

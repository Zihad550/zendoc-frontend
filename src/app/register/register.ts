export const registerDefaultValues = {
  password: '',
  patient: {
    name: '',
    email: '',
    contactNumber: '',
    address: '',
  },
};

// Enhanced form configuration for better UX
export const registerFormConfig = {
  spacing: 2,
  gridBreakpoints: {
    name: { xs: 12, md: 12 },
    email: { xs: 12, md: 12 },
    password: { xs: 12, md: 6 },
    contactNumber: { xs: 12, md: 6 },
    address: { xs: 12, md: 12 },
  },
  inputProps: {
    name: {
      placeholder: 'Enter your full name',
      autoComplete: 'name',
    },
    email: {
      placeholder: 'Enter your email address',
      autoComplete: 'email',
    },
    password: {
      placeholder: 'Create a strong password',
      autoComplete: 'new-password',
    },
    contactNumber: {
      placeholder: 'Enter your phone number',
      autoComplete: 'tel',
    },
    address: {
      placeholder: 'Enter your address',
      autoComplete: 'address-line1',
      multiline: true,
      rows: 2,
    },
  },
};

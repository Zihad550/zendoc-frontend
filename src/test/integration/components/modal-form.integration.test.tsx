import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, MenuItem } from "@mui/material";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { z } from "zod";
import { render } from "../../utils/test-utils";

import { vi } from "vitest";

// Mock toast notifications
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Validation schema for doctor profile form
const doctorProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  specialization: z.string().min(1, "Please select a specialization"),
  experience: z.string().min(1, "Experience is required"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
});

// Test component that combines modal with form
const ModalFormTest = ({
  onSubmit,
  initialOpen = false,
  formData = {},
}: {
  onSubmit: (values: any) => void;
  initialOpen?: boolean;
  formData?: Record<string, any>;
}) => {
  const [open, setOpen] = useState(initialOpen);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  };

  const specializations = [
    { value: "cardiology", label: "Cardiology" },
    { value: "neurology", label: "Neurology" },
    { value: "orthopedic", label: "Orthopedic" },
    { value: "pediatrics", label: "Pediatrics" },
  ];

  return (
    <>
      <Button onClick={() => setOpen(true)} data-testid="open-modal-button">
        Add Doctor
      </Button>

      <PHModal
        open={open}
        setOpen={setOpen}
        title="Add New Doctor"
        maxWidth="md"
        fullWidth
      >
        <PHForm
          onSubmit={handleSubmit}
          resolver={zodResolver(doctorProfileSchema)}
          defaultValues={{
            name: "",
            email: "",
            specialization: "",
            experience: "",
            contactNumber: "",
            ...formData,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <PHInput
                name="name"
                label="Full Name"
                fullWidth
                required
                data-testid="name-input"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PHInput
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                required
                data-testid="email-input"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PHSelectField
                name="specialization"
                label="Specialization"
                fullWidth
                required
                data-testid="specialization-select"
              >
                {specializations.map((spec) => (
                  <MenuItem key={spec.value} value={spec.value}>
                    {spec.label}
                  </MenuItem>
                ))}
              </PHSelectField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <PHInput
                name="experience"
                label="Years of Experience"
                type="number"
                fullWidth
                required
                data-testid="experience-input"
              />
            </Grid>
            <Grid item xs={12}>
              <PHInput
                name="contactNumber"
                label="Contact Number"
                fullWidth
                required
                data-testid="contact-input"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button
                type="button"
                variant="outlined"
                fullWidth
                onClick={() => setOpen(false)}
                data-testid="cancel-button"
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                data-testid="submit-button"
              >
                {isSubmitting ? "Saving..." : "Save Doctor"}
              </Button>
            </Grid>
          </Grid>
        </PHForm>
      </PHModal>
    </>
  );
};

describe("Modal Form Integration", () => {
  describe("Modal State Management", () => {
    it("should open modal when trigger button is clicked", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} />);

      // Modal should not be visible initially
      expect(screen.queryByText("Add New Doctor")).not.toBeInTheDocument();

      // Click the trigger button
      const openButton = screen.getByTestId("open-modal-button");
      await user.click(openButton);

      // Modal should now be visible
      await waitFor(() => {
        expect(screen.getByText("Add New Doctor")).toBeInTheDocument();
      });
    });

    it("should close modal when cancel button is clicked", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Modal should be visible
      expect(screen.getByText("Add New Doctor")).toBeInTheDocument();

      // Click cancel button
      const cancelButton = screen.getByTestId("cancel-button");
      await user.click(cancelButton);

      // Modal should be closed
      await waitFor(() => {
        expect(screen.queryByText("Add New Doctor")).not.toBeInTheDocument();
      });
    });

    it("should close modal when close icon is clicked", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Modal should be visible
      expect(screen.getByText("Add New Doctor")).toBeInTheDocument();

      // Click close icon
      const closeButton = screen.getByLabelText("close");
      await user.click(closeButton);

      // Modal should be closed
      await waitFor(() => {
        expect(screen.queryByText("Add New Doctor")).not.toBeInTheDocument();
      });
    });

    it("should close modal when clicking backdrop", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Modal should be visible
      expect(screen.getByText("Add New Doctor")).toBeInTheDocument();

      // Click backdrop (outside modal content)
      const backdrop = screen.getByRole("presentation")
        .firstChild as HTMLElement;
      await user.click(backdrop);

      // Modal should be closed
      await waitFor(() => {
        expect(screen.queryByText("Add New Doctor")).not.toBeInTheDocument();
      });
    });

    it("should close modal when escape key is pressed", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Modal should be visible
      expect(screen.getByText("Add New Doctor")).toBeInTheDocument();

      // Press escape key
      await user.keyboard("{Escape}");

      // Modal should be closed
      await waitFor(() => {
        expect(screen.queryByText("Add New Doctor")).not.toBeInTheDocument();
      });
    });
  });

  describe("Form Validation Integration", () => {
    it("should validate all required fields", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Try to submit empty form
      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      // Check for validation errors
      await waitFor(() => {
        expect(
          screen.getByText("Name must be at least 2 characters"),
        ).toBeInTheDocument();
        expect(
          screen.getByText("Please enter a valid email address"),
        ).toBeInTheDocument();
        expect(
          screen.getByText("Please select a specialization"),
        ).toBeInTheDocument();
        expect(screen.getByText("Experience is required")).toBeInTheDocument();
        expect(
          screen.getByText("Contact number must be at least 10 digits"),
        ).toBeInTheDocument();
      });

      expect(mockSubmit).not.toHaveBeenCalled();
    });

    it("should validate email format", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Fill invalid email
      const emailInput = screen.getByPlaceholderText("Email Address");
      await user.type(emailInput, "invalid-email");

      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid email address"),
        ).toBeInTheDocument();
      });
    });

    it("should validate contact number length", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Fill short contact number
      const contactInput = screen.getByLabelText("Contact Number");
      await user.type(contactInput, "123");

      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Contact number must be at least 10 digits"),
        ).toBeInTheDocument();
      });
    });

    it("should clear validation errors when fields are corrected", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Submit empty form to trigger validation
      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      // Wait for validation errors
      await waitFor(() => {
        expect(
          screen.getByText("Name must be at least 2 characters"),
        ).toBeInTheDocument();
      });

      // Fix the name field
      const nameInput = screen.getByLabelText("Full Name");
      await user.type(nameInput, "Dr. John Doe");

      // Error should be cleared
      await waitFor(() => {
        expect(
          screen.queryByText("Name must be at least 2 characters"),
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Form Submission Integration", () => {
    const validFormData = {
      name: "Dr. John Doe",
      email: "john.doe@example.com",
      specialization: "cardiology",
      experience: "5",
      contactNumber: "1234567890",
    };

    it("should submit form with valid data", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn().mockResolvedValue(undefined);

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Fill out the form
      await user.type(screen.getByLabelText("Full Name"), validFormData.name);
      await user.type(
        screen.getByLabelText("Email Address"),
        validFormData.email,
      );
      await user.selectOptions(
        screen.getByLabelText("Specialization"),
        validFormData.specialization,
      );
      await user.type(
        screen.getByLabelText("Years of Experience"),
        validFormData.experience,
      );
      await user.type(
        screen.getByLabelText("Contact Number"),
        validFormData.contactNumber,
      );

      // Submit the form
      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSubmit).toHaveBeenCalledWith(validFormData);
      });
    });

    it("should show loading state during submission", async () => {
      const user = userEvent.setup();
      let resolveSubmit: (value: any) => void;
      const mockSubmit = vi.fn().mockImplementation(() => {
        return new Promise((resolve) => {
          resolveSubmit = resolve;
        });
      });

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Fill out the form
      await user.type(screen.getByLabelText("Full Name"), validFormData.name);
      await user.type(
        screen.getByLabelText("Email Address"),
        validFormData.email,
      );
      await user.selectOptions(
        screen.getByLabelText("Specialization"),
        validFormData.specialization,
      );
      await user.type(
        screen.getByLabelText("Years of Experience"),
        validFormData.experience,
      );
      await user.type(
        screen.getByLabelText("Contact Number"),
        validFormData.contactNumber,
      );

      // Submit the form
      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      // Check loading state
      await waitFor(() => {
        expect(screen.getByText("Saving...")).toBeInTheDocument();
        expect(submitButton).toBeDisabled();
      });

      // Resolve the submission
      resolveSubmit!(undefined);

      // Check that loading state is cleared
      await waitFor(() => {
        expect(screen.getByText("Save Doctor")).toBeInTheDocument();
        expect(submitButton).not.toBeDisabled();
      });
    });

    it("should handle submission errors gracefully", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn().mockRejectedValue(new Error("Server error"));

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Fill out the form
      await user.type(screen.getByLabelText("Full Name"), validFormData.name);
      await user.type(
        screen.getByLabelText("Email Address"),
        validFormData.email,
      );
      await user.selectOptions(
        screen.getByLabelText("Specialization"),
        validFormData.specialization,
      );
      await user.type(
        screen.getByLabelText("Years of Experience"),
        validFormData.experience,
      );
      await user.type(
        screen.getByLabelText("Contact Number"),
        validFormData.contactNumber,
      );

      // Submit the form
      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      // Form should still be functional after error
      await waitFor(() => {
        expect(screen.getByText("Save Doctor")).toBeInTheDocument();
        expect(submitButton).not.toBeDisabled();
      });
    });

    it("should populate form with initial data when editing", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();
      const initialData = {
        name: "Dr. Jane Smith",
        email: "jane.smith@example.com",
        specialization: "neurology",
        experience: "10",
        contactNumber: "9876543210",
      };

      render(
        <ModalFormTest
          onSubmit={mockSubmit}
          initialOpen={true}
          formData={initialData}
        />,
      );

      // Check that form is populated with initial data
      expect(screen.getByDisplayValue(initialData.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(initialData.email)).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(initialData.experience),
      ).toBeInTheDocument();
      expect(
        screen.getByDisplayValue(initialData.contactNumber),
      ).toBeInTheDocument();

      // Check select field
      const specializationSelect = screen.getByLabelText("Specialization");
      expect(specializationSelect).toHaveValue(initialData.specialization);
    });
  });

  describe("Accessibility Integration", () => {
    it("should trap focus within modal", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // First focusable element should be focused
      const firstInput = screen.getByLabelText("Full Name");
      expect(firstInput).toHaveFocus();

      // Tab through all elements and ensure focus stays within modal
      await user.tab(); // Email
      expect(screen.getByLabelText("Email Address")).toHaveFocus();

      await user.tab(); // Specialization
      expect(screen.getByLabelText("Specialization")).toHaveFocus();

      await user.tab(); // Experience
      expect(screen.getByLabelText("Years of Experience")).toHaveFocus();

      await user.tab(); // Contact Number
      expect(screen.getByLabelText("Contact Number")).toHaveFocus();

      await user.tab(); // Cancel button
      expect(screen.getByTestId("cancel-button")).toHaveFocus();

      await user.tab(); // Submit button
      expect(screen.getByTestId("submit-button")).toHaveFocus();

      await user.tab(); // Close button
      expect(screen.getByLabelText("close")).toHaveFocus();
    });

    it("should have proper ARIA attributes", () => {
      const mockSubmit = vi.fn();
      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Check modal ARIA attributes
      const dialog = screen.getByRole("dialog");
      expect(dialog).toHaveAttribute("aria-labelledby");

      // Check form field labels
      expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
      expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
      expect(screen.getByLabelText("Specialization")).toBeInTheDocument();
      expect(screen.getByLabelText("Years of Experience")).toBeInTheDocument();
      expect(screen.getByLabelText("Contact Number")).toBeInTheDocument();
    });

    it("should announce validation errors to screen readers", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Submit empty form
      const submitButton = screen.getByTestId("submit-button");
      await user.click(submitButton);

      // Check that error messages are associated with inputs
      await waitFor(() => {
        const nameInput = screen.getByLabelText("Full Name");
        expect(nameInput).toHaveAttribute("aria-invalid", "true");

        const emailInput = screen.getByLabelText("Email Address");
        expect(emailInput).toHaveAttribute("aria-invalid", "true");
      });
    });
  });

  describe("Form Reset Integration", () => {
    it("should reset form when modal is reopened", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} />);

      // Open modal
      await user.click(screen.getByTestId("open-modal-button"));

      // Fill some data
      await user.type(screen.getByLabelText("Full Name"), "Test Name");
      expect(screen.getByLabelText("Full Name")).toHaveValue("Test Name");

      // Close modal
      await user.click(screen.getByTestId("cancel-button"));

      // Reopen modal
      await user.click(screen.getByTestId("open-modal-button"));

      // Form should be reset
      await waitFor(() => {
        expect(screen.getByLabelText("Full Name")).toHaveValue("");
      });
    });

    it("should handle form reset via form reset event", async () => {
      const user = userEvent.setup();
      const mockSubmit = vi.fn();

      render(<ModalFormTest onSubmit={mockSubmit} initialOpen={true} />);

      // Fill some data
      await user.type(screen.getByLabelText("Full Name"), "Test Name");
      await user.type(
        screen.getByLabelText("Email Address"),
        "test@example.com",
      );

      expect(screen.getByLabelText("Full Name")).toHaveValue("Test Name");
      expect(screen.getByLabelText("Email Address")).toHaveValue(
        "test@example.com",
      );

      // Reset form programmatically
      const form = screen.getByLabelText("Full Name").closest("form");
      fireEvent.reset(form!);

      await waitFor(() => {
        expect(screen.getByLabelText("Full Name")).toHaveValue("");
        expect(screen.getByLabelText("Email Address")).toHaveValue("");
      });
    });
  });
});

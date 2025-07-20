import { z } from "zod";

export const doctorProfileValidationSchema = z.object({
    doctor: z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        contactNumber: z
            .string()
            .regex(/^\d{10,15}$/, "Please provide a valid phone number (10-15 digits)"),
        address: z.string().min(5, "Address must be at least 5 characters"),
        registrationNumber: z
            .string()
            .min(3, "Registration number must be at least 3 characters"),
        gender: z.enum(["MALE", "FEMALE", "OTHER"], {
            message: "Please select a valid gender",
        }),
        experience: z
            .number()
            .min(0, "Experience cannot be negative")
            .max(50, "Experience cannot exceed 50 years"),
        appointmentFee: z
            .number()
            .min(0, "Appointment fee cannot be negative")
            .max(10000, "Appointment fee cannot exceed $10,000"),
        qualification: z
            .string()
            .min(2, "Qualification must be at least 2 characters"),
        currentWorkingPlace: z
            .string()
            .min(2, "Current working place must be at least 2 characters"),
        designation: z
            .string()
            .min(2, "Designation must be at least 2 characters"),
        profilePhoto: z.string().optional(),
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const doctorUpdateValidationSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    email: z.string().email("Please enter a valid email address").optional(),
    contactNumber: z
        .string()
        .regex(/^\d{10,15}$/, "Please provide a valid phone number (10-15 digits)")
        .optional(),
    address: z.string().min(5, "Address must be at least 5 characters").optional(),
    registrationNumber: z
        .string()
        .min(3, "Registration number must be at least 3 characters")
        .optional(),
    gender: z
        .enum(["MALE", "FEMALE", "OTHER"], {
            message: "Please select a valid gender",
        })
        .optional(),
    experience: z
        .number()
        .min(0, "Experience cannot be negative")
        .max(50, "Experience cannot exceed 50 years")
        .optional(),
    appointmentFee: z
        .number()
        .min(0, "Appointment fee cannot be negative")
        .max(10000, "Appointment fee cannot exceed $10,000")
        .optional(),
    qualification: z
        .string()
        .min(2, "Qualification must be at least 2 characters")
        .optional(),
    currentWorkingPlace: z
        .string()
        .min(2, "Current working place must be at least 2 characters")
        .optional(),
    designation: z
        .string()
        .min(2, "Designation must be at least 2 characters")
        .optional(),
    profilePhoto: z.string().optional(),
});

export type DoctorProfileFormValues = z.infer<typeof doctorProfileValidationSchema>;
export type DoctorUpdateFormValues = z.infer<typeof doctorUpdateValidationSchema>;
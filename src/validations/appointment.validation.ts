import { z } from "zod";

export const appointmentBookingValidationSchema = z.object({
    symptoms: z
        .string()
        .min(10, "Please describe your symptoms in at least 10 characters")
        .max(1000, "Symptoms description cannot exceed 1000 characters"),
    duration: z.enum([
        "less-than-week",
        "one-two-weeks",
        "two-four-weeks",
        "one-three-months",
        "three-six-months",
        "more-than-six-months"
    ], {
        errorMap: () => ({ message: "Please select how long you've had these symptoms" }),
    }),
    previousTreatments: z
        .string()
        .max(500, "Previous treatments description cannot exceed 500 characters")
        .optional(),
    additionalNotes: z
        .string()
        .max(500, "Additional notes cannot exceed 500 characters")
        .optional(),
    doctorId: z.string().min(1, "Please select a doctor"),
    scheduleId: z.string().min(1, "Please select an appointment time"),
    appointmentDate: z.string().min(1, "Please select an appointment date"),
    appointmentTime: z.string().min(1, "Please select an appointment time"),
});

export const appointmentUpdateValidationSchema = z.object({
    symptoms: z
        .string()
        .min(10, "Please describe your symptoms in at least 10 characters")
        .max(1000, "Symptoms description cannot exceed 1000 characters")
        .optional(),
    duration: z.enum([
        "less-than-week",
        "one-two-weeks",
        "two-four-weeks",
        "one-three-months",
        "three-six-months",
        "more-than-six-months"
    ], {
        errorMap: () => ({ message: "Please select how long you've had these symptoms" }),
    }).optional(),
    previousTreatments: z
        .string()
        .max(500, "Previous treatments description cannot exceed 500 characters")
        .optional(),
    additionalNotes: z
        .string()
        .max(500, "Additional notes cannot exceed 500 characters")
        .optional(),
    status: z.enum(["SCHEDULED", "INPROGRESS", "COMPLETED", "CANCELLED"], {
        errorMap: () => ({ message: "Please select a valid appointment status" }),
    }).optional(),
});

export const appointmentRescheduleValidationSchema = z.object({
    scheduleId: z.string().min(1, "Please select a new appointment time"),
    appointmentDate: z.string().min(1, "Please select a new appointment date"),
    appointmentTime: z.string().min(1, "Please select a new appointment time"),
    reason: z
        .string()
        .min(5, "Please provide a reason for rescheduling (at least 5 characters)")
        .max(200, "Reason cannot exceed 200 characters")
        .optional(),
});

export type AppointmentBookingFormValues = z.infer<typeof appointmentBookingValidationSchema>;
export type AppointmentUpdateFormValues = z.infer<typeof appointmentUpdateValidationSchema>;
export type AppointmentRescheduleFormValues = z.infer<typeof appointmentRescheduleValidationSchema>;
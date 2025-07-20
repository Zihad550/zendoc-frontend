import { z } from "zod";

export const passwordChangeValidationSchema = z.object({
    oldPassword: z.string().min(6, "Old password must be at least 6 characters long"),
    newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});

export const passwordResetValidationSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export const passwordResetConfirmValidationSchema = z
    .object({
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one lowercase letter, one uppercase letter, and one number"
            ),
        confirmPassword: z.string().min(6, "Please confirm your password"),
        token: z.string().min(1, "Reset token is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const strongPasswordValidationSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(
        (password) => {
            const hasLower = /[a-z]/.test(password);
            const hasUpper = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);
            const hasSpecial = /[@$!%*?&#]/.test(password);
            return hasLower && hasUpper && hasNumber && hasSpecial;
        },
        {
            message: "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        }
    );

export type PasswordChangeFormValues = z.infer<typeof passwordChangeValidationSchema>;
export type PasswordResetFormValues = z.infer<typeof passwordResetValidationSchema>;
export type PasswordResetConfirmFormValues = z.infer<typeof passwordResetConfirmValidationSchema>;
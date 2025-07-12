import z from "zod/v4";

export const validationSchema = z.object({
  email: z.email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

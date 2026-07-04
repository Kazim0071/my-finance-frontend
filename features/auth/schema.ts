import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please Enter a valid email"),
  password: z.string().min(1, "Password is required."),
});

export const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "last name is required"),
  email: z.string().email("Please Enter a valid email"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;

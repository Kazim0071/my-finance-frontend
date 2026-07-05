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

export const editProfileSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
});

export const changePasswordSchema = z.object({
  old_password: z.string().min(1, "Current password is required"),
  new_password: z.string().min(5, "Password must be at least 5 characters"),
});

export type EditProfileForm = z.infer<typeof editProfileSchema>;
export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;

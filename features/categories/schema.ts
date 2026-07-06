import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.string().optional(),
  color: z.string().default("#10b981"),
});

export type CategoryFormInput = z.input<typeof categorySchema>;
export type CategoryForm = z.output<typeof categorySchema>;

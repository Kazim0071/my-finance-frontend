import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export type CategoryForm = z.infer<typeof categorySchema>;

import { z } from "zod";

export const transactionSchema = z.object({
  transaction_type: z.enum(["income", "expense"], {
    message: "Transaction type must be either income or expense",
  }),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  category_id: z.number().optional(),
  description: z.string().optional(),
  transaction_date: z.string().min(1, "Date is required"),
});

export type TransactionForm = z.infer<typeof transactionSchema>;

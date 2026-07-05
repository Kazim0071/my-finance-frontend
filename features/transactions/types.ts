export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  user_id: number;
  category_id: number | null;
  transaction_type: TransactionType;
  amount: number;
  description: string | null;
  transaction_date: string;
  created_at: string;
}

// POST 
export interface CreateTransactionInput {
  category_id?: number;
  transaction_type: TransactionType;
  amount: number;
  description?: string;
  transaction_date: string;
}

// PUT 
export interface UpdateTransactionInput {
  category_id?: number;
  transaction_type?: TransactionType;
  amount?: number;
  description?: string;
  transaction_date?: string;
}
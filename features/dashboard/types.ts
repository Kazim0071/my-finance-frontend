import { Transaction } from "@/features/transactions/types";

export interface DashboardData {
  total_income: number;
  total_expense: number;
  balance: number;
  recent_transactions: Transaction[];
}
// Monthly summary
export interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

// Category breakdown
export interface CategoryBreakdown {
  category_id: number;
  amount: number;
  percentage: number;
}

// Chart data - monthly
export interface MonthlyChartData {
  labels: string[];
  income: number[];
  expense: number[];
  savings: number[];
}

// Chart data - categories
export interface CategoryChartData {
  labels: number[];
  values: number[];
  percentages: number[];
}
export type PredictionConfidence = "none" | "low" | "medium" | "high";

export interface ExpensePrediction {
  predicted_expense: number;
  confidence: PredictionConfidence;
  based_on_months: number;
  message: string;
}
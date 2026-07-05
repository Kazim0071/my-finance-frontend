import { api } from "@/lib/api-client";

export const mlApi = {
    predict: ()=> api.get("/api/ml/predict")
}
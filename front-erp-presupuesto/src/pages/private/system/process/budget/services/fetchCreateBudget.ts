import { AxiosError } from "axios";
import axios from "@/config/axios";
import { Budget } from "../interfaces/BudgetModel";

export const fetchCreateBudget = async (
  budget: Budget
): Promise<{
  status: number;
}> => {
  try {
    const res = await axios.post<Budget>("/data/budget/create", budget);
    return { status: 200 };
  } catch (error) {
    return { status: 200 };
  }
};

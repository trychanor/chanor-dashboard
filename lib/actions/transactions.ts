"use server";

import { getTransactions, GetTransactionsProps } from "../api/supervisor/transactions"; // adjust path if needed
import { ApiResult } from "@/types";

export async function getTransactionsAction(params: GetTransactionsProps) {
  return getTransactions(params);
}
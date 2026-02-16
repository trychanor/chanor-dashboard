import { ApiResponseWithMetadata, Profit } from "@/types";
import { safeApiCall, api } from "../clients";

export type GetProfitProps = {
  period: number;
};

export const getProfit = async ({ period }: GetProfitProps) =>
  safeApiCall(
    api
      .get("analytics/disputes", { searchParams: { period } })
      .json<ApiResponseWithMetadata<Profit, { period: string }>>(),
  );

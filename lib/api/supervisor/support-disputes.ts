import { ApiResponseWithMetadata, Profit } from "@/types";
import { safeApiCall, api } from "../http-client";

export type GetProfitProps = {
  period: number;
};

export const getProfit = async ({ period }: GetProfitProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/analytics/disputes", { searchParams: { period } })
      .json<ApiResponseWithMetadata<Profit, { period: string }>>(),
  );

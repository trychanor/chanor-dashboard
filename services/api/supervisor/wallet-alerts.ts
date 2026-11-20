import { ApiResponseWithPagination } from "@/types";
import { api, safeApiCall } from "../../../lib/http/http-client";

export type GetWalletAlertsProps = {
  page: number;
  limit: number;
};

export const getWalletAlerts = async ({ page, limit }: GetWalletAlertsProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/wallet-alerts", { searchParams: { page, limit } })
      .json<ApiResponseWithPagination<unknown[]>>(),
  );

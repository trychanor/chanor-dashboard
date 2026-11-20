import { ApiResponseWithPagination, Transactions } from "@/types";
import { safeApiCall, api } from "../../../lib/http/http-client";

export type GetTransactionsProps = {
  page: number;
  limit: number;
  status?: string;
  type?: string;
  search?: string;
  service?: string;
};

export const getTransactions = async ({
  page,
  limit,
  status,
  search,
  type,
  service,
}: GetTransactionsProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/transactions", {
        searchParams: { page, limit, status, type, search, service },
      })
      .json<ApiResponseWithPagination<Transactions[]>>(),
  );

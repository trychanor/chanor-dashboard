import { ApiResponseWithPagination, Transactions } from "@/types";
import { safeApiCall, api } from "../clients";

export type GetTransactionsProps = {
  page: number;
  limit: number;
  status?: string;
  type?: string;
  search?: string;
};

export const getTransactions = async ({
  page,
  limit,
  status,
  search,
  type,
}: GetTransactionsProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/transactions", {
        searchParams: { page, limit, status, type, search },
      })
      .json<ApiResponseWithPagination<Transactions[]>>(),
  );

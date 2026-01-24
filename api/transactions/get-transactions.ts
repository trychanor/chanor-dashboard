import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithPagination, Transactions } from "@/types";

const QUERY_KEY = "Transactions"

type GetTransactionsProps = {
  page: number,
  limit: number,
  status?: string,
  type?: string,
  search?: string
}

export const getTransactions = async ({ page, limit, status, search, type }: GetTransactionsProps) => {
  const res = await ky.get("transactions",
    { searchParams: { page, limit, status, type, search } }).json<ApiResponseWithPagination<Transactions[]>>();

  return res
};

export const useSuspenseGetTransactions = (props: GetTransactionsProps) => {
  return useSuspenseQuery(getTransactionsQueryOptions(props));
};

export const getTransactionsQueryOptions = (props: GetTransactionsProps) => {
  return queryOptions({
    queryFn: () => getTransactions(props),
    queryKey: [QUERY_KEY, props],
  });
};

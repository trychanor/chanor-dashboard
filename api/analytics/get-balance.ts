import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponse, Balance } from "@/types";

const QUERY_KEY = "Balance"

type GetBalanceProps = {
  period: number,
}

export const getBalance = async ({ period }: GetBalanceProps) => {
  const res = await ky.get("analytics/balance",
    { searchParams: { period } }).json<ApiResponse<Balance>>();

  return res
};

export const useSuspenseGetBalance = (props: GetBalanceProps) => {
  return useSuspenseQuery(getBalanceQueryOptions(props));
};

export const getBalanceQueryOptions = (props: GetBalanceProps) => {
  return queryOptions({
    queryFn: () => getBalance(props),
    queryKey: [QUERY_KEY, props],
  });
};

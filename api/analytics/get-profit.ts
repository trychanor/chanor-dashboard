import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithMetadata, Profit } from "@/types";

const QUERY_KEY = "Profit"

type GetProfitProps = {
  period: number,
}

export const getProfit = async ({ period }: GetProfitProps) => {
  const res = await ky.get("analytics/profit",
    { searchParams: { period } }).json<ApiResponseWithMetadata<Profit, { period: string }>>();

  return res
};

export const useSuspenseGetProfit = (props: GetProfitProps) => {
  return useSuspenseQuery(getProfitQueryOptions(props));
};

export const getProfitQueryOptions = (props: GetProfitProps) => {
  return queryOptions({
    queryFn: () => getProfit(props),
    queryKey: [QUERY_KEY, props],
  });
};

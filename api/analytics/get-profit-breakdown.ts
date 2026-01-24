import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithMetadata, ProfitBreakdown } from "@/types";

const QUERY_KEY = "Profit Breakdown"

type GetProfitBreakdownProps = {
  period: number,
}

export const getProfitBreakdown = async ({ period }: GetProfitBreakdownProps) => {
  const res = await ky.get("analytics/profit-breakdown",
    { searchParams: { period } }).json<ApiResponseWithMetadata<ProfitBreakdown, { period: string }>>();

  return res
};

export const useSuspenseGetProfitBreakdown = (props: GetProfitBreakdownProps) => {
  return useSuspenseQuery(getProfitBreakdownQueryOptions(props));
};

export const getProfitBreakdownQueryOptions = (props: GetProfitBreakdownProps) => {
  return queryOptions({
    queryFn: () => getProfitBreakdown(props),
    queryKey: [QUERY_KEY, props],
  });
};

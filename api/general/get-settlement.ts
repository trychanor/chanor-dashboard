import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponse, Settlement } from "@/types";

const QUERY_KEY = "Settlement"

export const getSettlements = async () => {
  const res = await ky.get("settlement").json<ApiResponse<Settlement>>();

  return res
};

export const useSuspenseGetSettlements = () => {
  return useSuspenseQuery(getSettlementsQueryOptions());
};

export const getSettlementsQueryOptions = () => {
  return queryOptions({
    queryFn: getSettlements,
    queryKey: [QUERY_KEY],
  });
};

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithMetadata, ActivitySource } from "@/types";

const QUERY_KEY = "Activity Source"

type GetActivitySourceProps = {
  period: number,
}

export const getActivitySource = async ({ period }: GetActivitySourceProps) => {
  const res = await ky.get("analytics/activity-source",
    { searchParams: { period } }).json<ApiResponseWithMetadata<ActivitySource, { period: string }>>();

  return res
};

export const useSuspenseGetActivitySource = (props: GetActivitySourceProps) => {
  return useSuspenseQuery(getActivitySourceQueryOptions(props));
};

export const getActivitySourceQueryOptions = (props: GetActivitySourceProps) => {
  return queryOptions({
    queryFn: () => getActivitySource(props),
    queryKey: [QUERY_KEY, props],
  });
};

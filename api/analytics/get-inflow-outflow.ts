import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithMetadata, InflowOutflow } from "@/types";

const QUERY_KEY = "Inflow Outflow"

type GetInflowOutflowProps = {
  period: number,
}

export const getInflowOutflow = async ({ period }: GetInflowOutflowProps) => {
  const res = await ky.get("analytics/inflow-outflow",
    { searchParams: { period } }).json<ApiResponseWithMetadata<InflowOutflow, { period: string }>>();

  return res
};

export const useSuspenseGetInflowOutflow = (props: GetInflowOutflowProps) => {
  return useSuspenseQuery(getInflowOutflowQueryOptions(props));
};

export const getInflowOutflowQueryOptions = (props: GetInflowOutflowProps) => {
  return queryOptions({
    queryFn: () => getInflowOutflow(props),
    queryKey: [QUERY_KEY, props],
  });
};

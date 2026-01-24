import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithMetadata, TransactionVolume } from "@/types";

const QUERY_KEY = "TransactionVolume"

type GetTransactionVolumeProps = {
  period: number,
}

export const getTransactionVolume = async ({ period }: GetTransactionVolumeProps) => {
  const res = await ky.get("analytics/transaction-volume",
    { searchParams: { period } }).json<ApiResponseWithMetadata<TransactionVolume, { period: string }>>();

  return res
};

export const useSuspenseGetTransactionVolume = (props: GetTransactionVolumeProps) => {
  return useSuspenseQuery(getTransactionVolumeQueryOptions(props));
};

export const getTransactionVolumeQueryOptions = (props: GetTransactionVolumeProps) => {
  return queryOptions({
    queryFn: () => getTransactionVolume(props),
    queryKey: [QUERY_KEY, props],
  });
};

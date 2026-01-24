import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithMetadata, Voice } from "@/types";

const QUERY_KEY = "Voice"

type GetVoiceProps = {
  period: number,
}

export const getVoice = async ({ period }: GetVoiceProps) => {
  const res = await ky.get("analytics/voice",
    { searchParams: { period } }).json<ApiResponseWithMetadata<Voice, { period: string }>>();

  return res
};

export const useSuspenseGetVoice = (props: GetVoiceProps) => {
  return useSuspenseQuery(getVoiceQueryOptions(props));
};

export const getVoiceQueryOptions = (props: GetVoiceProps) => {
  return queryOptions({
    queryFn: () => getVoice(props),
    queryKey: [QUERY_KEY, props],
  });
};

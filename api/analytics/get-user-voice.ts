import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithPaginationAndMetadata, UserVoice } from "@/types";

const QUERY_KEY = "UserVoice"

type GetUserVoiceProps = {
  period: number,
}

export const getUserVoice = async ({ period }: GetUserVoiceProps) => {
  const res = await ky.get("analytics/voice/users",
    { searchParams: { period } }).json<ApiResponseWithPaginationAndMetadata<UserVoice[], { period: string }>>();

  return res
};

export const useSuspenseGetUserVoice = (props: GetUserVoiceProps) => {
  return useSuspenseQuery(getUserVoiceQueryOptions(props));
};

export const getUserVoiceQueryOptions = (props: GetUserVoiceProps) => {
  return queryOptions({
    queryFn: () => getUserVoice(props),
    queryKey: [QUERY_KEY, props],
  });
};

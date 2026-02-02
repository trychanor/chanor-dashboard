import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithPaginationAndMetadata, UserVoice, ApiResponseWithMetadata, Voice } from "@/types";

type GetUserVoiceProps = {
  period: number,
}

type GetVoiceProps = {
  period: number,
}


// User voice analytics
export const getUserVoice = async ({ period }: GetUserVoiceProps) => {
  const res = await ky.get("analytics/voice/users",
    { searchParams: { period } }).json<ApiResponseWithPaginationAndMetadata<UserVoice[], { period: string }>>();

  return res
};

export const useSuspenseGetUserVoice = (props: GetUserVoiceProps) => {
  return useSuspenseQuery(getUserVoiceQueryOptions(props));
};

export const getUserVoiceQueryOptions = (props: GetUserVoiceProps) => {
  const QUERY_KEY = "UserVoice"
  return queryOptions({
    queryFn: () => getUserVoice(props),
    queryKey: [QUERY_KEY, props],
  });
};


// Voice analytics
export const getVoice = async ({ period }: GetVoiceProps) => {
  const res = await ky.get("analytics/voice",
    { searchParams: { period } }).json<ApiResponseWithMetadata<Voice, { period: string }>>();

  return res
};

export const useSuspenseGetVoice = (props: GetVoiceProps) => {
  return useSuspenseQuery(getVoiceQueryOptions(props));
};

export const getVoiceQueryOptions = (props: GetVoiceProps) => {
  const QUERY_KEY = "Voice"
  return queryOptions({
    queryFn: () => getVoice(props),
    queryKey: [QUERY_KEY, props],
  });
};

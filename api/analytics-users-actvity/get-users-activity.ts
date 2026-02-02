import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithMetadata, ActivitySource, User } from "@/types";

type GetActivitySourceProps = {
  period: number,
}

type GetUsersProps = {
  period: number,
}

// Users activity source
export const getActivitySource = async ({ period }: GetActivitySourceProps) => {
  const res = await ky.get("analytics/activity-source",
    { searchParams: { period } }).json<ApiResponseWithMetadata<ActivitySource, { period: string }>>();

  return res
};

export const useSuspenseGetActivitySource = (props: GetActivitySourceProps) => {
  return useSuspenseQuery(getActivitySourceQueryOptions(props));
};

export const getActivitySourceQueryOptions = (props: GetActivitySourceProps) => {
  const QUERY_KEY = "Activity Source"
  return queryOptions({
    queryFn: () => getActivitySource(props),
    queryKey: [QUERY_KEY, props],
  });
};


// Get users
export const getUsers = async ({ period }: GetUsersProps) => {
  const res = await ky.get("analytics/users",
    { searchParams: { period } }).json<ApiResponseWithMetadata<User, { period: string }>>();

  return res
};

export const useSuspenseGetUsers = (props: GetUsersProps) => {
  return useSuspenseQuery(getUsersQueryOptions(props));
};

export const getUsersQueryOptions = (props: GetUsersProps) => {
const QUERY_KEY = "Users"
  return queryOptions({
    queryFn: () => getUsers(props),
    queryKey: [QUERY_KEY, props],
  });
};

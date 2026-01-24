import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithMetadata, User } from "@/types";

const QUERY_KEY = "Users"

type GetUsersProps = {
  period: number,
}

export const getUsers = async ({ period }: GetUsersProps) => {
  const res = await ky.get("analytics/users",
    { searchParams: { period } }).json<ApiResponseWithMetadata<User, { period: string }>>();

  return res
};

export const useSuspenseGetUsers = (props: GetUsersProps) => {
  return useSuspenseQuery(getUsersQueryOptions(props));
};

export const getUsersQueryOptions = (props: GetUsersProps) => {
  return queryOptions({
    queryFn: () => getUsers(props),
    queryKey: [QUERY_KEY, props],
  });
};

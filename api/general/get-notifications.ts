import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithPagination, Notification } from "@/types";

const QUERY_KEY = "Notifications"

type GetNotificationsProps = {
  page: number,
  limit: number,
  read: boolean
}

export const getNotifications = async ({ page, limit, read }: GetNotificationsProps) => {
  const res = await ky.get("notifications",
    { searchParams: { page, limit, read } }).json<ApiResponseWithPagination<Notification[]>>();

  return res
};

export const useSuspenseGetNotifications = (props: GetNotificationsProps) => {
  return useSuspenseQuery(getNotificationsQueryOptions(props));
};

export const getNotificationsQueryOptions = (props: GetNotificationsProps) => {
  return queryOptions({
    queryFn: () => getNotifications(props),
    queryKey: [QUERY_KEY, props],
  });
};

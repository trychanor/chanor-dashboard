import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithPagination, Notification, ApiResponse, Settlement } from "@/types";


type GetNotificationsProps = {
  page: number,
  limit: number,
  read: boolean
}

// Notifications
export const getNotifications = async ({ page, limit, read }: GetNotificationsProps) => {
  const res = await ky.get("notifications",
    { searchParams: { page, limit, read } }).json<ApiResponseWithPagination<Notification[]>>();

  return res
};

export const useSuspenseGetNotifications = (props: GetNotificationsProps) => {
  return useSuspenseQuery(getNotificationsQueryOptions(props));
};

export const getNotificationsQueryOptions = (props: GetNotificationsProps) => {
  const QUERY_KEY = "Notifications"
  return queryOptions({
    queryFn: () => getNotifications(props),
    queryKey: [QUERY_KEY, props],
  });
};


// Settlements
export const getSettlements = async () => {
  const res = await ky.get("settlement").json<ApiResponse<Settlement>>();

  return res
};

export const useSuspenseGetSettlements = () => {
  return useSuspenseQuery(getSettlementsQueryOptions());
};

export const getSettlementsQueryOptions = () => {
  const QUERY_KEY = "Settlement"
  return queryOptions({
    queryFn: getSettlements,
    queryKey: [QUERY_KEY],
  });
};

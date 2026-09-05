import {
  ApiResponseWithPagination,
  Notification,
  ApiResponse,
  Settlement,
} from "@/types";
import { safeApiCall, api } from "../http-client";

export type GetNotificationsProps = {
  page: number;
  limit: number;
  read: boolean;
};

export const getNotifications = async ({
  page,
  limit,
  read,
}: GetNotificationsProps) =>
  safeApiCall(() =>
    api
      .get("supervisors/notifications", { searchParams: { page, limit, read } })
      .json<ApiResponseWithPagination<Notification[]>>(),
  );

export const getSettlements = async () =>
  safeApiCall(() =>
    api.get("supervisors/settlement").json<ApiResponse<Settlement>>(),
  );

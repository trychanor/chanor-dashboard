"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getJson } from "../api/browser-client";
import {
  GetCustomerProps,
  GetCustomersProps,
} from "../api/supervisor/customers";
import {
  ApiResponse,
  ApiResponseWithPagination,
  ApiResult,
} from "@/types";
import {
  mapCustomerDetailResponse,
  mapCustomerListResponse,
} from "@/lib/models/customer.model";

function getApiDataOrThrow<T>(result: ApiResult<T>) {
  if (result.error) {
    throw new Error(result.error);
  }

  return result.data;
}

export const useCustomers = (params: GetCustomersProps, refreshKey = 0) =>
  useQuery({
    queryKey: ["customers", params, refreshKey],
    queryFn: async () =>
      mapCustomerListResponse(
        getApiDataOrThrow(
          await getJson<ApiResponseWithPagination<unknown>>(
            "/api/supervisor/customers",
            params,
          ),
        ),
      ),
    placeholderData: keepPreviousData,
  });

export const useCustomer = (params: GetCustomerProps) =>
  useQuery({
    queryKey: ["customer", params.id, params.limit],
    queryFn: async () =>
      mapCustomerDetailResponse(
        getApiDataOrThrow(
          await getJson<ApiResponse<unknown>>(
            `/api/supervisor/customers/${encodeURIComponent(params.id)}`,
            { limit: params.limit },
          ),
        ),
      ),
    enabled: !!params.id,
  });

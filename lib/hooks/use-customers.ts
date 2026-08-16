"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCustomerAction, getCustomersAction } from "../actions/customer";
import {
  GetCustomerProps,
  GetCustomersProps,
} from "../api/supervisor/customers";
import { ApiResult } from "@/types";

function getApiDataOrThrow<T>(result: ApiResult<T>) {
  if (result.error) {
    throw new Error(result.error);
  }

  return result.data;
}

export const useCustomers = (params: GetCustomersProps) =>
  useQuery({
    queryKey: ["customers", params],
    queryFn: async () => getApiDataOrThrow(await getCustomersAction(params)),
    placeholderData: keepPreviousData,
  });

export const useCustomer = (params: GetCustomerProps) =>
  useQuery({
    queryKey: ["customer", params.id, params.limit],
    queryFn: async () => getApiDataOrThrow(await getCustomerAction(params)),
    enabled: !!params.id,
  });

"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCustomerAction, getCustomersAction } from "../actions/customer";
import {
  GetCustomerProps,
  GetCustomersProps,
} from "../api/supervisor/customers";

export const useCustomers = (params: GetCustomersProps) =>
  useQuery({
    queryKey: ["customers", params],
    queryFn: () => getCustomersAction(params),
    placeholderData: keepPreviousData,
  });

export const useCustomer = (params: GetCustomerProps) =>
  useQuery({
    queryKey: ["customer", params.id, params.limit],
    queryFn: () => getCustomerAction(params),
    enabled: !!params.id,
  });

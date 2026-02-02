import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponse, ApiResponseWithPagination, Customer } from "@/types";

type GetCustomerProps = {
  id: string,
  limit: number,
}

type GetCustomersProps = {
  page: number,
  limit: number,
  search?: string,
}

// Customer
export const getCustomer = async ({ id, limit, }: GetCustomerProps) => {
  const res = await ky.get(`customers/${id}`,
    { searchParams: { limit } }).json<ApiResponse<Customer>>();

  return res
};

export const useSuspenseGetCustomer = (props: GetCustomerProps) => {
  return useSuspenseQuery(getCustomerQueryOptions(props));
};

export const getCustomerQueryOptions = (props: GetCustomerProps) => {
  const QUERY_KEY = "Customers"
  return queryOptions({
    queryFn: () => getCustomer(props),
    queryKey: [QUERY_KEY, props],
  });
};

// Customers
export const getCustomers = async ({ page, limit, search }: GetCustomersProps) => {
  const res = await ky.get("customers",
    { searchParams: { page, limit, search } }).json<ApiResponseWithPagination<Customer[]>>();

  return res
};

export const useSuspenseGetCustomers = (props: GetCustomersProps) => {
  return useSuspenseQuery(getCustomersQueryOptions(props));
};

export const getCustomersQueryOptions = (props: GetCustomersProps) => {
  const QUERY_KEY = "Customers"
  return queryOptions({
    queryFn: () => getCustomers(props),
    queryKey: [QUERY_KEY, props],
  });
};

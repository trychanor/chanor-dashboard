import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponse, Customer } from "@/types";

const QUERY_KEY = "Customers"

type GetCustomerProps = {
  id: string,
  limit: number,
}

export const getCustomer = async ({ id, limit, }: GetCustomerProps) => {
  const res = await ky.get(`customers/${id}`,
    { searchParams: { limit } }).json<ApiResponse<Customer>>();

  return res
};

export const useSuspenseGetCustomer = (props: GetCustomerProps) => {
  return useSuspenseQuery(getCustomerQueryOptions(props));
};

export const getCustomerQueryOptions = (props: GetCustomerProps) => {
  return queryOptions({
    queryFn: () => getCustomer(props),
    queryKey: [QUERY_KEY, props],
  });
};

import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

import { ky } from "@/api";
import { ApiResponseWithPagination, Customer } from "@/types";

const QUERY_KEY = "Customers"

type GetCustomersProps = {
  page: number,
  limit: number,
  search?: string,
}

export const getCustomers = async ({ page, limit, search }: GetCustomersProps) => {
  const res = await ky.get("customers",
    { searchParams: { page, limit, search } }).json<ApiResponseWithPagination<Customer[]>>();

  return res
};

export const useSuspenseGetCustomers = (props: GetCustomersProps) => {
  return useSuspenseQuery(getCustomersQueryOptions(props));
};

export const getCustomersQueryOptions = (props: GetCustomersProps) => {
  return queryOptions({
    queryFn: () => getCustomers(props),
    queryKey: [QUERY_KEY, props],
  });
};

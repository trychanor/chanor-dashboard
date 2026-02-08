import { api, safeApiCall } from "../clients";
import { ApiResponse, ApiResponseWithPagination, Customer } from "@/types";

export type GetCustomerProps = {
  id: string;
  limit: number;
};

export type GetCustomersProps = {
  page: number;
  limit: number;
  search?: string;
};

export const getCustomer = async ({ id, limit }: GetCustomerProps) =>
  safeApiCall(
    api
      .get(`customers/${id}`, { searchParams: { limit } })
      .json<ApiResponse<Customer>>(),
  );

export const getCustomers = ({ page, limit, search }: GetCustomersProps) =>
  safeApiCall(
    api
      .get("customers", { searchParams: { page, limit, search } })
      .json<ApiResponseWithPagination<Customer[]>>(),
  );

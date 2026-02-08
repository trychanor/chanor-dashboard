"use server";

import {
  getCustomer,
  getCustomers,
  GetCustomerProps,
  GetCustomersProps,
} from "../api/supervisor/customers";

export async function getCustomersAction(params: GetCustomersProps) {
  const { data, error } = await getCustomers(params);
  if (error) throw new Error(error);
  return data;
}

export async function getCustomerAction(params: GetCustomerProps) {
  const { data, error } = await getCustomer(params);
  if (error) throw new Error(error);
  return data;
}

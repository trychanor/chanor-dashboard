"use server";

import {
  getCustomer,
  getCustomers,
  GetCustomerProps,
  GetCustomersProps,
} from "../api/supervisor/customers";

export async function getCustomersAction(params: GetCustomersProps) {
  return getCustomers(params);
}

export async function getCustomerAction(params: GetCustomerProps) {
  return getCustomer(params);
}

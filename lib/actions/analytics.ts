"use server";

import {
  getBalance,
  getInflowOutflow,
  getProfit,
  getProfitBreakdown,
  getTransactionVolume,
  GetTransactionsAnalyticsProps,
} from "../api/supervisor/transactions-analytics";

import {
  getUsers,
  getActivitySource,
  GetUsersActivityProps,
} from "../api/supervisor/users-activity";

export async function getBalanceAction(params: GetTransactionsAnalyticsProps) {
  return getBalance(params);
}

export async function getInflowOutflowAction(params: GetTransactionsAnalyticsProps) {
  return getInflowOutflow(params);
}

export async function getProfitAction(params: GetTransactionsAnalyticsProps) {
  return getProfit(params);
}

export async function getProfitBreakdownAction(params: GetTransactionsAnalyticsProps) {
  return getProfitBreakdown(params);
}

export async function getTransactionVolumeAction(params: GetTransactionsAnalyticsProps) {
  return getTransactionVolume(params);
}

export async function getUsersAction(params: GetUsersActivityProps) {
  return getUsers(params);
}

export async function getActivitySourceAction(params: GetUsersActivityProps) {
  return getActivitySource(params);
}
"use client";

import Button from "@/app/components/ui/Button";
import EmptyState from "@/app/components/ui/EmptyState";
import Status from "@/app/components/ui/Status";
import StatusDot from "@/app/components/ui/StatusDot";
import ViewButton from "@/app/components/ui/ViewButton";
import { useTransactionViewStore } from "@/app/store/useTransactionViewStore";
import { useTransactions } from "@/hooks/use-transactions";
import {
  formatCurrency,
  formatDate,
  formatStatus,
} from "@/utils/formatting.util";
import { FaArrowRight } from "react-icons/fa6";

function LatestTransactionsSkeleton() {
  return (
    <div className="space-y-3 rounded-lg bg-white p-3" aria-busy="true">
      <div className="h-8 w-48 animate-pulse rounded bg-neutral-100" />
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="h-12 animate-pulse rounded bg-neutral-100"
        />
      ))}
    </div>
  );
}

export default function LatestTransaction() {
  const { setShowAllTransactions } = useTransactionViewStore();
  const { data, isLoading, isError, refetch } = useTransactions({
    page: 1,
    limit: 5,
  });

  if (isLoading) return <LatestTransactionsSkeleton />;

  if (isError) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-lg bg-white p-6 text-center">
        <p className="text-sm text-neutral-600">
          Recent transactions are temporarily unavailable.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  const transactions = data?.data ?? [];

  return (
    <div className="rounded-lg bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-neutral-black">
            Latest Transactions
          </h4>
          <p className="text-xs text-neutral-500">Recent account activity</p>
        </div>
        <ViewButton
          title="View all"
          icon={<FaArrowRight size={16} />}
          iconPosition="after"
          additionalStyles="px-3 py-2"
          onClick={() => setShowAllTransactions(true)}
        />
      </div>

      {transactions.length === 0 ? (
        <EmptyState
          title="No recent transactions"
          description="Recent account activity will appear here."
          className="min-h-[180px]"
        />
      ) : (
        <ul className="grid divide-y divide-neutral-200">
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="flex flex-wrap items-center justify-between gap-3 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <StatusDot label={formatStatus(transaction.status)} />
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-neutral-black">
                    {transaction.customerName ?? "Not available"}
                    {transaction.service ? ` - ${transaction.service}` : ""}
                  </h4>
                  <p className="text-xs text-neutral-500">
                    {formatDate(transaction.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-sm font-semibold text-neutral-black">
                  {formatCurrency(transaction.amount)}
                </p>
                <Status
                  label={formatStatus(transaction.status)}
                  appearance="solid"
                  showDot={false}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

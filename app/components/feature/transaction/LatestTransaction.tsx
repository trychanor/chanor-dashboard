"use client";

import Button from "@/app/components/ui/Button";
import Status from "@/app/components/ui/Status";
import StatusDot from "@/app/components/ui/StatusDot";
import { MoveRight } from "lucide-react";
import { useTransactionViewStore } from "@/app/store/useTransactionViewStore";
import { useTransactions } from "@/lib/hooks/use-transactions";
import Loading from "@/app/loading";

export default function LatestTransaction() {
  const { setShowAllTransactions } = useTransactionViewStore();

  const { data, isLoading, isError } = useTransactions({
    page: 1,
    limit: 5,
  });

  const transactions = data?.data || [];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-6 flex justify-center items-center min-h-[200px]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-lg p-6 text-center text-sm text-neutral-500">
        Failed to load latest transactions.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h4 className="text-sm font-semibold text-neutral-black">
            Latest Transaction
          </h4>
          <p className="text-xs text-[#7d7d7e]">Recent users transaction</p>
        </div>
        <Button
          variant="text"
          additionalStyles="cursor-pointer text-sm p-2"
          onClick={() => setShowAllTransactions(true)}
        >
          View All <MoveRight size={16} />
        </Button>
      </div>

      {transactions.length === 0 ? (
        <p className="text-sm text-neutral-500 py-6 text-center">
          No recent transactions
        </p>
      ) : (
        <ul className="grid divide-y divide-[#D9D9D9]">
          {transactions.map((txn: any) => {
            const customerName = txn.accountRef?.customerRef
              ? `${txn.accountRef.customerRef.firstName} ${txn.accountRef.customerRef.lastName}`
              : txn.meta?.rawProviderTransaction?.metadata?.customerName ||
                "Unknown";

            const service = txn.service
              ? txn.service.replace(/_/g, " ")
              : "Transaction";

            const amount =
              typeof txn.amount === "number"
                ? txn.amount.toLocaleString()
                : txn.amount?.$numberDecimal
                  ? Number(txn.amount.$numberDecimal).toLocaleString()
                  : "0";

            return (
              <li
                key={txn._id || txn.id}
                className="flex justify-between items-center py-2"
              >
                <div className="flex items-center gap-4">
                  <StatusDot label={txn.status || "pending"} />
                  <div>
                    <h4 className="text-sm text-neutral-black font-semibold">
                      {customerName} – {service}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {txn.createdAt
                        ? new Date(txn.createdAt).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-sm text-neutral-black font-semibold">
                    ₦{amount}
                  </p>
                  <Status
                    label={txn.status || "pending"}
                    appearance="solid"
                    showDot={false}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
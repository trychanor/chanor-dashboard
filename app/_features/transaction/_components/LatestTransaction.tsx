import Button from "@/app/_ui/Button";
import Status from "@/app/_ui/Status";
import { MoveRight } from "lucide-react";
import StatusDot from "../_ui/StatusDot";
import { useTransactionViewStore } from "@/app/_store/useTransactionViewStore";

export default function LatestTransaction() {
  const { setShowAllTransactions } = useTransactionViewStore();
  const latestTransactions = [
    {
      owner: "Sarah John",
      transactionType: "Money Tranfer",
      date: "2025-03-14",
      amount: "₦29,00",
      status: "completed",
    },
    {
      owner: "James Ola",
      transactionType: "Buy Data",
      date: "2025-03-14",
      amount: "₦19,00",
      status: "failed",
    },
    {
      owner: "Mercy Jane",
      transactionType: "Money Tranfer",
      date: "2025-03-14",
      amount: "₦20,00",
      status: "pending",
    },
    {
      owner: "Sarah John",
      transactionType: "Bill Payment",
      date: "2025-02-15",
      amount: "₦15,00",
      status: "completed",
    },
  ];
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-base font-semibold -leading-[0.33px] text-neutral-black">
            Latest Transaction
          </h4>
          <p className="text-[14px] text-[#7d7d7e] -leading-[0.33px]">
            Recent users transaction
          </p>
        </div>
        <Button variant="text" onClick={() => setShowAllTransactions(true)}>
          View All <MoveRight />
        </Button>
      </div>
      <ul className="grid divide-y divide-[#D9D9D9]">
        {latestTransactions.map((transaction, id) => (
          <li key={id} className="flex justify-between items-center py-2">
            <div className="flex items-center gap-6">
              <StatusDot label={transaction.status} />
              <div>
                <h4 className="text-base text-neutral-black -leading-[0.33px] font-semibold">
                  {transaction.owner} - {transaction.transactionType}
                </h4>
                <p className="text-sm -leading-[0.33px] text-neutral-black">
                  {transaction.transactionType}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <p className="text-base text-neutral-black -leading-[0.33px] font-semibold">
                {transaction.amount}
              </p>
              <Status
                label={transaction.status}
                appearance="solid"
                showDot={false}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

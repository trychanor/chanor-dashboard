import Button from "@/app/components/ui/Button";
import Status from "@/app/components/ui/Status";
import { FaArrowRight } from "react-icons/fa6";
import StatusDot from "../../ui/StatusDot";
import { useTransactionViewStore } from "@/app/store/useTransactionViewStore";

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
    <div className="bg-white rounded-lg p-3">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-neutral-black">
            Latest Transaction
          </h4>
          <p className="text-xs text-[#7d7d7e]">
            Recent users transaction
          </p>
        </div>
        <Button
          variant="text"
          additionalStyles="cursor-pointer text-sm p-2"
          onClick={() => setShowAllTransactions(true)}
        >
          View All <FaArrowRight size={16} />
        </Button>
      </div>
      <ul className="grid divide-y divide-[#D9D9D9]">
        {latestTransactions.map((transaction, id) => (
          <li key={id} className="flex justify-between items-center py-1.5">
            <div className="flex items-center gap-4">
              <StatusDot label={transaction.status} />
              <div>
                <h4 className="text-sm text-neutral-black font-semibold">
                  {transaction.owner} - {transaction.transactionType}
                </h4>
                <p className="text-xs text-neutral-black">
                  {transaction.transactionType}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-sm text-neutral-black font-semibold">
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

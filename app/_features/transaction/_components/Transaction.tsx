import { useTransactionViewStore } from "@/app/_store/useTransactionViewStore";
import AllTransactions from "./AllTransactions";
import LatestTransaction from "./LatestTransaction";
import OverviewCards from "./OverviewCards";
import ProfitOverview from "./ProfitOverview";

export default function Transaction() {
  const { showAllTransactions } = useTransactionViewStore();
  return (
    <div>
      {!showAllTransactions && (
        <>
          <OverviewCards />
          <ProfitOverview />
          <LatestTransaction />
        </>
      )}
      {showAllTransactions && <AllTransactions />}
    </div>
  );
}

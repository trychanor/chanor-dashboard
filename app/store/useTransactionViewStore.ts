import { create } from "zustand";

interface TransactionViewStore {
  showAllTransactions: boolean;
  setShowAllTransactions: (value: boolean) => void;
}

export const useTransactionViewStore = create<TransactionViewStore>((set) => ({
  showAllTransactions: false,
  setShowAllTransactions: (value) => set({ showAllTransactions: value }),
}));

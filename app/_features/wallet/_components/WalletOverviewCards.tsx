import Card from "@/app/_ui/Card";
import { ArrowUp, Activity } from "lucide-react";

export default function WalletOverviewCards() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {/* User Wallet Balance */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#1a1a1a]">User Wallet Balance</p>
            <Activity className="w-5 h-5 text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-[32px] font-bold text-[#1a1a1a]">₦37,000.00</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-sm font-medium text-green-primary">+8.5%</span>
            <span className="text-sm text-[#8E8E93]">from last month</span>
          </div>
        }
      />

      {/* Merchant Wallet Total */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#1a1a1a]">Merchant Wallet Total</p>
            <Activity className="w-5 h-5 text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-[32px] font-bold text-[#1a1a1a]">₦37,000.00</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-sm font-medium text-green-primary">+8.5%</span>
            <span className="text-sm text-[#8E8E93]">from last month</span>
          </div>
        }
      />

      {/* Providus Settlement Account */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#1a1a1a]">Providus Settlement Account</p>
            <Activity className="w-5 h-5 text-green-primary" />
          </div>
        }
        main={
          <div className="flex flex-col justify-center h-full">
            <span className="text-xs text-[#8E8E93] mb-1">Total</span>
            <h2 className="text-[32px] font-bold text-[#1a1a1a]">₦37,000.00</h2>
          </div>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-sm font-medium text-green-primary">+8.5%</span>
            <span className="text-sm text-[#8E8E93]">from last month</span>
          </div>
        }
      />
    </div>
  );
}
import Card from "@/app/components/ui/Card";
import { FaArrowUp, FaChartLine } from "react-icons/fa6";

export default function WalletOverviewCards() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* User Wallet Balance */}
      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">
              User Wallet Balance
            </p>
            <FaChartLine className="size-[18px] text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-xl font-semibold text-[#1a1a1a]">₦37,000.00</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <FaArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-xs font-medium text-green-primary">
              +8.5%
            </span>
            <span className="text-xs text-[#8E8E93]">from last month</span>
          </div>
        }
      />

      {/* Merchant Wallet Total */}
      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">
              Merchant Wallet Total
            </p>
            <FaChartLine className="size-[18px] text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-xl font-semibold text-[#1a1a1a]">₦37,000.00</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <FaArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-xs font-medium text-green-primary">
              +8.5%
            </span>
            <span className="text-xs text-[#8E8E93]">from last month</span>
          </div>
        }
      />

      {/* Providus Settlement Account */}
      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">
              Providus Settlement Account
            </p>
            <FaChartLine className="size-[18px] text-green-primary" />
          </div>
        }
        main={
          <div className="flex flex-col justify-center h-full">
            <span className="text-xs text-[#8E8E93] mb-1">Total</span>
            <h2 className="text-xl font-semibold text-[#1a1a1a]">₦37,000.00</h2>
          </div>
        }
        footer={
          <div className="flex items-center gap-1">
            <FaArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-xs font-medium text-green-primary">
              +8.5%
            </span>
            <span className="text-xs text-[#8E8E93]">from last month</span>
          </div>
        }
      />
    </div>
  );
}

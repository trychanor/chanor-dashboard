import Card from "@/app/_ui/Card";
import {
  ArrowRightLeft,
  ArrowUp,
  BadgePercent,
  Banknote,
  TrendingUp,
  User,
  UserPlus,
} from "lucide-react";

export default function OverviewCards() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-x-3.5 gap-y-5">
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a]">Total Users</p>
              <UserPlus className="w-5 h-5 text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-bold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-green-primary" />
              <p className="text-sm text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a]">Active Users</p>
              <User className="w-5 h-5 text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-bold text-[#1a1a1a]">9,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-green-primary" />
              <p className="text-sm text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a]">Total Deposit</p>
              <Banknote className="w-5 h-5 text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-bold text-[#1a1a1a]">₦7,110</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-green-primary" />
              <p className="text-sm text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a]">Total Transfer</p>
              <ArrowRightLeft className="w-5 h-5 text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-bold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-green-primary" />
              <p className="text-sm text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a]">Company Profit</p>
              <TrendingUp className="w-5 h-5 text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-bold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-green-primary" />
              <p className="text-sm text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a]">Total Commission</p>
              <BadgePercent className="w-5 h-5 text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-bold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-green-primary" />
              <p className="text-sm text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />{" "}
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a]">Total Net Profit</p>
              <Banknote className="w-5 h-5 text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-bold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-green-primary" />
              <p className="text-sm text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a]">Total Transaction</p>
              <ArrowRightLeft className="w-5 h-5 text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-bold text-[#1a1a1a]">3,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-green-primary" />
              <p className="text-sm text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}

import Card from "@/app/components/ui/Card";
import {
  FaArrowRightArrowLeft,
  FaArrowTrendUp,
  FaArrowUp,
  FaMoneyBillWave,
  FaPercent,
  FaUser,
  FaUserPlus,
} from "react-icons/fa6";

export default function OverviewCards() {
  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Users</p>
              <FaUserPlus className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <FaArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Active Users</p>
              <FaUser className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">9,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <FaArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Deposit</p>
              <FaMoneyBillWave className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">₦7,110</h2>
            </>
          }
          footer={
            <div className="flex">
              <FaArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Transfer</p>
              <FaArrowRightArrowLeft className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <FaArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Company Profit</p>
              <FaArrowTrendUp className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <FaArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Commission</p>
              <FaPercent className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <FaArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />{" "}
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Net Profit</p>
              <FaMoneyBillWave className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">5,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <FaArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a]">Total Transaction</p>
              <FaArrowRightArrowLeft className="size-[18px] text-[#8E8E93]" />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">3,320</h2>
            </>
          }
          footer={
            <div className="flex">
              <FaArrowUp className="w-4 h-4 text-green-primary" />
              <p className="text-xs text-dark-gray">
                <span className="text-green-primary">+8.5%</span> From last week
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}

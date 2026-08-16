import Card from "@/app/components/ui/Card";
import { ArrowUp, Activity } from "lucide-react";

export default function SecurityOverviewCards() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {/* Failed Login */}
      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">Failed Login</p>
            <Activity className="size-[18px] text-red-primary" />
          </div>
        }
        main={
          <h2 className="text-xl font-semibold text-[#1a1a1a]">58</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-red-primary" />
            <span className="text-xs font-medium text-red-primary">+8.5%</span>
            <span className="text-xs text-[#8E8E93]">Today</span>
          </div>
        }
      />

      {/* Active Session */}
      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">Active session</p>
            <Activity className="size-[18px] text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-xl font-semibold text-[#1a1a1a]">58</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-xs font-medium text-green-primary">+8.5%</span>
            <span className="text-xs text-[#8E8E93]">Today</span>
          </div>
        }
      />

      {/* Locked Account */}
      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">Locked Account</p>
            <Activity className="size-[18px] text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-xl font-semibold text-[#1a1a1a]">0</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-xs font-medium text-green-primary">+8.5%</span>
            <span className="text-xs text-[#8E8E93]">Today</span>
          </div>
        }
      />

      {/* Fraud Alert */}
      <Card
        height="118px"
        paddingClassName="p-3"
        header={
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-medium text-[#1a1a1a]">Fraud Alert</p>
            <Activity className="size-[18px] text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-xl font-semibold text-[#1a1a1a]">10</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-xs font-medium text-green-primary">+8.5%</span>
            <span className="text-xs text-[#8E8E93]">Today</span>
          </div>
        }
      />
    </div>
  );
}

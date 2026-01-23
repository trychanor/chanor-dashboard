import Card from "@/app/_ui/Card";
import { ArrowUp, Activity } from "lucide-react";

export default function SecurityOverviewCards() {
  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {/* Failed Login */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#1a1a1a]">Failed Login</p>
            <Activity className="w-5 h-5 text-red-primary" />
          </div>
        }
        main={
          <h2 className="text-[32px] font-bold text-[#1a1a1a]">58</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-red-primary" />
            <span className="text-sm font-medium text-red-primary">+8.5%</span>
            <span className="text-sm text-[#8E8E93]">Today</span>
          </div>
        }
      />

      {/* Active Session */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#1a1a1a]">Active session</p>
            <Activity className="w-5 h-5 text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-[32px] font-bold text-[#1a1a1a]">58</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-sm font-medium text-green-primary">+8.5%</span>
            <span className="text-sm text-[#8E8E93]">Today</span>
          </div>
        }
      />

      {/* Locked Account */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#1a1a1a]">Locked Account</p>
            <Activity className="w-5 h-5 text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-[32px] font-bold text-[#1a1a1a]">0</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-sm font-medium text-green-primary">+8.5%</span>
            <span className="text-sm text-[#8E8E93]">Today</span>
          </div>
        }
      />

      {/* Fraud Alert */}
      <Card
        header={
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#1a1a1a]">Fraud Alert</p>
            <Activity className="w-5 h-5 text-green-primary" />
          </div>
        }
        main={
          <h2 className="text-[32px] font-bold text-[#1a1a1a]">10</h2>
        }
        footer={
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-green-primary" />
            <span className="text-sm font-medium text-green-primary">+8.5%</span>
            <span className="text-sm text-[#8E8E93]">Today</span>
          </div>
        }
      />
    </div>
  );
}
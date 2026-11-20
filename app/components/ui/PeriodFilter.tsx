"use client";

import { AnalyticsPeriod } from "@/types";
import Dropdown from "./Dropdown";

type PeriodFilterProps = {
  value: AnalyticsPeriod;
  onChange: (period: AnalyticsPeriod) => void;
  className?: string;
};

const periodOptions: Array<{ label: string; value: AnalyticsPeriod }> = [
  { label: "Today", value: "day" },
  { label: "This week", value: "week" },
  { label: "This month", value: "month" },
  { label: "This year", value: "year" },
];

export default function PeriodFilter({
  value,
  onChange,
  className = "",
}: PeriodFilterProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-medium text-neutral-500">Period</span>
      <Dropdown
        value={value}
        options={periodOptions}
        onChange={(nextValue) => onChange(nextValue as AnalyticsPeriod)}
        size="sm"
        width="132px"
      />
    </div>
  );
}

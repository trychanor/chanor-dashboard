"use client";
import ArrowUpIcon from "@/app/_ui/support/arrowUpIcon";
import ZigZagIcon from "@/app/_ui/support/zigzagIcon";
import ZigIcon from "../../../../_ui/support/zigIcon";
import SupportChart from "@/app/_ui/support/supportChart";
import FlowTable from "@/app/_ui/support/flowTable";

interface FlowProps {
  params: { id: string };
}

export default function Flow({ params }: FlowProps) {
//   const { id } = params;
  const items = [
    {
      title: "Total Float",
      value: "₦58,000",
      trend: "+8.5%",
      colorClass: "#22C55E",
      iconColor: "#22C55E",
    },
    {
      title: "Inflow",
      value: "₦558,000",
      trend: "+8.5%",
      colorClass: "#22C55E",
      iconColor: "#22C55E",
    },
    {
      title: "Outflow",
      value: "₦68,000",
      trend: "+8.5%",
      colorClass: "#22C55E",
      iconColor: "#22C55E",
    },
    {
      title: "Pending",
      value: "₦34,000",
      trend: "+8.5%",
      colorClass: "#F53D3D",
      iconColor: "#F53D3D",
    },
  ];

  return (
    <div className="">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[18px]">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white w-full p-4 rounded-[8px] flex flex-col gap-[18px]"
          >
            {/* Title + Icon */}
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-[500] leading-[100%] text-var(--neutral-black)">
                {item.title}
              </h3>

              {index === items.length - 1 ? (
                <ZigIcon fill={item.iconColor} />
              ) : (
                <ZigZagIcon fill={item.iconColor} />
              )}
            </div>

            {/* Value */}
            <div className="text-[24px] font-[600] leading-[100%] text-var(--neutral-black)">
              {item.value}
            </div>

            {/* Trend + Arrow */}
            <div className="flex items-center gap-[5px] text-sm">
              <ArrowUpIcon fill={item.iconColor} />
              <span
                style={{ color: item.colorClass }}
                className="text-[12px] font-[600] leading-[100%]"
              >
                {item.trend}
              </span>

              <span className="text-[12px] font-[500] leading-[100%] text-var(--neutral-black)">
                Today
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-[8px] mt-10  pb-4">
        <h2 className="text-[20px] p-6 font-[500] leading-[100%] text-[#1A1A1A]">
          Daily Inflow and Outflow
        </h2>
        <div className="mt-10">
          <SupportChart />
        </div>
      </div>
      <div>
        <FlowTable />
      </div>
    </div>
  );
}

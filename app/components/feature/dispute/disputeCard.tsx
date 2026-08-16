import Card from "@/app/components/ui/Card";
import ZigZagIcon from "@/app/components/ui/zigzagIcon";
import { ArrowUp } from "lucide-react";

export default function DisputeCard() {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a] font-medium">
                Open Tickets
              </p>
              <ZigZagIcon fill="#F53D3D" size={18} />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">58</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-[#F53D3D]" />
              <p className="">
                <span className="text-xs font-semibold leading-[100%]">
                  +8.5%
                </span>
                <span className="text-xs font-semibold leading-[100%] px-[5px]">
                  Today
                </span>
              </p>
            </div>
          }
        />
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a] font-semibold">
                Resolved Tickets
              </p>
              <ZigZagIcon fill="#22C55E" size={18} />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">58</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-[#22C55E]" />
              <p className="">
                <span className="text-xs font-semibold leading-[100%]">
                  +8.5%
                </span>
                <span className="text-xs font-semibold leading-[100%] px-[5px]">
                  Today
                </span>
              </p>
            </div>
          }
        />
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a] font-medium">
                Pending Tickets
              </p>
              <ZigZagIcon fill="#22C55E" size={18} />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">0</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-[#22C55E]" />
              <p className="">
                <span className="text-xs font-semibold leading-[100%]">
                  +8.5%
                </span>
                <span className="text-xs font-semibold leading-[100%] px-[5px]">
                  Today
                </span>
              </p>
            </div>
          }
        />
        <Card
          height="118px"
          paddingClassName="p-3"
          header={
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-[#1a1a1a] font-medium">
                Escalated Issues
              </p>
              <ZigZagIcon fill="#22C55E" size={18} />
            </div>
          }
          main={
            <>
              <h2 className="text-xl font-semibold text-[#1a1a1a]">10</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-4 h-4 text-[#22C55E]" />
              <p className="">
                <span className="text-xs font-semibold leading-[100%]">
                  +8.5%
                </span>
                <span className="text-xs font-medium leading-[100%] px-[5px]">
                  Today
                </span>
              </p>
            </div>
          }
        />
      </div>
    </>
  );
}

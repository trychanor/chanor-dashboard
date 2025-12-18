import Card from "@/app/_ui/Card";
import ZigZagIcon from "@/app/_features/support/ui/zigzagIcon";
import { ArrowUp } from "lucide-react";

export default function DisputeCard() {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[18px]">
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a] font-[500]">
                Open Ticket
              </p>
              <ZigZagIcon fill="#F53D3D" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-[600] text-[#1a1a1a]">58</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-[#F53D3D]" />
              <p className="">
                <span className="text-[12px] font-[600] leading-[100%]">
                  +8.5%
                </span>
                <span className="text-[12px] font-[500] leading-[100%] px-[5px]">
                  Today
                </span>
              </p>
            </div>
          }
        />
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a] font-[500]">
                Resolved Ticket
              </p>
              <ZigZagIcon fill="#22C55E" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-[600] text-[#1a1a1a]">58</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-[#22C55E]" />
              <p className="">
                <span className="text-[12px] font-[600] leading-[100%]">
                  +8.5%
                </span>
                <span className="text-[12px] font-[500] leading-[100%] px-[5px]">
                  Today
                </span>
              </p>
            </div>
          }
        />
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a] font-[500]">
                Pending Ticket
              </p>
              <ZigZagIcon fill="#22C55E" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-[600] text-[#1a1a1a]">0</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-[#22C55E]" />
              <p className="">
                <span className="text-[12px] font-[600] leading-[100%]">
                  +8.5%
                </span>
                <span className="text-[12px] font-[500] leading-[100%] px-[5px]">
                  Today
                </span>
              </p>
            </div>
          }
        />
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a] font-[500]">
                Escalate Issue
              </p>
              <ZigZagIcon fill="#22C55E" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-[600] text-[#1a1a1a]">10</h2>
            </>
          }
          footer={
            <div className="flex">
              <ArrowUp className="w-5 h-5 text-[#22C55E]" />
              <p className="">
                <span className="text-[12px] font-[600] leading-[100%]">
                  +8.5%
                </span>
                <span className="text-[12px] font-[500] leading-[100%] px-[5px]">
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

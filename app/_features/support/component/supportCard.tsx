import Card from "@/app/_ui/Card";
import ZigZagIcon from "@/app/_features/support/ui/zigzagIcon";
import { ArrowUp } from "lucide-react";

export default function SupportCard() {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[18px]">
        <Card
          header={
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-[#1a1a1a] font-[500]">
                Total Float
              </p>
              <ZigZagIcon fill="#22C55E" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-[600] text-[#1a1a1a]">₦58,000</h2>
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
              <p className="text-[14px] text-[#1a1a1a] font-[500]">Inflow</p>
              <ZigZagIcon fill="#22C55E" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-[600] text-[#1a1a1a]">
                ₦558,000
              </h2>
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
              <p className="text-[14px] text-[#1a1a1a] font-[500]">Outflow</p>
              <ZigZagIcon fill="#22C55E" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-[600] text-[#1a1a1a]">₦68,000</h2>
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
              <p className="text-[14px] text-[#1a1a1a] font-[500]">Pending</p>
              <ZigZagIcon fill="#F53D3D" />
            </div>
          }
          main={
            <>
              <h2 className="text-[24px] font-[600] text-[#1a1a1a]">₦34,000</h2>
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
      </div>
    </>
  );
}

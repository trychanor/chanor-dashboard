"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RecentActivity() {
  const router = useRouter();

  const activities = [
    {
      id: 1,
      time: "11:12AM",
      date: "12:02:2025",
      status: "success",
      message: "Ada resolved Ticket DSP–104 (Refund ₦5,000)",
    },
    {
      id: 2,
      time: "11:12AM",
      date: "12:02:2025",
      status: "error",
      message: "Ngozi escalated Ticket DSP–099 to Finance",
    },
  ];

  

  return (
    <div className="md:px-6 px-4 bg-white rounded-lg">
      <h2 className="text-[20px] font-medium leading-[100%] text-neutral-black py-10">
        Recent Activities
      </h2>

      {/* 2-Column Layout */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        {Array.from({ length: 6 }).map((_, timelineIndex) => (
          <div key={timelineIndex} className="relative flex flex-col gap-2">
            {/* Vertical line BETWEEN dot*/}
            <div className="absolute left-[88px] xl:left-24 top-2.5 h-[110px] bottom-0 w-[3px] bg-[#e3e3e5] z-0"></div>

            {activities.map((item, index) => (
              <div key={index} className="flex items-start gap-3 relative z-10">
                {/* TIME + DATE */}
                <div className="text-right w-[90px]">
                  <p className="text-[12px] font-semibold leading-5 text-[#9D9C9C]">
                    {item.time}
                  </p>
                  <p className="text-[14px] font-medium leading-5 text-neutral-black">
                    {item.date}
                  </p>
                </div>

                {/* DOT*/}
                <div className="relative">
                  <span
                    className={`w-3.5 h-3.5 rounded-full block border-[3px] ${
                      item.status === "success"
                        ? "bg-green-primary border-[#d0f4d3]"
                        : "bg-red-primary border-[#fdd8d8]"
                    }`}
                  ></span>
                </div>

                {/* MESSAGE CARD */}
                <div
                  className="bg-white border rounded-[5px] border-[#e3e3e5] px-4 py-2 w-[330px] ml-2 cursor-pointer hover:bg-gray-50 transition"
                >
                  <p className="text-[13px] font-medium leading-[18px] text-neutral-black">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

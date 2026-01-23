import StatusDot from "@/app/_features/transaction/_ui/StatusDot";
import BackButton from "@/app/_features/user-view/_ui/BackButton";
import Button from "@/app/_ui/Button";
import MediaButton from "@/app/_ui/MediaButton";
import Status from "@/app/_ui/Status";
import Table from "@/app/_ui/Table";
import {
  ArrowRight,
  Banknote,
  ChartSpline,
  MoveDown,
  RotateCw,
  ShieldCheck,
} from "lucide-react";

type TransactionOverviewRow = {
  tfId: string;
  transfer: string;
  amount: string;
  date: string;
  status: React.ReactNode;
};

type VoiceActivityRow = {
  command: string;
  date: string;
  transfer: React.ReactNode;
  status: React.ReactNode;
};

export default function UserViewDetails() {
  // TRANSACTION OVERVIEW
  const columns: Array<{ key: keyof TransactionOverviewRow; label: string }> = [
    { key: "tfId", label: "TF ID" },
    { key: "transfer", label: "Transfer" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];
  const rows = [
    {
      id: 1,
      data: {
        tfId: "TXN-3949",
        transfer: "Transfer",
        amount: "$6,000",
        date: "5 Oct, 2025",
        status: (
          <Status label="successful" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 2,
      data: {
        tfId: "TXN-5642",
        transfer: "Airtime",
        amount: "$1,000",
        date: "9 Oct, 2025",
        status: <Status label="Failed" appearance="subtle" showDot={true} />,
      },
    },
    {
      id: 3,
      data: {
        tfId: "TXN-0759",
        transfer: "Bill",
        amount: "$10,000",
        date: "2 Oct, 2025",
        status: <Status label="Declined" appearance="subtle" showDot={true} />,
      },
    },
  ];

  // VOICE ACTIVITY
  const columns1: Array<{ key: keyof VoiceActivityRow; label: string }> = [
    { key: "command", label: "Command" },
    { key: "date", label: "Date" },
    { key: "transfer", label: "Transfer" },
    { key: "status", label: "Status" },
  ];
  const rows1 = [
    {
      id: 1,
      data: {
        command: "Raba send 50,000 to John",
        date: "5 Oct, 2025",
        transfer: <MediaButton className="cursor-pointer" />,
        status: (
          <Status label="Successful" appearance="subtle" showDot={true} />
        ),
      },
    },
    {
      id: 2,
      data: {
        command: "TXN-5642",
        date: "9 Oct, 2025",
        transfer: <MediaButton mode="pause" className="cursor-pointer" />,
        status: <Status label="Failed" appearance="subtle" showDot={true} />,
      },
    },
    {
      id: 3,
      data: {
        command: "TXN-0759",
        date: "2 Oct, 2025",
        transfer: <MediaButton className="cursor-pointer" />,
        status: (
          <Status label="Successful" appearance="subtle" showDot={true} />
        ),
      },
    },
  ];

  const activities = [
    {
      time: "11:12AM",
      date: "12:02:2025",
      type: "Voice Command",
      description: "Raba sent ₦5,000 to john",
      status: "Successful",
    },
    {
      time: "11:12AM",
      date: "12:02:2025",
      type: "Transaction",
      description: "Airtime Purchase ₦1,000",
      status: "Failed",
    },
    {
      time: "11:12AM",
      date: "12:02:2025",
      type: "Device",
      description: "Android(Infinix X6525)",
      status: "Successful",
    },
    {
      time: "11:12AM",
      date: "12:02:2025",
      type: "Transaction",
      description: "Transfer ₦5,000 to john",
      status: "Declined",
    },
  ];
  return (
    <div>
      <section className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-5">
          <BackButton />
          <h2 className="text-xl font-semibold text-neutral-black leading-4">
            ID: U-20313
          </h2>
        </div>
        <Button variant="text">
          <RotateCw />
          Refresh
        </Button>
      </section>
      <section className="flex flex-col gap-8">
        <div className="grid grid-cols-[35%_65%] gap-4 items-stretch ">
          <div className="bg-white py-6 px-4 rounded-lg">
            <div className="max-w-[1000px] mx-auto mb-4">
              {" "}
              <h3 className="text-base text-neutral-black font-medium">
                Personal Profile
              </h3>
              <p className="text-sm text-[#AEAEB2] leading-[18px]">
                Last login : 13 Oct 2025, 12:45 PM{" "}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center mb-[91px]">
              <div className="flex justify-center items-center mb-2 w-14 h-14 bg-[#F5F8FF] text-[20px] -tracking-[0.5px] leading-6 font-semibold text-[#2960EC] rounded-full">
                AM
              </div>
              <p className="text-[13px] text-left text-neutral-black leading-[18px] font-medium">
                Jamesjohn@gmail.com
              </p>
              <h3 className="text-base text-left text-neutral-black leading-[18px] font-medium">
                James John{" "}
              </h3>
            </div>
            <ul className="flex flex-col gap-8">
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Gender
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  Not specified
                </p>
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Phone Number
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  +2349283652735
                </p>
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Address
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  Lagos, Nigeria
                </p>
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Date Of Birth
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  12, July 1999
                </p>
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Account Status
                </h3>
                <Status label="Active" appearance="subtle" showDot={true} />
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Risk Score
                </h3>
                <Status label="Low" appearance="subtle" showDot={false} />
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Registered
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  2 March 2025
                </p>
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  KYC Level
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  Tier 2 Verified
                </p>
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  BVN
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  98293948403
                </p>
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  NIN
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  48509692789
                </p>
              </li>
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Device
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  Iphone(17)
                </p>
              </li>
            </ul>
          </div>
          <div className="bg-white py-6 px-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="max-w-[307px] h-48 border border-[#EDECEC] box-shadow-[0px_4px_4px_0_#EDECEC/25]  w-full bg-white p-4 rounded-lg flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <Banknote className="w-4 h-4 text-neutral-400" />
                  <h3 className="text-base font-semibold text-neutral-black -leading-[0.33px]">
                    Available Balance
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="flex items-center gap-[5px] text-2xl font-semibold leading-5 -tracking-[0.25px] text-neeutral-black">
                    <ChartSpline className="w-4 h-4 text-green-primary" />
                    ₦12,500
                  </h3>
                  <p className="flex text-[15px] font-bold -leading-[0.33px] text-red-primary">
                    <MoveDown className="w-4 h-4" />
                    -3%
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[15px] text-neutral-400 -leading-[0.33px] font-medium mb-4">
                  <span>Last Deposit</span>
                  <span>$5,000</span>
                  <span>13 Oct, 2025</span>
                </div>
              </div>
              <div className="max-w-[307px]  h-48 border border-[#EDECEC] w-full bg-white p-4 rounded-lg flex flex-col box-shadow-[0px_4px_4px_0_#EDECEC/25]">
                <div className="flex items-center gap-4 mb-3">
                  <ShieldCheck className="w-4 h-4 text-neutral-400" />
                  <h3 className="text-base font-semibold text-neutral-black -leading-[0.33px]">
                    Security Overview
                  </h3>
                </div>
                <ul className="flex flex-col gap-3">
                  <li className="flex justify-between items-center">
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      Failed Login
                    </p>
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      3
                    </p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      Locked Account
                    </p>
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      No
                    </p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      Active Setion
                    </p>
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      Mobile
                    </p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      Fraud Alert
                    </p>
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      None
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mt-8 mb-4">
                <h3 className="text-base font-semibold text-neutral-black -leading-[0.33px]">
                  Transaction Overview
                </h3>
                <Button variant="text">
                  View <ArrowRight />
                </Button>
              </div>
              <Table
                columns={columns}
                rows={rows}
                showRowActions={false}
                tableClassName="min-w-full border border-neutral-200 rounded-lg"
                cellClassName="px-[24px] py-[12px] text-sm -tracking-[0.33px] text-neutral-600 text-left"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mt-8 mb-4">
                <h3 className="text-base font-semibold text-neutral-black -leading-[0.33px]">
                  Voice Activity
                </h3>
                <Button variant="text">
                  View <ArrowRight />
                </Button>
              </div>
              <Table
                columns={columns1}
                rows={rows1}
                showRowActions={false}
                tableClassName="min-w-full border border-neutral-200 rounded-lg"
                cellClassName="px-[24px] py-[12px] text-sm -tracking-[0.33px] text-neutral-600 text-left"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 divide-x gap-4 divide-[#d9d9d9] p-4 bg-white rounded-lg">
          <div className="pr-6">
            <h3 className="text-[20px] font-medium -tracking-[0.33px] text-black mb-6">
              Recent Activity
            </h3>

            <div className="relative">
              <div className="flex flex-col gap-4">
                {activities.map((activity, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    <div className="shrink-0 w-[50px] ">
                      <div className="text-xs text-[#9D9C9C] font-medium leading-5 text-right -tracking-[0.25px]">
                        {activity.time}
                      </div>
                      <div className="text-sm leading-5 -tracking-[0.25px] text-neutral-black font-medium">
                        {activity.date}
                      </div>
                    </div>

                    <div className="flex items-center justify-center pl-2">
                      <StatusDot label={`${activity.status}`} />
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 border border-[#C7C7CC]/50 rounded-[5px] p-[11px] flex items-center justify-between">
                      <div>
                        <h4 className="text-[13px] font-medium text-neutral-black -tracking-[0.25px]">
                          {activity.type}
                        </h4>
                        <p className="text-[13px] font-medium text-[#AEAEB2] -tracking-[0.25px]">
                          {activity.description}
                        </p>
                      </div>
                      <Status
                        label={`${activity.status}`}
                        appearance="subtle"
                        showDot={true}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-[20px] font-medium -tracking-[0.33px] text-neutral-black">
              Ticket History
            </h3>
            <div className="flex justify-center items-center">
              <p className="flex justify-center items-center text-[15px] text-[#AEAEB2] -tracking-[0.33px] font-medium">
                No ticket issues yet
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

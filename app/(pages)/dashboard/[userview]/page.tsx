"use client";

import StatusDot from "@/app/components/ui/StatusDot";
import BackButton from "@/app/components/ui/BackButton";
import Button from "@/app/components/ui/Button";
import MediaButton from "@/app/components/ui/MediaButton";
import Status from "@/app/components/ui/Status";
import Table from "@/app/components/ui/Table";
import Loading from "../loading";
import {
  ArrowRight,
  Banknote,
  ChartSpline,
  MoveDown,
  RotateCw,
  ShieldCheck,
} from "lucide-react";
import { useCustomer } from "@/lib/hooks/use-customers";
import { useParams } from "next/navigation";

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
  const params = useParams();
  const id = params?.userview as string;

  const {
    data: customerData,
    isLoading,
    isError,
    refetch,
  } = useCustomer({ id, limit: 1 });

  const customer = customerData?.data;

  // TRANSACTION OVERVIEW
  const columns: Array<{ key: keyof TransactionOverviewRow; label: string }> = [
    { key: "tfId", label: "TF ID" },
    { key: "transfer", label: "Transfer" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];

  const rows =
    customer?.transactionHistory?.map((txn) => ({
      id: txn._id,
      data: {
        tfId: txn.reference,
        transfer: txn.service.replace(/_/g, " "),
        amount: `₦${parseFloat(txn.amount.$numberDecimal).toLocaleString()}`,
        date: new Date(txn.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: (
          <Status
            label={txn.status}
            appearance="subtle"
            showDot={true}
          />
        ),
      },
    })) || [];

  // VOICE ACTIVITY
  const columns1: Array<{ key: keyof VoiceActivityRow; label: string }> = [
    { key: "command", label: "Command" },
    { key: "date", label: "Date" },
    { key: "transfer", label: "Transfer" },
    { key: "status", label: "Status" },
  ];

  const rows1 =
    customer?.voiceActivity?.map((voice) => ({
      id: voice._id,
      data: {
        command: voice.command,
        date: new Date(voice.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        transfer: <MediaButton className="cursor-pointer" />,
        status: (
          <Status
            label={voice.success ? "Successful" : "Failed"}
            appearance="subtle"
            showDot={true}
          />
        ),
      },
    })) || [];

  const activities =
    customer?.recentActivities?.map((activity) => ({
      time: new Date(activity.date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      date: new Date(activity.date)
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, ":"),
      type:
        activity.type === "transaction"
          ? "Transaction"
          : activity.type === "voice"
            ? "Voice Command"
            : "Device",
      description: activity.description,
      status:
        activity.status.charAt(0).toUpperCase() + activity.status.slice(1),
    })) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[500px]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-4">
        <p className="text-sm text-neutral-600">
          Customer details are temporarily unavailable.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div>
      <section className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-5">
          <BackButton />
          <h2 className="text-xl font-semibold text-neutral-black leading-4">
            ID: {id}
          </h2>
        </div>
        <Button variant="text" onClick={() => refetch()}>
          <RotateCw />
          Refresh
        </Button>
      </section>

      <section className="flex flex-col gap-8">
        <div className="grid grid-cols-[35%_65%] gap-4 items-stretch">
          {/* Personal Profile */}
          <div className="bg-white py-6 px-4 rounded-lg">
            <div className="max-w-[1000px] mx-auto mb-4">
              <h3 className="text-base text-neutral-black font-medium">
                Personal Profile
              </h3>
              <p className="text-sm text-[#AEAEB2] leading-[18px]">
                Last login :{" "}
                {customer?.lastActive
                  ? new Date(customer.lastActive).toLocaleString()
                  : "N/A"}
              </p>
            </div>

            <div className="flex flex-col justify-center items-center mb-[91px]">
              <div className="flex justify-center items-center mb-2 w-14 h-14 bg-[#F5F8FF] text-[20px] -tracking-[0.5px] leading-6 font-semibold text-[#2960EC] rounded-full uppercase">
                {customer?.firstName?.[0]}
                {customer?.lastName?.[0]}
              </div>
              <p className="text-[13px] text-left text-neutral-black leading-[18px] font-medium">
                {customer?.email}
              </p>
              <h3 className="text-base text-left text-neutral-black leading-[18px] font-medium">
                {customer?.firstName} {customer?.lastName}
              </h3>
            </div>

            <ul className="flex flex-col gap-8">
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Gender
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  {customer?.gender || "Not specified"}
                </p>
              </li>

              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Phone Number
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  {customer?.phone || "N/A"}
                </p>
              </li>

              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Address
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  {customer?.address || "N/A"}
                </p>
              </li>

              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Date Of Birth
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  {customer?.dob || "N/A"}
                </p>
              </li>

              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Account Status
                </h3>
                <Status
                  label={customer?.accountStatus || "Active"}
                  appearance="subtle"
                  showDot={true}
                />
              </li>

              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Risk Score
                </h3>
                <Status
                  label={customer?.riskScore || "Low"}
                  appearance="subtle"
                  showDot={false}
                />
              </li>

              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Registered
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  {customer?.dateRegistered
                    ? new Date(customer.dateRegistered).toLocaleDateString()
                    : "N/A"}
                </p>
              </li>

              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  KYC Level
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  Tier {customer?.kyc?.tier || 0}
                </p>
              </li>

              {/* ✅ FIXED DEVICE FIELD */}
              <li className="flex justify-between items-center">
                <h3 className="text-[15px] text-[#575758] leading-[18px] font-medium">
                  Device
                </h3>
                <p className="text-[13px] text-neutral-black leading-[18px] font-medium">
                  {customer?.device?.deviceName ||
                    customer?.device?.deviceId ||
                    (typeof customer?.device === "string"
                      ? customer.device
                      : "N/A")}
                </p>
              </li>
            </ul>
          </div>

          {/* Right side */}
          <div className="bg-white py-6 px-4 rounded-lg">
            <div className="flex items-center justify-between">
              {/* Available Balance */}
              <div className="max-w-[307px] h-48 border border-[#EDECEC] box-shadow-[0px_4px_4px_0_#EDECEC/25] w-full bg-white p-4 rounded-lg flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <Banknote className="w-4 h-4 text-neutral-400" />
                  <h3 className="text-base font-semibold text-neutral-black -leading-[0.33px]">
                    Available Balance
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="flex items-center gap-[5px] text-2xl font-semibold leading-5 -tracking-[0.25px] text-neeutral-black">
                    <ChartSpline className="w-4 h-4 text-green-primary" />₦
                    {customer?.balance?.toLocaleString() || 0}
                  </h3>
                  <p className="flex text-[15px] font-bold -leading-[0.33px] text-red-primary">
                    <MoveDown className="w-4 h-4" />
                    {customer?.balanceChange || 0}%
                  </p>
                </div>
                <div className="flex items-center gap-4 text-[15px] text-neutral-400 -leading-[0.33px] font-medium mb-4">
                  <span>Last Deposit</span>
                  <span>
                    ₦{customer?.lastDeposit?.amount?.toLocaleString() || 0}
                  </span>
                  <span>
                    {customer?.lastDeposit?.date
                      ? new Date(customer.lastDeposit.date).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              {/* Security Overview */}
              <div className="max-w-[307px] h-48 border border-[#EDECEC] w-full bg-white p-4 rounded-lg flex flex-col box-shadow-[0px_4px_4px_0_#EDECEC/25]">
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
                      {customer?.securityOverview?.failedLogins || 0}
                    </p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      Locked Account
                    </p>
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      {customer?.securityOverview?.lockedAccount || "No"}
                    </p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      Active Session
                    </p>
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      {customer?.securityOverview?.activeSession ? "Yes" : "No"}
                    </p>
                  </li>
                  <li className="flex justify-between items-center">
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      Fraud Alert
                    </p>
                    <p className="text-sm text-neutral-black -leading-[0.33px] font-medium">
                      {customer?.securityOverview?.fraudAlerts || "None"}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Transaction Overview */}
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

            {/* Voice Activity */}
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

        {/* Recent Activity + Ticket History */}
        <div className="grid grid-cols-2 divide-x gap-4 divide-[#d9d9d9] p-4 bg-white rounded-lg">
          <div className="pr-6">
            <h3 className="text-[20px] font-medium -tracking-[0.33px] text-black mb-6">
              Recent Activity
            </h3>

            <div className="relative">
              <div className="flex flex-col gap-4">
                {activities.map((activity, index) => (
                  <div key={index} className="relative flex items-start gap-4">
                    <div className="shrink-0 w-[50px]">
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
            {customer?.ticketHistory && customer.ticketHistory.length > 0 ? (
              <div className="flex flex-col gap-4 mt-4">
                {customer.ticketHistory.map((ticket) => (
                  <div
                    key={ticket._id}
                    className="border border-[#EDECEC] p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium text-neutral-black">
                        {ticket.subject}
                      </h4>
                      <Status
                        label={ticket.status}
                        appearance="subtle"
                        showDot={true}
                      />
                    </div>
                    <p className="text-xs text-[#AEAEB2] mb-2">
                      {ticket.description}
                    </p>
                    <p className="text-xs text-[#AEAEB2]">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-[200px]">
                <p className="flex justify-center items-center text-[15px] text-[#AEAEB2] -tracking-[0.33px] font-medium">
                  No ticket issues yet
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
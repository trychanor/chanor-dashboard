"use client";

<<<<<<< HEAD
import StatusDot from "@/app/components/ui/StatusDot";
=======
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
import BackButton from "@/app/components/ui/BackButton";
import Button from "@/app/components/ui/Button";
import EmptyState from "@/app/components/ui/EmptyState";
import MediaButton from "@/app/components/ui/MediaButton";
import RefreshButton from "@/app/components/ui/RefreshButton";
import Status from "@/app/components/ui/Status";
import StatusDot from "@/app/components/ui/StatusDot";
import Skeleton from "@/app/components/ui/Skeleton";
import Table from "@/app/components/ui/Table";
import TableSkeleton from "@/app/components/ui/TableSkeleton";
import ViewButton from "@/app/components/ui/ViewButton";
import { useCustomer } from "@/lib/hooks/use-customers";
import {
  formatCurrency,
  formatDate,
  formatStatus,
  formatTime,
} from "@/utils/formatting.util";
import { useParams } from "next/navigation";
import {
  FaArrowDown,
  FaChartLine,
  FaMoneyBillWave,
  FaShieldHalved,
} from "react-icons/fa6";
import { useState } from "react";
import Loading from "../loading";

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

function CustomerDetailsSkeleton({ id }: { id: string }) {
  return (
    <div
      className="space-y-5"
      aria-busy="true"
      aria-label="Refreshing customer details"
    >
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="flex min-w-0 items-center gap-3">
          <BackButton />
          <div className="space-y-2">
            <Skeleton className="h-3 w-24 rounded" />
            <Skeleton className="h-5 w-40 rounded" />
            <p className="text-xs text-neutral-500">ID: {id}</p>
          </div>
        </div>
        <RefreshButton label="Refreshing" disabled />
      </header>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(270px,0.85fr)_minmax(0,2fr)]">
        <aside className="rounded-lg border border-neutral-200 bg-white p-5">
          <div className="space-y-3 border-b border-neutral-200 pb-4">
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-3 w-44 rounded bg-neutral-100" />
          </div>
          <div className="flex items-center gap-3 py-5">
            <Skeleton className="size-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-3 w-44 rounded bg-neutral-100" />
            </div>
          </div>
          <div className="space-y-4 border-t border-neutral-200 pt-4">
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="flex justify-between gap-4">
                <Skeleton className="h-3 w-20 rounded bg-neutral-100" />
                <Skeleton className="h-3 w-28 rounded" />
              </div>
            ))}
          </div>
        </aside>

        <div className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {Array.from({ length: 2 }, (_, index) => (
              <div
                key={index}
                className="space-y-5 rounded-lg border border-neutral-200 p-4"
              >
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-7 w-40 rounded" />
                <Skeleton className="h-3 w-full rounded bg-neutral-100" />
              </div>
            ))}
          </div>
          <TableSkeleton columnCount={5} rowCount={4} />
          <TableSkeleton columnCount={4} rowCount={3} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 rounded-lg border border-neutral-200 bg-white p-5 lg:grid-cols-2">
        {Array.from({ length: 2 }, (_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-4 w-32 rounded" />
            {Array.from({ length: 3 }, (_, rowIndex) => (
              <Skeleton
                key={rowIndex}
                className="h-16 rounded-md bg-neutral-100"
              />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

export default function UserViewDetails() {
  const params = useParams();
  const id = params?.userview as string;
  const [isManualRefresh, setIsManualRefresh] = useState(false);
  const {
    data: customerData,
    isLoading,
    isError,
    refetch,
  } = useCustomer({ id, limit: 1 });
<<<<<<< HEAD

=======
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
  const customer = customerData?.data;

  const refreshCustomerDetails = async () => {
    setIsManualRefresh(true);

    try {
      await refetch();
    } finally {
      setIsManualRefresh(false);
    }
  };

  const transactionColumns: Array<{
    key: keyof TransactionOverviewRow;
    label: string;
  }> = [
    { key: "tfId", label: "TF ID" },
    { key: "transfer", label: "Transfer" },
    { key: "amount", label: "Amount" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
  ];
<<<<<<< HEAD

  const rows =
    customer?.transactionHistory?.map((txn) => ({
      id: txn._id,
=======
  const transactionRows =
    customer?.transactionHistory.map((transaction) => ({
      id: transaction.id,
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
      data: {
        tfId: transaction.reference ?? "Not available",
        transfer: transaction.service?.replace(/_/g, " ") ?? "Not available",
        amount: formatCurrency(transaction.amount),
        date: formatDate(transaction.createdAt, {
          locale: "en-GB",
          dateOptions: { day: "numeric", month: "short", year: "numeric" },
        }),
        status: (
          <Status
<<<<<<< HEAD
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
=======
            label={formatStatus(transaction.status)}
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
            appearance="subtle"
            showDot={true}
          />
        ),
      },
    })) ?? [];

  const voiceColumns: Array<{ key: keyof VoiceActivityRow; label: string }> = [
    { key: "command", label: "Command" },
    { key: "date", label: "Date" },
    { key: "transfer", label: "Transfer" },
    { key: "status", label: "Status" },
  ];
  const voiceRows =
    customer?.voiceActivity.map((voice) => ({
      id: voice.id,
      data: {
        command: voice.command ?? "Not available",
        date: formatDate(voice.createdAt, {
          locale: "en-GB",
          dateOptions: { day: "numeric", month: "short", year: "numeric" },
        }),
        transfer: <MediaButton className="cursor-pointer" />,
        status: (
          <Status
            label={
              voice.success === null
                ? "Not available"
                : voice.success
                  ? "Successful"
                  : "Failed"
            }
            appearance="subtle"
            showDot={true}
          />
        ),
      },
    })) ?? [];

  const activities =
    customer?.recentActivities.map((activity) => ({
      time: formatTime(activity.date),
      date: formatDate(activity.date, {
        locale: "en-GB",
        dateOptions: { day: "numeric", month: "short", year: "numeric" },
      }),
      type:
        activity.type === "transaction"
          ? "Transaction"
          : activity.type === "voice"
            ? "Voice command"
            : activity.type
              ? formatStatus(activity.type)
              : "Activity",
      description: activity.description ?? "No description available",
      status: formatStatus(activity.status),
    })) ?? [];

  if (isLoading)
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loading />
      </div>
    );

  if (isError || !customer) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center gap-4">
        <p className="text-sm text-neutral-600">
          Customer details are temporarily unavailable.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  if (isManualRefresh) {
    return <CustomerDetailsSkeleton id={id} />;
  }

  const profileItems = [
    ["Gender", customer.gender ?? "Not specified"],
    ["Phone number", customer.phone ?? "Not available"],
    ["Address", customer.address ?? "Not available"],
    [
      "Registered",
      formatDate(customer.dateRegistered, {
        locale: "en-GB",
        dateOptions: { day: "numeric", month: "short", year: "numeric" },
      }),
    ],
    [
      "KYC level",
      customer.kycTier === null ? "Not available" : `Tier ${customer.kycTier}`,
    ],
    ["Device", customer.deviceName ?? "Not available"],
  ];

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="flex min-w-0 items-center gap-3">
          <BackButton />
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase text-neutral-500">
              Customer profile
            </p>
            <h2 className="truncate text-lg font-semibold text-neutral-black">
              {customer.name}
            </h2>
            <p className="truncate text-xs text-neutral-500">ID: {id}</p>
          </div>
        </div>
<<<<<<< HEAD
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
=======
        <RefreshButton
          onClick={refreshCustomerDetails}
          title="Refresh customer details"
        />
      </header>

      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(270px,0.85fr)_minmax(0,2fr)]">
        <aside className="h-fit rounded-lg border border-neutral-200 bg-white p-5">
          <div className="flex items-start justify-between gap-3 border-b border-neutral-200 pb-4">
            <div>
              <h3 className="text-base font-semibold text-neutral-black">
                Personal profile
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Last login:{" "}
                {formatDate(customer.lastActive, { includeTime: true })}
              </p>
            </div>
<<<<<<< HEAD

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
=======
            <Status
              label={formatStatus(customer.accountStatus)}
              appearance="subtle"
              showDot={true}
            />
          </div>
          <div className="flex items-center gap-3 py-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-base font-semibold uppercase text-blue-secondary">
              {customer.firstName?.[0] ?? customer.name[0]}
              {customer.lastName?.[0]}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-black">
                {customer.name}
              </p>
              <p className="truncate text-xs text-neutral-500">
                {customer.email}
              </p>
            </div>
          </div>
          <dl className="grid gap-3 border-t border-neutral-200 pt-4 text-sm">
            {profileItems.map(([label, value]) => (
              <div
                key={label}
                className="flex items-start justify-between gap-4"
              >
                <dt className="shrink-0 text-neutral-500">{label}</dt>
                <dd className="wrap-break-word text-right font-medium text-neutral-black">
                  {value}
                </dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4">
              <dt className="text-neutral-500">Risk score</dt>
              <dd>
                <Status
                  label={formatStatus(customer.riskScore)}
                  appearance="subtle"
                  showDot={false}
                />
              </dd>
            </div>
          </dl>
        </aside>

        <div className="space-y-5 rounded-lg border border-neutral-200 bg-white p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <section className="rounded-lg border border-neutral-200 p-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <FaMoneyBillWave className="size-4" />
                <h3 className="text-sm font-semibold text-neutral-black">
                  Available balance
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <p className="flex items-center gap-2 text-2xl font-semibold text-neutral-black">
                  <FaChartLine className="size-4 text-green-primary" />
                  {formatCurrency(customer.balance)}
                </p>
<<<<<<< HEAD
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
=======
                <p className="flex items-center text-sm font-semibold text-red-primary">
                  <FaArrowDown className="size-4" />
                  {customer.balanceChange === null
                    ? "Not available"
                    : `${customer.balanceChange}%`}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-500">
                <span>Last deposit</span>
                <span className="font-medium text-neutral-black">
                  {formatCurrency(customer.lastDeposit?.amount ?? null)}
                </span>
                <span>
                  {formatDate(customer.lastDeposit?.date, {
                    locale: "en-GB",
                    dateOptions: {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  })}
                </span>
              </div>
            </section>
            <section className="rounded-lg border border-neutral-200 p-4">
              <div className="flex items-center gap-2 text-neutral-500">
                <FaShieldHalved className="size-4" />
                <h3 className="text-sm font-semibold text-neutral-black">
                  Security overview
                </h3>
              </div>
              <dl className="mt-4 grid gap-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Failed logins</dt>
                  <dd className="font-medium text-neutral-black">
                    {customer.securityOverview?.failedLogins ?? "Not available"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Locked account</dt>
                  <dd className="font-medium text-neutral-black">
                    {formatStatus(
                      customer.securityOverview?.lockedAccount ?? null,
                    )}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Active session</dt>
                  <dd className="font-medium text-neutral-black">
                    {customer.securityOverview?.activeSession === null ||
                    customer.securityOverview?.activeSession === undefined
                      ? "Not available"
                      : customer.securityOverview.activeSession
                        ? "Yes"
                        : "No"}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-neutral-500">Fraud alerts</dt>
                  <dd className="font-medium text-neutral-black">
                    {customer.securityOverview?.fraudAlerts ?? "Not available"}
                  </dd>
                </div>
              </dl>
            </section>
          </div>

          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-neutral-black">
                  Transaction overview
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Most recent account movements
                </p>
              </div>
              <ViewButton label="View" />
            </div>
<<<<<<< HEAD

            {/* Voice Activity */}
            <div>
              <div className="flex justify-between items-center mt-8 mb-4">
                <h3 className="text-base font-semibold text-neutral-black -leading-[0.33px]">
                  Voice Activity
=======
            {transactionRows.length > 0 ? (
              <Table
                columns={transactionColumns}
                rows={transactionRows}
                showRowActions={false}
                className="rounded-lg border border-neutral-200"
                cellClassName="px-4 py-3 text-left text-sm text-neutral-600"
              />
            ) : (
              <EmptyState
                title="No transactions recorded"
                description="This user has no transaction activity yet."
                className="rounded-lg border border-neutral-200"
              />
            )}
          </section>
          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-neutral-black">
                  Voice activity
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Recent voice-assisted requests
                </p>
              </div>
              <ViewButton label="View" />
            </div>
            {voiceRows.length > 0 ? (
              <Table
                columns={voiceColumns}
                rows={voiceRows}
                showRowActions={false}
                className="rounded-lg border border-neutral-200"
                cellClassName="px-4 py-3 text-left text-sm text-neutral-600"
              />
            ) : (
              <EmptyState
                title="No voice activity recorded"
                description="Voice activity will appear here when it is available."
                className="rounded-lg border border-neutral-200"
              />
            )}
          </section>
        </div>
<<<<<<< HEAD

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
=======
      </section>

      <section className="grid grid-cols-1 gap-5 rounded-lg border border-neutral-200 bg-white p-5 lg:grid-cols-2">
        <div className="lg:border-r lg:border-neutral-200 lg:pr-5">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-neutral-black">
              Recent activity
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              A timeline of user and account events
            </p>
          </div>
          {activities.length > 0 ? (
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={`${activity.date}-${index}`} className="flex gap-3">
                  <div className="w-16 shrink-0 pt-1 text-right">
                    <p className="text-xs font-medium text-neutral-500">
                      {activity.time}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500">
                      {activity.date}
                    </p>
                  </div>
                  <div className="pt-1.5">
                    <StatusDot label={activity.status} />
                  </div>
                  <div className="min-w-0 flex-1 rounded-md border border-neutral-200 p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
>>>>>>> 0797e4d39bf13511ee1677f4efd72d6d5796ab76
                      <h4 className="text-sm font-medium text-neutral-black">
                        {activity.type}
                      </h4>
                      <Status
                        label={activity.status}
                        appearance="subtle"
                        showDot={true}
                      />
                    </div>
                    <p className="mt-1 text-xs text-neutral-500">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No recent activity"
              description="This user has no recent activity yet."
            />
          )}
        </div>
        <div>
          <div className="mb-5">
            <h3 className="text-base font-semibold text-neutral-black">
              Ticket history
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Support requests raised by this user
            </p>
          </div>
          {customer.ticketHistory.length > 0 ? (
            <div className="space-y-3">
              {customer.ticketHistory.map((ticket) => (
                <article
                  key={ticket.id}
                  className="rounded-lg border border-neutral-200 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="text-sm font-medium text-neutral-black">
                      {ticket.subject ?? "Support ticket"}
                    </h4>
                    <Status
                      label={formatStatus(ticket.status)}
                      appearance="subtle"
                      showDot={true}
                    />
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">
                    {ticket.description ?? "No description available"}
                  </p>
                  <p className="mt-3 text-xs text-neutral-500">
                    {formatDate(ticket.createdAt, {
                      locale: "en-GB",
                      dateOptions: {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    })}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No support tickets"
              description="This user has no support tickets yet."
              className="min-h-[200px]"
            />
          )}
        </div>
      </section>
    </div>
  );
}
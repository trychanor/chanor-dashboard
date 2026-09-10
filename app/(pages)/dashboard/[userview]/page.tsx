"use client";

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

  const transactionRows =
    customer?.transactionHistory?.map((transaction) => ({
      id: transaction.id,
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
            label={formatStatus(transaction.status)}
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
    customer?.voiceActivity?.map((voice) => ({
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
    customer?.recentActivities?.map((activity) => ({
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

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <Loading />
      </div>
    );
  }

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
              </h3>
              <p className="mt-1 text-xs text-neutral-500">
                Last login:{" "}
                {formatDate(customer.lastActive, { includeTime: true })}
              </p>
            </div>
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
                </h3>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <p className="flex items-center gap-2 text-2xl font-semibold text-neutral-black">
                  <FaChartLine className="size-4 text-green-primary" />
                  {formatCurrency(customer.balance)}
                </p>
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
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  Most recent account movements
                </p>
              </div>
              <ViewButton label="View" />
            </div>
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
          {customer.ticketHistory?.length > 0 ? (
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
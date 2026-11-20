type UnknownRecord = Record<string, unknown>;

export type SettlementProvider = {
  provider: string;
  accountNumber: string | null;
  balance: number | null;
  lastCheckedAt: string | null;
};

export type ProviderPosition = {
  provider: string;
  merchantWalletBalance: number | null;
};

export type SettlementOverview = {
  totalFloat: number | null;
  pendingAmount: number | null;
  providers: SettlementProvider[];
  providerPositions: ProviderPosition[];
  daily: SettlementDailyRow[];
};

export type SettlementDailyRow = {
  date: string | null;
  provider: string | null;
  inflow: number | null;
  outflow: number | null;
  net: number | null;
  pendingAmount: number | null;
  status: string | null;
};

function asRecord(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function asText(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function asFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string" && value.trim() !== "") {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  return null;
}

export function mapSettlementAccounts(response: unknown): SettlementProvider[] {
  const payload = asRecord(response);
  const settlements = Array.isArray(payload?.data) ? payload.data : [];

  return settlements.flatMap((value) => {
    const settlement = asRecord(value);
    const provider = asText(settlement?.provider);

    if (!provider) return [];

    return [{
      provider,
      accountNumber: asText(settlement?.accountNumber),
      balance:
        asFiniteNumber(settlement?.balanceActual) ??
        asFiniteNumber(settlement?.balanceEstimated),
      lastCheckedAt: asText(settlement?.lastCheckedAt),
    }];
  });
}

export function mapSettlementReport(response: unknown): Omit<SettlementOverview, "providers"> {
  const report = asRecord(asRecord(response)?.data);
  const daily = Array.isArray(report?.daily) ? report.daily : [];
  const providerPositions = Array.isArray(report?.providerPositions)
    ? report.providerPositions
    : [];

  return {
    totalFloat: asFiniteNumber(report?.totalFloat),
    pendingAmount: asFiniteNumber(report?.pendingAmount),
    providerPositions: providerPositions.flatMap((value) => {
      const position = asRecord(value);
      const provider = asText(position?.provider);

      return provider
        ? [{ provider, merchantWalletBalance: asFiniteNumber(position?.merchantWalletBalance) }]
        : [];
    }),
    daily: daily.map((value) => {
      const row = asRecord(value);

      return {
        date: asText(row?.date),
        provider: asText(row?.provider),
        inflow: asFiniteNumber(row?.inflow),
        outflow: asFiniteNumber(row?.outflow),
        net: asFiniteNumber(row?.net),
        pendingAmount: asFiniteNumber(row?.pendingAmount),
        status: asText(row?.status),
      };
    }),
  };
}

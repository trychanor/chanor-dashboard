type UnknownRecord = Record<string, unknown>;

export type AnalyticsMetric = {
  value: number | null;
  change: number | null;
};

export type UsersAnalytics = {
  totalUsers: AnalyticsMetric;
  activeUsers: AnalyticsMetric;
};

export type TransactionVolumeAnalytics = {
  totalInflow: AnalyticsMetric;
  totalOutflow: AnalyticsMetric;
};

export type ProfitAnalytics = {
  companyProfit: AnalyticsMetric;
  netProfit: AnalyticsMetric;
};

export type BalanceAnalytics = {
  totalAgentCommissionClaimed: AnalyticsMetric;
  totalWalletBalance: AnalyticsMetric;
};

export type InflowOutflowAnalytics = {
  date: string | null;
  inflow: number | null;
  outflow: number | null;
};

export type ProfitBreakdownAnalytics = {
  totalProfit: number | null;
  breakdown: Array<{
    service: string | null;
    profit: number | null;
    count: number | null;
  }>;
};

export type ActivitySourceAnalytics = Array<{
  source: string | null;
  count: number | null;
  sources: string[];
}>;

function asRecord(value: unknown): UnknownRecord | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as UnknownRecord)
    : null;
}

function asFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string" && value.trim() !== "") {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  return null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

function mapMetric(value: unknown): AnalyticsMetric {
  const metric = asRecord(value);

  return {
    value: asFiniteNumber(metric?.value),
    change: asFiniteNumber(metric?.change),
  };
}

function getResponseData(response: unknown): UnknownRecord | null {
  return asRecord(asRecord(response)?.data);
}

export function mapUsersAnalytics(response: unknown): UsersAnalytics {
  const data = getResponseData(response);

  return {
    totalUsers: mapMetric(data?.totalUsers),
    activeUsers: mapMetric(data?.activeUsers),
  };
}

export function mapTransactionVolumeAnalytics(
  response: unknown,
): TransactionVolumeAnalytics {
  const data = getResponseData(response);

  return {
    totalInflow: mapMetric(data?.totalInflow),
    totalOutflow: mapMetric(data?.totalOutflow),
  };
}

export function mapProfitAnalytics(response: unknown): ProfitAnalytics {
  const data = getResponseData(response);

  return {
    companyProfit: mapMetric(data?.companyProfit),
    netProfit: mapMetric(data?.netProfit),
  };
}

export function mapBalanceAnalytics(response: unknown): BalanceAnalytics {
  const data = getResponseData(response);

  return {
    totalAgentCommissionClaimed: mapMetric(data?.totalAgentCommissionClaimed),
    totalWalletBalance: mapMetric(data?.totalWalletBalance),
  };
}

export function mapInflowOutflowAnalytics(
  response: unknown,
): InflowOutflowAnalytics[] {
  const data = asRecord(asRecord(response)?.data);
  const rows = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(asRecord(response)?.data)
      ? (asRecord(response)?.data as unknown[])
      : [];

  return rows.map((value) => {
    const row = asRecord(value);

    return {
      date: asString(row?.date),
      inflow: asFiniteNumber(row?.inflow),
      outflow: asFiniteNumber(row?.outflow),
    };
  });
}

export function mapProfitBreakdownAnalytics(
  response: unknown,
): ProfitBreakdownAnalytics {
  const data = getResponseData(response);
  const breakdown = Array.isArray(data?.breakdown) ? data.breakdown : [];

  return {
    totalProfit: asFiniteNumber(data?.totalProfit),
    breakdown: breakdown.map((value) => {
      const row = asRecord(value);

      return {
        service: asString(row?.service),
        profit: asFiniteNumber(row?.profit),
        count: asFiniteNumber(row?.count),
      };
    }),
  };
}

export function mapActivitySourceAnalytics(
  response: unknown,
): ActivitySourceAnalytics {
  const rawData = asRecord(response)?.data;
  const data = Array.isArray(rawData) ? rawData : [];

  return data.map((value) => {
    const item = asRecord(value);

    return {
      source: asString(item?.source),
      count: asFiniteNumber(item?.count),
      sources: Array.isArray(item?.sources)
        ? item.sources
            .map(asString)
            .filter((source): source is string => source !== null)
        : [],
    };
  });
}

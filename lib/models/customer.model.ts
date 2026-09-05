import {
  ApiResponse,
  ApiResponseWithPagination,
  PaginationMetadata,
} from "@/types";

type RecordValue = Record<string, unknown>;

export type CustomerSummary = {
  userId: string;
  name: string;
  email: string;
  dateRegistered: string | null;
  lastActive: string | null;
  accountStatus: string | null;
};

export type CustomerDetail = CustomerSummary & {
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  gender: string | null;
  address: string | null;
  riskScore: string | null;
  deviceName: string | null;
  balance: number | null;
  balanceChange: number | null;
  lastDeposit: { amount: number | null; date: string | null } | null;
  securityOverview: {
    failedLogins: number | null;
    lockedAccount: string | null;
    activeSession: boolean | null;
    fraudAlerts: number | null;
  } | null;
  kycTier: number | null;
  transactionHistory: CustomerTransaction[];
  ticketHistory: CustomerTicket[];
  voiceActivity: CustomerVoiceActivity[];
  recentActivities: CustomerRecentActivity[];
};

export type CustomerTransaction = {
  id: string;
  reference: string | null;
  service: string | null;
  amount: number | null;
  createdAt: string | null;
  status: string | null;
};

export type CustomerTicket = {
  id: string;
  subject: string | null;
  description: string | null;
  status: string | null;
  createdAt: string | null;
};

export type CustomerVoiceActivity = {
  id: string;
  command: string | null;
  success: boolean | null;
  createdAt: string | null;
};

export type CustomerRecentActivity = {
  type: string | null;
  description: string | null;
  status: string | null;
  date: string | null;
};

function isRecord(value: unknown): value is RecordValue {
  return typeof value === "object" && value !== null;
}

function readText(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function readNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function readBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function readDecimal(value: unknown): number | null {
  if (isRecord(value)) {
    return readDecimal(value.$numberDecimal);
  }

  if (typeof value === "string" && value.trim()) {
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  return readNumber(value);
}

function readArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function readDeviceName(value: unknown): string | null {
  if (isRecord(value)) {
    return readText(value.deviceName);
  }

  return readText(value);
}

function mapCustomerSummary(value: unknown): CustomerSummary | null {
  if (!isRecord(value)) return null;

  const userId = readText(value.userId);

  if (!userId) return null;

  return {
    userId,
    name: readText(value.name) ?? "Unnamed user",
    email: readText(value.email) ?? "Email not available",
    dateRegistered: readText(value.dateRegistered),
    lastActive: readText(value.lastActive),
    accountStatus: readText(value.accountStatus),
  };
}

function mapTransaction(value: unknown): CustomerTransaction | null {
  if (!isRecord(value)) return null;

  const id = readText(value._id);

  if (!id) return null;

  return {
    id,
    reference: readText(value.reference),
    service: readText(value.service),
    amount: readDecimal(value.amount),
    createdAt: readText(value.createdAt),
    status: readText(value.status),
  };
}

function mapTicket(value: unknown): CustomerTicket | null {
  if (!isRecord(value)) return null;

  const id = readText(value._id);

  if (!id) return null;

  return {
    id,
    subject: readText(value.subject),
    description: readText(value.description),
    status: readText(value.status),
    createdAt: readText(value.createdAt),
  };
}

function mapVoiceActivity(value: unknown): CustomerVoiceActivity | null {
  if (!isRecord(value)) return null;

  const id = readText(value._id);

  if (!id) return null;

  return {
    id,
    command: readText(value.command),
    success: readBoolean(value.success),
    createdAt: readText(value.createdAt),
  };
}

function mapRecentActivity(value: unknown): CustomerRecentActivity | null {
  if (!isRecord(value)) return null;

  return {
    type: readText(value.type),
    description: readText(value.description),
    status: readText(value.status),
    date: readText(value.date),
  };
}

function mapSecurityOverview(
  value: unknown,
): CustomerDetail["securityOverview"] {
  if (!isRecord(value)) return null;

  return {
    failedLogins: readNumber(value.failedLogins),
    lockedAccount: readText(value.lockedAccount),
    activeSession: readBoolean(value.activeSession),
    fraudAlerts: readNumber(value.fraudAlerts),
  };
}

function mapLastDeposit(value: unknown): CustomerDetail["lastDeposit"] {
  if (!isRecord(value)) return null;

  return {
    amount: readDecimal(value.amount),
    date: readText(value.date),
  };
}

export function mapCustomerListResponse(
  response: ApiResponseWithPagination<unknown> | null,
): ApiResponseWithPagination<CustomerSummary[]> {
  if (!isRecord(response) || !isRecord(response.metadata)) {
    throw new Error("Customer data is unavailable.");
  }

  const data = response.data === null ? [] : readArray(response.data);

  if (response.data !== null && !Array.isArray(response.data)) {
    throw new Error("Customer data is unavailable.");
  }

  const metadata: PaginationMetadata = {
    page: readNumber(response.metadata.page) ?? 1,
    totalPages: readNumber(response.metadata.totalPages) ?? 1,
    totalRecords: readNumber(response.metadata.totalRecords) ?? data.length,
    limit: readNumber(response.metadata.limit) ?? data.length,
  };

  return {
    data: data
      .map(mapCustomerSummary)
      .filter((customer): customer is CustomerSummary => Boolean(customer)),
    metadata,
    status: response.status,
  };
}

export function mapCustomerDetailResponse(
  response: ApiResponse<unknown> | null,
): ApiResponse<CustomerDetail | null> {
  if (!isRecord(response)) {
    throw new Error("Customer details are unavailable.");
  }

  if (response.data === null) {
    return { data: null, status: response.status };
  }

  const summary = mapCustomerSummary(response.data);

  if (!summary || !isRecord(response.data)) {
    throw new Error("Customer details are unavailable.");
  }

  const kyc = isRecord(response.data.kyc) ? response.data.kyc : null;

  return {
    data: {
      ...summary,
      firstName: readText(response.data.firstName),
      lastName: readText(response.data.lastName),
      phone: readText(response.data.phone),
      gender: readText(response.data.gender),
      address: readText(response.data.address),
      riskScore: readText(response.data.riskScore),
      deviceName: readDeviceName(response.data.device),
      balance: readDecimal(response.data.balance),
      balanceChange: readDecimal(response.data.balanceChange),
      lastDeposit: mapLastDeposit(response.data.lastDeposit),
      securityOverview: mapSecurityOverview(response.data.securityOverview),
      kycTier: readNumber(response.data.kycTier) ?? readNumber(kyc?.tier),
      transactionHistory: readArray(response.data.transactionHistory)
        .map(mapTransaction)
        .filter((transaction): transaction is CustomerTransaction =>
          Boolean(transaction),
        ),
      ticketHistory: readArray(response.data.ticketHistory)
        .map(mapTicket)
        .filter((ticket): ticket is CustomerTicket => Boolean(ticket)),
      voiceActivity: readArray(response.data.voiceActivity)
        .map(mapVoiceActivity)
        .filter((activity): activity is CustomerVoiceActivity =>
          Boolean(activity),
        ),
      recentActivities: readArray(response.data.recentActivities)
        .map(mapRecentActivity)
        .filter((activity): activity is CustomerRecentActivity =>
          Boolean(activity),
        ),
    },
    status: response.status,
  };
}
